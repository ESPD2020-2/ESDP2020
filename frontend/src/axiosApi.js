import axios from 'axios';
import config from "./config";
import store from './store/configureStore';
import { toast } from "react-toastify";

const axiosApi = axios.create({
    baseURL: config.apiURL
});

axiosApi.interceptors.request.use((config)=> {
    try {
        config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
    } catch (e) {
       //do nothing
    }
    return config;
});

axiosApi.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response&&error.response.status === 401) {
      localStorage.removeItem('state')
      window.location.replace('/');
    } else if (!error.response) {
      toast.error('No connection to server');
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  });



export default axiosApi;