import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { FC } from 'react';
import { Label } from '../../../../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AssignmentOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../../redux';
import { Order } from '@/models';

interface Props {
  order: Order;
}

export const OrderSummaryCard: FC<Props> = ({ order }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Pedido N° {order.num}</Typography>
            <Typography variant='h6'>
              <Label color='info'>{order.status}</Label>
            </Typography>
          </Box>

          {/* <Typography variant="h6" >Cliente: {order.client?.person.firstName} {order.client?.person.lastName} </Typography> */}

          <Typography variant='h6'>
            Mesero: {order.user?.person.firstName}{' '}
            {order.user?.person.lastName}{' '}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <IconButton
              color='primary'
              onClick={() => {
                dispatch(setActiveOrder(order));
                navigate(`receipt`);
              }}
            >
              <AssignmentOutlined />
            </IconButton>

            <Typography variant='h6'>$ {order.total}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
