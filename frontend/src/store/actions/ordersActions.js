import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export const GET_ORDERS_BYPERIOD_REQUEST = 'GET_ORDERS_BYPERIOD_REQUEST';
export const GET_ORDERS_BYPERIOD_SUCCESS = 'GET_ORDERS_BYPERIOD_SUCCESS';
export const GET_ORDERS_BYPERIOD_FAILURE = 'GET_ORDERS_BYPERIOD_FAILURE';

export const GET_DELIVERED_ORDERS_BYPERIOD_SUCCESS = 'GET_DELIVERED_ORDERS_BYPERIOD_SUCCESS';

export const GET_CANCELED_ORDERS_BYPERIOD_SUCCESS = 'GET_CANCELED_ORDERS_BYPERIOD_SUCCESS';

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

export const REJECT_ORDER_REQUEST = 'REJECT_ORDER_REQUEST';
export const REJECT_ORDER_SUCCESS = 'REJECT_ORDER_SUCCESS';
export const REJECT_ORDER_FAILURE = 'REJECT_ORDER_FAILURE';

export const CANCEL_ORDER_REQUEST = 'CANCEL_ORDER_REQUEST';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';

export const PUBLISH_ORDER_REQUEST = 'PUBLISH_ORDER_REQUEST';
export const PUBLISH_ORDER_SUCCESS = 'PUBLISH_ORDER_SUCCESS';
export const PUBLISH_ORDER_FAILURE = 'PUBLISH_ORDER_FAILURE';

export const ADDINFO_ORDER_REQUEST = 'ADDINFO_ORDER_REQUEST';
export const ADDINFO_ORDER_SUCCESS = 'ADDINFO_ORDER_SUCCESS';
export const ADDINFO_ORDER_FAILURE = 'ADDINFO_ORDER_FAILURE';

export const ACCEPT_ORDER_REQUEST = 'ACCEPT_ORDER_REQUEST';
export const ACCEPT_ORDER_SUCCESS = 'ACCEPT_ORDER_SUCCESS';
export const ACCEPT_ORDER_FAILURE = 'ACCEPT_ORDER_FAILURE';

export const getOrdersRequest = () => ({type: GET_ORDERS_REQUEST});
export const getOrdersSuccess = (orders) => ({type: GET_ORDERS_SUCCESS, orders});
export const getOrdersFailure = (error) => ({type: GET_ORDERS_FAILURE, error});

export const getOrdersByPeriodRequest = () => ({type: GET_ORDERS_BYPERIOD_REQUEST});
export const getOrdersByPeriodSuccess = (orders) => ({type: GET_ORDERS_BYPERIOD_SUCCESS, orders});
export const getOrdersByPeriodFailure = (error) => ({type: GET_ORDERS_BYPERIOD_FAILURE, error});

export const getDeliveredOrdersByPeriodSuccess = (deliveredOrders) => ({type: GET_DELIVERED_ORDERS_BYPERIOD_SUCCESS, deliveredOrders});

export const getCanceledOrdersByPeriodSuccess = (canceledOrders) => ({type: GET_CANCELED_ORDERS_BYPERIOD_SUCCESS, canceledOrders});

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

export const rejectOrderRequest = () => ({type: REJECT_ORDER_REQUEST});
export const rejectOrderSuccess = () => ({type: REJECT_ORDER_SUCCESS});
export const rejectOrderFailure = (error) => ({type: REJECT_ORDER_FAILURE, error});

export const cancelOrderRequest = () => ({type: CANCEL_ORDER_REQUEST});
export const cancelOrderSuccess = () => ({type: CANCEL_ORDER_SUCCESS});
export const cancelOrderFailure = (error) => ({type: CANCEL_ORDER_FAILURE, error});

export const publishOrderRequest = () => ({type: PUBLISH_ORDER_REQUEST});
export const publishOrderSuccess = () => ({type: PUBLISH_ORDER_SUCCESS});
export const publishOrderFailure = (error) => ({type: PUBLISH_ORDER_FAILURE, error});

export const addInfoOrderRequest = () => ({type: ADDINFO_ORDER_REQUEST});
export const addInfoOrderSuccess = () => ({type: ADDINFO_ORDER_SUCCESS});
export const addInfoOrderFailure = (error) => ({type: ADDINFO_ORDER_FAILURE, error});

export const acceptOrderRequest = () => ({type: ACCEPT_ORDER_REQUEST});
export const acceptOrderSuccess = () => ({type: ACCEPT_ORDER_SUCCESS});
export const acceptOrderFailure = (error) => ({type: ACCEPT_ORDER_FAILURE, error});

export const getOrders = (status, courierId) => {
  return async dispatch => {
    try {
      let orders;
      dispatch(getOrdersRequest());
      if (status && !courierId) {
        orders = await axiosApi.get(`/orders?status=${status}`);
      } else if (status && courierId) {
        orders = await axiosApi.get(`/orders?status=${status}&courier=${courierId}`);
      } else {
        orders = await axiosApi.get('/orders');
      }
      dispatch(getOrdersSuccess(orders.data));
    } catch (error) {
      dispatch(getOrdersFailure(error));
    }
  }
};

export const getOrdersByPeriod = (period, status) => {
  return async dispatch => {
    try {
      let orders;
      dispatch(getOrdersByPeriodRequest());
      if (!status) {
        orders = await axiosApi.get(`/orders/statistics/?period=${period}&status=created`);
        dispatch(getOrdersByPeriodSuccess(orders.data));
      } 
      if (status === 'delivered') {
        orders = await axiosApi.get(`/orders/statistics/?period=${period}&status=delivered`);
        dispatch(getDeliveredOrdersByPeriodSuccess(orders.data));
      }
      if (status === 'canceled') {
        orders = await axiosApi.get(`/orders/statistics/?period=${period}&status=canceled`);
        dispatch(getCanceledOrdersByPeriodSuccess(orders.data));
      }
    } catch (error) {
      dispatch(getOrdersByPeriodFailure(error));
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
      dispatch(getOrderFailure(error));
    }
    
  }
};

export const createOrder = data => {
  return async dispatch => {
    try {
      dispatch(createOrderRequest());
      const response = await axiosApi.post(`/orders`, data);
      toast.success(response.data.message);
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
      const response = await axiosApi.patch(`/orders/${id}/publish`);
      toast.success(response.data.message);
      dispatch(getOrders('created,rejected'));
    } catch (error) {
      dispatch(publishOrderFailure(error));
      toast.error(error.response.data.error);
    }
  }
};

export const addInfoOrder = (id, info) => {
  console.log(id, info)
  return async dispatch => {
    try {
      dispatch(addInfoOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/addInfo`, {info});
      toast.success(response.data.message);
      dispatch(getOrders('created,rejected'));
    } catch (error) {
      dispatch(addInfoOrderFailure(error));
      toast.error(error.response.data.error);
    }
  }
};

export const acceptOrder = (id) => {
  return async dispatch => {
    try {
      dispatch(acceptOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/accept`);
      toast.success(response.data.message);
      dispatch(getOrders('published'));
    } catch (error) {
      dispatch(acceptOrderFailure(error));
      toast.error(error.response.data.error);
    }
  }
};

export const editOrder = (id, data) => {
  return async dispatch => {
    try {
      dispatch(editOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/edit`, data);
      toast.success(response.data.message);
      dispatch(push('/adm/orders/created'));
    } catch (error) {
      dispatch(editOrderFailure(error));
    }
  }
};

export const removeOrder = id => {
  return async dispatch => {
    try {
      dispatch(removeOrderRequest());
      const response = await axiosApi.delete(`/orders/${id}`);
      toast.success(response.data.message);
      dispatch(getOrders('created,rejected'));
    } catch (error) {
      dispatch(removeOrderFailure(error));
      toast.error(error.response.data.error);
    }
  }
};

export const transferToCourier = (id, courierId) => {
  return async dispatch => {
    try {
      dispatch(transferToCourierRequest());
      const response = await axiosApi.patch(`/orders/${id}/transfer`, {courierId});
      toast.success(response.data.message);
      dispatch(getOrders('created,rejected'));
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(transferToCourierFailure(error));
    }
  }
};

export const rejectOrder = (id, reason) => {
  return async dispatch => {
    try {
      dispatch(rejectOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/reject`, {reason});
      toast.success(response.data.message);
      dispatch(getOrders('accepted')); 
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(rejectOrderFailure(error));
    }
  }
};

export const cancelOrder = (id, reason) => {
  return async dispatch => {
    try {
      dispatch(cancelOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/cancel`, {reason});
      toast.success(response.data.message);
      dispatch(getOrders('created,rejected'));
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(cancelOrderFailure(error));
    }
  }
};

export const deliveredOrder = (id, comment, courierId) => {
  return async dispatch => {
    try {
      dispatch(cancelOrderRequest());
      const response = await axiosApi.patch(`/orders/${id}/delivered`, {comment});
      toast.success(response.data.message);
      dispatch(getOrders('accepted', courierId));
    } catch (error) {
      dispatch(cancelOrderFailure(error));
    }
  }
};
