import { FC } from 'react';

import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material/';

import {
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  MoreHoriz,
  Reply
} from '@mui/icons-material';

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
import { Label } from '@/components/ui';
import { useUpdateProduct } from '../../../hooks/useProducts';
import { useAppDispatch } from '@/hooks';
import { updateProduct } from '@/redux';

/**
 * @author Steven Rosales
 * @version 1.0 15/03/2025 Update product card
 */
interface Props {
  producto: IProduct;
}

export const Product: FC<Props> = ({ producto }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const ImageWidth = isXs ? 80 : isMd ? 120 : 120;

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverMenuProduct'
  });

  const showModalDeleteProduct = () => {
    NiceModal.show(ModalDeleteProduct, { product: producto } as MDeleteProps);
  };

  const { mutateAsync, isPending } = useUpdateProduct();

  const dispatch = useAppDispatch();

  const enableProduct = async () => {
    popupState.close();
    await mutateAsync({ id: producto.id, isActive: true }).then((product) => {
      dispatch(updateProduct(product));
    });
  };

  const navitateToEditProduct = () => {
    navigate(`/menu/products/${producto.id}/edit`);
  };

  const handleDelete = () => {
    popupState.close();
    showModalDeleteProduct();
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%' // Hace que todos los elementos tengan la misma altura
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            gap: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <img
            src={
              producto.images
                ? producto.images
                : '/static/images/products/no-image.png'
            }
            alt='Product'
            style={{
              width: ImageWidth,
              height: ImageWidth * (9 / 16),
              objectFit: 'cover',
              aspectRatio: 16 / 9,
              borderRadius: 7
            }}
          />
          <Stack direction='column' spacing={1} width='100%'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {producto.isActive && (
                <LabelProductStatus status={producto.status} />
              )}
              {!producto.isActive && (
                <Label color={producto.isActive ? 'success' : 'error'}>
                  {producto.isActive ? 'Activo' : 'Eliminado'}
                </Label>
              )}

              <IconButton {...bindTrigger(popupState)}>
                <MoreHoriz />
              </IconButton>
            </Box>

            <Typography variant='h6'>{producto.name}</Typography>
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
        {producto.isActive ? (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutlined fontSize='small' sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        ) : (
          <MenuItem onClick={enableProduct} sx={{ color: 'success.main' }}>
            <Reply fontSize='small' sx={{ mr: 2 }} />
            Habilitar
          </MenuItem>
        )}
      </Popover>
    </>
  );
};
