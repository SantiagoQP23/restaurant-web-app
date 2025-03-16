import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const RestaurantPage = lazy(() => import('../Restaurant.page'));

export const RestaurantRouter: RouteObject = {
  path: '/restaurant',
  element: <RestaurantPage />
};
