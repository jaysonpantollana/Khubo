// @context: Global error boundary — catches unhandled React render errors
// @purpose: Class component (required by React) that catches unhandled errors and displays ErrorScreen UI
// @purpose: Acts as the primary error observability point — all uncaught errors flow through here
// @behavior: getDerivedStateFromError → sets hasError=true, stores error object
// @behavior: componentDidCatch → logs error + component stack to console (extensible to external error reporting)
// @behavior: handleRetry → resets hasError=false, error=null, calls optional onReset prop
// @behavior: handleGoHome → resets state + navigates to #/
// @behavior: Supports custom fallback prop; defaults to <ErrorScreen> with retry + goHome
// @performance: Only renders fallback when hasError=true (zero overhead during normal operation)
// @performance: No effect on component tree until an error is thrown
// @side-effects: console.error in componentDidCatch; window.location.hash assignment in handleGoHome
// @observability: All uncaught errors are logged via componentDidCatch — this is the sole error observability point
// @observability: No external error reporting service (Sentry, DataDog, etc.) configured — console only
// @logging: Error logging strategy: console.error() in componentDidCatch — can be replaced with external service
// @tests: None — integration tests needed for: thrown error triggers fallback, retry resets state, goHome navigates
// @dependencies: ui/ErrorScreen.tsx
// @owner: Core team
// @debugging: If ErrorScreen doesn't appear on crash, check: (1) ErrorBoundary wraps the crashing component, (2) error is thrown during render (not in event handler)
// @debugging: Common error sources: (1) undefined/null property access in render, (2) invalid hook call order, (3) missing key in list

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorScreen from '../ui/ErrorScreen';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorScreen 
          error={this.state.error || undefined} 
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
