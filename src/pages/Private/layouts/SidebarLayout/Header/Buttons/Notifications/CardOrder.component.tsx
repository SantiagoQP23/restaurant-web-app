import { FC } from 'react';

import {
  EditOutlined,
  MonetizationOn,
  People,
  MoreVert,
  RemoveCircle
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Typography,
  Box,
  CardActions,
  Button,
  Stack,
  IconButton
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus, TypeOrder } from '../../../../../../../models';
import { formatMoney } from '../../../../../Common/helpers/format-money.helper';
import { getTypeOrder } from '../../../../../Common/helpers/get-type-order.helper';
import {
  LabelStatusOrder,
  ModalCloseOrder
} from '../../../../../Orders/components';
import NiceModal from '@ebay/nice-modal-react';

interface Props {
  onEdit?: () => void;
  order: Order;
}

export const CardOrder: FC<Props> = ({ onEdit, order }) => {
  const navigate = useNavigate();

  const navigateToOrder = (id: string) => {
    navigate(`/orders/list/edit/${id}`);
  };

  const handleEditOrder = (id: string) => {
    onEdit && onEdit();
    navigateToOrder(id);
  };

  const closeOrder = () => {
    NiceModal.show(ModalCloseOrder, {
      order
    });
  };

  const handleCloseOrder = () => {
    onEdit && onEdit();
    closeOrder();
  };

  const isCloseableOrder =
    order.status === OrderStatus.DELIVERED && order.isPaid;

  return (
    <>
      <Card>
        <CardHeader
          avatar={<LabelStatusOrder status={order.status} onlyIcon />}
          title={
            order.type === TypeOrder.TAKE_AWAY
              ? getTypeOrder(order.type)
              : `Mesa ${order.table?.name}`
          }
          titleTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }}
          subheader={
            <>
              <Typography fontSize={'0.8rem'}>
                {`Pedido N° ${order.num} - ` +
                  format(new Date(order.createdAt), 'HH:mm ')}
              </Typography>
            </>
          }
          subheaderTypographyProps={{ fontSize: '0.8rem' }}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />

        {order.notes && <Box px={2}>{order.notes}</Box>}

        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Stack direction='row' spacing={1} p={1}>
            <Box display='flex' alignItems='center' gap={0.5}>
              <MonetizationOn
                color={order.isPaid ? 'success' : 'warning'}
                fontSize='small'
              />
              <Typography variant='body2'>
                {formatMoney(order.total)}
              </Typography>
            </Box>

            <Box display='flex' alignItems='center' gap={0.5}>
              <People color='info' fontSize='small' />

              <Typography variant='body2'>{order.people}</Typography>
            </Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Button
              size='small'
              startIcon={<EditOutlined />}
              onClick={() => handleEditOrder(order.id)}
            >
              Editar
            </Button>

            <Button
              size='small'
              startIcon={<RemoveCircle />}
              variant='outlined'
              color='secondary'
              onClick={handleCloseOrder}
              disabled={!isCloseableOrder}
            >
              Cerrar
            </Button>

            {/*
            
            ) : (
              <Button
                size="small"
                startIcon={<PointOfSale />}
                color="success"
                variant="outlined"
              >
                Cobrar
              </Button>
            )} */}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};
