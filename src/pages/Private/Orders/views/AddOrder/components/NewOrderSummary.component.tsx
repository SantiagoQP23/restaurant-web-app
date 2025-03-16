import { FC } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
  InputLabel
} from '@mui/material';
import { TypeOrder } from '../../../../../../models';

import {
  CreateOrderDetailDto,
  CreateOrderDto
} from '../../../dto/create-order.dto';

import { useCreateOrder } from '../../../hooks';
import { LoadingButton } from '@mui/lab';

import { PeopleCounter } from './PeopleCounter.component';

import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useNewOrderStore } from '../../../store/newOrderStore';

interface Props {
  step: number;
}

/**
 * Component that shows the summary of the new order
 * @version 1.1 28/12/2023 Adds useCreateOrder hook
 */
export const NewOrderSummary: FC<Props> = () => {
  const { table, people, details, orderType, notes, setNotes, reset } =
    useNewOrderStore((state) => state);

  const { mutate: createOrder, isLoading, isOnline } = useCreateOrder();

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const submitAddOrder = () => {
    const order: CreateOrderDto = {
      tableId: table?.id || '',
      details: details.map((detail) => {
        const orderDetail: CreateOrderDetailDto = {
          productId: detail.product.id,
          quantity: detail.quantity,
          description: detail.description,
          price: detail.product.price,
          productOptionId: detail.productOption?.id
        };
        return orderDetail;
      }),
      notes,

      people,
      typeOrder: orderType
    };

    if (orderType === TypeOrder.TAKE_AWAY) delete order.tableId;

    createOrder(order, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <Stack spacing={1} divider={<Divider />}>
          <Box>
            <CardHeader title='Información del pedido' />
            <CardContent>
              <Stack direction='column' spacing={2} textAlign='center'>
                {orderType === TypeOrder.IN_PLACE && (
                  <Box>
                    <InputLabel>Mesa</InputLabel>
                    <Typography variant='h3' fontWeight='bold'>
                      N° {table?.name || 'Sin mesa'}
                    </Typography>
                  </Box>
                )}

                {orderType === TypeOrder.TAKE_AWAY && (
                  <Box>
                    <InputLabel>Tipo de orden</InputLabel>
                    <Typography variant='h3' fontWeight='bold'>
                      {'Para llevar'}
                    </Typography>
                  </Box>
                )}

                <PeopleCounter />

                <TextField
                  id='descripcion-pedido'
                  label='Notas'
                  margin='dense'
                  multiline
                  rows={4}
                  // defaultValue={detail?.description}
                  fullWidth
                  value={notes}
                  onChange={handleChangeNotes}
                />
              </Stack>
            </CardContent>
          </Box>

          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            p={2}
          >
            <Typography variant='h4' fontWeight='bold'>
              Total{' '}
            </Typography>
            <Typography variant='h4' fontWeight='bold'>
              {formatMoney(
                details.reduce(
                  (acc, detail) => acc + detail.product.price * detail.quantity,
                  0
                )
              )}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {
        <LoadingButton
          variant='contained'
          disabled={
            !isOnline ||
            details.length <= 0 ||
            (!table && orderType === TypeOrder.IN_PLACE) ||
            people <= 0
          }
          onClick={submitAddOrder}
          fullWidth
          loading={isLoading}
        >
          Crear pedido
        </LoadingButton>
      }
    </Box>
  );
};
