import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Orders from './containers/Orders/Orders';
import Contacts from "./containers/Contacts/Contacts";
import Faq from "./containers/FAQ/FAQ";

const Routes = () => {
    return (
        <Switch>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path="/faq" exact component={Faq}/>
        </Switch>
    );
};

export default Routes;