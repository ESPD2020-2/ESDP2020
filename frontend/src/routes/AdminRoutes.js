import React from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "../containers/Orders/Orders";

const AdminRoutes = ({path}) => {
 
  return (
    <Switch>
      <Route path={`${path}/orders/created`} exact component={Orders} />
      <Route path={`${path}/orders/published`} exact component={Orders} />
    </Switch>
  );
};

export default AdminRoutes;