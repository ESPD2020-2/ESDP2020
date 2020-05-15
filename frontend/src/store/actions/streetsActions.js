import axiosApi from "../../axiosApi";

export const GET_STREETS_REQUEST = 'GET_STREETS_REQUEST';
export const GET_STREETS_SUCCESS = 'GET_STREETS_SUCCESS';
export const GET_STREETS_FAILURE = 'GET_STREETS_FAILURE';

// export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
// export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
// export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// export const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
// export const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
// export const REMOVE_ORDER_FAILURE = 'REMOVE_ORDER_FAILURE';

export const getStreetsRequest = () => ({type: GET_STREETS_REQUEST});
export const getStreetsSuccess = (streets) => ({type: GET_STREETS_SUCCESS, streets});
export const getStreetsFailure = (error) => ({type: GET_STREETS_FAILURE, error});

// export const createOrderRequest = () => ({type: CREATE_ORDER_REQUEST});
// export const createOrderSuccess = () => ({type: CREATE_ORDER_SUCCESS});
// export const createOrderFailure = (Error1) => ({type: CREATE_ORDER_FAILURE, Error1});

// export const removeOrderRequest = () => ({type: REMOVE_ORDER_REQUEST});
// export const removeOrderSuccess = () => ({type: REMOVE_ORDER_SUCCESS});
// export const removeOrderFailure = (Error1) => ({type: TRANSFER_TO_COURIER_FAILURE, Error1});

export const getStreets = (query) => {
  return async dispatch => {
    try {
      let streets;
      dispatch(getStreetsRequest());
      if (!query) {
        streets = await axiosApi.get('/streets/');
      } else {
        streets = await axiosApi.get(`/streets?search=${query}`);
      }
      dispatch(getStreetsSuccess(streets.data));
    } catch (error) {
      dispatch(getStreetsFailure(error));
    }
  }
};

// export const createOrder = data => {
//   return async dispatch => {
//     try {
//       dispatch(createOrderRequest());
//       await axiosApi.post(`/orders`, data);
//       dispatch(getOrders());
//     } catch (Error1) {
//       dispatch(createOrderFailure(Error1));
//     }
//   }
// };

// export const removeOrder = id => {
//   return async dispatch => {
//     try {
//       dispatch(removeOrderRequest());
//       await axiosApi.delete(`/orders/${id}`);
//       dispatch(getOrders());
//     } catch (Error1) {
//       dispatch(removeOrderFailure(Error1));
//     }
//   }
// };