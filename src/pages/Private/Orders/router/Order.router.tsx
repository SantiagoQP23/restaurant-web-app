import { RouteObject } from 'react-router-dom';
import {
  ListOrders,
  EditOrder,
  MenuAddProductsOrder,
  AddOrder,
  ReceiptOrder,
  ActiveOrders,
  OrdersDashboard
} from '../views';
import { PrivateRoutes } from '../../../../models/routes.model';

import { lazy } from 'react';
import { Menu } from '../../Menu';

const Orders = lazy(() => import('../Orders.page'));

export const OrderRouter: RouteObject = {
  path: PrivateRoutes.ORDERS,
  element: <Orders />,
  children: [
    {
      path: '',
      element: <OrdersDashboard />
    },
    {
      path: 'actives',
      element: <ActiveOrders />
    },
    {
      path: 'list',
      element: <ListOrders />
    },
    {
      path: 'list/edit/:orderId',
      element: <EditOrder />
    },
    {
      path: 'list/edit/:orderId/products',
      element: <MenuAddProductsOrder />
    },
    {
      path: 'list/edit/:orderId/receipt',
      element: <ReceiptOrder />
    },
    {
      path: 'add',
      element: <AddOrder />
    },
    {
      path: 'add/menu',
      element: <Menu />
    }
  ]
};
