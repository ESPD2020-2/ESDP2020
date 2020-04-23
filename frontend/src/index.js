import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import store, {history} from './store/configureStore';


const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));