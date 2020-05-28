import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../../store/actions/usersActions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {toggleDrawer} from "../../../store/actions/mainActions";
import Button from "@material-ui/core/Button";
import {links} from "../../../constants";
import ShowTo from '../../../hoc/ShowTo';


const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: '30px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  temporarily: {
    marginRight: '30px',
  },
  pageLink: {
    padding: '0 10px'
  },
  drawer: {
    [theme.breakpoints.down('md')]: {
      display: "none"
    },
  },
  navLink: {
    '&:hover': {
      color: 'inherit'
    },
  },
}));


const AppToolbar = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => dispatch(toggleDrawer())}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.mainLink}>Delivery</NavLink>
          </Typography>
          <ShowTo user={user} role='user'>
            <nav className={classes.drawer}>
              {links.map((el, i) => (
                <Button key={i} className={classes.navLink} color="inherit" component={NavLink} to={el.path}>{el.name}</Button>
              ))}
            </nav>
          </ShowTo>
          {user ? (
            <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
          ) : (
            <AnonymousMenu/>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  );
};

export default AppToolbar;