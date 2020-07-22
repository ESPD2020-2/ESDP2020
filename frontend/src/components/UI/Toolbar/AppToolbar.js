import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import NotificationsIcon from '@material-ui/icons/Notifications';
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import Notice from "../../Notice/Notice";
import { setNotificationsWasRead } from "../../../store/actions/notificationsActions";
import { logoutUser } from "../../../store/actions/usersActions";
import { toggleDrawer } from "../../../store/actions/mainActions";
import ShowTo from "../../../hoc/ShowTo";
import { links } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: "30px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  mainLink: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  temporarily: {
    marginRight: "30px",
  },
  pageLink: {
    padding: "0 10px",
  },
  drawer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  navLink: {
    "&:hover": {
      color: "inherit",
    },
  },
}));

const AppToolbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.users.user);
  const notice = useSelector(state => state.notifications.newNotifications);
  const path = useSelector(state => state.router.location.pathname);
  const handleClick = (e) => setAnchorEl(e.currentTarget);

  const handleClose = async () => {
    if (notice.length > 0) {
      await dispatch(setNotificationsWasRead());
    }
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => dispatch(toggleDrawer())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink
              to={user && user.role !== "user" ? "/adm" : "/"}
              className={classes.mainLink}
            >
              Delivery
            </NavLink>
          </Typography>
          <ShowTo user={user} role="user">
            <nav className={classes.drawer}>
              {links.map((el, i) => (
                <Button
                  key={i}
                  className={classes.navLink}
                  color="inherit"
                  component={NavLink}
                  to={el.path}
                >
                  {el.name}
                </Button>
              ))}
            </nav>
          </ShowTo>
          {user&&user.role !== 'user' &&  (
            <>
              <IconButton color="inherit" disabled={path === '/adm/notifications'} onClick={handleClick}>
                <Badge badgeContent={notice && notice.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>      
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <List>
                  {notice&&notice.map(el => (
                    <ListItem key={el._id}>
                      <Notice 
                        author={el.user.username}
                        createdAt={el.createdAt}
                        message={el.message}
                      />  
                    </ListItem> 
                  ))}
                  <ListItem>
                    <MenuItem 
                      component={NavLink}
                      to={`/adm/notifications`}
                      style={{width: '100%', display: 'block', textAlign: 'center'}}
                      className={classes.navLink}
                      onClick={() => setAnchorEl(null)}
                    >
                        Посмотреть все уведомления
                    </MenuItem>
                  </ListItem>
                </List>
              </Menu>
            </>
          )}
          {user ? (
            <UserMenu user={user} logout={() => dispatch(logoutUser())} />
          ) : (
            <AnonymousMenu />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppToolbar;
