import { useState, useMemo } from 'react';

import { IOrderDetail, ProductOption, TypeOrder } from '../../../../../models';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
  TextField,
  Grid,
  InputAdornment,
  Button,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
  FormControlLabel,
  Divider,
  Tooltip,
  LinearProgress,
  alpha,
  useTheme
} from '@mui/material';

import { useUpdateOrderDetail } from '../../hooks';
import {
  Close,
  AttachMoney,
  Save,
  AccessTimeOutlined,
  EditOutlined
} from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { UpdateOrderDetailDto } from '../../dto/update-order-detail.dto';
import { LoadingButton } from '@mui/lab';
import { CounterInput } from '../CounterInput.component';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

interface Props {
  detail: IOrderDetail;
  orderId: string;
  orderUserId: string;
}

/**
 * Modal to edit a product to the active order
 * @version 1.1 20/12/2023 Adds product options chip and NiceModal
 * @version 1.3 28/12/2023 Adds useUpdateOrderDetail hook
 * @version 1.4 03-02-2026 Shows createdAt and updatedAt in dialog
 * @version 1.5 03-02-2026 UX improvements: sections, dirty state, progress hint, layout
 */
export const EditOrderDetailKitchenModal = NiceModal.create<Props>(
  ({ detail, orderId, orderUserId }) => {
    const modal = useModal();
    const theme = useTheme();

    const [quantity, setQuantity] = useState(detail.quantity);
    const [qtyDelivered, setQtyDelivered] = useState(detail.qtyDelivered);
    const [typeOrder, setTypeOrder] = useState(detail.typeOrderDetail);
    const [description, setDescription] = useState(detail.description);
    const [price, setPrice] = useState(detail.price);

    const [selectedOption] = useState<ProductOption | undefined>(
      detail.productOption ?? undefined
    );

    const { mutate: update, isLoading, isOnline } = useUpdateOrderDetail();
    const showCreatedBy =
      detail.createdBy?.person.firstName && detail.createdBy.id !== orderUserId;

    const showUpdatedBy =
      detail.updatedBy?.person.firstName && detail.updatedBy.id !== orderUserId;

    // Dirty state — true when at least one field differs from original
    const isDirty = useMemo(
      () =>
        quantity !== detail.quantity ||
        qtyDelivered !== detail.qtyDelivered ||
        typeOrder !== detail.typeOrderDetail ||
        description !== detail.description ||
        price !== detail.price,
      [quantity, qtyDelivered, typeOrder, description, price, detail]
    );

    const deliveryProgress = useMemo(
      () => (quantity > 0 ? (qtyDelivered / quantity) * 100 : 0),
      [qtyDelivered, quantity]
    );

    const createdAt = useMemo(
      () => new Date(detail.createdAt),
      [detail.createdAt]
    );
    const updatedAt = useMemo(
      () => new Date(detail.updatedAt),
      [detail.updatedAt]
    );
    const wasUpdated = useMemo(
      () => createdAt.getTime() !== updatedAt.getTime(),
      [createdAt, updatedAt]
    );

    const updateDetail = () => {
      const data: UpdateOrderDetailDto = {
        orderId,
        id: detail!.id,
        qtyDelivered,
        quantity,
        description,
        price,
        typeOrderDetail: typeOrder
      };

      if (selectedOption) {
        data.productOptionId = selectedOption.id;
      }

      update(data);
      closeModal();
    };

    const closeModal = () => {
      modal.hide();
    };

    const handleChangeQuantity = (value: number) => {
      setQuantity(value);
    };

    const handleTypeChange = (type: TypeOrder) => {
      setTypeOrder(type);
    };

    return (
      <Dialog {...muiDialogV5(modal)} maxWidth='xs' fullWidth>
        {/* ── Title ─────────────────────────────────────────── */}
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            pb: 1
          }}
        >
          {/* <Box> */}
          {/*   <Typography variant='h6' component='span' fontWeight={600}> */}
          {/*     {detail?.product.name} */}
          {/*   </Typography> */}
          {/*   {detail?.product.description && ( */}
          {/*     <Typography */}
          {/*       variant='body2' */}
          {/*       color='text.secondary' */}
          {/*       whiteSpace='pre-wrap' */}
          {/*       mt={0.25} */}
          {/*     > */}
          {/*       {detail.product.description} */}
          {/*     </Typography> */}
          {/*   )} */}
          {/* </Box> */}
          <IconButton onClick={closeModal} size='small' sx={{ ml: 1 }}>
            <Close fontSize='small' />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <Typography variant='h5' color='text.primary' fontWeight={600} mb={1}>
            {detail?.product.name}
          </Typography>
          <Grid container spacing={1.5}>
            {/* ── Section: Entrega ──────────────────────────── */}
            <Grid item xs={12}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='end'
                spacing={1}
                mb={1}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                  lineHeight={1}
                >
                  Entrega
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {qtyDelivered} / {quantity}
                </Typography>
              </Stack>

              {/* Progress bar */}
              <LinearProgress
                variant='determinate'
                value={Math.min(deliveryProgress, 100)}
                color='primary'
                sx={{
                  height: 5,
                  borderRadius: 4,
                  mb: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.08)
                }}
              />

              <Box display='flex' justifyContent='flex-end'>
                <CounterInput
                  value={qtyDelivered}
                  onChange={setQtyDelivered}
                  min={0}
                  max={detail?.quantity}
                />
              </Box>
            </Grid>

            {/* ── Timestamps ────────────────────────────────── */}
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5 }} />
              <Stack spacing={0.5} mt={1.5}>
                <Tooltip title='Creación' placement='left'>
                  <Stack direction='row' alignItems='center' spacing={0.75}>
                    <AccessTimeOutlined
                      sx={{ fontSize: '0.85rem', color: 'text.disabled' }}
                    />
                    {showCreatedBy && (
                      <Typography variant='caption' color='text.disabled'>
                        {detail.createdBy?.person.firstName} ·
                      </Typography>
                    )}
                    <Typography variant='caption' color='text.disabled'>
                      {formatDistanceToNow(createdAt, {
                        addSuffix: true,
                        locale: es
                      })}{' '}
                      · {format(createdAt, 'd MMM HH:mm', { locale: es })}
                    </Typography>
                  </Stack>
                </Tooltip>

                {wasUpdated && (
                  <Tooltip title='Actualización' placement='left'>
                    <Stack direction='row' alignItems='center' spacing={0.75}>
                      <EditOutlined
                        sx={{ fontSize: '0.85rem', color: 'text.disabled' }}
                      />
                      {showUpdatedBy && (
                        <Typography variant='caption' color='text.disabled'>
                          {detail.updatedBy?.person.firstName} ·
                        </Typography>
                      )}
                      <Typography variant='caption' color='text.disabled'>
                        {formatDistanceToNow(updatedAt, {
                          addSuffix: true,
                          locale: es
                        })}{' '}
                        · {format(updatedAt, 'd MMM HH:mm', { locale: es })}
                      </Typography>
                    </Stack>
                  </Tooltip>
                )}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{ justifyContent: 'flex-end', gap: 1, px: 2, pb: 2 }}
        >
          <Button onClick={closeModal} color='secondary'>
            Cancelar
          </Button>

          <Tooltip title={!isDirty ? 'Sin cambios' : ''} placement='top'>
            <span>
              <LoadingButton
                variant='contained'
                onClick={updateDetail}
                loading={isLoading}
                startIcon={<Save />}
                disabled={!isOnline || !isDirty}
              >
                Actualizar
              </LoadingButton>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    );
  }
);
