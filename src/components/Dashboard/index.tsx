import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useProgress } from "@/context/ProgressContext";
import { MetricCard } from "../MetricCard";
import { RealTimeChart } from "../RealTimeChart";
import { dashboardService } from "@/services/api";
import { modularLearningService } from "@/services/modularLearningService";
import { MetricData } from "@/types/dashboard";

const Dashboard: React.FC = (): JSX.Element => {
  const { checklist, updateChecklist } = useProgress();
  const [_metrics, setMetrics] = useState<MetricData[]>([]);
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);
  interface ModularMetricsState {
    sparkEngine: MetricData[];
    aaGenome: MetricData[];
    neurotech: MetricData[];
  }
  
  const [modularMetrics, setModularMetrics] = useState<ModularMetricsState>({
    sparkEngine: [],
    aaGenome: [],
    neurotech: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [organizationId] = useState("12345"); // Example ID; replace dynamically as needed
  const [role] = useState("admin"); // Example role; replace with actual user role dynamically

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch regular dashboard metrics
        const dashboardData = await dashboardService.getMetrics(organizationId, "24h", { role });
        setMetrics(Array.isArray(dashboardData) ? dashboardData : [dashboardData]);

        // Fetch modular learning system metrics
        const modularData = await modularLearningService.getMetrics(organizationId);
        setModularMetrics({
          sparkEngine: modularData.sparkEngine.metrics,
          aaGenome: modularData.aaGenome.metrics,
          neurotech: modularData.neurotech.metrics
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setError("Failed to fetch metrics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();

    // Subscribe to regular dashboard updates
    const unsubscribeDashboard = dashboardService.subscribeToUpdates(organizationId, (data) => {
      setRealTimeData((prev) => [...prev, data]);
    });

    // Subscribe to modular learning system updates
    modularLearningService.subscribeToUpdates(
      organizationId,
      (data) => {
        setModularMetrics(prev => ({
          sparkEngine: data.sparkEngine?.metrics || prev.sparkEngine,
          aaGenome: data.aaGenome?.metrics || prev.aaGenome,
          neurotech: data.neurotech?.metrics || prev.neurotech
        }));

        if (data.combinedMetrics) {
          setRealTimeData(prev => [...prev, ...data.combinedMetrics]);
        }
      }
    );

    return () => {
      unsubscribeDashboard();
    };
  }, [organizationId, role]);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dashboardData = await dashboardService.getMetrics(organizationId, "24h", { role });
      setMetrics(Array.isArray(dashboardData) ? dashboardData : [dashboardData]);

      const modularData = await modularLearningService.getMetrics(organizationId);
      setModularMetrics({
        sparkEngine: modularData.sparkEngine.metrics,
        aaGenome: modularData.aaGenome.metrics,
        neurotech: modularData.neurotech.metrics
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setError("Failed to fetch metrics. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (step: string) => {
    updateChecklist(step, !checklist[step]);
  };

  return (
    <StyledGrid container spacing={3}>
      {/* Dashboard Header */}
      <Grid item xs={12}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-color my-6">
            Dashboard Overview
          </h1>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary-color text-white rounded hover:opacity-90 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </Grid>

      {/* Loading State */}
      {isLoading && (
        <Grid item xs={12}>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
          </div>
        </Grid>
      )}

      {/* Error State */}
      {error && (
        <Grid item xs={12}>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </Grid>
      )}

      {/* Onboarding Checklist */}
      <Grid item xs={12} md={8} lg={6} className="mx-auto">
        <div className="bg-white w-full p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Onboarding Checklist</h2>
          <ul className="space-y-4">
            {Object.entries(checklist).map(([step, completed]) => (
              <li
                key={step}
                className={`p-4 rounded-lg border ${
                  completed
                    ? "bg-green-100 border-green-400"
                    : "bg-gray-50 border-gray-300"
                } flex items-center justify-between`}
              >
                <span className="text-gray-800 capitalize">
                  {step.replace(/([A-Z])/g, " $1")}
                </span>
                <button
                  onClick={() => handleToggle(step)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    completed
                      ? "bg-green-600 text-white"
                      : "bg-primary-color text-white"
                  } hover:opacity-90 transition`}
                >
                  {completed ? 'Completed' : 'Mark Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Spark Engine Metrics</h2>
          <Grid container spacing={2}>
            {!isLoading && modularMetrics.sparkEngine.length === 0 ? (
              <div className="text-gray-500 text-center py-4 w-full">
                No Spark Engine metrics available
              </div>
            ) : (
              modularMetrics.sparkEngine.map((metric: MetricData, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={`spark-${index}`}>
                  <MetricCard 
                    title={metric.path || 'Metric'}
                    value={metric.value}
                    unit={metric.unit || ''} 
                  />
                </Grid>
              ))
            )}
          </Grid>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">AA Genome Metrics</h2>
          <Grid container spacing={2}>
            {!isLoading && modularMetrics.aaGenome.length === 0 ? (
              <div className="text-gray-500 text-center py-4 w-full">
                No AA Genome metrics available
              </div>
            ) : (
              modularMetrics.aaGenome.map((metric: MetricData, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={`genome-${index}`}>
                  <MetricCard 
                    title={metric.path || 'Metric'}
                    value={metric.value}
                    unit={metric.unit || ''} 
                  />
                </Grid>
              ))
            )}
          </Grid>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Neurotech Network Metrics</h2>
          <Grid container spacing={2}>
            {!isLoading && modularMetrics.neurotech.length === 0 ? (
              <div className="text-gray-500 text-center py-4 w-full">
                No Neurotech Network metrics available
              </div>
            ) : (
              modularMetrics.neurotech.map((metric: MetricData, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={`neuro-${index}`}>
                  <MetricCard 
                    title={metric.path || 'Metric'}
                    value={metric.value}
                    unit={metric.unit || ''} 
                  />
                </Grid>
              ))
            )}
          </Grid>
        </div>
      </Grid>

      {/* Real-Time Metrics Chart */}
      <Grid item xs={12}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Real-Time Metrics</h2>
          <RealTimeChart
            data={realTimeData.map(data => ({
              timestamp: data.timestamp,
              value: data.value
            }))}
          />
        </div>
      </Grid>
    </StyledGrid>
  );
};

// Styled Material-UI Grid for layout consistency
const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  WebkitOverflowScrolling: "touch",
  height: "calc(100% - 64px)",
  overflow: "auto",
  gap: theme.spacing(2),
}));

export default Dashboard;