import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import Register from "../containers/Register/Register";
import Login from "../containers/Login/Login";
import NewOrder from "../containers/NewOrder/NewOrder";
import FAQ from "../containers/FAQ/FAQ";
import Contacts from "../containers/Contacts/Contacts";
import AddProduct from "../containers/AddMedicine/AddMedicine";
import Pharmacy from "../containers/Pharmacy/Pharmacy";
import About from "../containers/About/About";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import ForCouriers from "../containers/ForCouriers/forCouriers";
import AdminLayout from "../containers/Layouts/AdminLayout";
import MainLayout from "../containers/Layouts/MainLayout";


const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);
  return (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/add-order" component={NewOrder} />
        <Route path="/orders/:id/edit" exact component={NewOrder} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contacts" component={ Contacts} />
        <Route path="/add-pharmacy" component={ AddProduct} />
        <Route path="/pharmacy" component={ Pharmacy} />
        <Route path="/couriers" component={ForCouriers}/>
        <Route path='/about' component={About}/>
        <Route path='/review-form' component={ReviewForm} />
        <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'operator' || user.role === 'courier')} path="/adm" component={AdminLayout} />
        <Route path="/" component={MainLayout } />
        <Route render={() => <h1>Not found</h1>} />
    </Switch>
  );
};

export default Routes;
