import axios from 'axios';
import { toast } from "react-toastify";

export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
export const GET_ADDRESS_FAILURE = 'GET_ADDRESS_FAILURE';
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_FAILURE = 'GET_ADDRESSES_FAILURE';

export const getAddressSuccess = (address) => ({type: GET_ADDRESS_SUCCESS, address});
export const getAddressFailure = (error) => ({type: GET_ADDRESS_FAILURE, error});

export const getAddressesSuccess = (addresses) => ({type: GET_ADDRESSES_SUCCESS, addresses});
export const getAddressesFailure = (error) => ({type: GET_ADDRESSES_FAILURE, error});

export const getAddressByGeodata = (lat, lng) => {
  return async dispatch => {
    try {
      const url = `https://admin.nambafood.swift.kg/api/search_geo_address/?lat=${lat}&lon=${lng}`
      const response = await axios.get(url);
      dispatch(getAddressSuccess(response.data.addresses[0]));
    } catch (error) {
      if (error.response) {
        dispatch(getAddressFailure(error.response.data));
      } else {
        toast.error('No connection to server');
      }
    }
  }
};

export const getAddressesByName = (value) => {
  return async dispatch => {
    try {
      const url = `https://admin.nambafood.swift.kg/api/search_address/?q=${value}`;
      const response = await axios.get(url);
      dispatch(getAddressesSuccess(response.data.addresses));
    } catch (error) {
      if (error.response) {
        dispatch(getAddressesFailure(error.response.data));
      } else {
        toast.error('No connection to server');
      }
    }
  }
};
