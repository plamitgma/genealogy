import axios from 'axios';
import utils from './index';

const baseURL = 'http://staging.streamy.live/api/v1';

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    try {
        if (utils.isAuthenticated()) {
          let configToken = utils.getAllConfigAuthToken();
          config.headers = configToken;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
});

export default axiosClient;
