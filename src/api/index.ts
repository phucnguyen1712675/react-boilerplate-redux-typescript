import axios from 'axios';
import appConfig from 'config';

const axiosClient = axios.create({
  baseURL: appConfig.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { default as authApi } from 'api/authApi';
export { default as postsApi } from 'api/postsApi';
export { default as usersApi } from 'api/usersApi';

export default axiosClient;
