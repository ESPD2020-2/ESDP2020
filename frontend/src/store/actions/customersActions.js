import axiosApi from "../../axiosApi";
import { toast } from 'react-toastify';
// import {push} from 'connected-react-router';

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';

export const createCustomerRequest = () => ({type: CREATE_CUSTOMER_REQUEST});
export const createCustomerSuccess = (customerId) => ({type: CREATE_CUSTOMER_SUCCESS, customerId});
export const createCustomerFailure = error => ({type: CREATE_CUSTOMER_FAILURE, error});


export const createCustomer = customerData => {
    return async dispatch => {
        try {
            dispatch(createCustomerRequest());
            const response = await axiosApi.post('/customers', customerData);
            dispatch(createCustomerSuccess(response.data));
            console.log(response.data)
            
            // dispatch(push('/'));
        } catch (error) {
            if (error.response) {
                toast.warn(error.response.data);
                dispatch(createCustomerFailure(error.response.data));
            } else {
                dispatch(createCustomerFailure({global: 'Network error or no internet'}));
            }
        }
    }
};