import {
  Container,
  Stack,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DespachoDetalle, ListActiveOrders } from './components';
import {
  Cached,
  ListAltOutlined,
  ViewAgendaOutlined,
  ViewListOutlined
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

import { TitlePage } from '../../../components/TitlePage.component';
import { useActiveOrders } from '../../hooks';

export type ViewMode = 'tabs' | 'sections' | 'products';

export const ActiveOrders = () => {
  const navigate = useNavigate();

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
              <Tooltip title='Actualizar pedidos' arrow>
                <IconButton
                  onClick={() => activeOrdersQuery.refetch()}
                  size='small'
                >
                  <Cached />
                </IconButton>
              </Tooltip>
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
                <Tooltip title='Vista por pestañas' arrow>
                  <ToggleButton value='tabs' sx={toggleButtonSx}>
                    <ViewListOutlined />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title='Vista por secciones' arrow>
                  <ToggleButton value='sections' sx={toggleButtonSx}>
                    <ViewAgendaOutlined />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title='Vista de productos' arrow>
                  <ToggleButton value='products' sx={toggleButtonSx}>
                    <ListAltOutlined />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </Stack>
          }
        />

        {/* <Clock /> */}

        <ListActiveOrders viewMode={viewMode} />
      </Container>

      <DespachoDetalle />
    </>
  );
};

export default ActiveOrders;
