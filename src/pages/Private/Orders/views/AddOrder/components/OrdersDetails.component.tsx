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
    </>
  );
};
