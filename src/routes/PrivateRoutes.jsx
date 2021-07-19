import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userManagement } from "../data-context-provider/DataContextProvider";

export const PrivateRoute = ({ Component, ...rest }) => {
  let user = React.useContext(userManagement);
  let { isAuth } = user;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
