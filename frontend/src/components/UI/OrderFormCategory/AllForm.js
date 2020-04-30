import React from 'react';
import {Route, Switch} from "react-router-dom";
import LocationForm from "./LocationForm";
import GruzForm from "./GruzForm";
import ClientForm from "./ClientForm";

const AllForm = () => {
  return (
    <Switch>
      <Route path="/" exact component={LocationForm}/>
      <Route path="/gruz" exact component={GruzForm}/>
      <Route path="/clientcontact" exact component={ClientForm}/>
    </Switch>
  );
};

export default AllForm;