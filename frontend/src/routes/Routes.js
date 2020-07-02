import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import AdminLayout from "../containers/Layouts/AdminLayout";
import MainLayout from "../containers/Layouts/MainLayout";
import NotFound from "../containers/NotFound/NotFound";

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/" />;

const Routes = () => {
  const user = useSelector((state) => state.users.user);
  return (
    <Switch>
      <Route path="/register/" exact component={Register} />
      <Route path="/login" exact component={Login} />
        <Route path="/" exact component={MainLayout } />
      <ProtectedRoute isAllowed={user && ['super_admin', 'admin', 'operator', 'courier'].includes(user.role)} path="/adm" component={AdminLayout} />
        <Route render={() => <NotFound/>} />
    </Switch>
  );
};

export default Routes;
