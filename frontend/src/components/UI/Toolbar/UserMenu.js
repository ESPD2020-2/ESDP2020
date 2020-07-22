import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SocketContext from '../../../socetContext';
import { getNewNotifications } from "../../../store/actions/notificationsActions";

let getLocation;

const UserMenu = ({user, logout, ws}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    if (user.role === 'courier') {
      stopWorkHandler();
    }
    if (user.role !== 'user') {
      ws.close();
    }
    logout();
  };

  const getToWorkHandler = () => {

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    handleClose();
    navigator.geolocation.getCurrentPosition(success, error, options)
    localStorage.setItem('onDuty', '1');
    getLocation = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error, options)
    }, 9000)
  }

  const stopWorkHandler = async () => {
    handleClose();
    clearInterval(getLocation);
    localStorage.setItem('onDuty', '0');
    const data = {
      type: 'REFRESH_GEODATA',
      geoData : null
    }
    await ws.send(JSON.stringify(data))
  }

  const success = async (position) => {
    const data = {
      type: 'REFRESH_GEODATA',
      geoData : {
        lat: position.coords.latitude, 
        lon: position.coords.longitude,
      }
    }
    await ws.send(JSON.stringify(data))
  }
  
  const error = (err) => console.log(err);

  useEffect(() => {
    const isDuty = localStorage.getItem('onDuty');
      if (isDuty === '1') {
        getToWorkHandler();
      } 
      dispatch(getNewNotifications())
      if (user && user.role !== 'user') {
        ws.onmessage = (couriers) => {
          try {
            const data = JSON.parse(couriers.data);
            
            switch (data.type) {
              case 'GET_COURIERS_SUCCESS':
                dispatch(data)
                break;
              case 'AUTHENTICATION_ERROR':
                toast.error(data.error);
                break;
              default: 
                console.log('default')
            }
          } catch (e) {
            console.log('Something went wrong', e);
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <AccountCircleOutlinedIcon/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListItem disabled>Здравствуйте, {user.customer ? `${user.customer.surname} ${user.customer.name}` : user.displayName || user.username}!</ListItem>
        <Divider/>
        {user.role === 'courier' && (
          <span>
            <MenuItem onClick={handleClose} component={Link} to="/adm/orders/courier/accepted">Мои заказы</MenuItem>
            <MenuItem onClick={localStorage.getItem('onDuty') === '1' ? stopWorkHandler : getToWorkHandler}>{localStorage.getItem('onDuty') === '1' ? 'Завершить смену' : 'Заступить на смену'}</MenuItem>
          </span>
        )}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const UserMenuWithWS = props => (
  <SocketContext.Consumer>
  {ws => <UserMenu {...props} ws={ws} />}
  </SocketContext.Consumer>
)

export default UserMenuWithWS;