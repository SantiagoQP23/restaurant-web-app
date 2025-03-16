import { FC, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  Box,
  IconButton,
  Typography,
  LinearProgress,
  TableCell,
  TableRow,
  Stack,
  Checkbox,
  Chip
} from '@mui/material';

import {
  SaveOutlined,
  DeleteOutline,
  EditOutlined,
  CheckCircle,
  CheckCircleOutline
} from '@mui/icons-material';
import { IOrderDetail } from '../../../../../../models';

import { UpdateOrderDetailDto } from '../../../dto/update-order-detail.dto';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { statusModalDeleteOrderDetail } from '../../../services/orders.service';
import { styled } from '@mui/material/styles';
import { useUpdateOrderDetail } from '../../../hooks';
import { CounterInput } from '../../../components/CounterInput.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import NiceModal from '@ebay/nice-modal-react';
import { ModalEditOrderDetail } from '../../../components';

interface Props {
  detail: IOrderDetail;
}

export const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);

/**
 * @version 1.1 20/12/2023 Adds product option
 */
export const OrderDetail: FC<Props> = ({ detail }) => {
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

  const editDetail = () => {
    NiceModal.show(ModalEditOrderDetail, {
      detail: detail,
      orderId: activeOrder!.id
    });
  };

  const deleteDetail = () => {
    statusModalDeleteOrderDetail.setSubject(true, detail, activeOrder!.id);

    // const data: DeleteOrderDetailDto = {
    //   detailId: detail!.id,
    //   orderId: activeOrder!.id
    // }

    // deleteOrderDetail(data)
  };

  return (
    <>
      <TableRow
        sx={{
          whiteSpace: 'nowrap'
        }}
      >
        <TableCell align='center' padding='checkbox'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <CounterInput
              value={quantity}
              onChange={handleChangeQuantity}
              min={0.5}
            />

            {quantity !== detail.quantity &&
              quantity > 0 &&
              quantity >= detail.qtyDelivered && (
                <IconButton
                  disabled={
                    !quantity ||
                    quantity === detail.quantity ||
                    quantity < detail.qtyDelivered
                  }
                  color='primary'
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity();
                  }}
                >
                  <SaveOutlined />
                </IconButton>
              )}
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant='h5' noWrap>
            {detail.product.name}
            {detail.productOption && (
              <Chip
                sx={{ ml: 1 }}
                label={detail.productOption?.name}
                size='small'
              />
            )}
          </Typography>
          <Typography variant='body2' whiteSpace='pre-wrap'>
            {detail.description && detail.description}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant='body1'>{formatMoney(detail.price)}</Typography>
        </TableCell>

        <TableCell align='left'>
          <Stack direction='column' alignItems='right' mt={0.5}>
            <LinearProgressWrapper
              value={(detail.qtyDelivered * 100) / detail.quantity}
              color='info'
              variant='determinate'
              sx={{
                width: '100%'
              }}
            />
            <Typography variant='subtitle1' fontSize={12}>
              {detail.qtyDelivered} / {detail.quantity}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align='right'>
          {
            // detail.discount > 0 &&
            // <Typography variant="subtitle1" >$ {detail.product.price * quantity} - $ {detail.discount}</Typography>
          }
          <Typography variant='body1' fontWeight='bold'>
            {formatMoney(detail.amount)}
          </Typography>
        </TableCell>

        <TableCell align='center'>
          <Checkbox
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircle />}
            checked={checked}
            onChange={handleChangeChecked}
            inputProps={{ 'aria-label': 'controlled' }}
            color='success'
          />

          <IconButton onClick={editDetail} color='primary'>
            <EditOutlined />
          </IconButton>

          <IconButton onClick={deleteDetail} color='error'>
            <DeleteOutline />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
