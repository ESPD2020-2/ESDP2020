import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlertDialog from '../UI/Dialog/AlertDialog';
import {publishOrder, removeOrder, acceptOrder} from '../../store/actions/ordersActions';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import {history} from '../../store/configureStore';

const ITEM_HEIGHT = 48;

const OrderOperationsMenu = ({id}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const publishOrderHandler = () => {
    setAnchorEl(null);
    dispatch(publishOrder(id));
  };

  const removeOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
  };

  const editOrderHandler = () => {
    setAnchorEl(null);
    dispatch(push(`/orders/${id}/edit`));
  };

  const acceptOrderHandler = () => {
    setAnchorEl(null);
    dispatch(acceptOrder(id));
  };

  return (
    <div>
      <AlertDialog open={openAlert} handleClose={() => setOpenAlert(false)} removeOrder={() => dispatch(removeOrder(id))}/>
      <IconButton
        size='small'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {history.location.pathname === '/adm/orders/created' && (
          <span>
            <MenuItem onClick={publishOrderHandler}>Опубликовать</MenuItem>
            <MenuItem onClick={editOrderHandler}>Редактировать</MenuItem>
            <MenuItem onClick={removeOrderHandler}>Удалить</MenuItem>
          </span>
        )}

        {history.location.pathname === '/adm/orders/published' && (
          <span>
            <MenuItem onClick={acceptOrderHandler}>Принять</MenuItem>
            {/* <MenuItem onClick={removeOrderHandler}>Отказаться</MenuItem> */}
          </span>
        )}
      </Menu>
    </div>
  );
}

export default OrderOperationsMenu;