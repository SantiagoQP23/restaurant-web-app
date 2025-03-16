import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

// import { EditClient } from "../components/EditClient";
import { BillsList } from '../views/BillsList/BillsList.view';
import { PaymentBill } from '../views/PaymentBill/PaymentBill.view';
import { Bill } from '../views/Bill/Bill.view';

const Bills = lazy(() => import('../Bills.page'));

export const BillsRouter: RouteObject = {
  path: 'bills',
  element: <Bills />,
  children: [
    {
      path: '',
      element: <BillsList />
    },
    {
      path: ':id',
      element: <Bill />
    },
    {
      path: ':id/edit',
      element: <PaymentBill />
    }
  ]
};
