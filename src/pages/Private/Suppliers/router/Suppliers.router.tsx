import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';
import { SuppliersList } from '../views/SuppliersList/SuppliersList.view';

const SuppliersPage = lazy(() => import('../Suppliers.page'));

export const SuppliersRouter: RouteObject = {
  path: PrivateRoutes.SUPPLIERS,
  element: <SuppliersPage />,
  children: [
    {
      path: '',
      element: <SuppliersList />
    }
  ]
};
