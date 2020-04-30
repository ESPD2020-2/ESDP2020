import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import FormOrder from "./containers/FormOrder/FormOrder";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={FormOrder}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
    </Switch>
  );
};

export default Routes;