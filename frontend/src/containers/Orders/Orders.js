import React, { useEffect } from 'react';
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
import {history} from '../../store/configureStore';

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
          {orders.map((ord) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;