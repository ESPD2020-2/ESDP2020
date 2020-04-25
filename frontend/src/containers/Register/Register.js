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
            <div className="Register">
                {this.props.loading ? <Spinner/> :
                    <>
                        <h1>Register</h1>
                        < form onSubmit={this.onSubmitHandler}>
                            {this.props.error && <div className="alert alert-danger" role="alert">
                                {this.props.error}
                            </div>}
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
                            <button type="submit" className="btn btn-primary">Sing up</button>
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