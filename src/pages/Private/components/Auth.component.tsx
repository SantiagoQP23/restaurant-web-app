import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redux';
import { Roles } from '@/models/roles';

interface Props {
  allowedRoles: Roles[];
}

const Auth: FC<Props> = ({ allowedRoles }) => {
  const { user } = useSelector(selectAuth);
  const location = useLocation();

  return allowedRoles.find(
    (role) =>
      // user?.restaurantRoles[0]?.role.name.includes(role)
      !!user
  ) ? (
    <Outlet />
  ) : user?.username ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/register' state={{ from: location }} replace />
  );
};

export default Auth;
