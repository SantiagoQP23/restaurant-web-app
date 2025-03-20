import { ReadMore } from '@mui/icons-material';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Table,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  OrderStatus,
  OrderStatusPay,
  TypeOrder
} from '../../../../../../models';
import { selectOrders, selectAuth } from '../../../../../../redux';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { getTypeOrder } from '../../../../Common/helpers/get-type-order.helper';
import { TabsStatusOrder } from '../../../../Orders/components/TabsStatusOrder.component';
import { LabelStatusOrder } from '../../../../Orders/components/LabelStatusOrder.component';
import { Card } from '@mui/material';

export const MyOrders = () => {
  const { orders } = useSelector(selectOrders);

  const { user } = useSelector(selectAuth);

  const [statusOrderFilter, setStatusOrderFilter] =
    useState<OrderStatus | null>(OrderStatus.PENDING);

  const [statusPayFilter, setStatusPayFilter] = useState<
    OrderStatusPay | string
  >(' ');

  const navigate = useNavigate();

  const handleEditOrder = (id: string): void => {
    navigate(`/orders/list/edit/${id}`);
  };

  const ordersUser = orders.filter((order) => order.user.id === user!.id);

  let ordersFiltered = statusOrderFilter
    ? ordersUser.filter((order) => order.status === statusOrderFilter)
    : orders;

  ordersFiltered =
    statusPayFilter !== ' '
      ? ordersFiltered.filter(
          (order) =>
            (order.isPaid ? OrderStatusPay.PAY : OrderStatusPay.NO_PAY) ===
            statusPayFilter
        )
      : ordersFiltered;

  return (
    <>
      <Box
        sx={{
          p: 1,
          mb: 1,
          display: 'flex',
          justifyContent: 'right'
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='select-pay'>Estado de pago</InputLabel>
          <Select
            labelId='select-pay'
            value={statusPayFilter}
            onChange={(e) =>
              setStatusPayFilter(e.target.value as OrderStatusPay)
            }
            label='Estado de pago'
          >
            <MenuItem value={' '}>Todos</MenuItem>
            <MenuItem value={OrderStatusPay.PAY}>Pagados</MenuItem>
            <MenuItem value={OrderStatusPay.NO_PAY}>Sin pagar</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          py: 0.5,
          mb: 1,
          overflowX: 'auto',
          bgcolor: 'background.paper',
          borderRadius: '10px'
        }}
      >
        <TabsStatusOrder
          statusOrderFilter={statusOrderFilter}
          setStatusOrderFilter={setStatusOrderFilter}
          orders={ordersUser}
        />
      </Box>

      <Divider />
      <Card>
        <TableContainer>
          <Table>
            <TableBody>
              {ordersFiltered.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant='h5'>
                        {`N° ${order.num} - ${order.type === TypeOrder.IN_PLACE ? 'Mesa ' + order.table?.name : getTypeOrder(order.type)}`}
                      </Typography>
                      <LabelStatusOrder status={order.status} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h6'>
                      {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {format(new Date(order.createdAt), 'HH:mm')}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'></TableCell>
                  <TableCell align='center'>
                    <Typography variant='h5'>
                      {formatMoney(order.total)}
                    </Typography>
                  </TableCell>

                  <TableCell align='right'>
                    <IconButton onClick={() => handleEditOrder(order.id)}>
                      <ReadMore />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
