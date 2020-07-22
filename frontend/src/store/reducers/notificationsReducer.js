import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NEW_NOTIFICATIONS_REQUEST,
  GET_NEW_NOTIFICATIONS_SUCCESS,
  GET_NEW_NOTIFICATIONS_FAILURE,
} from "../actions/notificationsActions";

const initialState = {
  notifications: null,
  newNotifications: null,
  loading: null,
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications, loading: false };
    case GET_NOTIFICATIONS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_NEW_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NEW_NOTIFICATIONS_SUCCESS:
      return { ...state, newNotifications: action.notifications, loading: false };
    case GET_NEW_NOTIFICATIONS_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default ordersReducer;
