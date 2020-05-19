import React from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "../containers/Orders/Orders";

const AdminRoutes = ({path}) => {
  return (
    <Switch>
      <Route path={`${path}/orders/created`} component={Orders} />
      <Route path={`${path}/orders/published`} component={Orders} />
    </Switch>
  );
};

export default AdminRoutes;