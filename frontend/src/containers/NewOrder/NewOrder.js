import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { createOrder } from "../../store/actions/ordersActions";
import OrderForm from "../../components/OrderForm/OrderForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";

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
      backgroundColor: '#fff'
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
  }
}));

const NewOrder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  
  const createOrderHandler = async (data) => {
    if(data.customerId) {
      await dispatch(createOrder(data));
    }
  };

  return (
    <>
      <Grid container direction='column' alignItems='center' className={classes.wrap}>
        <Grid item xs md={8} lg={5} xl={4}>
          <Paper elevation={3} className={classes.titleWrap}>
            <Box className={classes.title} px={1}>
              <Typography variant="h4">Создать заказ</Typography>
            </Box>
            <Box className={classes.formWrap} pt={5} pb={2}>
              <OrderForm
                onSubmit={createOrderHandler}
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