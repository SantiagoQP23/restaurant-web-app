import { Container, Button, Stack, Badge, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DespachoDetalle, ListActiveOrders } from './components';
import { Add, Cached, ListAlt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

import { Clock } from '../OrdersList/components/Clock.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { useActiveOrders } from '../../hooks';
import { ConsolidatedProductsDrawer } from './components/ConsolidatedProductsDrawer';
import { useConsolidatedProducts } from './hooks/useConsolidatedProducts';

export const ActiveOrders = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { statistics } = useConsolidatedProducts();

  const { activeOrdersQuery } = useActiveOrders();

  return (
    <>
      <Container maxWidth='xl' sx={{ mb: 4 }}>
        <TitlePage
          title='Pedidos activos'
          action={
            <Stack direction='row' spacing={3}>
              <IconButton
                onClick={() => activeOrdersQuery.refetch()}
                size='small'
              >
                <Cached />
              </IconButton>
              <Badge
                badgeContent={statistics.totalProducts}
                color='primary'
                max={99}
              >
                <Button
                  variant='outlined'
                  onClick={() => setDrawerOpen(true)}
                  size='small'
                  startIcon={<ListAlt />}
                >
                  Ver productos
                </Button>
              </Badge>
            </Stack>
          }
        />

        {/* <Clock /> */}

        <ListActiveOrders />
      </Container>

      <DespachoDetalle />

      <ConsolidatedProductsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default ActiveOrders;
