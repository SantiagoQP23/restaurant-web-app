import { Container, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DespachoDetalle, ListActiveOrders } from './components';
import { Add, Cached } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { Clock } from '../OrdersList/components/Clock.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { useActiveOrders } from '../../hooks';

export const ActiveOrders = () => {
  const navigate = useNavigate();

  const { activeOrdersQuery } = useActiveOrders();

  return (
    <>
      <Container maxWidth='xl' sx={{ mb: 4 }}>
        <TitlePage
          title='Pedidos activos'
          action={
            <Stack direction='row' spacing={1}>
              <LoadingButton
                variant='text'
                loading={activeOrdersQuery.isFetching}
                onClick={() => activeOrdersQuery.refetch()}
                size='small'
                startIcon={<Cached />}
              >
                Actualizar
              </LoadingButton>

              <Button
                onClick={() => {
                  navigate('/orders/tables');
                }}
                color='primary'
                variant='contained'
                size='small'
                startIcon={<Add />}
              >
                Nuevo pedido
              </Button>
            </Stack>
          }
        />

        <Clock />

        <ListActiveOrders />
      </Container>

      <DespachoDetalle />
    </>
  );
};

export default ActiveOrders;
