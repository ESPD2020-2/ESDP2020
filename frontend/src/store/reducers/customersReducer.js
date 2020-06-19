import {
    CREATE_CUSTOMER_FAILURE,
    CREATE_CUSTOMER_REQUEST,
    CREATE_CUSTOMER_SUCCESS
} from "../actions/customersActions";

const initialState = {
    loading: false,
    error: null,
    customerId: null,
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CUSTOMER_REQUEST:
            return {...state, loading: true};
        case CREATE_CUSTOMER_SUCCESS:
            return {...state, customerId: action.customerId, loading: false, error: null};
        case CREATE_CUSTOMER_FAILURE:
            return {...state, error: action.error, loading: false};
        default:
            return state;
    }
};

export default customersReducer;