import { FC } from 'react';

import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Popover,
  CardMedia,
  Stack
} from '@mui/material/';

import { DeleteOutline, EditOutlined, MoreHoriz } from '@mui/icons-material';

import { IProduct } from '../../../../../../models';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import NiceModal from '@ebay/nice-modal-react';
import {
  ModalDeleteProduct,
  Props as MDeleteProps
} from './ModalDeleteProduct.component';
import { bindPopover } from 'material-ui-popup-state';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { LabelProductStatus } from '../../../../../../components/ui/LabelProductStatus.component';

/**
 * @author Steven Rosales
 * @version 1.0 15/03/2025 Update product card
 */
interface Props {
  producto: IProduct;
}

export const Product: FC<Props> = ({ producto }) => {
  const navigate = useNavigate();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverMenuProduct'
  });

  const showModalDeleteProduct = () => {
    NiceModal.show(ModalDeleteProduct, { product: producto } as MDeleteProps);
  };

  const navitateToEditProduct = () => {
    navigate(`/menu/products/${producto.id}/edit`);
  };

  // const navigateToViewProduct = () => {
  //   navigate(`/menu/products/${producto.id}`);
  // };

  const handleDelete = () => {
    popupState.close();
    showModalDeleteProduct();
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%', // Hace que todos los elementos tengan la misma altura
          display: 'flex'
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 160 }}
          image={
            producto.images
              ? producto.images
              : '/static/images/products/no-image.png'
          }
          alt='Product'
        />
        <CardContent sx={{ width: 1 }}>
          <Stack direction='column' spacing={1}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <LabelProductStatus status={producto.status} />

              <IconButton {...bindTrigger(popupState)}>
                <MoreHoriz />
              </IconButton>
            </Box>

            <Typography variant='h4'>{producto.name}</Typography>
            <Typography variant='body1'>
              {formatMoney(producto.price)}
            </Typography>

            <Typography fontSize='0.8rem' color='text.secondary' mt={1}>
              {producto.category.name}
            </Typography>
            <Typography fontSize='0.8rem' color='text.secondary'>
              {producto.productionArea.name}
            </Typography>
            <Typography fontSize='0.8rem' color='text.secondary'>
              {producto.quantity} disponibles
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140
            }
          }
        }}
      >
        <MenuItem onClick={navitateToEditProduct}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        {/* <MenuItem onClick={navigateToViewProduct}>
          <Visibility fontSize="small" sx={{ mr: 2 }} />
          Ver
        </MenuItem> */}
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};
