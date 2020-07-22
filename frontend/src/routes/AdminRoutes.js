import React from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "../containers/Orders/Orders";
import Users from "../containers/Users/Users";
import CourierTrecking from "../containers/Maps/CourierTrecking";
import Dashboard from "../containers/Dashboard/Dashboard";
import NotFound from "../containers/NotFound/NotFound";
import Notifications from "../containers/Notifications/Notifications";

const AdminRoutes = ({ path }) => {
  return (
    <Switch>
      <Route path={`${path}/orders/created`} exact component={Orders} />
      <Route path={`${path}/orders/published`} exact component={Orders} />
      <Route path={`${path}/orders/accepted`} exact component={Orders} />
      <Route path={`${path}/orders/courier/accepted`} exact component={Orders}/>
      <Route path={`${path}/notifications`} exact component={Notifications} />
      <Route path={`${path}/users`} exact component={Users} />
      <Route path={`${path}/trecking`} exact component={CourierTrecking} />
      <Route path={`${path}/`} exact component={Dashboard} />
      <Route render={() => <NotFound type="adm" />} />
    </Switch>
  );
};

export default AdminRoutes;
