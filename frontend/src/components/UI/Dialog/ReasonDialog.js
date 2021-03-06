import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ReasonDialog = ({open, action, handleClose, removeOrder, rejectOrder, cancelOrder, transferOrder, deliveredOrder, addToBlackList, addInfo, couriers, author}) => {

  const [reason, setReason] = useState('');
  const [courierId, setCourierId] = useState('');

  const orderHandler = () => {
    handleClose();
    action === 'remove' && removeOrder();
    action === 'reject' && rejectOrder({author, reason});
    action === 'cancel' && cancelOrder({author, reason});
    action === 'blackList' && addToBlackList({addedToBlackList:{author, reason}});
    action === 'addInfo' && addInfo(reason);
    action === 'transfer' && transferOrder(courierId);
    action === 'delivered' && deliveredOrder(reason);
  };

  const changeHandler = (e) => {
    action !== 'remove'&&action !== 'transfer' && setReason(e.target.value);
    action === 'transfer' && setCourierId(e.target.value)
  }
  
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle id="form-dialog-title">
        {action === 'remove' && 'Удаление заказа'}
        {action === 'transfer' && 'Выбор курьера'}
        {action === 'reject' && 'Причина отказа'}
        {action === 'cancel' && 'Причина отмены'}
        {action === 'blackList' && 'Добавить в черный список'}
        {action === 'delivered' && 'Комментарий о клиенте'}
        {action === 'addInfo' && 'Дополнительная информация'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        {action === 'remove' && 'Эта оперция необратима, Вы действительно хотите продолжить?'}
        {action === 'transfer' && 'Назначьте нового курьера для выполнения заказа'}
        {action === 'reject' && 'Укажите причину отказа от выполнения заказа'}
        {action === 'cancel' && 'Укажите причину отмены заказа'}
        {action === 'blackList' && 'Вы действительно хотите добавить клиента в черный список?'}
        {action === 'delivered' && 'Напишите комментарий о клиенте'}
        {action === 'addInfo' && 'Введите дополнительную информацию (инфо. о товаре/этаж/код от подъезда/№подъезда и тд) '}
        </DialogContentText>
        {action !== 'remove' && (
          <TextField
            autoFocus
            margin="dense"
            select={action === 'transfer' && true}
            multiline={action === 'addInfo'}
            rows={5}
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
                {el.displayName || el.username} ({el.status === 'avaliable' ? <b style={{color: 'green'}}>свободен</b> : <b style={{color: 'red'}}>в процессе выполнения</b>})
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