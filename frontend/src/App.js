import React from "react";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Routes from "./routes/Routes";
import {ToastContainer} from "react-toastify";

const App = () => {

	return (
		<>
			<ToastContainer autoClose={3000} />
			<Toolbar />
			<Routes />
		</>
	);
};

export default App;
