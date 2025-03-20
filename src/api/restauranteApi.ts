import axios from 'axios';

import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const restauranteApi = axios.create({
  baseURL: VITE_API_URL,
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores

restauranteApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  };

  return config;
});

restauranteApi.interceptors.response.use(
  (resp) => resp,
  (err) => {
    return Promise.reject(err.response);
  }
);

export default restauranteApi;
