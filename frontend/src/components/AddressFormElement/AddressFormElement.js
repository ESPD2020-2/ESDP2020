import React, {Fragment, useState} from 'react';
import FormElement from '../UI/Form/FormElement';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddressSelectDialog from '../UI/Dialog/AddressSelectDialog';
import { getAddressesByName } from '../../store/actions/streetsActions';
import { useDispatch, useSelector } from 'react-redux';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -9,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  ripple: {
    width: '134.11px',
    height: '134.11px',
    top: '-49.0549px',
    left: '13.9451px',
    animationDuration: '200ms',
    opacity: '0.3',
    animation: 'MuiTouchRipple-keyframes-enter 550ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)',
    position: 'absolute',
  },
  childRipple: {
    top: '0',
    left: '0',
    position: 'absolute',
    animation: 'MuiTouchRipple-keyframes-pulsate 2500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms infinite',
    width: '100%',
    height: '100%',
    display: 'block',
    opacity: '1',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  autoWrap: {
    [theme.breakpoints.up('sm')]: {
      '& .MuiOutlinedInput-adornedEnd' : {
        paddingRight: '168px !important'
      }
    },
    position: 'relative',

  },
  showOnMap: {
    [theme.breakpoints.down('xs')]: {
      position: 'inherit',
      top: 4,
      left: 14
    },
    position: 'absolute',
    top: 10,
    right: 46,
    color: '#3f51b5',
    transform: 'scale(0.75)',
    cursor: 'pointer'
  }
}));

const AddressFormElement = ({ addressChange, inputChangeHandler, addAddress, removeAdress, address, street, apartment, error, kind}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.street.addresses);
  const [open, setOpen] =useState(false);

  const searchHandler = async (event) => {
    if (event.target.value.length > 2) {
      dispatch(getAddressesByName(event.target.value))
    }
  };

  return (
    <>
      <AddressSelectDialog open={open} handleClose={() => setOpen(false)} addressChange={addressChange} kind={kind}/>
      <Grid item container xs>
        <Box p={3} style={{width: '100%'}}>
          <Grid item container spacing={2} style=
          {{
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            padding: '8px',
            position: 'relative'
          }}>
            <Box
              style={{
                position: 'absolute',
                top: '-17px',
                left: '8%',
                backgroundColor: '#fff',
              }}
              px={1}
            >
              <Typography variant='overline' component='h5'>{kind === 'pickup' ? 'Откуда забрать': 'Куда доставить'}</Typography>
            </Box>
            {address.length > 0 && (
              <Grid item xs={12}>
                <ExpansionPanel >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><StyledBadge badgeContent={address.length} color="secondary">{kind === 'pickup' ? "Точек получения" : "Точек доставки"}</StyledBadge></Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ justifyContent: "center" }}>
                    <List style={{ width: "100%" }}>
                      <Divider />
                      {address.map((el, i) => (
                        <Fragment key={i}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <HomeIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <>
                                  <span>{el.street}</span>
                                  {!!el.apartment && (<span> <b> кв - </b> {el.apartment}</span>
                                  )}
                                </>
                              }
                            />
                            <ListItemSecondaryAction style={{ right: "8px" }}>
                              <IconButton
                                onClick={() => removeAdress(i, kind)}
                                edge="end"
                                aria-label="delete"
                              >
                                <CloseIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider />
                        </Fragment>
                      ))}
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            )}
            <Grid item xs={12} sm={10} >
              <Autocomplete
                options={addresses&&addresses.map((option) => option.title)}
                noOptionsText="Для начала поиска необходимо ввести 3 символа"
                onChange={(e, val) => addressChange(e, val, kind)}
                getOptionSelected={(opt) => opt !== street}
                value={street}
                clearOnEscape
                size='small'
                clearText="Очистить"
                openText="Развернуть"
                closeText="Свернуть"
                className={classes.autoWrap}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      label="Улица/Микрорайон"
                      onChange={(e) => searchHandler(e)}
                      variant="outlined"
                      required
                      error={!!error}
                      helperText={error}
                    />
                    <span onClick={() => setOpen(true)} className={classes.showOnMap} id={kind === 'pickup' ? "showOnMap1" : "showOnMap2"}>Указать на карте</span>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormElement
                type="text"
                size='small'
                propertyName={kind ==='pickup' ? 'pickupApartment' : 'deliveryApartment'}
                title="Кв"
                onChange={(e) => inputChangeHandler(e)}
                value={apartment}
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                onClick={addAddress}
                id={kind === 'pickup' ? "addPickup1" : "addPickup2"}
                color="primary"
                variant="contained"
                style={{outline: 'none', overflow: 'hidden'}}
              >
              {street && (
                  <span className={classes.ripple}>
                    <span className={classes.childRipple}/>
                  </span>
                )}
                Добавить точку
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default AddressFormElement
