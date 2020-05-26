import React from 'react';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {toggleDrawer} from "../../../store/actions/mainActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));


const DrawerLayout = ({children, drawerContent}) => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(state => state.main.drawerOpen);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden xsUp implementation="css">
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => dispatch(toggleDrawer())}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Toolbar/>
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default DrawerLayout;