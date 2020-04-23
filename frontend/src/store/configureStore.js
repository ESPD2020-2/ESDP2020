import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

export default store;