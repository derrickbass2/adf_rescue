import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useProgress } from "@/context/ProgressContext";
import { MetricCard } from "../MetricCard";
import { useAuth } from "@/context/AuthContext";
import { dashboardService } from "@/services/api";
import { modularLearningService } from "@/services/modularLearningService";
import { MetricData } from "@/types/dashboard";
import { RealTimeChart } from "../RealTimeChart";

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  WebkitOverflowScrolling: "touch",
  height: "calc(100% - 64px)",
  overflow: "auto",
  gap: theme.spacing(2),
}));

interface ModularMetricsState {
  sparkEngine: MetricData[];
  aaGenome: MetricData[];
  neurotech: MetricData[];
}

const Dashboard: React.FC = (): JSX.Element => {
  useProgress();
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);
  const [modularMetrics, setModularMetrics] = useState<ModularMetricsState>({
    sparkEngine: [],
    aaGenome: [],
    neurotech: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuth();
  const role = user?.role ?? "guest";
  const organizationId = user?.organizationId ?? "";

  // Helper to process metrics and reduce function nesting
  const processMetrics = (metrics: any[]): MetricData[] => {
    return metrics.map(metric => ({
      ...metric,
      timestamp: Date.now(),
      unit: metric.unit || "N/A"
    }));
  };

  const fetchMetrics = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const dashboardData = await dashboardService.getMetrics(organizationId, "24h", { role });
      const metricsToProcess = Array.isArray(dashboardData) ? dashboardData : [dashboardData];
      setRealTimeData(processMetrics(metricsToProcess));

      const modularData = await modularLearningService.processData({}, organizationId);
      setModularMetrics({
        sparkEngine: processMetrics(modularData.sparkEngine.metrics),
        aaGenome: processMetrics(modularData.aaGenome.metrics),
        neurotech: processMetrics(modularData.neurotech.metrics),
      });

      const unsubscribeModular = modularLearningService.subscribeToUpdates(organizationId, (data) => {
        setModularMetrics((prev) => ({
          sparkEngine: data.sparkEngine?.metrics || prev.sparkEngine,
          aaGenome: data.aaGenome?.metrics || prev.aaGenome,
          neurotech: data.neurotech?.metrics || prev.neurotech,
        }));

        if (data.combinedMetrics) {
          const processedMetrics = processMetrics(data.combinedMetrics);
          setRealTimeData((prev) => prev.concat(processedMetrics));
        }
      });

      unsubscribeModular();
    } catch (error) {
      setError("Failed to fetch metrics. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleToggle = (step: string): void => {
    setChecklist((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <StyledGrid container>
      <Grid item xs={12}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-color my-6">Dashboard Overview</h1>
          <button
            onClick={fetchMetrics}
            className="px-4 py-2 bg-primary-color text-white rounded hover:opacity-90 transition"
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>
      </Grid>

      {isLoading && (
        <Grid item xs={12}>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
          </div>
        </Grid>
      )}

      {error && (
        <Grid item xs={12}>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </Grid>
      )}

      <Grid item xs={12} md={8} lg={6} className="mx-auto">
        <div className="bg-white w-full p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Onboarding Checklist</h2>
          <ul className="space-y-4">
            {Object.entries(checklist).map(([step, completed]) => (
              <li
                key={step}
                className={`p-4 rounded-lg border ${
                  completed ? "bg-green-100 border-green-400" : "bg-gray-50 border-gray-300"
                } flex items-center justify-between`}
              >
                <span className="text-gray-800 capitalize">{step.replace(/([A-Z])/g, " $1")}</span>
                <button
                  onClick={() => handleToggle(step)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    completed ? "bg-green-600 text-white" : "bg-primary-color text-white"
                  } hover:opacity-90 transition`}
                >
                  {completed ? "Completed" : "Mark Complete"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <RealTimeChart data={realTimeData.map((metric) => ({ timestamp: metric.timestamp.toString(), value: metric.value }))} />
        </div>
      </Grid>

      {["neurotech", "sparkEngine", "aaGenome"].map((key) => (
        <Grid item xs={12} md={8} lg={6} className="mx-auto" key={key}>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{`${key.charAt(0).toUpperCase() + key.slice(1)} Metrics`}</h2>
            <Grid container spacing={2}>
              {!isLoading && modularMetrics[key as keyof ModularMetricsState].length === 0 ? (
                <div className="text-gray-500 text-center py-4 w-full">No {key} metrics available</div>
              ) : (
                modularMetrics[key as keyof ModularMetricsState].map((metric: MetricData) => (
                  <Grid item xs={12} sm={6} md={4} key={`${key}-${metric.path}`}>
                    <MetricCard title={metric.path || "Metric"} value={metric.value} unit={metric.unit || "N/A"} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </Grid>
      ))}
    </StyledGrid>
  );
};

export default Dashboard;