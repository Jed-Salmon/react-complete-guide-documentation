import React from "react";
import ReactDOM from "react-dom";
// provider is a component
import { Provider } from "react-redux";
import store from "./store/index";
// Should only have one store, but can mix redux and context api.
// Redux is better suited for managing state that rapidly changes.
import "./index.css";
import App from "./App";

ReactDOM.render(
  // The provider will give the wrapped component (and its children) access to redux store and subsequently subscribe to the data (get), and can also dispatch actions.
  <Provider store={store}>
    {/* Provider expects a store prop */}
    <App />
  </Provider>,
  document.getElementById("root")
);
