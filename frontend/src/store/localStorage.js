import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actions/usersActions";

export const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log('Could not save state');
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const actions = [LOGOUT_USER_SUCCESS, LOGIN_USER_SUCCESS];

export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if (actions.includes(action.type)) {
    console.log('need to save to localstorage');
    saveToLocalStorage({
      users: {
        user: store.getState().users.user
      }
    });
  }

  return result;
};