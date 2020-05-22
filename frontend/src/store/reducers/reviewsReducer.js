import {
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS,
  FETCH_REVIEW_FAILURE,
  FETCH_REVIEW_REQUEST, FETCH_REVIEW_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS
} from "../actions/reviewActions";

const initialState = {
  reviews: [],
  review: {},
  loading: null,
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
      return {...state, loading: true};
    case FETCH_REVIEWS_SUCCESS:
      return {...state, loading: false, reviews: action.reviews};
    case FETCH_REVIEWS_FAILURE:
      return {...state, loading: false, error: action.error};
    case FETCH_REVIEW_REQUEST:
      return {...state, loading: true};
    case FETCH_REVIEW_SUCCESS:
      return {...state, loading: false, review: action.review};
    case FETCH_REVIEW_FAILURE:
      return {...state, loading: false, error: action.error};
    case CREATE_REVIEW_REQUEST:
      return {...state, loading: true};
    case CREATE_REVIEW_SUCCESS:
      return {...state, loading: null};
    case CREATE_REVIEW_FAILURE:
      return {...state, loading: false, error: action.error};
    case DELETE_REVIEW_REQUEST:
      return {...state, loading: true};
    case DELETE_REVIEW_SUCCESS:
      return {...state, loading: null};
    case DELETE_REVIEW_FAILURE:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export default reviewsReducer;