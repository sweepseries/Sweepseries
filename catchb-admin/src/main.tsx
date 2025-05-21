import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "./01.app/App";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
} else {
  axios.defaults.baseURL = "http://localhost:8000";
}
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  return config;
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
