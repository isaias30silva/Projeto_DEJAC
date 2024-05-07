import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/usuario" component={App} />
        <Route path="/administrador" component={App} />
      </Switch>
    </Router>
  );
};

export default Routes;
