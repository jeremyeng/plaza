import React from "react";
import PropTypes from "prop-types";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // shouldReportError() {
  //   if (!window.Rollbar) {
  //     // Don't report error if Rollbar is not available/initialized
  //     return false;
  //   }

  //   if (window.BrowserSupported) {
  //     // If our BrowserSupported utility is availabe, check that this browser is supported.
  //     // Don't report errors for unsupported browsers if we know that they are unsupported.
  //     return window.BrowserSupported.supported();
  //   }

  //   return true;
  // }

  componentDidCatch(error, errorInfo) {
    // TODO: integrate with actual error reporting service
    // Report to Rollbar if configured/loaded, otherwise log to console for development.
    // if (this.shouldReportError()) {
    //   const appName = this.props.appName;
    //   Rollbar.error(`[${error.name}] ${error.message}`, { appName, error, errorInfo });
    // }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Whoops! Something went wrong</h1>
          <p>We've logged the problem and are currently fixing it</p>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  appName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
