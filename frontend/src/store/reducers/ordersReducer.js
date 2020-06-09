import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  TRANSFER_TO_COURIER_FAILURE,
  REMOVE_ORDER_FAILURE,
} from "../actions/ordersActions";

const initialState = {
  orders: [],
  order: [],
  loading: null,
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.orders };
    case GET_ORDERS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.order };
    case GET_ORDER_FAILURE:
      return { ...state, error: action.error, loading: false };
    case TRANSFER_TO_COURIER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case REMOVE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default ordersReducer;
