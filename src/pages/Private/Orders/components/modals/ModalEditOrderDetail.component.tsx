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
}

/**
 * Modal to edit a product to the active order
 * @version 1.1 20/12/2023 Adds product options chip and NiceModal
 * @version 1.3 28/12/2023 Adds useUpdateOrderDetail hook
 * @version 1.4 03-02-2026 Shows createdAt and updatedAt in dialog
 * @version 1.5 03-02-2026 UX improvements: sections, dirty state, progress hint, layout
 */
export const ModalEditOrderDetail = NiceModal.create<Props>(
  ({ detail, orderId }) => {
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
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1
          }}
        >
          <Box>
            <Typography variant='h6' component='span' fontWeight={600}>
              {detail?.product.name}
            </Typography>
            {detail?.product.description && (
              <Typography
                variant='body2'
                color='text.secondary'
                whiteSpace='pre-wrap'
                mt={0.25}
              >
                {detail.product.description}
              </Typography>
            )}
          </Box>
          <IconButton onClick={closeModal} size='small' sx={{ ml: 1 }}>
            <Close fontSize='small' />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <Grid container spacing={1.5}>
            {/* ── Section: Pedido ───────────────────────────── */}
            <Grid item xs={12}>
              <Stack direction='row' alignItems='center' spacing={1} mb={0.5}>
                <Typography
                  variant='overline'
                  color='text.secondary'
                  lineHeight={1}
                >
                  Pedido
                </Typography>
              </Stack>
            </Grid>

            {/* Type selector */}
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby='type-order-group-label'
                  name='radio-buttons-group'
                  onChange={(e) =>
                    handleTypeChange(e.target.value as TypeOrder)
                  }
                  value={typeOrder}
                >
                  <Stack direction='row' spacing={2}>
                    <FormControlLabel
                      value={TypeOrder.IN_PLACE}
                      control={<Radio size='small' />}
                      label='Para servir'
                    />
                    <FormControlLabel
                      value={TypeOrder.TAKE_AWAY}
                      control={<Radio size='small' />}
                      label='Para llevar'
                    />
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Quantity + Price in one row */}
            <Grid item xs={7} display='flex' alignItems='center'>
              <CounterInput
                value={quantity}
                onChange={handleChangeQuantity}
                min={detail?.qtyDelivered}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                id='precio-producto'
                label='Precio'
                margin='dense'
                type='number'
                defaultValue={detail?.price}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AttachMoney fontSize='small' />
                    </InputAdornment>
                  )
                }}
                onBlur={(e) => setPrice(Number(e.target.value))}
                size='small'
                inputProps={{ min: 0, step: 0.25 }}
              />
            </Grid>

            {/* ── Section: Notas ────────────────────────────── */}
            <Grid item xs={12}>
              <Stack direction='row' alignItems='center' spacing={1} mb={0.5}>
                <Typography
                  variant='overline'
                  color='text.secondary'
                  lineHeight={1}
                >
                  Notas
                </Typography>
              </Stack>
              <TextField
                id='descripcion-pedido'
                margin='dense'
                multiline
                rows={3}
                defaultValue={detail?.description}
                fullWidth
                onBlur={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* ── Section: Entrega ──────────────────────────── */}
            <Grid item xs={12}>
              <Stack direction='row' alignItems='center' spacing={1} mb={0.5}>
                <Typography
                  variant='overline'
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
                color={deliveryProgress >= 100 ? 'success' : 'primary'}
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
                <Tooltip
                  title={format(createdAt, 'PPPp', { locale: es })}
                  placement='left'
                >
                  <Stack direction='row' alignItems='center' spacing={0.75}>
                    <AccessTimeOutlined
                      sx={{ fontSize: '0.85rem', color: 'text.disabled' }}
                    />
                    <Typography variant='caption' color='text.disabled'>
                      Creado{' '}
                      {formatDistanceToNow(createdAt, {
                        addSuffix: true,
                        locale: es
                      })}{' '}
                      · {format(createdAt, 'd MMM HH:mm', { locale: es })}
                    </Typography>
                  </Stack>
                </Tooltip>

                {wasUpdated && (
                  <Tooltip
                    title={format(updatedAt, 'PPPp', { locale: es })}
                    placement='left'
                  >
                    <Stack direction='row' alignItems='center' spacing={0.75}>
                      <EditOutlined
                        sx={{ fontSize: '0.85rem', color: 'text.disabled' }}
                      />
                      <Typography variant='caption' color='text.disabled'>
                        Actualizado{' '}
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
