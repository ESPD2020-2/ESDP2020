import React from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "../containers/Orders/Orders";
import Users from "../containers/Users/Users";
import CourierTrecking from "../containers/Maps/CourierTrecking";
import Dashboard from "../containers/Dashboard/Dashboard";

const AdminRoutes = ({ path }) => {
  return (
    <Switch>
      <Route path={`${path}/orders/created`} exact component={Orders} />
      <Route path={`${path}/orders/published`} exact component={Orders} />
      <Route path={`${path}/orders/accepted`} exact component={Orders} />
      <Route path={`${path}/orders/courier/accepted`} component={Orders} />
      <Route path={`${path}/users`} exact component={Users} />
      <Route path={`${path}/trecking`} exact component={CourierTrecking} />
      <Route path={`${path}/`} exact component={Dashboard} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  );
};

export default AdminRoutes;
