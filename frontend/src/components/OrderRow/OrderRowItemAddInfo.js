import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';  

const OrderRowItem = ({addInfo, title}) => {
  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
      <Table size="small">
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">{addInfo}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default OrderRowItem
