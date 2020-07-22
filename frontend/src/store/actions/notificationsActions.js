import axiosApi from "../../axiosApi";

export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';

export const GET_NEW_NOTIFICATIONS_REQUEST = 'GET_NEW_NOTIFICATIONS_REQUEST';
export const GET_NEW_NOTIFICATIONS_SUCCESS = 'GET_NEW_NOTIFICATIONS_SUCCESS';
export const GET_NEW_NOTIFICATIONS_FAILURE = 'GET_NEW_NOTIFICATIONS_FAILURE';

export const GET_NOTIFICATION_REQUEST = 'GET_NOTIFICATION_REQUEST';
export const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
export const GET_NOTIFICATION_FAILURE = 'GET_NOTIFICATION_FAILURE';

export const getNotificationsRequest = () => ({type: GET_NOTIFICATIONS_REQUEST});
export const getNotificationsSuccess = (notifications) => ({type: GET_NOTIFICATIONS_SUCCESS, notifications});
export const getNotificationsFailure = (error) => ({type: GET_NOTIFICATIONS_FAILURE, error});

export const getNewNotificationsRequest = () => ({type: GET_NEW_NOTIFICATIONS_REQUEST});
export const getNewNotificationsSuccess = (notifications) => ({type: GET_NEW_NOTIFICATIONS_SUCCESS, notifications});
export const getNewNotificationsFailure = (error) => ({type: GET_NEW_NOTIFICATIONS_FAILURE, error});

export const getNotificationRequest = () => ({type: GET_NOTIFICATION_REQUEST});
export const getNotificationSuccess = (notification) => ({type: GET_NOTIFICATION_SUCCESS, notification});
export const getNotificationFailure = (error) => ({type: GET_NOTIFICATION_FAILURE, error});

export const getNotifications = () => {
  return async dispatch => {
    try {
      dispatch(getNotificationsRequest());
      const notifications = await axiosApi.get(`/notifications`);
      dispatch(getNotificationsSuccess(notifications.data));
    } catch (error) {
      dispatch(getNotificationsFailure(error));
    }
  }
};

export const getNewNotifications = () => {
  return async dispatch => {
    try {
      dispatch(getNewNotificationsRequest());
      const notifications = await axiosApi.get(`/notifications/new`);
      dispatch(getNewNotificationsSuccess(notifications.data));
    } catch (error) {
      dispatch(getNewNotificationsFailure(error));
    }
  }
};

export const setNotificationsWasRead = () => {
  return async dispatch => {
    try {
      await axiosApi.patch(`/notifications/`);
      await dispatch(getNewNotifications());
      await dispatch(getNotifications());
    } catch (error) {
      console.log(error)
    }
  }
};

