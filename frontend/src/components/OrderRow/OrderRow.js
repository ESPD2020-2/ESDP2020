import React from 'react';
import moment from "moment";
import "moment/locale/ru";
import { makeStyles, withStyles, } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';  
import OrderRowItem from "./OrderRowItem";
import OrderRowItemReason from './OrderRowItemReason';
import OrderOperationsMenu from '../OrderOperationsMenu/OrderOperationsMenu';

const useRowStyles = makeStyles({
  root: {
    '& > ': {
      borderBottom: 'unset',
    },
  }, 
  rejectedColor: {
    '& > ': {
      borderBottom: 'unset',
    },
    backgroundColor: "rgba(245, 0, 87, 0.08) !important"
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-child(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const OrderRow = ({pickupAddress, deliveryAddress, ordNum, createdAt, acceptedAt, customer, amount, id, courier, status, reason}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const date = moment(createdAt).calendar();
  moment.locale("ru");

  return (
    <React.Fragment >
      <StyledTableRow className={reason ? classes.rejectedColor : classes.root}>
        <StyledTableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell >{ordNum}</StyledTableCell>
        <StyledTableCell align="center">{date}</StyledTableCell>
        <StyledTableCell align="center">{customer.surname} {customer.name} {customer.patronymic}</StyledTableCell>
        <StyledTableCell align="center">{customer.phone}</StyledTableCell>
        <StyledTableCell align="center">{amount}</StyledTableCell>
        <StyledTableCell align="right"> <OrderOperationsMenu id={id} status={status}/> </StyledTableCell>
      </StyledTableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {courier && <OrderRowItemReason reason={reason} courier={courier} status={status} acceptedAt={acceptedAt}/>}
            <OrderRowItem address={pickupAddress} title='Откуда забрать'/>
            <OrderRowItem address={deliveryAddress} title='Куда доставить'/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default OrderRow;