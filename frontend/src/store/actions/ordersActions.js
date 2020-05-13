import axiosApi from "../../axiosApi";

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const TRANSFER_TO_COURIER_REQUEST = 'TRANSFER_TO_COURIER_REQUEST';
export const TRANSFER_TO_COURIER_SUCCESS = 'TRANSFER_TO_COURIER_SUCCESS';
export const TRANSFER_TO_COURIER_FAILURE = 'TRANSFER_TO_COURIER_FAILURE';

export const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
export const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
export const REMOVE_ORDER_FAILURE = 'REMOVE_ORDER_FAILURE';

export const getOrdersRequest = () => ({type: GET_ORDERS_REQUEST});
export const getOrdersSuccess = (orders) => ({type: GET_ORDERS_SUCCESS, orders});
export const getOrdersFailure = (error) => ({type: GET_ORDERS_FAILURE, error});

export const createOrderRequest = () => ({type: CREATE_ORDER_REQUEST});
export const createOrderSuccess = () => ({type: CREATE_ORDER_SUCCESS});
export const createOrderFailure = (error) => ({type: CREATE_ORDER_FAILURE, error});

export const transferToCourierRequest = () => ({type: TRANSFER_TO_COURIER_REQUEST});
export const transferToCourierSuccess = () => ({type: TRANSFER_TO_COURIER_SUCCESS});
export const transferToCourierFailure = (error) => ({type: TRANSFER_TO_COURIER_FAILURE, error});

export const removeOrderRequest = () => ({type: REMOVE_ORDER_REQUEST});
export const removeOrderSuccess = () => ({type: REMOVE_ORDER_SUCCESS});
export const removeOrderFailure = (error) => ({type: TRANSFER_TO_COURIER_FAILURE, error});

export const getOrders = () => {
  return async dispatch => {
    try {
      dispatch(getOrdersRequest());
      const orders = await axiosApi.get('/orders');
      dispatch(getOrdersSuccess(orders.data));
    } catch (error) {
      dispatch(getOrdersFailure(error));
    }
  }
};

export const createOrder = data => {
  return async dispatch => {
    try {
      dispatch(createOrderRequest());
      await axiosApi.post(`/orders`, data);
      // dispatch(getOrders());
    } catch (error) {
      dispatch(createOrderFailure(error));
    }
  }
};

export const transferToCourier = data => {
  return async dispatch => {
    try {
      dispatch(transferToCourierRequest());
      await axiosApi.put(`/orders/${data.courier}`, data);
      dispatch(getOrders());
    } catch (error) {
      dispatch(transferToCourierFailure(error));
    }
  }
};

export const removeOrder = id => {
  return async dispatch => {
    try {
      dispatch(removeOrderRequest());
      await axiosApi.delete(`/orders/${id}`);
      dispatch(getOrders());
    } catch (error) {
      dispatch(removeOrderFailure(error));
    }
  }
};