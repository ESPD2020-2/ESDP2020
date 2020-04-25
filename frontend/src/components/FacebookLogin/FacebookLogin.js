import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/usersActions";
import './FacebookLogin.css';

const FacebookLogin = props => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData))
        }
    };

    return (
        <FacebookLoginButton
            appId="263746608357020"
            callback={callback}
            fields="name,email,picture"
            render={renderProps => (
                <button
                    className="facebookButton"
                    onClick={renderProps.onClick}
                >
                    Login with Facebook
                </button>
            )}
        />
    );
};

export default FacebookLogin;