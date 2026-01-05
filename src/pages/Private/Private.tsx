import { useNavigate, useRoutes } from 'react-router-dom';

import { useAppSelector, useMenu } from '../../hooks';

import { PrivateRouter } from './router';
import { SidebarProvider } from './Common/contexts/SidebarContext';

import { CircularProgress } from '@mui/material';
import { OrderProvider } from './Orders/context/Order.context';
import { useRestaurant } from './Restaurant/hooks/useRestaurant';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  useAllActiveCashRegisters,
  useCashRegisterActive
} from './Balance/hooks/useCashRegister';
import { ModalCreateCashRegister } from './Balance/components/ModalCreateCashRegister.component';
import {
  useActiveOrders,
  useOnOrderCreated,
  useOnOrderDeleted,
  useOnOrderUpdated
} from './Orders/hooks';
import { useProductionAreas } from './Restaurant/hooks/useProductionArea';
import { useTables } from './Tables/hooks/useTables';
import { useOnTableUpdated } from './Tables/hooks/useOnWebSocketsEventsTables';
import { selectAuth } from '@/redux';
import { useEffect } from 'react';

/**
 * Component that contains the private routes of the application
 * @author Santiago Quirumbay
 * @version 1.1 28/11/2023 Adding the useMenu hook to load the menu
 * @version 1.2 26/12/2023 Adds socket event interface and tablesQuery
 * @version 1.3 27/12/2023 Refactoring the code to use the useTahbles and useOnTableUpdated hooks
 * @version 1.4 02/01/2024 Adding the useOnOrderCreated, useOnOrderUpdated and useOnOrderDeleted hooks
 *
 * @returns JSX.Element
 */
export const Private = () => {
  const content = useRoutes(PrivateRouter);

  // Load all menu
  const menuQuery = useMenu();

  // Load production areas
  const areasQuery = useProductionAreas();

  // Load active orders
  const { activeOrdersQuery } = useActiveOrders();

  // Load tables
  const { tablesQuery } = useTables();

  // Load cash register active
  // useCashRegisterActive();

  useAllActiveCashRegisters();

  // listener update table
  useOnTableUpdated();

  // const restaurantQuery = useRestaurant();

  const isLoading =
    activeOrdersQuery.isPending ||
    // restaurantQuery.isPending ||
    menuQuery.isPending ||
    areasQuery.isPending;
  // tablesQuery.isPending;

  // listener new order
  useOnOrderCreated();

  // listener update order
  useOnOrderUpdated();

  // listener delete order
  useOnOrderDeleted();

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <OrderProvider>
          <SidebarProvider>
            <>{content}</>
          </SidebarProvider>
        </OrderProvider>

        <ModalCreateCashRegister />
      </LocalizationProvider>
    </>
  );
};

export default Private;
