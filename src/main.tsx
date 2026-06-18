// @context: Application entry point
// @purpose: Mounts React app, applies global error boundary, handles session redirect on fresh loads
// @security: No security measures at this level
// @performance: Error boundary wraps entire tree - any uncaught error shows ErrorScreen
// @dependencies: App.tsx, index.css, ErrorBoundary
// @config: sessionStorage 'currentRunId' key used for fresh-run detection
// @owner: Core team

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/errors/ErrorBoundary';

const runId = 'app_run_' + Math.random().toString(36).substring(7);

try {
  if (sessionStorage.getItem('currentRunId') !== runId) {
    sessionStorage.setItem('currentRunId', runId);
    if (!window.location.hash || window.location.hash.includes('profile') || window.location.hash.includes('roommate')) {
       window.location.hash = '#/';
    }
  }
} catch {
  if (!window.location.hash || window.location.hash.includes('profile') || window.location.hash.includes('roommate')) {
     window.location.hash = '#/';
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
