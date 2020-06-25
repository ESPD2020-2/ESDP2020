import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {registerUser} from "../../store/actions/usersActions";
// import {createCustomer} from "../../store/actions/customersActions";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  wrap: {
    [theme.breakpoints.up('xs')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '700px', 
      maxHeight: 'calc(100% - 180px)'
    },
    [theme.breakpoints.up('sm')]: {
      top: '45%',
      padding: '0 16px',
      maxHeight: 'calc(100% - 300px)'
    }
  },
  badge: {
    position: 'absolute',
    top: '-17px',
    left: '8%',
    backgroundColor: '#fff',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#fafafa',
    },
  },
  titleWrap: {
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
      backgroundColor: '#fafafa',
    },
    [theme.breakpoints.up('sm')]: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    }
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute', 
      top: '-20px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      background: 'linear-gradient(360deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(250,250,250,1) 34%, rgba(250,250,250,1) 100%)'
    },
    [theme.breakpoints.down('xs')]: {
      padding: "20px 0",
      textAlign: 'center'
    }
  },
  formWrap: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: "0px"
    }
  }
}));

const Register = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.registerError);
  const [state, setState] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: ''
  });

  const inputChangeHandler = event => {
    setState({ ...state, [event.target.name]: event.target.value});
  };

  const submitFormHandler = async event => {
    event.preventDefault();
    await dispatch(registerUser({...state}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Grid container direction='column' alignItems='center' className={classes.wrap} style={{}}>
      <Grid item xs style={{width: '100%'}}>
        <Paper elevation={3} className={classes.titleWrap}>
          <Box className={classes.title} px={1}>
            <Typography variant="h4">Регистрация</Typography>
          </Box>
          <Box className={classes.formWrap} pt={5} pb={2}>
            <form onSubmit={submitFormHandler}>
              <Grid container direction='column' alignItems='center'>
                <Grid item container xs >
                  <Box p={3} style={{width: '100%'}}>
                    <Grid item container spacing={2} style=
                    {{
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      padding: '8px',
                      position: 'relative'
                    }}>
                      <Box px={1} className={classes.badge}>
                        <Typography variant='overline' component='h5'>Учетная информация</Typography>
                      </Box>
                      <Grid item xs={12} sm={6}>
                        <FormElement
                          propertyName="username"
                          title="Логин"
                          type='text'
                          size='small'
                          value={state.username}
                          onChange={inputChangeHandler}
                          error={getFieldError('username')}
                          autoComplete="new-username"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormElement
                          propertyName="password"
                          title="Пароль"
                          type="password"
                          size='small'
                          value={state.password}
                          onChange={inputChangeHandler}
                          error={getFieldError('password')}
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item container xs >
                  <Box p={3}>
                    <Grid item container spacing={2} style=
                    {{
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      padding: '8px',
                      position: 'relative'
                    }}>
                      <Box px={1} className={classes.badge}>
                        <Typography variant='overline' component='h5'>Контактная информация</Typography>
                      </Box>
                      <Grid item xs={12} sm={4}>
                        <FormElement
                          propertyName="surname"
                          title="Фамилия"
                          type="text"
                          size='small'
                          value={state.surname}
                          onChange={inputChangeHandler}
                          error={getFieldError('surname')}
                          autoComplete="new-surname"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormElement
                          propertyName="name"
                          title="Имя"
                          type="text"
                          size='small'
                          value={state.name}
                          onChange={inputChangeHandler}
                          error={getFieldError('name')}
                          autoComplete="new-name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormElement
                          propertyName="patronymic"
                          title="Отчество"
                          type="text"
                          size='small'
                          value={state.patronymic}
                          onChange={inputChangeHandler}
                          error={getFieldError('patronymic')}
                          autoComplete="new-patronymic"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormElement
                          propertyName="phone"
                          title="Телефон"
                          type="tel"
                          size='small'
                          value={state.phone}
                          onChange={inputChangeHandler}
                          error={getFieldError('phone')}
                          autoComplete="new-phone"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormElement
                          propertyName="email"
                          title="Электронная почта"
                          type='email'
                          size='small'
                          value={state.email}
                          onChange={inputChangeHandler}
                          error={getFieldError('email')}
                          autoComplete="new-email"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item container xs >
                  <Box style={{width: '100%', textAlign: 'center'}}>
                    <Button type="submit" color="primary" variant="contained">
                      Зарегистрироваться
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid> 
    </Grid>    
  );
}

export default Register;