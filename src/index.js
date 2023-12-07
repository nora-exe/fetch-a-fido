import React from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import './index.css';

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);

/**
 * basic setup
 * import react, dom client, app, fonts, link stylesheet
 * creating root element, binding DOM to root, rendering app on root
 */
