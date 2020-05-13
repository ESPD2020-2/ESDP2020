import React, {Component} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {createCustomer} from "../../store/actions/customersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class Register extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = async event => {
    event.preventDefault();
    const customerData = {...this.state}
    delete customerData.username;
    delete customerData.password;
    await this.props.createCustomer(customerData);
    const userData = {
      username: this.state.username,
      password: this.state.password, 
      customer: this.props.id
    }
    await this.props.registerUser(userData);
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <>
        <Grid container direction='column' alignItems='center' style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 16px'}}>
          <Grid item xs sm={10} md={8} lg={7}>
            <Paper elevation={3} style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px',position: 'relative'}}>
              <Box style={{position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff'}} px={1}>
                <Typography variant="h4">Регистрация</Typography>
              </Box>
              <Box pt={5} pb={2}>
                <form onSubmit={this.submitFormHandler}>
                  <Grid container direction='column' alignItems='center' spacing={3}>
                    <Grid item container xs spacing={4}>
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
                            <Typography variant='overline' component='h5'>Учетная информация</Typography>
                          </Box>
                          <Grid item xs={12} md={6}>
                            <FormElement
                              propertyName="username"
                              title="Логин"
                              type='text'
                              size='small'
                              value={this.state.username}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('username')}
                              autoComplete="new-username"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormElement
                              propertyName="password"
                              title="Пароль"
                              type="password"
                              size='small'
                              value={this.state.password}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('password')}
                              autoComplete="new-password"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item container xs spacing={4}>
                      <Box p={3}>
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
                            <Typography variant='overline' component='h5'>Контактная информация</Typography>
                          </Box>
                          <Grid item xs={12} md={4}>
                            <FormElement
                              propertyName="surname"
                              title="Фамилия"
                              type="text"
                              size='small'
                              value={this.state.surname}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('surname')}
                              autoComplete="new-surname"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormElement
                              propertyName="name"
                              title="Имя"
                              type="text"
                              size='small'
                              value={this.state.name}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('name')}
                              autoComplete="new-name"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormElement
                              propertyName="patronymic"
                              title="Отчество"
                              type="text"
                              size='small'
                              value={this.state.patronymic}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('patronymic')}
                              autoComplete="new-patronymic"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormElement
                              propertyName="phone"
                              title="Телефон"
                              type="tel"
                              size='small'
                              value={this.state.phone}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('phone')}
                              autoComplete="new-phone"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormElement
                              propertyName="email"
                              title="Электронная почта"
                              type='email'
                              size='small'
                              value={this.state.email}
                              onChange={this.inputChangeHandler}
                              error={this.getFieldError('email')}
                              autoComplete="new-email"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item container xs spacing={4}>
                      <Box p={2} style={{width: '100%', textAlign: 'center'}}>
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.error,
  loading: state.users.loading,
  id: state.customers.customerId
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
  createCustomer: customerData => dispatch(createCustomer(customerData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);