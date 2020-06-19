import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from '@material-ui/core/Link';
import {NavLink} from "react-router-dom";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <>
       <Grid container justify='center' style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 16px'}}>
          <Grid item xs sm={6} md={4} lg={3}>
            <Paper elevation={3} style={{ border: '1px solid rgba(0, 0, 0, 0.23)'}}>
              <Box style={{position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff'}} px={1}>
                <Typography variant="h4">Войти</Typography>
              </Box>
              <Box pt={5} pb={2} px={2}>
                <form onSubmit={this.submitFormHandler}>
                  <Grid container direction='column' spacing={2}>
                    {this.props.error && (
                      <Grid item xs>
                        <Alert severity="error">{this.props.error.error}</Alert>
                      </Grid>
                    )}
                    <Grid item xs>
                      <FormElement
                        propertyName="username"
                        title="Логин"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        type="text"
                        autoComplete="current-username"
                      />
                    </Grid>
                    <Grid item xs>
                      <FormElement
                        propertyName="password"
                        title="Пароль"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        type="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                    <Grid item xs>
                      <Button fullWidth type="submit" color="primary" variant="contained">Bойти</Button>
                    </Grid>
                    <Grid item xs>
                      <FacebookLogin/>
                    </Grid>
                    <Grid item>
                      <Link component={NavLink} to='/register' variant="body2">
                        {"У вас нет аккаунта? Зарегистрируйтесь"}
                      </Link>
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
  loading: state.users.loginLoading,
  error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
