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
  InputLabel,
  Chip,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem
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
import { OrderDetails } from './OrdersDetails.component';
import { useSelector } from 'react-redux';
import { selectTables } from '@/redux';

interface Props {
  step: number;
}

/**
 * Component that shows the summary of the new order
 * @version 1.1 28/12/2023 Adds useCreateOrder hook
 */
export const NewOrderSummary: FC<Props> = () => {
  const { tables } = useSelector(selectTables);
  const {
    table,
    people,
    details,
    orderType,
    notes,
    setNotes,
    reset,
    setOrderType,
    setTable
  } = useNewOrderStore((state) => state);

  const onSelectTableChange = (event: SelectChangeEvent) => {
    const tableId = event.target.value as string;
    const selectedTable = tables.find((t) => t.id === tableId) || null;

    setTable(selectedTable);
  };

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
        <Stack spacing={1}>
          <Box>
            <CardContent>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant='h5'>Nuevo pedido</Typography>
                  {orderType === TypeOrder.IN_PLACE && (
                    <Box>
                      {orderType === TypeOrder.IN_PLACE && (
                        <FormControl fullWidth>
                          <InputLabel id='select-seccion'>Mesa</InputLabel>
                          <Select
                            labelId='select-seccion'
                            label='Seccion'
                            margin='dense'
                            value={table?.id || ''}
                            onChange={onSelectTableChange}
                            size='small'
                          >
                            {tables.map((table) => (
                              <MenuItem key={table.id} value={table.id}>
                                Mesa {table.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      {/* <Typography variant='h6' fontWeight='bold'> */}
                      {/*   Mesa */}
                      {/* </Typography> */}
                      {/* <Typography variant='body1'> */}
                      {/*   N° {table?.name || 'Sin mesa'} */}
                      {/* </Typography> */}
                    </Box>
                  )}
                </Box>
                <Stack direction='row' spacing={1}>
                  <Chip
                    label='Para servir'
                    onClick={() => setOrderType(TypeOrder.IN_PLACE)}
                    variant={
                      orderType === TypeOrder.IN_PLACE ? 'filled' : 'outlined'
                    }
                  />
                  <Chip
                    label='Para llevar'
                    onClick={() => setOrderType(TypeOrder.TAKE_AWAY)}
                    variant={
                      orderType === TypeOrder.TAKE_AWAY ? 'filled' : 'outlined'
                    }
                  />
                </Stack>

                <Stack direction='column' spacing={2} textAlign='center'>
                  <Box sx={{ mt: 10 }}>
                    <OrderDetails />
                  </Box>
                  {/* {orderType === TypeOrder.IN_PLACE && ( */}
                  {/*   <Box> */}
                  {/*     <InputLabel>Mesa</InputLabel> */}
                  {/*     <Typography variant='h3' fontWeight='bold'> */}
                  {/*       N° {table?.name || 'Sin mesa'} */}
                  {/*     </Typography> */}
                  {/*   </Box> */}
                  {/* )} */}
                  {/**/}
                  {/* {orderType === TypeOrder.TAKE_AWAY && ( */}
                  {/*   <Box> */}
                  {/*     <InputLabel>Tipo de orden</InputLabel> */}
                  {/*     <Typography variant='h3' fontWeight='bold'> */}
                  {/*       {'Para llevar'} */}
                  {/*     </Typography> */}
                  {/*   </Box> */}
                  {/* )} */}

                  {/* <PeopleCounter /> */}

                  {/* <TextField */}
                  {/*   id='descripcion-pedido' */}
                  {/*   label='Notas' */}
                  {/*   margin='dense' */}
                  {/*   multiline */}
                  {/*   rows={4} */}
                  {/*   // defaultValue={detail?.description} */}
                  {/*   fullWidth */}
                  {/*   value={notes} */}
                  {/*   onChange={handleChangeNotes} */}
                  {/* /> */}
                </Stack>
              </Stack>
              <Divider />

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                py={2}
              >
                <Typography variant='h6'>Total </Typography>
                <Typography variant='h6'>
                  {formatMoney(
                    details.reduce(
                      (acc, detail) =>
                        acc + detail.product.price * detail.quantity,
                      0
                    )
                  )}
                </Typography>
              </Box>
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
            </CardContent>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};
