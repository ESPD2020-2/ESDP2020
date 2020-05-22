import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});

export const fetchCategories = () => {
  return async dispatch => {
    const response = await axiosApi.get('/categories');

    dispatch(fetchCategoriesSuccess(response.data));
  }
};