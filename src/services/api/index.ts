import axios from 'axios';
import config from 'config';

const axiosClient = axios.create({
  baseURL: config.REACT_APP_BASE_URL,
});

export default axiosClient;
