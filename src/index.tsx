import React from 'react';
import ReactDOM from 'react-dom/client';
import '/Users/dbass/Documents/GitHub/adf_rescue/src/index'; // Import Tailwind CSS and global styles
import { ProgressProvider } from "./context/ProgressContext";
import Dashboard from "./components/Dashboard";
import '/Users/dbass/Documents/GitHub/adf_rescue/src/index';  // Ensure this line is in your entry file
const MainApp: React.FC = () => {
  return (
    <ProgressProvider>
      <Dashboard />
    </ProgressProvider>
  );
};

// Mount the React app to the root div in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);