import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RealmAppProvider } from "./realm/RealmApp";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "react-avatar";
const RealmAppId = process.env["REACT_APP_REALM_APP_DEV"];
ReactDOM.render(
  <React.StrictMode>
    <RealmAppProvider appId={RealmAppId}>
      <Provider store={store}>
        <ConfigProvider
          colors={["#2C6BAC", "#0046A6", "#093552", "#000d74", "#41516C"]}
        >
          <Router>
            <App />
          </Router>
        </ConfigProvider>
      </Provider>
    </RealmAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
