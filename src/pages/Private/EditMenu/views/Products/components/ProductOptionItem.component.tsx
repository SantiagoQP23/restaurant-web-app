import { FC } from 'react';
import { ProductOption } from '../../../../../../models';
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Radio,
  Stack,
  Typography
} from '@mui/material';
import {
  DeleteOutlined,
  EditOutlined,
  MoreVert,
  Reply
} from '@mui/icons-material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import { ModalUpdateProductOption } from './ModalUpdateProductOption.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useSetDefaultVariant } from '../../../hooks/useProducts';

interface Props {
  productOption: ProductOption;
  productId: string;
}
export const ProductOptionItem: FC<Props> = ({ productOption, productId }) => {
  const { mutateAsync: setDefaultVariant, isPending } = useSetDefaultVariant();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'productOptionMenu'
  });

  const showModalUpdateProductOption = () => {
    NiceModal.show(ModalUpdateProductOption, { productOption, productId });
  };

  const handleEdit = () => {
    popupState.close();
    showModalUpdateProductOption();
  };
  const handleChange = async () => {
    if (productOption.isDefault) return;

    await setDefaultVariant({
      productId,
      variantId: productOption.id
    });
  };

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' alignItems='center' gap={2}>
          <Radio
            checked={productOption.isDefault}
            onChange={handleChange}
            value={productOption.id}
            name='radio-buttons'
            // disabled={isPending || productOption.isDefault}
          />
          <Box display='flex' flexDirection='column' gap={0.5}>
            <Typography variant='subtitle2'>{productOption.name}</Typography>
            <Stack direction='row' gap={1} alignItems='center'>
              <Typography variant='caption' color='text.secondary'>
                {formatMoney(productOption.price)}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {productOption.quantity}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <IconButton {...bindTrigger(popupState)}>
          <MoreVert />
        </IconButton>
      </Box>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 170
            }
          }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        {productOption.isActive ? (
          <MenuItem sx={{ color: 'error.main' }}>
            <DeleteOutlined fontSize='small' sx={{ mr: 2 }} />
            Desactivar
          </MenuItem>
        ) : (
          <MenuItem>
            <Reply fontSize='small' sx={{ mr: 2 }} />
            Habilitar
          </MenuItem>
        )}
      </Popover>
    </>
  );
};
