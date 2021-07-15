import React from "react";
import { Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { HomePage } from "../pages/homepage/HomePage";

function Routes() {
  return (
    <div>
      <Route path="/" render={() => <Header />} />
      {/* <Route path="/" render={() => <HomePage />} /> */}
    </div>
  );
}

export { Routes };
