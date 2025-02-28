// /Users/dbass/Documents/GitHub/adf_rescue/src/app.tsx
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import Login from "./auth/Login";
import SignUpForm from "./auth/SignUpForm";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import HealthCheckQuiz from "./components/HealthCheckQuiz";
import DataInput from "./components/DataInput";
import { RealTimeMetrics } from "./components/RealTimeMetrics";
import AlertsPanel from "./components/AlertsPanel";
import Directory from "./components/Directory";
import Collectors from "./components/Collectors";
import RescueChart from "./components/RescueChart";
import Process from "./components/Process";
import "./index.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "dashboard/setState",
      payload: {
        metrics: [],
        timeRange: "lastWeek",
        filters: {},
        realTimeData: null,
        organizationId: "org-123",
        additionalData: "Some additional info",
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        
        {/* Protected Routes within Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="health-check" element={<HealthCheckQuiz />} />
          <Route path="data-input" element={<DataInput organizationId="org-123" />} />
          <Route path="real-time" element={<RealTimeMetrics organizationId="org-123" metricKeys={["metric1", "metric2"]} />} />
          <Route path="alerts" element={<AlertsPanel alerts={[]} onAlertAction={() => {}} />} />
          <Route path="directory" element={<Directory organizationId="org-123" timeRange="lastWeek" filters={{}} />} />
          <Route path="collectors" element={<Collectors />} />
          <Route path="rescue-chart" element={<RescueChart />} />
          <Route path="process" element={<Process />} />
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;