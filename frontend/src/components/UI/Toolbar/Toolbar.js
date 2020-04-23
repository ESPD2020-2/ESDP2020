import React from 'react';
import {NavLink} from 'react-router-dom';
import AnonymousMenu from "./AnonymousMenu";

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/"><h3>Delivery</h3></NavLink>

      <div className="collapse navbar-collapse ">
        <AnonymousMenu />

      </div>
    </nav>
  );
};

export default Toolbar;