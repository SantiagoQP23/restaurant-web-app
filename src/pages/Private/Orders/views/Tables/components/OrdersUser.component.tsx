import { FC } from 'react';

import {
  Card,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { ResponseIncomesByUser } from '../../../../Reports/services/dashboard.service';
import { Label } from '../../../../../../components/ui';
import { LabelStatusOrder, LabelStatusPaid } from '../../../components';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { format } from 'date-fns';
import { NavigateNext } from '@mui/icons-material';
import { TypeOrder } from '../../../../../../models';
import { getTypeOrder } from '../../../../Common/helpers/get-type-order.helper';

import { useNavigate } from 'react-router-dom';

interface Props {
  user: ResponseIncomesByUser;
}

export const OrdersUser: FC<Props> = ({ user }) => {
  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const ordersUser = orders.filter((order) => order.user?.id === user.userId);

  const navigateToOrder = (id: string) => {
    navigate(`/orders/list/edit/${id}`);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={`${user.firstName} ${user.lastName}`}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center', mt: 1 }}
          subheader={
            <>
              <Label color='info'>{ordersUser.length} pedidos</Label>
            </>
          }
        />

        <Stack direction='column' spacing={1} divider={<Divider />} p={1}>
          {/* <Timeline> */}
          {ordersUser.length > 0 ? (
            ordersUser.map((order) => (
              <Box key={order.id}>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h5'>
                    {format(new Date(order.createdAt), 'HH:mm ')}-{' '}
                    {order.type === TypeOrder.TAKE_AWAY
                      ? getTypeOrder(order.type)
                      : `Mesa ${order.table?.name}`}{' '}
                  </Typography>

                  <Button
                    endIcon={<NavigateNext />}
                    onClick={() => navigateToOrder(order.id)}
                  >
                    Ir
                  </Button>
                </Box>
                <Box sx={{}}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <TableCell>
                            <b>Pedido N °{order.num}</b> <br /> {order.people}{' '}
                            personas
                          </TableCell>
                          <TableCell>
                            <Stack spacing={1} direction='row'>
                              <LabelStatusOrder
                                status={order.status}
                                onlyIcon
                              />
                              <LabelStatusPaid isPaid={order.isPaid} onlyIcon />
                            </Stack>
                          </TableCell>
                          <TableCell>{formatMoney(order.total)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            ))
          ) : (
            <>No tiene pedidos</>
          )}
        </Stack>
      </Card>
    </>
  );
};
