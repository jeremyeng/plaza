import React from "react";
import ReactDOM from "react-dom";

import { ErrorBoundary } from "components/error_boundary";

function onDOMReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}

function buildWithDataProps(selector, ReactComponent, baseProps) {
  const el = document.querySelector(selector);
  const props = Object.keys(el.dataset).reduce((hash, key) => {
    const boolRegex = /^(true|false)/;
    const parseRegex = /^[[{]/;
    const numberRegex = /^[+-]?\d+(\.\d+)?$/;
    if (boolRegex.test(el.dataset[key])) {
      hash[key] = el.dataset[key] === "true";
    } else if (parseRegex.test(el.dataset[key])) {
      hash[key] = JSON.parse(el.dataset[key]);
    } else if (numberRegex.test(el.dataset[key])) {
      hash[key] = parseFloat(el.dataset[key]);
    } else {
      hash[key] = el.dataset[key];
    }
    return hash;
  }, baseProps);

  return <ReactComponent {...props} />;
}

function safeMount(selector, reactInstance) {
  const el = document.querySelector(selector);
  if (!el) {
    return;
  }

  const appName = reactInstance.type.displayName || reactInstance.type.name;
  const errorBoundaryWrappedReactInstance = (
    <ErrorBoundary appName={appName}>{reactInstance}</ErrorBoundary>
  );

  ReactDOM.render(errorBoundaryWrappedReactInstance, el); // # ignore - this is the only place we should be using `ReactDOM.render`. Everywhere else should call into this file.
}

export function mount(selector, reactInstance) {
  onDOMReady(() => safeMount(selector, reactInstance));
}

export function mountComponentWithDataProps(selector, ReactComponent, baseProps = {}) {
  onDOMReady(() => {
    const reactInstance = buildWithDataProps(selector, ReactComponent, baseProps);
    safeMount(selector, reactInstance);
  });
}
