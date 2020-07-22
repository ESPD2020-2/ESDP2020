import React from "react";
import {Route, Switch} from "react-router-dom";
import NewOrder from "../containers/NewOrder/NewOrder";
import Contacts from "../containers/Contacts/Contacts";
import AboutUs from "../containers/About/AboutUs";
import NotFound from "../containers/NotFound/NotFound";
import FAQ from "../containers/FAQ/FAQ";
import Reviews from "../containers/Reviews/Reviews";
import NewReview from "../containers/NewReview/NewReview";


const Routes = () => {
    return (
        <Switch>
            <Route path="/add-order" exact component={NewOrder}/>
            <Route path="/orders/:id/edit" exact component={NewOrder}/>
            <Route path="/faq" exact component={FAQ}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path='/reviews' exact component={Reviews}/>
            <Route path='/add-review' exact component={NewReview}/>
            <Route path='/' exact component={AboutUs}/>
            <Route render={() => <NotFound/>}/>
        </Switch>
    );
};

export default Routes;
