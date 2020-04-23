import React from 'react';
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => (
	<>
		<ul className="navbar-nav ml-auto">
			<li className="nav-item h5">
				<NavLink className="nav-link" to="register">Sign up</NavLink>
			</li>
			<li className="nav-item h5">
				<NavLink className="nav-link" to="login">Login</NavLink>
			</li>
		</ul>
	</>
);

export default AnonymousMenu;