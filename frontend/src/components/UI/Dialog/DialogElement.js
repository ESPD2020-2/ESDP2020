import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import {createReview} from "../../../store/actions/reviewActions";

const DialogElement = ({open, handleClose, title, subtitle, children, onSubmit, value}) => {
  const createReviewHandler = async (reviewData) => {
    await dispatch(createReview(reviewData));
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          <Box className={classes.formWrap} pt={5} pb={2}>
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onSubmit}>
            {value}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DialogElement.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.element.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default DialogElement;