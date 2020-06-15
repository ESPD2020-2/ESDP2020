import React from "react";
import {Route, Switch} from "react-router-dom";
import NewOrder from "../containers/NewOrder/NewOrder";
import FAQ from "../containers/FAQ/FAQ";
import Contacts from "../containers/Contacts/Contacts";
import About from "../containers/About/About";
import ForCouriers from "../containers/ForCouriers/forCouriers";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import TestSubject from "../containers/TestSubject/TestSubject";

const Routes = () => {
  return (
    <Switch>
        <Route path="/add-order" component={NewOrder} />
        <Route path="/orders/:id/edit" exact component={NewOrder} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contacts" component={ Contacts} />
        <Route path="/couriers" component={ForCouriers}/>
        <Route path='/about' component={About}/>
        <Route path='/review-form' component={ReviewForm} />
        <Route path='/testSubject' component={TestSubject}/>
    </Switch>
  );
};

export default Routes;
