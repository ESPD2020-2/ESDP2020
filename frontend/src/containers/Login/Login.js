import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import './Login.css';
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <div className="Login " style={{marginTop: '30%'}}>
        {this.props.loading ? <Spinner/> :
          <div className='ml-3 mr-3'>
            <h3 className='text-light font-weight-bolder text-uppercase '>Войти</h3>
            < form onSubmit={this.onSubmitHandler}>
              <FormElement
                propertyName="username"
                title="Имя пользователя"
                onChange={this.inputChangeHandler}
                value={this.state.username}
                placeholder="Введите ваше имя"
              />
              <FormElement
                propertyName="password"
                title="Пароль"
                onChange={this.inputChangeHandler}
                value={this.state.password}
                placeholder="Введите ваш пароль"
              />
              <button type="submit" className="btn bg-warning text-light mt-5">Войти</button>
              <hr align="center" width="100%" size="2" color="#ccc"/>
              <FacebookLogin/>
            </form>
          </div>
        }
      </div>
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