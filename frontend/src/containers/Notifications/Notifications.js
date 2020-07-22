import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import { getNotifications, setNotificationsWasRead } from "../../store/actions/notificationsActions";
import Notice from '../../components/Notice/Notice';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && index === 0 ? (
        <Grid container justify='flex-start'>
          {children}
        </Grid>
      ) : (
        <Grid container justify='flex-end'>
        {children}
      </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const indProps = (index) => ({id: `tabpanel-${index}`});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  noticeBody: {
    padding: 10, 
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0'
    }
  }
}));

const Notifications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const read = useSelector(state => state.notifications.notifications);
  const unread = useSelector(state => state.notifications.newNotifications);
  
  useEffect(() => {
    dispatch(getNotifications())
  },[dispatch]);
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Прочитанные"  icon={<DraftsOutlinedIcon />} {...indProps(0)} />
          <Tab label="Непрочитанные" icon={<MailOutlinedIcon />} {...indProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {read&&read.length>0 ? (
        <Grid item xs md={6}>
          {read.map(el => (
            <Notice 
              key={el._id}
              author={el.user.username}
              createdAt={el.createdAt}
              message={el.message}
              disabledList
            />
          ))}
         </Grid>
      ) : (
        <Grid item xs style={{margin: 20}}>
          <Typography variant='body2' align='center'>
            Нет прочитанных сообщений
          </Typography>
        </Grid>
      )}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {unread&&unread.length>0 ? (
        <Grid item xs md={6}>
          {unread&&unread.map(el => (
            <Notice 
              key={el._id}
              author={el.user.username}
              createdAt={el.createdAt}
              message={el.message}
            />
          ))}
          {unread&&unread.length> 0 && (
            <div style={{textAlign: 'center'}}>
              <Button 
              variant="contained" 
              color='primary' 
              onClick={() => dispatch(setNotificationsWasRead())}
              >
                Пометить как прочитанные
              </Button>
            </div>
          )}
        </Grid>
      ) : (
      <Grid item xs style={{margin: 20}}>
        <Typography variant='body2' align='center'>
          Нет непрочитанных сообщений
        </Typography>
      </Grid>
      )}
      </TabPanel>
    </div>
   
  );
}

export default Notifications;
