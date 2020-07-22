import React from "react";
import {Route, Switch} from "react-router-dom";
import NewOrder from "../containers/NewOrder/NewOrder";
import Contacts from "../containers/Contacts/Contacts";
import About from "../containers/About/About";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import NotFound from "../containers/NotFound/NotFound";
import FAQ from "../containers/FAQ/FAQ";
import AboutUs from "../containers/About/AboutUs";


const Routes = () => {
    return (
        <Switch>
            <Route path="/add-order" exact component={NewOrder}/>
            <Route path="/orders/:id/edit" exact component={NewOrder}/>
            <Route path="/faq" exact component={FAQ}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path='/review-form' exact component={ReviewForm}/>
            <Route path='/' exact component={AboutUs}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default Routes;
