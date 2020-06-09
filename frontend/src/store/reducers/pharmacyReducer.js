import {FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_SUCCESS} from "../actions/pharmacyActions";

const initialState = {
  products: [],
  product: null
};

const pharmacyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.products};
    case FETCH_PRODUCT_SUCCESS:
      return {...state, product: action.product};
    default:
      return state;
  }
};

export default pharmacyReducer;
