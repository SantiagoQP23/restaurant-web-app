import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';

import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';

import { CartWidget } from './components/CartWidget.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { AddProductsMenu } from './components';

export const MenuAddProductsOrder: FC = () => {
  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);

  if (!activeOrder) return <></>;

  return (
    <>
      <Container maxWidth='xl'>
        <TitlePage title='Agregar productos' />
        <AddProductsMenu />
      </Container>

      <CartWidget
        onClick={() => {
          navigate('/orders/list/edit/' + activeOrder.id);
        }}
        badge={activeOrder.details.length}
      />
    </>
  );
};
