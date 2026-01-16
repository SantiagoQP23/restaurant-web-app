import { FC, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  Box,
  IconButton,
  Typography,
  LinearProgress,
  Checkbox,
  Chip,
  Card,
  CardHeader,
  CardActions,
  Popover,
  MenuItem,
  FormControlLabel,
  Button
} from '@mui/material';

import {
  SaveOutlined,
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  CheckCircleOutline,
  MoreVert
} from '@mui/icons-material';
import { IOrderDetail, TypeOrder } from '../../../../../../models';

import { UpdateOrderDetailDto } from '../../../dto/update-order-detail.dto';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { statusModalDeleteOrderDetail } from '../../../services/orders.service';
import { useUpdateOrderDetail } from '../../../hooks';
import { CounterInput } from '../../../components/CounterInput.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import NiceModal from '@ebay/nice-modal-react';
import { ModalEditOrderDetail } from '../../../components';
import { bindPopover } from 'material-ui-popup-state';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';

interface Props {
  detail: IOrderDetail;
}

/**
 * @version 1.0 17-01-2024
 * @author Steven Rosales
 * @version 1.1 17/03/2025 Adds type order
 */
export const OrderDetailCard: FC<Props> = ({ detail }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverOrderDetail'
  });

  const [quantity, setQuantity] = useState(detail.quantity);

  const handleChangeQuantity = (value: number) => {
    setQuantity(value);
  };

  const { activeOrder } = useSelector(selectOrders);

  const { mutate: update } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(
    detail.qtyDelivered === detail.quantity
  );

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    popupState.close();
    const value = event.target.checked;

    if (value) {
      updateQtyDelivered(detail.quantity);
    } else {
      updateQtyDelivered(0);
    }

    setChecked(event.target.checked);
  };

  const updateQuantity = () => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail.id,
      quantity
    };

    update(data);
  };

  const updateQtyDelivered = (qtyDelivered: number) => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail!.id,
      qtyDelivered: qtyDelivered
    };

    update(data);
  };

  const showEditDetailModal = () =>
    NiceModal.show(ModalEditOrderDetail, {
      detail: detail,
      orderId: activeOrder!.id
    });

  const showDeleteDetailModal = () =>
    statusModalDeleteOrderDetail.setSubject(true, detail, activeOrder!.id);

  const handleEdit = () => {
    popupState.close();
    showEditDetailModal();
  };

  const handleDelete = () => {
    popupState.close();
    showDeleteDetailModal();
  };

  const isDeleteable = detail.qtyDelivered === 0;

  // const qtyToDeliver = detail.quantity - detail.qtyDelivered;

  const quantityChanged =
    quantity !== detail.quantity &&
    quantity > 0 &&
    quantity >= detail.qtyDelivered;

  return (
    <>
      <Card
        sx={{ boxShadow: 'none', border: 1, borderColor: 'divider', mb: 2 }}
      >
        <CardHeader
          // avatar={<Typography variant="h6">{detail.quantity}</Typography>}
          title={
            <>
              <Typography
                variant='subtitle1'
                component='div'
                color='text.primary'
              >
                {detail.product.name} x{detail.quantity}
                {detail.productOption && (
                  <Chip
                    sx={{ ml: 1 }}
                    label={detail.productOption?.name}
                    size='small'
                  />
                )}
              </Typography>
              {detail.typeOrderDetail === TypeOrder.TAKE_AWAY && (
                <Typography
                  alignItems='center'
                  display='flex'
                  sx={{ color: `warning.main` }}
                  gap={1}
                >
                  <Typography>Para llevar</Typography>
                </Typography>
              )}
            </>
          }
          action={
            <IconButton {...bindTrigger(popupState)}>
              <MoreVert fontSize='small' />
            </IconButton>
          }
        />
        <Box px={2}>
          {detail.description && (
            <Typography variant='subtitle2' whiteSpace='pre-wrap'>
              {detail.description}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              mt: 1
            }}
          >
            <Box sx={{ width: '100px', mr: 1 }}>
              <LinearProgress
                variant='determinate'
                value={(detail.qtyDelivered * 100) / detail.quantity}
                color='primary'
              />
            </Box>
            <Typography variant='subtitle1' component='div'>
              {formatMoney(detail.amount)}
            </Typography>
          </Box>
        </Box>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* <Box display='flex'> */}
          {/*   <CounterInput */}
          {/*     value={quantity} */}
          {/*     onChange={handleChangeQuantity} */}
          {/*     min={0.5} */}
          {/*   /> */}
          {/*   {quantityChanged && ( */}
          {/*     <IconButton */}
          {/*       color='primary' */}
          {/*       onClick={(e) => { */}
          {/*         e.stopPropagation(); */}
          {/*         updateQuantity(); */}
          {/*       }} */}
          {/*     > */}
          {/*       <SaveOutlined /> */}
          {/*     </IconButton> */}
          {/*   )} */}
          {/* </Box> */}
          <Box display='flex' justifyContent='end' textAlign='end' gap={1}>
            {/* <Typography variant='subtitle1' component='div'> */}
            {/*   {formatMoney(detail.price)} */}
            {/* </Typography> */}
          </Box>
        </CardActions>
        <Box px={2}>
          <Box>
            {detail.qtyDelivered > quantity && (
              <Typography
                variant='subtitle1'
                fontSize='0.8rem'
                component='div'
                color='error'
              >
                La cantidad debe ser mayor o igual a la entregada
              </Typography>
            )}
          </Box>
        </Box>
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
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                checked={checked}
                onChange={handleChangeChecked}
                inputProps={{ 'aria-label': 'controlled' }}
                color='success'
              />
            }
            label={checked ? 'Entregado' : 'Entregar'}
          />
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={handleDelete}
          disabled={!isDeleteable}
        >
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};
