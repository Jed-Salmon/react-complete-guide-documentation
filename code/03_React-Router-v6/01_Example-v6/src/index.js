import ReactDOM from "react-dom";
// We still import and use BrowserRouter in v6
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  // Still must wrap BrowserRouter around App/Components that use routing.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
