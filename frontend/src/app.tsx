import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import initializeDashboardData from "./store/slices/dashboardSlice"; // Action to initialize dashboard data
import { fetchData } from "./services/dataCollection"; // Example service for fetching data

// Import Components
import Hero from "./components/Hero";
import HealthCheckQuiz from "./components/HealthCheckQuiz";
import { RealTimeMetrics } from "./components/RealTimeMetrics";
import { RealTimeChart } from "./components/RealTimeChart";
import Directory from "./components/Directory";
import { DataInput } from "./components/DataInput";
import Dashboard from "./components/Dashboard";

// Import Custom Hooks
import { useWebSocket } from "./hooks/useWebSocket"; // Custom hook for WebSocket management

// Import Styles
import "./globals.css"; // Global styles (tailwind, custom)

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeDashboardData());
    fetchData();
  }, [dispatch]);

  const { data, error } = useWebSocket("ws://example.com/socket");

  if (error) {
    console.error("WebSocket Error:", error);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/health-check" element={<HealthCheckQuiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/real-time-metrics" element={<RealTimeMetrics data={data} />} />
          <Route path="/real-time-chart" element={<RealTimeChart data={data} />} />
          <Route path="/data-input" element={<DataInput />} />
          <Route path="/directory" element={<Directory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

