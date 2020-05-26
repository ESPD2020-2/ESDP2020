import {CLOSE_DRAWER, TOGGLE_DRAWER} from "../actions/mainActions";

const initialState = {
  drawerOpen: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_DRAWER:
      return {...state, drawerOpen: false}
    case TOGGLE_DRAWER:
      return {...state, drawerOpen: !state.drawerOpen}
    default:
      return state;
  }
};

export default mainReducer;