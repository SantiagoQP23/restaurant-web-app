import { FC } from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Paper,
  Chip,
  alpha,
  useTheme,
  Card
} from '@mui/material';
import { ListAlt, ShoppingCart, Assignment } from '@mui/icons-material';
import { useConsolidatedProducts } from '../../hooks/useConsolidatedProducts';
import { ConsolidatedProductItem } from './ConsolidatedProductItem.component';

interface Props {
  embedded?: boolean;
}

/**
 * Shared component to display consolidated products across all IN_PROGRESS orders
 * Can be used both in a drawer (overlay) or embedded in the page layout
 * Shows all products that need to be delivered, grouped by product and description
 * Read-only view for kitchen/service staff to see what needs to be prepared
 *
 * @author Santiago Quirumbay
 * @version 1.0 2026-02-01 Extracted from ConsolidatedProductsDrawer for reusability
 */
export const ConsolidatedProductsContent: FC<Props> = ({ embedded = false }) => {
  const theme = useTheme();
  const { consolidatedProducts, statistics } = useConsolidatedProducts();

  const content = (
    <Box
      sx={{
        height: embedded ? 'auto' : '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: embedded ? 'relative' : 'sticky',
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
          sx={{ p: 1.5, pb: 1 }}
        >
          <Stack direction='row' spacing={1.5} alignItems='center'>
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                color: 'rgba(0, 0, 0, 0.6)',
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
        </Stack>

        {/* Statistics Cards */}
        <Stack direction='row' spacing={1} sx={{ px: 1.5, pb: 1.5 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 1,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              border: `1px solid rgba(0, 0, 0, 0.06)`
            }}
          >
            <Stack spacing={0.5} alignItems='center'>
              <ShoppingCart
                sx={{
                  fontSize: 18,
                  color: 'rgba(0, 0, 0, 0.6)'
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
              p: 1,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              border: `1px solid rgba(0, 0, 0, 0.06)`
            }}
          >
            <Stack spacing={0.5} alignItems='center'>
              <Assignment
                sx={{
                  fontSize: 18,
                  color: 'rgba(0, 0, 0, 0.6)'
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
      <Box
        sx={{
          p: 1.5,
          flexGrow: 1,
          overflow: 'auto',
          maxHeight: embedded ? '600px' : 'none'
        }}
      >
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
            position: embedded ? 'relative' : 'sticky',
            bottom: 0,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            borderTop: `1px solid ${theme.palette.divider}`,
            p: 1.5
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
              color='default'
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );

  // If embedded, wrap in Card for visual separation
  if (embedded) {
    return (
      <Card elevation={1} sx={{ mt: 2 }}>
        {content}
      </Card>
    );
  }

  // If in drawer, return content directly
  return content;
};
