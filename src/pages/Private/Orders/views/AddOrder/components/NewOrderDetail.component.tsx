import { FC, useEffect, useState } from 'react';

import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ICreateOrderDetail } from '../../../../../../models';

import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useNewOrderStore } from '../../../store/newOrderStore';
import { CounterInput, ModalAddDetail } from '../../../components';
import NiceModal from '@ebay/nice-modal-react';

interface Props {
  detalle: ICreateOrderDetail;
}

/**
 * Component to show the details of the new order, which is used in the modal to add a new detail and in the order details component
 * @version 1.1 20/12/2023 Adds product options chip
 */
export const NewOrderDetail: FC<Props> = ({ detalle }) => {
  const [quantity, setQuantity] = useState<number>(detalle.quantity);

  const { removeDetail, updateDetail } = useNewOrderStore((state) => state);

  const deleteDetail = () => {
    // dispatch({ type: OrderActionType.DELETE_DETAIL, payload: detalle });
    removeDetail(detalle);
  };

  const handleUpdateQuantity = (value: number) => {
    setQuantity(value);
    updateDetail({ ...detalle, quantity: value });
  };

  const editDescription = () => {
    NiceModal.show(ModalAddDetail, { detail: detalle });
  };

  useEffect(() => {
    setQuantity(detalle.quantity);
  }, [detalle]);

  return (
    <>
      <Box
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'column',
          // p: 1,
          // px: 2,
          gap: 1
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Stack>
            <Typography variant='body1' whiteSpace={'normal'}>
              {detalle.quantity} × {detalle.product.name}
              {/* {detalle.productOption && (
                <Chip
                  sx={{ ml: 1 }}
                  label={`${detalle.productOption?.name} (${formatMoney(
                    detalle.productOption?.price
                  )})`}
                  size="small"
                />
              )} */}
            </Typography>

            {detalle.description && (
              <Typography variant='subtitle1' whiteSpace='pre-wrap'>
                {detalle.description}
              </Typography>
            )}
          </Stack>

          <Stack direction='row' spacing={1}>
            <IconButton onClick={editDescription} color='primary' size='small'>
              <EditOutlined />
            </IconButton>
            <IconButton
              aria-label='Eliminar detalle'
              onClick={deleteDetail}
              disabled={false}
              color='error'
              size='small'
            >
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction='row'
          spacing={3}
          justifyContent='right'
          alignItems='center'
        >
          <CounterInput
            value={quantity}
            onChange={(value: number) => {
              handleUpdateQuantity(value);
            }}
            min={1}
          />

          <Typography variant='body1'>
            {formatMoney(detalle.product.price)}
          </Typography>
        </Stack>

        <Typography variant='h6' textAlign='right'>
          {formatMoney(detalle.product.price * quantity)}
        </Typography>
      </Box>
    </>
  );
};
