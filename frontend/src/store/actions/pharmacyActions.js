import axiosApi from "../../axiosApi";

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';


export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});

export const fetchProducts = categoryId => {
  return async (dispatch) => {
    let url = '/products';

    if (categoryId) {
      url += '?category=' + categoryId;
    }

    const response = await axiosApi.get(url);
    dispatch(fetchProductsSuccess(response.data));
  };
};

export const createProduct = productData => {
  return async (dispatch) => {
    await axiosApi.post('/products', productData);
    dispatch(createProductSuccess());
  };
};

export const fetchProduct = id => {
  return async dispatch => {
    const response = await axiosApi.get('/products/' + id);
    dispatch(fetchProductSuccess(response.data));
  }
};
