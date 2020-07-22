import React from 'react';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
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
      display: 'none'
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
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
      </nav>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default DrawerLayout;