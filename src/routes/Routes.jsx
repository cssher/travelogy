import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { HomePage } from "../pages/homepage/HomePage";

function Routes() {
  return (
    <div>
      <Route path="/" render={() => <Header />} />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
      </Switch>
    </div>
  );
}

export { Routes };
