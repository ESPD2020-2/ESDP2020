import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const RoutesAuthorization = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
    </Switch>
  );
};

export default RoutesAuthorization;