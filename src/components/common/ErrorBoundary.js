import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing
          the page or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to your error reporting service
        console.error('Error caught by boundary:', error, errorInfo);

        // You can send this to your error reporting service
        // Example: Sentry.captureException(error, { extra: errorInfo });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
