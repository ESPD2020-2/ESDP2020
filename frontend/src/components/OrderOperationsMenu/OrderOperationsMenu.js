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
import {editCustomer} from '../../store/actions/customersActions';
import { getCouriers } from '../../store/actions/usersActions';
import SocketContext from '../../socetContext';
import {staff} from '../../constants';

const ITEM_HEIGHT = 48;

const OrderOperationsMenu = ({id, ordNum, status, customerId, ws}) => {
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

  const publishOrderHandler = async () => {
    setAnchorEl(null);
    await dispatch(publishOrder(id));
    const notificationData = {
      type: 'PUBLISH_ORDER_NOTIFICATION',
      data: {
        user: user._id,
        message: `Опубликован новый заказ с № - ${ordNum}`,
      },
      recipientsGroup: staff.onlyCourier,
    }
    await ws.send(JSON.stringify(notificationData))
  };

  const removeOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('remove');
  };

  const removeHandler = async () => {
    await dispatch(removeOrder(id));
    await ws.send(JSON.stringify({type: 'ORDER_CRUD_ACTION', recipientsGroup: staff.admAndOper}));
  }

  const editOrderHandler = async () => {
    setAnchorEl(null);
    await dispatch(push(`/orders/${id}/edit`));
  };

  const acceptOrderHandler = async () => {
    setAnchorEl(null);
    await dispatch(acceptOrder(id));
    await ws.send(JSON.stringify({type: 'ORDER_CRUD_ACTION', recipientsGroup: staff.onlyCourier}));
  };

  const rejectOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('reject');
  };

  const rejectHandler = async (reason) => {
    await dispatch(rejectOrder(id, reason))
    const notificationData = {
      type: 'REJECT_ORDER_NOTIFICATION',
      data: {
        user: user._id,
        message: `Отказ от выполнения заказа с № - ${ordNum}`,
      },
      recipientsGroup: staff.admAndOper,
    }
    await ws.send(JSON.stringify(notificationData))
  }

  const cancelOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('cancel');
  };

  const cancelHandler = async (reason) => {
    await dispatch(cancelOrder(id, reason))
    await ws.send(JSON.stringify({type: 'ORDER_CRUD_ACTION', recipientsGroup: staff.admAndOper}));
  }

  const transferToCourierHandler = async () => {
    await dispatch(getCouriers());
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('transfer');
  };

  const transferHandler = async (courierId) => {
    await dispatch(transferToCourier(id, courierId));
      const notificationData = {
        type: 'TRANSFER_TO_COURIER_NOTIFICATION',
        data: {
          user: user._id,
          recipients: [courierId],
          wasNotReadBy: [courierId],
          message: `Вам передан заказ для исполнения с № - ${ordNum}`,
        },
        recipientsGroup: staff.admAndOper,
      }
    await ws.send(JSON.stringify(notificationData));
  };

  const addInfoHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('addInfo');
  };

  const deliveredOrderHandler = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('delivered');
  };

  const addToBlackList = () => {
    setAnchorEl(null);
    setOpenAlert(true);
    setAction('blackList');
  };

  return (
    <div>
      <ReasonDialog 
        open={openAlert} 
        action={action}
        couriers={couriers}
        author={user.username}
        handleClose={() => setOpenAlert(false)}
        removeOrder={removeHandler}
        transferOrder={(courierId) => transferHandler(courierId)}
        addInfo={(info) => dispatch(addInfoOrder(id, info))}
        rejectOrder={(reason) => rejectHandler(reason)}
        cancelOrder={(reason) => cancelHandler(reason)}
        addToBlackList={(reason) => dispatch(editCustomer(customerId, reason))}
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
            maxHeight: ITEM_HEIGHT * 5,
            width: '25ch',
          },
        }}
      >
        {history.location.pathname === '/adm/orders/created' && (
          <span>
            <MenuItem onClick={addInfoHandler}>Добавить доп. инфо</MenuItem>
            {status !=='rejected' && <MenuItem onClick={publishOrderHandler}>Опубликовать</MenuItem>}
            <MenuItem onClick={transferToCourierHandler}>Передать курьеру</MenuItem>
            <MenuItem onClick={editOrderHandler}>Редактрировать</MenuItem>
            {status ==='rejected' && ( <MenuItem onClick={cancelOrderHandler}>Отменить</MenuItem>)}
            <MenuItem onClick={addToBlackList}>В черный список</MenuItem>
            <MenuItem onClick={removeOrderHandler}>Удалить</MenuItem>
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

const OrderOperationsMenuWithWS = props => (
  <SocketContext.Consumer>
  {ws => <OrderOperationsMenu {...props} ws={ws} />}
  </SocketContext.Consumer>
)

export default OrderOperationsMenuWithWS;