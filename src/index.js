import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from '../src/data-context-provider/DataContextProvider';

ReactDOM.render(
  <DataContextProvider>
    <Router>
      <App />
    </Router>
  </DataContextProvider>,

  document.getElementById("root")
);
