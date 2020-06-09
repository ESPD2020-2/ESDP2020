import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ReasonDialog = ({open, action, handleClose, removeOrder, rejectOrder, cancelOrder, transferOrder, deliveredOrder, couriers}) => {

  const [reason, setReason] = useState('');
  const [courierId, setCourierId] = useState('');

  const orderHandler = () => {
    handleClose();
    action === 'remove' && removeOrder();
    action === 'reject' && rejectOrder(reason);
    action === 'cancel' && cancelOrder(reason);
    action === 'transfer' && transferOrder(courierId);
    action === 'delivered' && deliveredOrder(reason);
  };

  const changeHandler = (e) => {
    action !== 'remove'&&action !== 'transfer' && setReason(e.target.value);
    action === 'transfer' && setCourierId(e.target.value)
  }
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">
        {action === 'remove' && 'Причина Удаления'}
        {action === 'transfer' && 'Выбор курьера'}
        {action === 'reject' && 'Причина отказа'}
        {action === 'cancel' && 'Причина отказа'}
        {action === 'delivered' && 'Комментарий о клиенте'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        {action === 'remove' && 'Эта оперция необратима, Вы действительно хотите продолжить?'}
        {action === 'transfer' && 'Назначьте нового курьера для выполнения заказа'}
        {action === 'reject' && 'Укажите причину отказа от выполнения заказа'}
        {action === 'cancel' && 'Укажите причину отказа от выполнения заказа'}
        {action === 'delivered' && 'Напишите комментарий о клиенте'}
        </DialogContentText>
        {action !== 'remove' && (
          <TextField
            autoFocus
            margin="dense"
            select={action === 'transfer' && true}
            id="name"
            label={action === 'transfer' ? 'Выберите курьера' : 'Введите текст'}
            type="text"
            fullWidth
            value={action === 'transfer' ? courierId : reason}
            onChange={changeHandler}
          >
            {action === 'transfer' ? (
             couriers.map(el => (
              <MenuItem key={el._id} value={el._id}>
                {el.username}
              </MenuItem>
             ))
            ) : (
              undefined
            )}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={orderHandler} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReasonDialog
;