import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getOrders } from "../../store/actions/ordersActions";
import { getCouriers } from '../../store/actions/usersActions';
import OrderRow from "../../components/OrderRow/OrderRow";
import ShowToAdmin from '../../hoc/ShowToAdmin';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.ord.orders);
  const userId = useSelector(state => state.users.user._id);
  const path = useSelector(state => state.router.location.pathname);
  const loading = useSelector(state => state.ord.loading);
  useEffect(() => {
    let status;
    let courier = null;
    if ( path === "/adm/orders/created") {
      status = 'created,rejected,canceled'
    }
    if (path === "/adm/orders/published") {
      status = 'published'
    }
    if (path === "/adm/orders/accepted") {
      status = 'accepted'
    }
    if (path === "/adm/orders/courier/accepted") {
      status = 'accepted'
      courier = userId
    }
      dispatch(getOrders(status, courier));
      dispatch(getCouriers());
    
  },[dispatch, path, userId]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading !== null &&loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction='column' spacing={2}>
        <ShowToAdmin path={path} roles={['super_admin', 'admin', 'operator']}>
          <Grid item>
            <Button variant="contained" color='primary' component={NavLink} to={'/add-order'}>Добавить заказ</Button>
          </Grid>
        </ShowToAdmin>
        <Grid item xs>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell>№ заказа</StyledTableCell>
                  <StyledTableCell align="center">Создан</StyledTableCell>
                  <StyledTableCell align="center">Заказчик</StyledTableCell>
                  <StyledTableCell align="center">Тел. заказчика</StyledTableCell>
                  <StyledTableCell align="center">Сумма</StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody >
                {orders.length > 0 ? ( 
                  orders.map((ord) => (
                    <OrderRow 
                      key={ord._id}
                      id={ord._id}
                      pickupAddress={ord.pickupAddress}
                      deliveryAddress={ord.deliveryAddress}
                      ordNum={ord.orderNumber}
                      createdAt={ord.createdAt}
                      acceptedAt={ord.acceptedAt}
                      customer={ord.customer}
                      courier={ord.courier}
                      amount={ord.paymentAmount}
                      status={ord.status}
                      reason={ord.reason&&ord.reason}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} variant='footer' align='center'>Нет данных</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default Orders;