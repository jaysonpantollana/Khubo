// @context: Application entry point — React DOM mount
// @purpose: Renders App inside StrictMode and ErrorBoundary; session run ID tracking for development
// @behavior: Creates root with createRoot; wraps in ErrorBoundary for global error catching
// @dependencies: App, ErrorBoundary, index.css

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
