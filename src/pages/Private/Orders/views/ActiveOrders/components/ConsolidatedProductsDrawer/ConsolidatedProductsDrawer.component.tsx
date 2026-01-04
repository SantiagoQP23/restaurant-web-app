import { FC } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Paper,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { Close, ListAlt, ShoppingCart, Assignment } from '@mui/icons-material';
import { useConsolidatedProducts } from '../../hooks/useConsolidatedProducts';
import { ConsolidatedProductItem } from './ConsolidatedProductItem.component';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Drawer component to display consolidated products across all IN_PROGRESS orders
 * Shows all products that need to be delivered, grouped by product and description
 * Read-only view for kitchen/service staff to see what needs to be prepared
 *
 * @author Santiago Quirumbay
 * @version 1.0 2026-01-03 Initial implementation
 */
export const ConsolidatedProductsDrawer: FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();
  const { consolidatedProducts, statistics } = useConsolidatedProducts();

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: 450,
            md: 500
          },
          maxWidth: '100vw'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ p: 2, pb: 1.5 }}
        >
          <Stack direction='row' spacing={1.5} alignItems='center'>
            <Box
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                borderRadius: '8px',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ListAlt />
            </Box>
            <Stack spacing={0}>
              <Typography variant='h6' fontWeight={600}>
                Productos a Entregar
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Pedidos en preparación
              </Typography>
            </Stack>
          </Stack>
          <IconButton onClick={onClose} size='small'>
            <Close />
          </IconButton>
        </Stack>

        {/* Statistics Cards */}
        <Stack direction='row' spacing={1} sx={{ px: 2, pb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Stack spacing={0.5} alignItems='center'>
              <ShoppingCart
                sx={{
                  fontSize: 20,
                  color: theme.palette.primary.main
                }}
              />
              <Typography variant='h6' fontWeight={700}>
                {statistics.totalProducts}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {statistics.totalProducts === 1 ? 'Producto' : 'Productos'}
              </Typography>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 1.5,
              bgcolor: alpha(theme.palette.info.main, 0.05),
              border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`
            }}
          >
            <Stack spacing={0.5} alignItems='center'>
              <Assignment
                sx={{
                  fontSize: 20,
                  color: theme.palette.info.main
                }}
              />
              <Typography variant='h6' fontWeight={700}>
                {statistics.totalPendingItems}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Pendientes
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      <Divider />

      {/* Products List */}
      <Box sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
        {consolidatedProducts.length === 0 ? (
          <Stack
            spacing={2}
            alignItems='center'
            justifyContent='center'
            sx={{ py: 8 }}
          >
            <Box
              sx={{
                bgcolor: alpha(theme.palette.text.secondary, 0.05),
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingCart
                sx={{
                  fontSize: 40,
                  color: theme.palette.text.secondary
                }}
              />
            </Box>
            <Typography variant='h6' color='text.secondary'>
              No hay productos pendientes
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              align='center'
              sx={{ maxWidth: 280 }}
            >
              Todos los productos de los pedidos en preparación han sido
              entregados
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={1.5}>
            {consolidatedProducts.map((product) => (
              <ConsolidatedProductItem
                key={`${product.productId}-${product.sources[0]?.description || 'default'}`}
                product={product}
                defaultExpanded={consolidatedProducts.length <= 3}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Footer Info */}
      {consolidatedProducts.length > 0 && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            borderTop: `1px solid ${theme.palette.divider}`,
            p: 2,
            backdropFilter: 'blur(8px)'
          }}
        >
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='center'
          >
            <Typography variant='caption' color='text.secondary'>
              Mostrando productos de
            </Typography>
            <Chip
              label={`${statistics.totalOrders} ${statistics.totalOrders === 1 ? 'pedido' : 'pedidos'}`}
              size='small'
              color='info'
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Box>
      )}
    </Drawer>
  );
};
