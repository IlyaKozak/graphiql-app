import React, { ErrorInfo, ReactElement, ReactNode } from 'react';

import classes from './ErrorBoundary.module.css';

interface Props {
  children?: ReactNode;
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    return { error, errorInfo };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main className={classes.main}>
          <div className={classes.headers}>
            <h1 className={classes.errorCode}>Oops, there is an error!</h1>
            <h2 className={classes.errorMessage}>{this.state.error?.message}</h2>
          </div>
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
