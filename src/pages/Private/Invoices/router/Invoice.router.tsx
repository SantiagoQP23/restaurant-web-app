import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';
import { InvoicesList } from '../views/InvoicesList/InvoicesList.view';
import { Invoice } from '../views/Invoice/Invoice.view';
import { AddInvoice } from '../views/AddInvoice/AddInvoice.view';

const Invoices = lazy(() => import('../Invoices.page'));

export const InvoiceRouter: RouteObject = {
  path: PrivateRoutes.INVOICES,
  element: <Invoices />,
  children: [
    {
      path: ':invoiceId',
      element: <Invoice />
    },
    {
      path: '',
      element: <InvoicesList />
    },
    {
      path: 'add',
      element: <AddInvoice />
    }
  ]
};
