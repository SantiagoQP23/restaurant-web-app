import {
  Container,
  Button,
  Stack,
  Badge,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DespachoDetalle, ListActiveOrders } from './components';
import {
  Add,
  Cached,
  ListAlt,
  ViewAgenda,
  ViewAgendaOutlined,
  ViewList,
  ViewListOutlined
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';

import { Clock } from '../OrdersList/components/Clock.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { useActiveOrders } from '../../hooks';
import { ConsolidatedProductsDrawer } from './components/ConsolidatedProductsDrawer';
import { useConsolidatedProducts } from './hooks/useConsolidatedProducts';

export type ViewMode = 'tabs' | 'sections';

export const ActiveOrders = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { statistics } = useConsolidatedProducts();

  const { activeOrdersQuery } = useActiveOrders();

  // View mode state with localStorage persistence
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('active-orders-view-mode');
    return (saved as ViewMode) || 'tabs';
  });

  // Save view mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('active-orders-view-mode', viewMode);
  }, [viewMode]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'tabs' ? 'sections' : 'tabs'));
  };

  return (
    <>
      <Container maxWidth='xl' sx={{ mb: 4 }}>
        <TitlePage
          title='Pedidos activos'
          action={
            <Stack direction='row' spacing={3}>
              <Tooltip
                title={
                  viewMode === 'tabs' ? 'Ver por secciones' : 'Ver por pestañas'
                }
              >
                <IconButton
                  onClick={toggleViewMode}
                  size='small'
                  sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                >
                  {viewMode === 'tabs' ? (
                    <ViewAgendaOutlined />
                  ) : (
                    <ViewListOutlined />
                  )}
                </IconButton>
              </Tooltip>
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

        <ListActiveOrders viewMode={viewMode} />
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
