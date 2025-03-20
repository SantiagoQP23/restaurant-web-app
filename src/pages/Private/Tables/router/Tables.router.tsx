import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';
import { EditTable, ListTables } from '../components';

const Tables = lazy(() => import('../Tables.page'));

export const TablesRouter: RouteObject = {
  path: PrivateRoutes.TABLES,
  element: <Tables />,
  children: [
    {
      path: '',
      element: <ListTables />
    },
    {
      path: 'edit',
      element: <EditTable />
    }
  ]
};
