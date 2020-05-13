import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import store, {history} from './store/configureStore';

import App from './App';
import 'react-toastify/dist/ReactToastify.css';



const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));