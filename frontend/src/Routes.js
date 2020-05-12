import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ForCouriers from "./containers/ForCouriers/ForCouriers";

const Routes = () => {
    return (
        <Switch>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/forCouriers" exact component={ForCouriers}/>
        </Switch>
    );
};

export default Routes;