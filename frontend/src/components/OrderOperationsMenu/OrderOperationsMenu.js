import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router';
import {history} from '../../store/configureStore';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import ReasonDialog from '../UI/Dialog/ReasonDialog';
import {publishOrder, removeOrder, acceptOrder, rejectOrder, cancelOrder, deliveredOrder, transferToCourier, addInfoOrder} from '../../store/actions/ordersActions';

const ITEM_HEIGHT = 48;

const OrderOperationsMenu = ({id, status}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [action, setAction] = React.useState('');
  const open = Boolean(anchorEl);
  const couriers = useSelector(state => state.users.couriers)
  const user = useSelector(state => state.users.user)
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
    setAction('remove');
  };

  const editOrderHandler = () => {
    setAnchorEl(null);
    dispatch(push(`/orders/${id}/edit`));
  };

  const acceptOrderHandler = () => {
    setAnchorEl(null);
    dispatch(acceptOrder(id));
  };

  const rejectOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('reject')
  };

  const cancelOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('cancel')
  };

  const transferToCourierHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('transfer')
  };

  const addInfoHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('addInfo')
  };

  const deliveredOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('delivered');
  };

  return (
    <div>
      <ReasonDialog 
        open={openAlert} 
        action={action}
        couriers={couriers}
        author={user.username}
        handleClose={() => setOpenAlert(false)}
        removeOrder={() => dispatch(removeOrder(id))}
        transferOrder={(courier) => dispatch(transferToCourier(id, courier))}
        addInfo={(info) => dispatch(addInfoOrder(id, info))}
        rejectOrder={(reason) => dispatch(rejectOrder(id, reason))}
        cancelOrder={(reason) => dispatch(cancelOrder(id, reason))}
        deliveredOrder={(comment) => dispatch(deliveredOrder(id, comment, user._id))}
      />
      <IconButton
        size='small'
        onClick={handleClick}
        disabled={history.location.pathname === '/adm/orders/accepted'&&user.role !=='super_admin'}
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
            <MenuItem disabled={status==='canceled'} onClick={addInfoHandler}>Добавить доп. инфо</MenuItem>
            <MenuItem disabled={status==='canceled'} onClick={publishOrderHandler}>Опубликовать</MenuItem>
            <MenuItem disabled={status==='canceled'} onClick={transferToCourierHandler}>Передать курьеру</MenuItem>
            <MenuItem disabled={status==='canceled'} onClick={editOrderHandler}>Редактрировать</MenuItem>
            {status==='rejected' && ( <MenuItem onClick={cancelOrderHandler}>Отменить</MenuItem>)}
            <MenuItem disabled={status==='canceled'} onClick={removeOrderHandler}>Удалить</MenuItem>
          </span>
        )}

        {history.location.pathname === '/adm/orders/published' && (
          <span>
            <MenuItem disabled={user.role !== 'courier'} onClick={acceptOrderHandler}>Принять</MenuItem>
          </span>
        )}
        {history.location.pathname === '/adm/orders/accepted' || history.location.pathname === '/adm/orders/courier/accepted' ? (
          <span>
            <MenuItem onClick={rejectOrderHandler}>Отказаться</MenuItem>
            <MenuItem onClick={deliveredOrderHandler}>Доставлен</MenuItem>
          </span>
        ) : (
          null
        )}
      </Menu>
    </div>
  );
}

export default OrderOperationsMenu;