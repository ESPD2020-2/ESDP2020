import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const GET_COURIERS_REQUEST = 'GET_COURIERS_REQUEST';
export const GET_COURIERS_SUCCESS = 'GET_COURIERS_SUCCESS';
export const GET_COURIERS_FAILURE = 'GET_COURIERS_FAILURE';

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const getCouriersRequest = () => ({type: GET_COURIERS_REQUEST});
export const getCouriersSuccess = couriers => ({type: GET_COURIERS_SUCCESS, couriers});
export const getCouriersFailure = error => ({type: GET_COURIERS_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const getUsersRequest = () => ({ type: GET_USERS_REQUEST });
export const getUsersSuccess = (users) => ({ type: GET_USERS_SUCCESS, users });
export const getUsersFailure = (error) => ({ type: GET_USERS_FAILURE, error });

export const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
export const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  error,
});

export const getCouriers = () => {
    return async dispatch => {
        try {
            dispatch(getCouriersRequest());
            const response = await axiosApi.get('/users/couriers');
            dispatch(getCouriersSuccess(response.data));
        } catch (error) {
            dispatch(getCouriersFailure(error.response.data));
        }
    }
};

export const getUsers = () => {
    return async (dispatch) => {
      try {
        dispatch(getUsersRequest());
        const response = await axiosApi.get("/users");
        dispatch(getUsersSuccess(response.data));
      } catch (error) {
        dispatch(getUsersFailure(error.response.data));
      }
    };
  };

export const deleteUser = (id) => {
    return async (dispatch) => {
      try {
        dispatch(deleteUserRequest());
        await axiosApi.delete(`/users/${id}`);
        dispatch(getUsers());
      } catch (error) {
        dispatch(deleteUserFailure(error.response.data));
      }
    };
  };

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());
            await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            dispatch(push('/'));
        } catch (error) {
            if (error.response) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'Network Error1 or no internet'}));
            }
        }
    }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            response.data.role === 'user' ? dispatch(push('/')) : dispatch(push('/adm'));
        } catch (error) {
            dispatch(loginUserFailure(error.response.data));
        }
    }
};

export const loginWithFacebook = facebookData => {
    return async dispatch => {
        const response = await axiosApi.post('/users/facebook', facebookData);
        dispatch(loginUserSuccess(response.data));
        dispatch(push('/'));
    };
};

export const logoutUser = () => {
    return async dispatch => {
        await axiosApi.delete('/users/sessions');

        dispatch(logoutUserSuccess());
        dispatch(push('/'));
    }
};