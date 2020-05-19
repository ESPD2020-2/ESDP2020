import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';

export const EDIT_ORDER_REQUEST = 'EDIT_ORDER_REQUEST';
export const EDIT_ORDER_SUCCESS = 'EDIT_ORDER_SUCCESS';
export const EDIT_ORDER_FAILURE = 'EDIT_ORDER_FAILURE';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const TRANSFER_TO_COURIER_REQUEST = 'TRANSFER_TO_COURIER_REQUEST';
export const TRANSFER_TO_COURIER_SUCCESS = 'TRANSFER_TO_COURIER_SUCCESS';
export const TRANSFER_TO_COURIER_FAILURE = 'TRANSFER_TO_COURIER_FAILURE';

export const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
export const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
export const REMOVE_ORDER_FAILURE = 'REMOVE_ORDER_FAILURE';

export const PUBLISH_ORDER_REQUEST = 'PUBLISH_ORDER_REQUEST';
export const PUBLISH_ORDER_SUCCESS = 'PUBLISH_ORDER_SUCCESS';
export const PUBLISH_ORDER_FAILURE = 'PUBLISH_ORDER_FAILURE';

export const ACCEPT_ORDER_REQUEST = 'ACCEPT_ORDER_REQUEST';
export const ACCEPT_ORDER_SUCCESS = 'ACCEPT_ORDER_SUCCESS';
export const ACCEPT_ORDER_FAILURE = 'ACCEPT_ORDER_FAILURE';

export const getOrdersRequest = () => ({type: GET_ORDERS_REQUEST});
export const getOrdersSuccess = (orders) => ({type: GET_ORDERS_SUCCESS, orders});
export const getOrdersFailure = (error) => ({type: GET_ORDERS_FAILURE, error});

export const getOrderRequest = () => ({type: GET_ORDER_REQUEST});
export const getOrderSuccess = (order) => ({type: GET_ORDER_SUCCESS, order});
export const getOrderFailure = (error) => ({type: GET_ORDER_FAILURE, error});

export const editOrderRequest = () => ({type: EDIT_ORDER_REQUEST});
export const editOrderSuccess = () => ({type: EDIT_ORDER_SUCCESS});
export const editOrderFailure = (error) => ({type: EDIT_ORDER_FAILURE, error});

export const createOrderRequest = () => ({type: CREATE_ORDER_REQUEST});
export const createOrderSuccess = () => ({type: CREATE_ORDER_SUCCESS});
export const createOrderFailure = (error) => ({type: CREATE_ORDER_FAILURE, error});

export const transferToCourierRequest = () => ({type: TRANSFER_TO_COURIER_REQUEST});
export const transferToCourierSuccess = () => ({type: TRANSFER_TO_COURIER_SUCCESS});
export const transferToCourierFailure = (error) => ({type: TRANSFER_TO_COURIER_FAILURE, error});

export const removeOrderRequest = () => ({type: REMOVE_ORDER_REQUEST});
export const removeOrderSuccess = () => ({type: REMOVE_ORDER_SUCCESS});
export const removeOrderFailure = (error) => ({type: REMOVE_ORDER_FAILURE, error});

export const publishOrderRequest = () => ({type: PUBLISH_ORDER_REQUEST});
export const publishOrderSuccess = () => ({type: PUBLISH_ORDER_SUCCESS});
export const publishOrderFailure = (error) => ({type: PUBLISH_ORDER_FAILURE, error});

export const acceptOrderRequest = () => ({type: ACCEPT_ORDER_REQUEST});
export const acceptOrderSuccess = () => ({type: ACCEPT_ORDER_SUCCESS});
export const acceptOrderFailure = (error) => ({type: ACCEPT_ORDER_FAILURE, error});

export const getOrders = (status) => {
  return async dispatch => {
    try {
      let orders;
      dispatch(getOrdersRequest());
      if (status) {
        orders = await axiosApi.get(`/orders?status=${status}`);
      } else {
        orders = await axiosApi.get('/orders');
      }
      dispatch(getOrdersSuccess(orders.data));
    } catch (error) {
      dispatch(getOrdersFailure(error));
    }
  }
};

export const getOrder = id => {
  return async dispatch => {
    try {
      dispatch(getOrderRequest());
      const order = await axiosApi.get(`/orders/${id}`);
      dispatch(getOrderSuccess(order.data));
    } catch (error) {
      console.log(error)
      dispatch(getOrderFailure(error));
    }
    
  }
};

export const createOrder = data => {
  return async dispatch => {
    try {
      dispatch(createOrderRequest());
      await axiosApi.post(`/orders`, data);
      dispatch(push('/adm/orders/created'));
    } catch (error) {
      dispatch(createOrderFailure(error));
    }
  }
};

export const publishOrder = id=> {
  return async dispatch => {
    try {
      dispatch(publishOrderRequest());
      await axiosApi.patch(`/orders/${id}/publish`);
      dispatch(getOrders('created'));
    } catch (error) {
      dispatch(publishOrderFailure(error));
    }
  }
};

export const acceptOrder = (id) => {
  return async dispatch => {
    try {
      dispatch(acceptOrderRequest());
      await axiosApi.patch(`/orders/${id}/accept`);
      dispatch(getOrders('published'));
    } catch (error) {
      dispatch(acceptOrderFailure(error));
    }
  }
};

export const editOrder = (id, data) => {
  return async dispatch => {
    try {
      dispatch(editOrderRequest());
      await axiosApi.patch(`/orders/${id}/edit`, data);
      dispatch(push('/adm/orders/created'));
    } catch (error) {
      dispatch(editOrderFailure(error));
    }
  }
};

export const transferToCourier = data => {
  return async dispatch => {
    try {
      dispatch(transferToCourierRequest());
      await axiosApi.patch(`/orders/${data.courier}`, data);
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
      dispatch(getOrders('created'));
    } catch (error) {
      dispatch(removeOrderFailure(error));
    }
  }
};