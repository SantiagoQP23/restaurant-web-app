import { lazy } from 'react';
import { RouteObject } from 'react-router';

import { AddUser } from '../components/AddUser/AddUser.component';
import { UsersList } from '../pages/UsersList.page';

import { EditUser } from '../components/EditUser/EditUser.component';
import { Profile } from '../views/Profile/Profile.view';
import { Account } from '../views/Account/Account.view';
import { PrivateRoutes } from '../../../../models';

const Users = lazy(() => import('../Users.page'));

export const UsersRouter: RouteObject = {
  path: '',
  element: <Users />,
  children: [
    {
      path: '',
      element: <UsersList />
    },
    {
      path: 'edit/:id',
      element: <EditUser />
    },
    {
      path: 'add',
      element: <AddUser />
    }
  ]
};

export const UserRouter: RouteObject = {
  path: PrivateRoutes.USERS,
  element: <Users />,
  children: [
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'account',
      element: <Account />
    }
  ]
};
