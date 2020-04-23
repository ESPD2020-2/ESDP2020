import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import './Login.css';

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
    };

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
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
                </form>
            </div>
        );
    }
}

export default Login;