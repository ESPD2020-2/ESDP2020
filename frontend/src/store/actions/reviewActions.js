import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

export const FETCH_REVIEW_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_REVIEW_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_REVIEW_FAILURE = 'FETCH_POST_FAILURE';

export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE';

export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const DELETE_REVIEW_FAILURE = 'DELETE_REVIEW_FAILURE';

export const fetchReviewsRequest = () => ({type: FETCH_REVIEWS_REQUEST});
export const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEWS_SUCCESS, reviews});
export const fetchReviewsFailure = error => ({type: FETCH_REVIEWS_FAILURE, error});

export const fetchReviewRequest = () => ({type: FETCH_REVIEW_REQUEST});
export const fetchReviewSuccess = reviewId => ({type: FETCH_REVIEW_SUCCESS, reviewId});
export const fetchReviewFailure = error => ({type: FETCH_REVIEW_FAILURE, error});

export const createReviewRequest = () => ({type: CREATE_REVIEW_REQUEST});
export const createReviewSuccess = () => ({type: CREATE_REVIEW_SUCCESS});
export const createReviewFailure = error => ({type: CREATE_REVIEW_FAILURE, error});

export const deleteReviewRequest = () => ({type: DELETE_REVIEW_REQUEST});
export const deleteReviewSuccess = reviewId => ({type: DELETE_REVIEW_SUCCESS, reviewId});
export const deleteReviewFailure = error => ({type: DELETE_REVIEW_FAILURE, error});

export const fetchReviews = () => {
  return async dispatch => {
    try {
      dispatch(fetchReviewsRequest());
      const response = await axiosApi.get('/reviews');
      dispatch(fetchReviewsSuccess(response.data));
    } catch (error) {
      dispatch(fetchReviewsFailure(error));
    }
  }
};

export const fetchReview = reviewId => {
  return async dispatch => {
    try {
      dispatch(fetchReviewRequest());
      const response = await axiosApi.get('/reviews/' + reviewId);
      dispatch(fetchReviewSuccess(response.data));
    } catch (error) {
      dispatch(fetchReviewFailure(error));
    }
  }
};

export const createReview = reviewData => {
  return async dispatch => {
    try {
      dispatch(createReviewRequest());
      const response = await axiosApi.post('/reviews', reviewData);
      dispatch(createReviewSuccess(response.data));
      dispatch(push('/reviews'));
      // dispatch(fetchReviews());
    } catch (error) {
      dispatch(createReviewFailure(error));
    }
  }
};

export const deleteReview = reviewId => {
  return async dispatch => {
    try {
      dispatch(deleteReviewRequest());
      await axiosApi.delete('/reviews/' + reviewId);
      dispatch(fetchReviews());
    } catch (error) {
      dispatch(deleteReviewFailure(error));
    }
  }
};