import { useState } from 'react';

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  Typography,
  Box,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Grid,
  Divider,
  LinearProgress,
  IconButton,
  alpha,
  useTheme
} from '@mui/material/';

import {
  ICreateOrderDetail,
  Order,
  TypeOrder
} from '../../../../../models/orders.model';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';

import { CreateOrderDetailDto } from '../../dto/create-order-detail.dto';
import { LoadingButton } from '@mui/lab';

import { AttachMoney, Close, ShoppingCart } from '@mui/icons-material';
import { CounterInput } from '../CounterInput.component';
import { ProductOption, ProductStatus } from '../../../../../models';
import { Label } from '../../../../../components/ui';
import { useNewOrderStore } from '../../store/newOrderStore';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useCreateOrderDetail } from '../../hooks';

interface Props {
  detail: ICreateOrderDetail;
}

/**
 * Modal to add a product to the active order or to the new order
 * @author Santiago Quirumbay
 * @version 1.1 18/12/2023 Adds NiceModal and remove rxjs
 * @version 1.2 19/12/2023 Adds product options chip
 * @version 1.3 28/12/2023 Adds useCreateOrderDetail hook
 * @version 1.4 31/01/2025 Options hidden
 * @version 1.5 01/03/2025 Fix: Validation to add product to order and quantity delivered
 *
 * @author Steven Rosales
 * @version 1.6 17/03/2025 Adds type order
 *
 * @author Santiago Quirumbay
 * @version 1.7 20-03-2025 Default order detail type
 * @version 1.8 03-02-2026 Align UI with ModalEditOrderDetail
 */
export const ModalAddDetail = NiceModal.create<Props>(({ detail }) => {
  const modal = useModal();
  const theme = useTheme();

  const [description, setDescription] = useState('');
  const [detailWithNote, setDetailWithNote] = useState(false);
  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [price, setPrice] = useState(detail?.product.price);
  const [qtyDelivered, setQtyDelivered] = useState(0);

  const [selectedOption] = useState<ProductOption | undefined>(
    detail.productOption ?? undefined
  );

  const { activeOrder } = useSelector(selectOrders);

  const [typeOrder, setTypeOrder] = useState<TypeOrder>(
    activeOrder ? activeOrder.type : TypeOrder.IN_PLACE
  );

  const { addDetail, details, updateDetail } = useNewOrderStore(
    (state) => state
  );

  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: createOrderDetail,
    isLoading,
    isOnline
  } = useCreateOrderDetail();

  const isAvailable = detail?.product.status === ProductStatus.AVAILABLE;

  const deliveryProgress =
    quantity > 0 ? Math.min((qtyDelivered / quantity) * 100, 100) : 0;

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    // Cap qtyDelivered if quantity is reduced below it
    if (qtyDelivered > value) setQtyDelivered(value);
  };

  const handleTypeChange = (type: TypeOrder) => {
    setTypeOrder(type);
  };

  const closeModal = () => {
    modal.hide();
    setDescription('');
  };

  /**
   * @version 1.1 20/12/2023 Adds product option
   */
  const addProductToOrder = (order: Order) => {
    const data: CreateOrderDetailDto = {
      orderId: order.id,
      productId: detail!.product.id,
      price,
      quantity,
      qtyDelivered,
      typeOrderDetail: typeOrder
    };

    if (description) data.description = description;
    if (selectedOption) data.productOptionId = selectedOption.id;

    createOrderDetail(data);
  };

  const handleCreateDetail = () => {
    if (activeOrder) {
      addProductToOrder(activeOrder);
    } else {
      const detailExists = details.find(
        (currentDetail) =>
          currentDetail.product.id === detail!.product.id &&
          currentDetail.productOption?.id === selectedOption?.id
      );

      if (detailExists) {
        updateDetail({
          ...detail!,
          quantity,
          description,
          productOption: selectedOption
        });
      } else {
        addDetail({
          ...detail!,
          quantity,
          description,
          productOption: selectedOption
        });
        enqueueSnackbar(`${detail?.product.name} agregado`, {
          variant: 'success'
        });
      }
    }

    setDescription('');
    closeModal();
  };

  return (
    <Dialog {...muiDialogV5(modal)} maxWidth='xs' fullWidth>
      {/* ── Title ─────────────────────────────────────────── */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pb: 1
        }}
      >
        <Box>
          <Typography variant='caption' color='text.secondary'>
            {detail?.product.category.name}
          </Typography>
          <Typography variant='h6' component='div' fontWeight={600}>
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
        <IconButton onClick={closeModal} size='small' sx={{ ml: 1, mt: 0.5 }}>
          <Close fontSize='small' />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Grid container spacing={1.5}>
          {/* ── Section: Pedido ───────────────────────────── */}

          {/* Type selector */}
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                aria-labelledby='type-order-group-label'
                name='radio-buttons-group'
                value={typeOrder}
                onChange={(e) => handleTypeChange(e.target.value as TypeOrder)}
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
              value={detail?.quantity || 1}
              onChange={handleQuantityChange}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id='precio-producto'
              label='Precio'
              margin='dense'
              type='number'
              defaultValue={detail?.product.price}
              fullWidth
              InputProps={{
                startAdornment: (
                  <AttachMoney
                    fontSize='small'
                    sx={{ mr: 0.5, color: 'text.secondary' }}
                  />
                )
              }}
              onBlur={(e) => setPrice(Number(e.target.value))}
              size='small'
              inputProps={{ min: 0, step: 0.25 }}
            />
          </Grid>

          {/* ── Section: Notas ────────────────────────────── */}
          {isAvailable && (
            <>
              <Grid item xs={12}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Typography
                    variant='overline'
                    color='text.secondary'
                    lineHeight={1}
                  >
                    Notas
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Switch
                    checked={detailWithNote}
                    onChange={(e) => setDetailWithNote(e.target.checked)}
                  />
                </Stack>
              </Grid>

              {detailWithNote && (
                <Grid item xs={12}>
                  <TextField
                    id='descripcion-pedido'
                    margin='dense'
                    multiline
                    rows={3}
                    fullWidth
                    defaultValue={description}
                    onBlur={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              )}
            </>
          )}

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
              <Box sx={{ flex: 1 }} />
              <Typography variant='caption' color='text.secondary'>
                {qtyDelivered} / {quantity}
              </Typography>
            </Stack>

            {isAvailable ? (
              <>
                <LinearProgress
                  variant='determinate'
                  value={deliveryProgress}
                  color={deliveryProgress >= 100 ? 'success' : 'primary'}
                  sx={{
                    mt: 1,
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
                    max={quantity}
                  />
                </Box>
              </>
            ) : (
              <Label color='warning'>Producto no disponible</Label>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', gap: 1, px: 2, pb: 2 }}>
        <Button onClick={closeModal} color='secondary'>
          Cancelar
        </Button>

        {isAvailable && (
          <LoadingButton
            onClick={handleCreateDetail}
            variant='contained'
            loading={isLoading}
            startIcon={<ShoppingCart />}
            disabled={!isOnline}
          >
            Añadir
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
});
