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
            <div className="Login">
                {this.props.loading ? <Spinner/> :
                    <>
                        <h1>Login</h1>
                        < form onSubmit={this.onSubmitHandler}>
                            <FormElement
                                propertyName="username"
                                title="Username"
                                onChange={this.inputChangeHandler}
                                value={this.state.username}
                                placeholder="Enter Your username"
                            />
                            <FormElement
                                propertyName="password"
                                title="Password"
                                onChange={this.inputChangeHandler}
                                value={this.state.password}
                                placeholder="Enter Your password"
                            />
                            <button type="submit" className="btn btn-primary">Login</button>
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
    loading: state.users.loginLoading,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);