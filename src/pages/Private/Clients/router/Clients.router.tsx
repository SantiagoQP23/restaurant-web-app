import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { PrivateRoutes } from '../../../../models/routes.model';
import { ClientsList } from '../components';
import { AddClient } from '../components/AddClient';
import { EditClient } from '../components/EditClient';

const Clients = lazy(() => import('../Clients.page'));

export const ClientsRouter: RouteObject = {
  path: PrivateRoutes.CLIENTS,
  element: <Clients />,
  children: [
    {
      path: '',
      element: <ClientsList />
    },
    {
      path: 'edit',
      element: <EditClient />
    },
    {
      path: 'add',
      element: <AddClient />
    }
  ]
};
