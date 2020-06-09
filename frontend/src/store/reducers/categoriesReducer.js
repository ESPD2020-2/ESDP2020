import {FETCH_CATEGORIES_SUCCESS} from "../actions/categoriesActions";

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  if (action.type === FETCH_CATEGORIES_SUCCESS) {
    return {...state, categories: action.categories};
  }

  return state;
};

export default categoriesReducer;