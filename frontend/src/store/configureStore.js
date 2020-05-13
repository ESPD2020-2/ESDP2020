import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import ordersReducer from "./reducers/ordersReducer";
import mainReducer from "./reducers/mainReducer";
import streetsReducer from "./reducers/streetsReducer";
import customersReducer from "./reducers/customersReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  users: usersReducer,
  customers: customersReducer,
  ord: ordersReducer,
  street: streetsReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;







