import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getStreets } from '../../store/actions/streetsActions';
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -9,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles(() => ({
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
  }
}));

const AddressFormElement = ({ addressChange, inputChangeHandler, addAddress, removeAdress, address, street, house, building, apartment, error, kind}) => {
  const streets = useSelector(state => state.street.streets);
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchHandler = (event) => {
    if (event.target.value.length > 2) {
      dispatch(getStreets(event.target.value));
    }
  };

  return (
    <Grid item container xs>
      <Box p={3} >
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
                  <Typography><StyledBadge badgeContent={address.length} color="secondary">{kind === 'pickup' ? "Точки получения" : "Точки доставки"}</StyledBadge></Typography>
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
                                <span> <b> дом - </b> {el.house}</span>
                                {!!el.building&& (
                                  <span> <b> корпус - </b> {el.building}</span>
                                )}
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
          <Grid item xs={12} >
            <Autocomplete
              options={streets.map((option) => option.name)}
              noOptionsText="Для начала поиска необходимо ввести 3 символа"
              onChange={(e, val) => addressChange(e, val, kind)}
              value={street}
              clearOnEscape
              size='small'
              clearText="Очистить"
              openText="Развернуть"
              closeText="Свернуть"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Улица/Микрорайон"
                  onChange={(e) => searchHandler(e)}
                  variant="outlined"
                  required
                  error={!!error}
                  helperText={error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormElement
              type="text"
              required
              size='small'
              propertyName={kind ==='pickup' ? 'pickupHouse' : 'deliveryHouse'}
              title="Дом"
              onChange={(e) => inputChangeHandler(e)}
              value={house}
              error={error}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormElement
              type="text"
              size='small'
              propertyName={kind ==='pickup' ? 'pickupBuilding' : 'deliveryBuilding'}
              title="Корпус"
              onChange={(e) => inputChangeHandler(e)}
              value={building}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormElement
              type="text"
              size='small'
              propertyName={kind ==='pickup' ? 'pickupApartment' : 'deliveryApartment'}
              title="Квартира"
              onChange={(e) => inputChangeHandler(e)}
              value={apartment}
            />
          </Grid>
          <Grid item xs={12}>
          <Button
              onClick={addAddress}
              color="primary"
              variant="contained"
              style={{outline: 'none', overflow: 'hidden'}}
            >
             {street && house && (
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
  )
}

export default AddressFormElement
