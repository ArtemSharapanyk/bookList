import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/Alert/Alert';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong!</AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
