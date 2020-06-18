import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../store/configureStore';
import { createOrder, editOrder } from "../../store/actions/ordersActions";
import OrderForm from "../../components/OrderForm/OrderForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  wrap: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '0 16px',
    },
  },
  titleWrap: {
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    }
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute', 
      top: '-20px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      background: 'linear-gradient(360deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(250,250,250,1) 34%, rgba(250,250,250,1) 100%)'
    },
    [theme.breakpoints.down('xs')]: {
      padding: "20px 0",
      textAlign: 'center'
    }
  },
  formWrap: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: "0px"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const NewOrder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.ord.loading);
  
  const createOrderHandler = async (data) => {
    if(data.customerId) {
      await dispatch(createOrder(data));
    }
  };

  const editOrderHandler = async (id, data) => {
    await dispatch(editOrder(id, data));
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading !== null &&loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction='column' alignItems='center' className={classes.wrap}>
        <Grid item xs md={8} lg={5} xl={4}>
          <Paper elevation={3} className={classes.titleWrap}>
            <Box className={classes.title} px={1}>
              <Typography variant="h4">{history.location.pathname === '/add-order' ? 'Создать заказ' : 'Редактировать'}</Typography>
            </Box>
            <Box className={classes.formWrap} pt={5} pb={2}>
              <OrderForm
                create={createOrderHandler}
                edit={editOrderHandler}
                user={user}
              />
            </Box>
          </Paper>
        </Grid> 
      </Grid>
    </>
  );
}

export default NewOrder;