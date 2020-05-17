import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const AddressListItem = ({address}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.nested}>
      <ListItemText primary={`
      ${address.street} дом-${address.house}${address.building&&address.building} ${address.apartment && 'кв-' + address.apartment}
      `} />
    </ListItem>
  );
};

export default AddressListItem;