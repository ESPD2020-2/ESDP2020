import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import NewOrder from "../containers/NewOrder/NewOrder";
// import Home from "../containers/Home/Home";

const Routes = () => {

  return (
    <Switch>
        <Route path="/register/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/adm" component={AdminLayout} />
        <Route path="/add-order" component={NewOrder} />
    </Switch>
  );
};

export default Routes;
