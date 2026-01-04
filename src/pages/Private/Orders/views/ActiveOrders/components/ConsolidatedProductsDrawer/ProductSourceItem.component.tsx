import { FC } from 'react';
import { Box, Stack, Typography, Chip, alpha, useTheme } from '@mui/material';
import { TableRestaurant, ShoppingBag, Notes } from '@mui/icons-material';
import { ProductSource } from '../../hooks/useConsolidatedProducts';
import { TypeOrder } from '../../../../../../../models';
import { ORDER_TYPE_LABELS } from '../../../../constants/order.constants';

interface Props {
  source: ProductSource;
}

/**
 * Component to display a single product source (order detail)
 * Shows where a specific product quantity comes from
 *
 * @author Santiago Quirumbay
 * @version 1.0 2026-01-03 Initial implementation
 */
export const ProductSourceItem: FC<Props> = ({ source }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        py: 1,
        px: 2,
        borderLeft: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        '&:hover': {
          bgcolor: alpha(theme.palette.action.hover, 0.02),
          borderLeftColor: theme.palette.primary.main
        },
        transition: 'all 0.2s ease'
      }}
    >
      {/* Quantity Badge */}
      <Typography variant='h6' fontWeight={700} sx={{ minWidth: 24 }}>
        {source.pending}
      </Typography>

      {/* Source Information */}
      <Stack spacing={0.5} flexGrow={1}>
        {/* Table/Order Type */}
        <Stack direction='row' spacing={1} alignItems='center'>
          {source.orderType === TypeOrder.IN_PLACE ? (
            <>
              <Typography variant='body2' fontWeight={600}>
                Mesa {source.tableName}
              </Typography>
            </>
          ) : (
            <>
              <ShoppingBag
                sx={{
                  fontSize: 18,
                  color: theme.palette.text.secondary
                }}
              />
              <Typography variant='body2' fontWeight={600}>
                {ORDER_TYPE_LABELS[TypeOrder.TAKE_AWAY]}
              </Typography>
            </>
          )}

          {/* Order Number */}
          <Typography variant='caption' color='text.secondary'>
            · Pedido #{source.orderNum}
          </Typography>
        </Stack>

        {/* Description (if exists) */}
        {source.description && (
          <Stack direction='row' spacing={0.5} alignItems='flex-start'>
            <Notes
              sx={{
                fontSize: 16,
                color: theme.palette.text.secondary,
                mt: 0.25
              }}
            />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{
                fontStyle: 'italic',
                whiteSpace: 'pre-wrap'
              }}
            >
              {source.description}
            </Typography>
          </Stack>
        )}

        {/* Delivery Progress (if partially delivered) */}
        {source.qtyDelivered > 0 && (
          <Typography variant='caption' color='success.main' fontWeight={500}>
            {source.qtyDelivered} de {source.quantity} entregados
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
