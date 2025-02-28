import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthProvider } from './auth/AuthProvider';
import App from './app';
import './index.css';
import { store } from './store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
<React.StrictMode>
  <Provider store={store}>
	<ThemeProvider theme={theme}>
	  <CssBaseline />
	  <AuthProvider>
		<App />
	  </AuthProvider>
	</ThemeProvider>
  </Provider>
</React.StrictMode>
);