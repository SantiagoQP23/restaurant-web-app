import {
  Container,
  Button,
  Stack,
  Badge,
  IconButton,
  ToggleButton,
  ToggleButtonGroup
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

  // Custom styling for toggle buttons - light gray instead of primary color
  const toggleButtonSx = {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.6)',
    '&.Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: 'rgba(0, 0, 0, 0.87)',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderColor: 'rgba(0, 0, 0, 0.12)',
      }
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderColor: 'rgba(0, 0, 0, 0.12)',
    }
  };

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
              <ToggleButtonGroup
                value={viewMode}
                onChange={(_, newValue) => {
                  if (newValue !== null) {
                    setViewMode(newValue);
                  }
                }}
                exclusive
                size='small'
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                <ToggleButton value='tabs' sx={toggleButtonSx}>
                  <ViewListOutlined />
                </ToggleButton>
                <ToggleButton value='sections' sx={toggleButtonSx}>
                  <ViewAgendaOutlined />
                </ToggleButton>
              </ToggleButtonGroup>
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
