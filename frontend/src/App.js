import React from "react";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Routes from "./routes/Routes";
import {ToastContainer} from "react-toastify";
import CarouselReviews from "./components/CarouselReviews/CarouselReviews";

const App = () => {
	return (
		<>
			<ToastContainer autoClose={3000} />
			<Toolbar />
			{/*<CarouselReviews/>*/}
			<Routes />
		</>
	);
};

export default App;
