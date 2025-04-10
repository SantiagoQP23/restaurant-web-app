import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
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
  const restaurant = useRestaurantStore.getState().restaurant;

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  };

  if (restaurant) {
    config.headers['x-restaurant-id'] = restaurant.id;
  }

  return config;
});

restauranteApi.interceptors.response.use(
  (resp) => resp,
  (err) => {
    return Promise.reject(err.response);
  }
);

export default restauranteApi;
