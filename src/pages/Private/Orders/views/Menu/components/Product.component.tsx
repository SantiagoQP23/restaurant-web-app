import { Card, Typography, Box, styled, Link } from '@mui/material/';
import { FC } from 'react';
import { IProduct } from '../../../../../../models';
import { ProductStatus } from '../../../../../../models/menu.model';
import { IconButton, Stack } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { LabelProductStatus } from '../../../../../../components/ui/LabelProductStatus.component';
import NiceModal from '@ebay/nice-modal-react';
import { ModalAddDetail } from '../../../components';

interface Props {
  product: IProduct;
  onClick: (productId: string) => void;
}

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  borderRadius: 8,
  objectFit: 'cover',
  position: 'absolute'
});
/**
 * Product component.
 * @param product - The product to display.
 * @param onClick - The function to call when the product is clicked.
 * @returns The product component.
 * @author Steven Rosales
 * @version 1.0 15/03/2025
 */
export const Product: FC<Props> = ({ product, onClick }) => {
  const addProductoToOrder = () => {
    NiceModal.show(ModalAddDetail, { detail: { product, quantity: 1 } });
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.status !== ProductStatus.AVAILABLE && (
            <Box
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute'
              }}
            >
              <LabelProductStatus status={product.status} />
            </Box>
          )}

          <StyledProductImg
            alt={product.name}
            src={product.images || '/static/images/products/no-image.png'}
          />
        </Box>

        <Stack
          spacing={1}
          sx={{ p: 2, justifyContent: 'space-between', height: '100%' }}
        >
          {/* <Typography fontSize={'0.8rem'} color='text.secondary'> */}
          {/*   {product.quantity} disponibles */}
          {/* </Typography> */}
          <Link
            color='inherit'
            underline='hover'
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => onClick(product.id)}
          >
            <Typography variant='subtitle1'>{product.name}</Typography>
          </Link>

          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body1'>$ {product.price}</Typography>

            {product.status === ProductStatus.AVAILABLE && (
              <IconButton color='primary' onClick={addProductoToOrder}>
                <AddShoppingCart fontSize='small' />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
