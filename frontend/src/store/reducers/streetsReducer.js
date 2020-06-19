import {
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE
} from "../actions/streetsActions";

const initialState = {
  address: null,
  addresses: [],
  error: null,
};

const streetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_SUCCESS:
      return { ...state, address: action.address };
    case GET_ADDRESS_FAILURE:
      return { ...state, error: action.error };
    case GET_ADDRESSES_SUCCESS:
      return { ...state, addresses: action.addresses };
    case GET_ADDRESSES_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default streetsReducer;
