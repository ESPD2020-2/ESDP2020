import React, {useState} from 'react';
import {Link} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const UserMenu = ({user, logout}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <ListItem disabled>Hello, {user.firstName || user.username}!</ListItem>
        <Divider/>
        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;