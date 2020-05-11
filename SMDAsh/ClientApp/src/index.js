import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

export const getRoutes = (store) => {
  return (
    <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/import-data" />
    </Switch>
  );
}
ReactDOM.render(
  <Provider store={store}>
    <Router  history={hist}>
    { getRoutes(store) }
    </Router>
  </Provider>,
  document.getElementById("root")
);