import {
  GET_STREETS_REQUEST,
  GET_STREETS_SUCCESS,
  GET_STREETS_FAILURE,
} from "../actions/streetsActions";

const initialState = {
  streets: [],
  loading: null,
  error: null,
};

const streetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STREETS_REQUEST:
      return { ...state, loading: true };
    case GET_STREETS_SUCCESS:
      return { ...state, loading: false, streets: action.streets };
    case GET_STREETS_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default streetsReducer;
