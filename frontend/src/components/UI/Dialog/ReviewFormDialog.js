import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {useDispatch, useSelector} from "react-redux";
import {createReview} from "../../../store/actions/reviewActions";
import Box from "@material-ui/core/Box";
import ReviewForm from "../../ReviewForm/ReviewForm";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formWrap: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: "0px",
    }
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

export default function FormDialog({open, handleClose, reviewForm, onSubmit}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const createReviewHandler = async (reviewData) => {
    if (reviewData.customerId) {
      await dispatch(createReview(reviewData));
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} form={reviewForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>Ваш отзыв о нашей службе</DialogTitle>
        <DialogContent>
          <Box className={styles} pt={5} pb={2}>
            <ReviewForm
              create={createReviewHandler}
              user={user}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Отмена
          </Button>
          <Button onClick={handleClose} type="submit" form="reviewForm" color="primary" variant="contained">
            Отправить отзыв
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}