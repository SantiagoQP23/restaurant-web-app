import { Navigate, RouteObject } from 'react-router-dom';

import SidebarLayout from '../layouts/SidebarLayout/SidebarLayout.component';

import { PrivateRoutes } from '../../../models';
import { OrderRouter } from '../Orders/router';
import { MenuEditRouter } from '../EditMenu/router/MenuEdit.router';
import { ClientsRouter } from '../Clients/router/Clients.router';
import { TablesRouter } from '../Tables/router/Tables.router';
import { UsersRouter, UserRouter } from '../Users/router/Users.router';
import { ReportsRouter } from '../Reports/router/Reports.router';
import { BalanceRouter } from '../Balance/router/Balance.router';
import { SuppliersRouter } from '../Suppliers/router/Suppliers.router';
import { InvoiceRouter } from '../Invoices/router/Invoice.router';
import { RestaurantRouter } from '../Restaurant/router';
import { UnauthorizedPage } from '../../Status/Unauthorized.page';
import Auth from '../components/Auth.component';
import { ValidRoles } from '../Common/models/valid-roles.model';
import { BillsRouter } from '../Bills/routers/Bills.router';
import BaseLayout from '../layouts/BaseLayout';
import { NewRestaurant } from '../Restaurant/views/NewRestaurant/NewRestaurant.view';

export const PrivateRouter: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      // MenuRouter,
      OrderRouter,
      InvoiceRouter,
      MenuEditRouter,
      ClientsRouter,
      TablesRouter,
      UserRouter,
      BillsRouter,
      {
        path: PrivateRoutes.USERS,
        element: <Auth allowedRoles={[ValidRoles.admin]} />,
        children: [UsersRouter]
      },
      {
        path: PrivateRoutes.REPORTS,
        element: <Auth allowedRoles={[ValidRoles.admin]} />,
        children: [ReportsRouter]
      },
      {
        path: '/financial',
        element: <Auth allowedRoles={[ValidRoles.admin]} />,
        children: [BalanceRouter]
      },
      SuppliersRouter,

      {
        path: 'unauthorized',
        element: <UnauthorizedPage />
      },
      {
        path: '/auth/login',
        element: <Navigate to={PrivateRoutes.ORDERS} />
      },
      {
        path: '',
        element: <Navigate to={PrivateRoutes.ORDERS} />
      },
      {
        path: 'ORD.ORDERS',
        element: <Navigate to={PrivateRoutes.ORDERS} />
      },
      {
        path: '*',
        element: <Navigate to={PrivateRoutes.ORDERS} />
      }
    ]
  },
  {
    path: 'restaurant',
    element: <Auth allowedRoles={[ValidRoles.admin]} />,
    children: [RestaurantRouter]
  }
];

export const SetupRestaurantRoutes: RouteObject[] = [
  {
    path: '/restaurant',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <NewRestaurant />
      },
      {
        path: 'new',
        element: <NewRestaurant />
      },
      {
        path: '*',
        element: <Navigate to={'/restaurant/new'} />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/restaurant'} />
  }
];
