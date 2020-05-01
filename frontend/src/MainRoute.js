import React from 'react';
import {Route, Switch} from "react-router-dom";
import FormOrder from "./containers/FormOrder/FormOrder";
import MainPage from "./components/UI/MainSection/MainPage";

const MainRoute = () => {
  return (
    <Switch>
      <Route path="/cargoform" exact component={FormOrder}/>
      <Route path="/" exact component={MainPage}/>
    </Switch>
  );
};

export default MainRoute;