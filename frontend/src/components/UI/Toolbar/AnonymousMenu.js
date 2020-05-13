import React from 'react';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(( )=> ({
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  }
}));

const AnonymousMenu = () => {
  const classes = useStyles();
  return (
    <>
      <Button className={classes.navLink} color="inherit" component={NavLink} to="/register">Sign Up</Button>
      <Button className={classes.navLink} color="inherit" component={NavLink} to="/login">Login</Button>
    </>
  );
}
export default AnonymousMenu;