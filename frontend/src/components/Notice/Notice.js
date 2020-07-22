import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import moment from "moment";
import "moment/locale/ru";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  noticeBody: {
    padding: 10, 
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0'
    }
  },
  noticeFixWidth: {
    padding: 10, 
    minWidth: 280, 
    width: 450
  }
}));

const Notice = ({author, createdAt, message}) => {
  const classes = useStyles();
  const path = useSelector(state => state.router.location.pathname);

  return (
    <Paper elevation={2} className={path === '/adm/notifications' ? classes.noticeBody : classes.noticeFixWidth}>
      <Grid container direction='column'>
        <Grid item container justify='space-between'>
          <small><b>{author}</b></small>
          <small style={{color: '#adadad'}}>{moment(createdAt).calendar()}</small>
        </Grid>
        <Grid item xs>
          <Divider style={{marginBottom: 10}}/>
        </Grid>
        <Grid item xs>
          {message}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Notice;