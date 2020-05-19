import React from "react";
import {Route, Switch} from "react-router-dom";
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import NewOrder from "../containers/NewOrder/NewOrder";
import FAQ from "../containers/FAQ/FAQ";
import Contacts from "../containers/Contacts/Contacts";
import About from "../containers/About/About";
<<<<<<< HEAD
import ReviewForm from "../components/ReviewForm/ReviewForm";
=======
import ForCouriers from "../containers/ForCouriers/forCouriers";
>>>>>>> development

const Routes = () => {

  return (
    <Switch>
        <Route path="/register/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/adm" component={AdminLayout} />
        <Route path="/add-order" component={NewOrder} />
        <Route path="/orders/:id/edit" exact component={NewOrder} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contacts" component={ Contacts} />
        <Route path="/couriers" component={ForCouriers}/>
        <Route path='/about' component={About}/>
        <Route path='/review-form' component={ReviewForm} />
    </Switch>
  );
};

export default Routes;
