import React from "react";
import {Route, Switch} from "react-router-dom";
import NewOrder from "../containers/NewOrder/NewOrder";
import FAQ from "../containers/FAQ/FAQ";
import Contacts from "../containers/Contacts/Contacts";
import About from "../containers/About/About";
import ForCouriers from "../containers/ForCouriers/forCouriers";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import NotFound from "../containers/NotFound/NotFound";

const Routes = () => {
    return (
        <Switch>
            <Route path="/add-order" exact component={NewOrder}/>
            <Route path="/orders/:id/edit" exact component={NewOrder}/>
            <Route path="/faq" exact component={FAQ}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path="/couriers" exact component={ForCouriers}/>
            <Route path='/about' exact component={About}/>
            <Route path='/review-form' exact component={ReviewForm}/>
            <Route path='/' exact render={() => <h1>Main Page</h1>}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default Routes;
