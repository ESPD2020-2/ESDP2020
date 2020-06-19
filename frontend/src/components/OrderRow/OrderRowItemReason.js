import React from 'react'
import moment from "moment";
import "moment/locale/ru";
import { withStyles, } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: theme.palette.common.black,
    '&:first-child': {
      borderTopLeftRadius: '5px',
    }, 
    '&:last-child': {
      borderTopRightRadius: '5px',
    },
  },
  body: {
    fontSize: 14,
  }, 
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-child(even)': {
      backgroundColor: 'red',
    },
  },
}))(TableRow);

const OrderRowItemReason = ({courier, status, reason,  acceptedAt}) => {
  const date = moment(acceptedAt).calendar();
  moment.locale("ru");

  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {status === 'accepted'&& "Принят"}
        {status === 'rejected' && "Отменен курьером"} 
        {status === 'canceled' && "Отменен клиентом"} 
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row" style={{width: '20%'}}>Курьер</StyledTableCell>
            <StyledTableCell align="right" size='small' style={{width: '20%'}}>Статус</StyledTableCell>
            {reason ? (
              <StyledTableCell align="right" size='small' style={{width: '60%'}}>Причина отказа</StyledTableCell>
            ): (
              <StyledTableCell align="right" size='small' style={{width: '60%'}}>Дата</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow >
            <TableCell component="th" scope="row" style={{width: '20%'}}>{courier.username}</TableCell>
            <TableCell align="right" size='small' style={{width: '20%'}}>{status}</TableCell>
            {reason ? (
              <TableCell align="right" size='small' style={{width: '60%'}}>{reason}</TableCell>
            ) : (
              <TableCell align="right" size='small' style={{width: '60%'}}>{date}</TableCell>
            )}
          </StyledTableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default OrderRowItemReason