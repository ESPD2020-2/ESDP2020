import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import { withStyles, } from '@material-ui/core/styles';

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
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const OrderRowItem = ({address, title}) => {
  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row" style={{width: '60%'}}>Адрес</StyledTableCell>
            <StyledTableCell align="right" size='small' style={{width: '40%'}}>Картира/Офис</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {address.map((el,i) => (
            <StyledTableRow key={i}>
              <TableCell component="th" scope="row" style={{width: '60%'}}>{el.street}</TableCell>
              <TableCell align="right" size='small' style={{width: '40%'}}>{el.apartment ? el.apartment : 'нет'}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default OrderRowItem
