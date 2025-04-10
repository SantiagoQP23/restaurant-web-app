import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { checkAuthToken, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { PublicRoutes } from '../models';

import { Public } from '../pages/Public/Public.page';
import { NewRestaurant } from '@/pages/Private/Restaurant/views/NewRestaurant/NewRestaurant.view';
import { SetupRestaurant } from '@/pages/Private/SetupRestaurant';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';

const Private = lazy(() => import('../pages/Private/Private'));

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const { status, user } = useAppSelector(selectAuth);
  const { restaurant } = useRestaurantStore((state) => state);

  useEffect(() => {
    dispatch(checkAuthToken());
  }, []);

  const getRoute = () => {
    console.log('getRoute', status);
    if (status === 'not-authenticated') {
      return <Route path='/*' element={<Public />} />;
    } else if (
      status === 'authenticated' &&
      user?.restaurantRoles.length === 0
    ) {
      return <Route path='/*' element={<SetupRestaurant />} />;
    } else {
      return <Route path='/*' element={<Private key={restaurant?.id} />} />;
    }
  };

  return <Routes>{getRoute()}</Routes>;
};
