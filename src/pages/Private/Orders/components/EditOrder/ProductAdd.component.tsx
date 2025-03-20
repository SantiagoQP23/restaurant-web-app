import { FC, useEffect, useState } from 'react';

import { Card, Typography, Box, IconButton } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {
  RemoveCircleOutline,
  AddCircleOutline,
  SaveOutlined
} from '@mui/icons-material';
import { IProduct } from '../../../../../models';
import { Product } from '../../../Menu/components';
import { useCounter } from '../../hooks';

interface Props {
  producto: IProduct;
  abrirModal: () => void;
  setDetalle?: (detalle: any) => void;
}

export const ProductAdd: FC<Props> = ({ producto, abrirModal, setDetalle }) => {
  const { state: counter, increment, decrement } = useCounter(1);

  const [subtotal, setSubtotal] = useState(counter * producto.price);

  useEffect(() => {
    setSubtotal(counter * producto.price);
  }, [counter]);

  return (
    <>
      <Product product={producto} onClick={() => {}} />

      <Card>
        <Box display='flex' justifyContent='space-between' p={1}>
          <Typography variant='h6'> $ {subtotal}</Typography>

          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <IconButton onClick={decrement}>
              <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>
              {counter}
            </Typography>
            <IconButton onClick={increment}>
              <AddCircleOutline />
            </IconButton>
            <IconButton
              disabled={counter <= 0}
              color='primary'
              onClick={() => {
                abrirModal();
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
};
