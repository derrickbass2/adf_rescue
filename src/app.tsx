import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";
import SignUpForm from "./auth/SignUpForm";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./components/Home"; // Import the new Home component
import './globals.css';

interface DashboardState {
  metrics: any[];
  timeRange: string;
  filters: Record<string, any>;
  realTimeData: any;
  organizationId: string;
  additionalData: string;
}

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dashboardState: DashboardState = {
      metrics: [],
      timeRange: "lastWeek",
      filters: {},
      realTimeData: null,
      organizationId: "org-123",
      additionalData: "Some additional info",
    };

    dispatch({
      type: "dashboard/setState",
      payload: dashboardState,
    });
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;