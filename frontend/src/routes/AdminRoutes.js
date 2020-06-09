import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Orders from "../containers/Orders/Orders";
import Users from "../containers/Users/Users";


const AdminRoutes = ({path}) => {
  const username = useSelector(state => state.users.user.username);
  return (
    <Switch>
      <Route path={`${path}/orders/created`} exact component={Orders} />
      <Route path={`${path}/orders/published`} exact component={Orders} />
      <Route path={`${path}/orders/accepted`} exact component={Orders} />
      <Route path={`${path}/orders/courier/accepted`} component={Orders} />
      <Route path={`${path}/users`} exact component={Users} />
      <Route path={`${path}/`}render={() => <h1>Добро пожаловать, {username}!</h1>} />
    </Switch>
  );
};

export default AdminRoutes;