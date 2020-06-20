import React, {useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ReconnectingWebSocket from 'reconnecting-websocket';

const env = process.env.REACT_APP_ENV;

let getLocation;
const options = {
  connectionTimeout: 1000,
  maxReconnectionDelay: 5000,
  maxRetries: 2,
};

const UserMenu = ({user, logout}) => {
  const ws = useRef({});
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    logout();
    if (user.role !== 'user'&& user.role === 'courier') {
      stopWorkHandler();
      ws.current.close();
    }
    
  };

  const getToWorkHandler = () => {
    handleClose();
    navigator.geolocation.getCurrentPosition(success, error)
    localStorage.setItem('onDuty', '1');
    getLocation = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error)
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
    await ws.current.send(JSON.stringify(data))
  }

  const success = async (position) => {
    const data = {
      type: 'REFRESH_GEODATA',
      geoData : {
      lat: position.coords.latitude, 
      lon: position.coords.longitude, 
      datetime:''
      }
    }
    await ws.current.send(JSON.stringify(data))
  }
  
  const error = (err) => console.log(err);

  useEffect(() => {
    const isDuty = localStorage.getItem('onDuty');
      if (isDuty === '1') {
        getToWorkHandler();
      } 
      if (user && user.role !== 'user') {
        let url = `ws://localhost:8000/users/couriers?Token=${user.token}`
        if (env === 'production') {
          url = `http://deliveryforall.sytes.net/api/users/couriers?Token=${user.token}`
        }
        ws.current = new ReconnectingWebSocket(url, [], options);
      }
      ws.current.onmessage = (couriers) => {
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
        <ListItem disabled>Привет, {user.customer ? user.customer.name : user.username}!</ListItem>
        <Divider/>
        {user.role === 'courier' && (
          <span>
            <MenuItem onClick={handleClose} component={Link} to="/adm/orders/courier/accepted">Мои заказы</MenuItem>
            <MenuItem onClick={getToWorkHandler}>Заступить на смену</MenuItem>
            <MenuItem onClick={stopWorkHandler}>Завершить смену</MenuItem>
          </span>
        )}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;