import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardHeader,
  IconButton,
  Divider,
  Typography,
  Stack,
  Box
} from '@mui/material';

import { AddShoppingCartOutlined } from '@mui/icons-material';

import { NewOrderDetail } from './NewOrderDetail.component';
import { useNewOrderStore } from '../../../store/newOrderStore';

export const OrderDetails = () => {
  const navigate = useNavigate();

  const { details } = useNewOrderStore((state) => state);

  return (
    <>
      <Card>
        <CardHeader
          title='Productos'
          subheader={`Total: ${details.reduce(
            (acc, detail) =>
              acc +
              Math.floor(detail.quantity) +
              (Number.isInteger(detail.quantity) ? 0 : 1),
            0
          )}`}
          action={
            <>
              <IconButton
                size='small'
                onClick={() => navigate('/orders/add/menu')}
                color='primary'
              >
                <AddShoppingCartOutlined />
              </IconButton>
            </>
          }
        />

        <Divider />

        <Stack spacing={1} divider={<Divider />}>
          {details.length > 0 ? (
            details.map((detail) => (
              <NewOrderDetail
                detalle={detail}
                key={detail.product.id + detail.productOption?.id}
              />
            ))
          ) : (
            <Box my={5}>
              <Typography variant='body1' align='center' my={5}>
                No se han añadido productos
              </Typography>
            </Box>
          )}
        </Stack>
      </Card>
    </>
  );
};
