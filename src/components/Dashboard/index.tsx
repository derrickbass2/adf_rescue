import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useProgress } from "../../context/ProgressContext"; // Adjust path as needed
import { MetricCard } from "../MetricCard";
import { RealTimeChart } from "../RealTimeChart";
import { dashboardService } from "../../services/api";
import { MetricData } from "../../types/dashboard";

const Dashboard: React.FC = () => {
  const { checklist, updateChecklist } = useProgress(); // Onboarding checklist context
  const [metrics, setMetrics] = useState<MetricData[]>([]); // Static metrics
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]); // Real-time data
  const organizationId = "12345"; // Example ID; replace dynamically as needed
  const role = "admin"; // Example role; replace with actual user role dynamically

  // Fetch metrics on mount and subscribe to real-time updates
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await dashboardService.getMetrics(organizationId, "24h", { role });
        setMetrics(Array.isArray(data) ? data : [data]); // Normalize single object to array
    } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();

    // Subscribe to real-time data updates
    const unsubscribe = dashboardService.subscribeToUpdates(organizationId, (data) => {
      setRealTimeData((prev) => [...prev, data]);
    });

    return () => unsubscribe(); // Cleanup WebSocket connection
  }, [organizationId, role]);

  // Function to toggle checklist item completion
  const handleToggle = (step: string) => {
    updateChecklist(step, !checklist[step]);
  };

  return (
    <StyledGrid container spacing={3}>
      {/* Dashboard Header */}
      <Grid item xs={12}>
        <h1 className="text-3xl font-bold text-primary-color my-6 text-center">
          Dashboard Overview
        </h1>
      </Grid>

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
                  {completed ? "Undo" : "Mark as Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Grid>

      {/* Metric Cards */}
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <MetricCard title={metric.title} value={metric.value} unit={metric.unit} />
        </Grid>
      ))}

      {/* Real-Time Metrics Chart */}
      <Grid item xs={12}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Real-Time Metrics</h2>
          <RealTimeChart data={realTimeData.map(data => ({ timestamp: data.timestamp, value: data.value }))} />
        </div>
      </Grid>
    </StyledGrid>
  );
};

export default Dashboard;

// Styled Material-UI Grid for layout consistency
const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  WebkitOverflowScrolling: "touch",
  height: "calc(100% - 64px)",
  overflow: "auto",
  gap: theme.spacing(2),
}));