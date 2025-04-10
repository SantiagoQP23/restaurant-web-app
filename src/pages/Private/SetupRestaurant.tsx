import React from 'react';
import { useRoutes } from 'react-router-dom';
import { SetupRestaurantRoutes } from './router';

export const SetupRestaurant = () => {
  const content = useRoutes(SetupRestaurantRoutes);
  console.log('SetupRestaurant');
  return <div>{content}</div>;
};
