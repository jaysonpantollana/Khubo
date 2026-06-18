// @context: Global error boundary
// @purpose: Class component that catches unhandled React errors and displays ErrorScreen fallback UI
// @behavior: getDerivedStateFromError → sets hasError=true, error object
// @behavior: componentDidCatch → logs to console (extensible for external error reporting)
// @behavior: handleRetry → resets state to false, calls optional onReset prop
// @behavior: handleGoHome → resets state + navigates to #/
// @behavior: Supports custom fallback prop; defaults to <ErrorScreen> with retry + goHome
// @performance: Only renders fallback when error state is active (no overhead during normal operation)
// @side-effects: console.error in componentDidCatch; hash navigation in handleGoHome
// @dependencies: ui/ErrorScreen.tsx
// @owner: Core team

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
