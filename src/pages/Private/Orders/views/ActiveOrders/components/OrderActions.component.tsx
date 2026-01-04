import { FC, useCallback } from 'react';
import { CardActions, Button, Stack, alpha, useTheme } from '@mui/material';
import { PlayCircleOutline, Undo, Check } from '@mui/icons-material';
import { Order, OrderStatus } from '../../../../../../models';

interface Props {
  order: Order;
  onStartOrder: (order: Order) => void;
  onChangeStatus: (status: OrderStatus) => void;
  setStatusFilter?: (status: OrderStatus) => void;
}

/**
 * Enhanced action buttons with better visual hierarchy
 */
export const OrderActions: FC<Props> = ({
  order,
  onStartOrder,
  onChangeStatus,
  setStatusFilter
}) => {
  const theme = useTheme();

  const handlePendingClick = useCallback(() => {
    onChangeStatus(OrderStatus.PENDING);
    setStatusFilter?.(OrderStatus.PENDING);
  }, [onChangeStatus, setStatusFilter]);

  const handleDeliveredClick = useCallback(() => {
    onChangeStatus(OrderStatus.DELIVERED);
  }, [onChangeStatus]);

  const handleStartClick = useCallback(() => {
    onStartOrder(order);
  }, [onStartOrder, order]);

  if (order.status === OrderStatus.DELIVERED) {
    return null;
  }

  return (
    <CardActions
      sx={{
        p: 2,
        pt: 1.5,
        flexDirection: 'column',
        gap: 1,
        bgcolor: alpha(theme.palette.background.default, 0.5)
      }}
    >
      {order.status === OrderStatus.PENDING ? (
        <Button
          fullWidth
          size='large'
          startIcon={<PlayCircleOutline />}
          onClick={handleStartClick}
          variant='outlined'
          color='warning'
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            py: 1.5
          }}
        >
          Iniciar Pedido
        </Button>
      ) : (
        order.status === OrderStatus.IN_PROGRESS && (
          <Stack
            direction='row'
            spacing={1}
            width='100%'
            sx={{
              '& .MuiButton-root': {
                flex: 1,
                py: 1.25,
                fontWeight: 600
              }
            }}
          >
            <Button
              onClick={handlePendingClick}
              color='warning'
              variant='outlined'
              startIcon={<Undo />}
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Pendiente
            </Button>

            <Button
              color='success'
              variant='contained'
              startIcon={<Check />}
              onClick={handleDeliveredClick}
              sx={{
                boxShadow: theme.colors.shadows.success,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px ${alpha(
                    theme.palette.success.main,
                    0.4
                  )}`,
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Entregado
            </Button>
          </Stack>
        )
      )}
    </CardActions>
  );
};
