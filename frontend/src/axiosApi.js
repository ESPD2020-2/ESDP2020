import axios from 'axios';
import {apiURL} from "./constants";
import store from './store/configureStore';

const axiosApi = axios.create({
    baseURL: apiURL
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
    } catch (e) {
        // do nothing
    }

    return config;
});

export default axiosApi;