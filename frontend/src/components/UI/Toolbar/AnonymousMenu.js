import React from 'react';
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => (
	<>

		<div className="btn-group" role="group">
			<button type="button" className="btn bg-warning">
				<NavLink className="nav-link text-white" to="register">Регистрация</NavLink>
			</button>

			<button type="button" className="btn btn-secondary">
				<NavLink className="nav-link text-white" to="/">Войти</NavLink>
			</button>
		</div>
	</>
);

export default AnonymousMenu;