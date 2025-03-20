import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { checkAuthToken, selectAuth } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { PublicRoutes } from '../models';

import { Public } from '../pages/Public/Public.page';

const Private = lazy(() => import('../pages/Private/Private'));

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const { status, user } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(checkAuthToken());
  }, []);

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/*' element={<Public />} />
        </>
      ) : (
        user && <Route path='/*' element={<Private />} />
      )}
    </Routes>
  );
};
