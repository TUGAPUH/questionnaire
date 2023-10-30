import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Firebase/firebaseInit";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/questionnaire/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
