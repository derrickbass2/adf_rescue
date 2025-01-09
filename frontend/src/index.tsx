import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './globals.css'; // Import Tailwind CSS and global styles

// Mount the React app to the root div in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);