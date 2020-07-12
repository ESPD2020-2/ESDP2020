import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import store, {history} from './store/configureStore';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';



const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
				<App/>
		</ConnectedRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));