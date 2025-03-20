import { useState } from 'react';

import { IOrderDetail, ProductOption, TypeOrder } from '../../../../../models';

// import { statusModalDeleteOrderDetail } from "../../services/orders.service";

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
  FormControlLabel
} from '@mui/material';

import { useUpdateOrderDetail } from '../../hooks';
import { Close, AttachMoney, Save } from '@mui/icons-material';
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
 */
export const ModalEditOrderDetail = NiceModal.create<Props>(
  ({ detail, orderId }) => {
    // const [detail, setDetail] = useState<IOrderDetail>();
    const modal = useModal();

    const [quantity, setQuantity] = useState(detail.quantity);
    const [qtyDelivered, setQtyDelivered] = useState(detail.qtyDelivered);
    const [typeOrder, setTypeOrder] = useState(detail.typeOrderDetail);

    // form
    const [description, setDescription] = useState(detail.description);
    const [price, setPrice] = useState(detail.price);

    const [selectedOption] = useState<ProductOption | undefined>(
      detail.productOption ? detail.productOption : undefined
    );

    const { mutate: update, isLoading, isOnline } = useUpdateOrderDetail();

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

    // const showModalDeleteDetail = () => {
    //   statusModalDeleteOrderDetail.setSubject(true, detail!, orderId!);
    //   closeModal();
    // };

    const handleChangeQuantity = (value: number) => {
      setQuantity(value);
    };

    const handleTypeChange = (type: TypeOrder) => {
      setTypeOrder(type);
    };

    return (
      <Dialog {...muiDialogV5(modal)} maxWidth='xs'>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <b>{detail?.product.name}</b>

            {/* {detail?.productOption && (
              <Chip
                sx={{ ml: 1 }}
                label={`${detail?.productOption?.name} `}
                size="small"
              />
            )} */}
          </Box>

          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1} alignItems='center'>
            {/* <Grid item xs={12}>
              {availableOptions.length > 0 && (
                <Scrollbar autoHeight height="auto">
                  <Box
                    sx={{
                      // overflowX: "auto",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {availableOptions.map((option) => (
                      <Chip
                        key={option.id}
                        label={`${option?.name} ${formatMoney(option?.price)}`}
                        variant="filled"
                        onClick={() => setSelectedOption(option)}
                        color={
                          option.id === selectedOption?.id
                            ? "primary"
                            : "default"
                        }
                      />
                    ))}
                  </Box>
                </Scrollbar>
              )}
            </Grid> */}
            <Grid item xs={12}>
              <Typography
                variant='body2'
                color='text.secondary'
                whiteSpace='break-spaces'
              >
                {detail?.product.description}
              </Typography>
            </Grid>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={TypeOrder.IN_PLACE}
                name='radio-buttons-group'
                onChange={(e) => {
                  handleTypeChange(e.target.value as TypeOrder);
                }}
                value={typeOrder}
              >
                <Stack direction='row' spacing={2}>
                  <FormControlLabel
                    value={TypeOrder.IN_PLACE}
                    control={<Radio />}
                    label={'Para servir'}
                  />
                  <FormControlLabel
                    value={TypeOrder.TAKE_AWAY}
                    control={<Radio />}
                    label={'Para llevar'}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
            <Grid item xs={12} display='flex' justifyContent='right'>
              <CounterInput
                value={quantity}
                onChange={handleChangeQuantity}
                min={detail?.qtyDelivered}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id='descripcion-pedido'
                label='Notas'
                margin='dense'
                multiline
                rows={4}
                defaultValue={detail?.description}
                fullWidth
                onBlur={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
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
                      <AttachMoney />
                    </InputAdornment>
                  )
                }}
                onBlur={(e) => {
                  setPrice(Number(e.target.value));
                }}
                size='small'
                inputProps={{
                  min: 0,

                  step: 0.25
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' mt={2}>
                Cantidad entregada
              </Typography>

              <Box
                display='flex'
                alignItems='center'
                justifyContent='right'
                mt={1}
              >
                <CounterInput
                  value={qtyDelivered}
                  onChange={setQtyDelivered}
                  min={0}
                  max={detail?.quantity}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='right'
              mt={1}
            ></Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'right',
            gap: 1,
            px: 2
          }}
        >
          <Button onClick={closeModal} color='secondary'>
            Cancelar
          </Button>

          <LoadingButton
            variant='contained'
            onClick={updateDetail}
            loading={isLoading}
            startIcon={<Save />}
            disabled={!isOnline}
          >
            Actualizar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
);
