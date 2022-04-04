import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateHOC = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("jwt-token") === null) {
          return (
            <Navigate
              to={{ pathname: "/", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateHOC;
