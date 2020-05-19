import axiosApi from "../../axiosApi";
import { toast } from 'react-toastify';

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';

export const EDIT_CUSTOMER_REQUEST = 'EDIT_CUSTOMER_REQUEST';
export const EDIT_CUSTOMER_SUCCESS = 'EDIT_CUSTOMER_SUCCESS';
export const EDIT_CUSTOMER_FAILURE = 'EDIT_CUSTOMER_FAILURE';

export const createCustomerRequest = () => ({type: CREATE_CUSTOMER_REQUEST});
export const createCustomerSuccess = (customerId) => ({type: CREATE_CUSTOMER_SUCCESS, customerId});
export const createCustomerFailure = error => ({type: CREATE_CUSTOMER_FAILURE, error});

export const editCustomerRequest = () => ({type: EDIT_CUSTOMER_REQUEST});
export const editCustomerSuccess = () => ({type: EDIT_CUSTOMER_SUCCESS});
export const editCustomerFailure = error => ({type: EDIT_CUSTOMER_FAILURE, error});


export const createCustomer = customerData => {
    return async dispatch => {
        try {
            dispatch(createCustomerRequest());
            const response = await axiosApi.post('/customers', customerData);
            dispatch(createCustomerSuccess(response.data));
        } catch (error) {
            if (error.response) {
                toast.warn(error.response.data);
                dispatch(createCustomerFailure(error.response.data));
            } else {
                dispatch(createCustomerFailure({global: 'Network Error or no internet'}));
            }
        }
    }
};

export const editCustomer = (id, data) => {
    return async dispatch => {
        try {
            dispatch(editCustomerRequest());
            await axiosApi.patch(`/customers/${id}`, data);
        } catch (error) {
            if (error.response) {
                toast.warn(error.response.data);
                dispatch(editCustomerFailure(error.response.data));
            } else {
                dispatch(editCustomerFailure({global: 'Network Error or no internet'}));
            }
        }
    }
};