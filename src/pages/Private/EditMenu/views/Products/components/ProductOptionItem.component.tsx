import { FC } from 'react';
import { ProductOption } from '../../../../../../models';
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
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

interface Props {
  productOption: ProductOption;
  productId: string;
}
export const ProductOptionItem: FC<Props> = ({ productOption, productId }) => {
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

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='subtitle2'>{productOption.name}</Typography>
          <Typography variant='caption' color='text.secondary'>
            {formatMoney(productOption.price)}
          </Typography>
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
