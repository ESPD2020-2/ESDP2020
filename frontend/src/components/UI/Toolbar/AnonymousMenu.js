import React from 'react';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(( )=> ({
  navLink: {
    '&:hover': {
      color: 'inherit'
    }
  },
}));

const AnonymousMenu = () => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.navLink} color="inherit" component={NavLink} to="/login">Войти</Button>
  );
}
export default AnonymousMenu;