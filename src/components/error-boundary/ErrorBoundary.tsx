import * as React from "react";

export interface ErrorBoundaryState {
    hasError: boolean;
}
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    public state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(_error: Error, _info: React.ErrorInfo) {
        // e.g. logErrorToMyService(error, info);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }
