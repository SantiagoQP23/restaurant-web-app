import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import {
  Card,
  Stack,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';
import { TypeOrder } from '../../../../../../models';
import { LabelStatusOrder } from '../../../components/LabelStatusOrder.component';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Box } from '@mui/material/';

export const BarActiveOrders = () => {
  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const activeOrders = orders.filter((order) => !order.isPaid);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'flex',
            sm: 'flex',
            md: 'none'
          },
          flexDirection: 'row',
          overflowX: 'auto',

          pb: 1,
          gap: 1
        }}
      >
        {activeOrders.length === 0 ? (
          <Typography variant='body1'>No hay pedidos activos</Typography>
        ) : (
          activeOrders.map((order) => (
            <>
              <Card
                key={order.id}
                sx={{
                  minWidth: '220px'
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/orders/list/edit/${order.id}`)}
                >
                  <CardContent>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <LabelStatusOrder status={order.status} />

                      <Typography variant='subtitle1' color='text.secondary'>
                        #{order.num}
                      </Typography>
                    </Stack>

                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      mt={1}
                    >
                      <Typography
                        variant='h5'
                        display='flex'
                        alignItems='center'
                      >
                        <TableRestaurantIcon fontSize='small' />
                        {order.type === TypeOrder.IN_PLACE
                          ? `Mesa ${order.table?.name || ''}`
                          : 'Para llevar'}
                      </Typography>

                      <Typography
                        variant='h5'
                        display='flex'
                        alignItems='center'
                      >
                        <Person fontSize='small' />
                        {order.user.person.firstName}
                      </Typography>
                    </Stack>

                    <Typography variant='subtitle1' mt={1}>
                      {`$ ${order.total}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          ))
        )}
      </Box>
    </>
  );
};
