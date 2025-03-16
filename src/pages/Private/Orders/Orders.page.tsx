import { Outlet } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ModalClientOrder } from './components';

import { ModalDeleteOrderDetail } from './components/modals/ModalDeleteOrderDetail.component';

import { ModalDeleteOrder } from './components/modals/ModalDeleteOrder.component';

/**
 * Orders page
 * @version 1.1 28-12-2023 Adding the useOnOrderCreated, useOnOrderUpdated and useOnOrderDeleted hooks
 * @version 1.2 02-01-2024 Remove the useOnOrderCreated, useOnOrderUpdated and useOnOrderDeleted hooks
 *
 */
export const Orders = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Outlet />

        <ModalClientOrder />
      </LocalizationProvider>

      <ModalDeleteOrder />
      <ModalDeleteOrderDetail />
    </>
  );
};

export default Orders;
