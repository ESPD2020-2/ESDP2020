import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Maps from '../../../containers/Maps/Maps';

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AddressSelectDialog = ({open, handleClose, addressChange, kind}) => {
  const address = useSelector(state => state.street.address);

  const saveAddressHandler = () =>{
    handleClose();
    addressChange(null, address.title, kind);
  };


  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Укажите адрес на карте
      </DialogTitle>
      <DialogContent>
        <Maps addressChange={addressChange} address={address}/>
        <Grid container alignItems="center" justify='center' style={{marginTop: 10}}>
          <RoomIcon htmlColor='rgb(37, 127, 202)' fontSize='large'/> 
          <DialogContentText style={{margin: 0}}>{kind ==='pickup' ? 'Забрать по адресу: ' : 'Доставить по адресу: '}<b>{address ? address.title : 'Укажите адрес на карте'}</b></DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={saveAddressHandler} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddressSelectDialog;