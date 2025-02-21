// src/App.tsx
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./auth/Login";
import SignUpForm from "./auth/SignUpForm";
import Dashboard from "./components/Dashboard";  // Import Dashboard directly
import Home from "./components/Home";
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Direct route to Dashboard */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;