import {TOGGLE_HIDE_MENU, CLOSE_HIDE_MENU, TOGGLE_DRAWER} from "../actions/mainActions";

const initialState = {
  hideMenu: false,
  drawerOpen: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HIDE_MENU:
      return {
        ...state, hideMenu: !state.hideMenu
      }
    case CLOSE_HIDE_MENU:
      return {...state, hideMenu: false}
    case TOGGLE_DRAWER:
      return {...state, drawerOpen: !state.drawerOpen}
    default:
      return state;
  }
};

export default mainReducer;