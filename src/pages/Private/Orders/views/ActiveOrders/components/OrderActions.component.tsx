import { FC, useCallback } from 'react';
import { CardActions, Button, Stack, alpha, useTheme } from '@mui/material';
import { PlayCircleOutline, Undo, Check } from '@mui/icons-material';
import {
  Order,
  OrderDetailStatus,
  OrderStatus
} from '../../../../../../models';

interface Props {
  order: Order;
  onStartOrder: (order: Order) => void;
  onChangeStatus: (status: OrderStatus) => void;
  setStatusFilter?: (status: OrderStatus) => void;
  detailStatusSection?: OrderDetailStatus;
}

/**
 * Enhanced action buttons with better visual hierarchy
 */
export const OrderActions: FC<Props> = ({
  order,
  onStartOrder,
  onChangeStatus,
  setStatusFilter,
  detailStatusSection
}) => {
  const theme = useTheme();

  const handlePendingClick = useCallback(() => {
    onChangeStatus(OrderStatus.PENDING);
    setStatusFilter?.(OrderStatus.PENDING);
  }, [onChangeStatus, setStatusFilter]);

  const handleDeliveredClick = useCallback(() => {
    onChangeStatus(OrderStatus.DELIVERED);
  }, [onChangeStatus]);

  const handleReadyClick = useCallback(() => {
    onChangeStatus(OrderStatus.READY);
  }, [onChangeStatus]);

  const handleStartClick = useCallback(() => {
    onStartOrder(order);
  }, [onStartOrder, order]);

  if (order.status === OrderStatus.DELIVERED) {
    return null;
  }

  if (detailStatusSection === OrderDetailStatus.PENDING) {
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
            fullWidth
            size='large'
            startIcon={<PlayCircleOutline />}
            onClick={handleStartClick}
            variant='outlined'
          >
            Iniciar
          </Button>
        </Stack>
      </CardActions>
    );
  }

  if (detailStatusSection === OrderDetailStatus.IN_PROGRESS) {
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
            variant='outlined'
            startIcon={<Check />}
            onClick={handleReadyClick}
          >
            Listo
          </Button>
        </Stack>
      </CardActions>
    );
  }

  if (detailStatusSection === OrderDetailStatus.READY) {
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
            variant='outlined'
            startIcon={<Check />}
            onClick={handleDeliveredClick}
          >
            Entregar
          </Button>
        </Stack>
      </CardActions>
    );
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
            fullWidth
            size='large'
            startIcon={<PlayCircleOutline />}
            onClick={handleStartClick}
            variant='outlined'
          >
            Iniciar
          </Button>
          <Button
            variant='outlined'
            startIcon={<Check />}
            onClick={handleReadyClick}
          >
            Listo
          </Button>
        </Stack>
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
              variant='outlined'
              startIcon={<Undo />}
            >
              Pendiente
            </Button>

            <Button
              variant='outlined'
              startIcon={<Check />}
              onClick={handleReadyClick}
            >
              Listo
            </Button>
          </Stack>
        )
      )}
      {order.status === OrderStatus.READY && (
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
            variant='outlined'
            startIcon={<Check />}
            onClick={handleDeliveredClick}
          >
            Entregar
          </Button>
        </Stack>
      )}
    </CardActions>
  );
};
