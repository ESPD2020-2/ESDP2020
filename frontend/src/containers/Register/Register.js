import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import './Register.css';
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import Spinner from "../../components/UI/Spinner/Spinner";

class Register extends Component {
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
    this.props.registerUser({...this.state});
  };

  render() {
    return (
      <div className='ml-3 mr-3' style={{marginTop: '30%'}}>
        {this.props.loading ? <Spinner/> :
          <>
            <h3 className='text-light font-weight-bolder text-uppercase '>Регистрация</h3>
            < form onSubmit={this.onSubmitHandler}>
              {this.props.error && <div className="alert alert-danger" role="alert">
                {this.props.error}
              </div>}
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
              <button type="submit" className="btn bg-warning text-light mt-5">Регистрация</button>
              <hr align="center" width="100%" size="2" color="#ccc"/>
              <FacebookLogin/>
            </form>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
  loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);