import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import {getOrders} from "../../store/actions/ordersActions";
import OrderRow from "../../components/OrderRow/OrderRow";
import { withStyles, } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ShowToAdmin from '../../hoc/ShowToAdmin';
import {NavLink} from 'react-router-dom';

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

  const dispatch = useDispatch();
  const orders = useSelector(state => state.ord.orders);
  const path = useSelector(state => state.router.location.pathname)
  useEffect(() => {
    let status;
    if ( path === "/adm/orders/created") {
      status = 'created'
    }
    if (path === "/adm/orders/published") {
      status = 'published'
    }
      dispatch(getOrders(status))

  },[dispatch, path]);
  
  return (
    <Grid container direction='column' spacing={2}>
      <ShowToAdmin path={path} roles={['admin', 'operator']}>
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
                    customer={ord.customer}
                    amount={ord.paymentAmount}
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
  );
}

export default Orders;
