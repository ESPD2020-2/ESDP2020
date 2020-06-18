import React from "react";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import Routes from "./routes/Routes";
import {ToastContainer} from "react-toastify";

const App = () => {

	return (
		<>
			<ToastContainer autoClose={3000} />
			<AppToolbar />
			<Routes />
		</>
	);
};

export default App;
