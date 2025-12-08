import { useState } from 'react';

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Typography,
  Box,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Switch
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

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
 */
export const ModalAddDetail = NiceModal.create<Props>(({ detail }) => {
  const modal = useModal();
  console.log('detail', detail);
  // const product = detail?.product;
  // const availableOptions = product?.options
  //   ? product?.options.filter((option) => option.isAvailable)
  //   : [];

  const [description, setDescription] = useState('');
  const [detailDelivered, setDetailDelivered] = useState(false);
  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [selectedOption] = useState<ProductOption | undefined>(
    detail.productOption ? detail.productOption : undefined
  );
  const { activeOrder } = useSelector(selectOrders);

  const [typeOrder, setTypeOrder] = useState<TypeOrder>(
    activeOrder ? activeOrder.type : TypeOrder.IN_PLACE
  );
  const [detailWithNote, setDetailWithNote] = useState(true);

  const handleChangeDetailWithNote = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailWithNote(event.target.checked);
  };

  const { addDetail, details, updateDetail } = useNewOrderStore(
    (state) => state
  );

  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: createOrderDetail,
    isLoading,
    isOnline
  } = useCreateOrderDetail();

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleProductDelivered = () => {
    setDetailDelivered(!detailDelivered);
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
      price: detail!.product.price,
      quantity,
      qtyDelivered: detailDelivered ? quantity : 0,
      typeOrderDetail: typeOrder
    };

    if (description) {
      data.description = description;
    }
    if (selectedOption) {
      data.productOptionId = selectedOption.id;
    }
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

  const handleTypeChange = (type: TypeOrder) => {
    setTypeOrder(type);
  };

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <DialogContent
          sx={{
            width: {
              xs: '100%',
              md: 370
            }
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant='subtitle2' color='text.secondary'>
                {detail?.product.category.name}
              </Typography>
              <Typography variant='h6'>{detail?.product.name}</Typography>
            </Box>
            <Typography variant='body1'>${detail?.product.price}</Typography>

            {/* <List sx={{ p: 0 }} dense>
              {detail?.product.options.map((option) => (
                <ListItem key={option.id}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} />
                  <ListItemText primary={option.name} />
                </ListItem>
              ))}
            </List> */}
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                value={typeOrder}
                name='radio-buttons-group'
                onChange={(e) => {
                  handleTypeChange(e.target.value as TypeOrder);
                }}
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

            {/* <Autocomplete
                id="checkboxes-tags-demo"
                options={product.options}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Opciones"
                    placeholder="Opción"
                    variant="standard"
                  />
                )}
              /> */}

            {detail?.product.description && (
              <Box sx={{ border: '1px solid #e0e0e0', p: 1, borderRadius: 1 }}>
                <Typography variant='body1' style={{ whiteSpace: 'pre-wrap' }}>
                  {detail?.product.description}
                </Typography>
              </Box>
            )}

            <CounterInput
              value={detail?.quantity || 1}
              onChange={handleQuantityChange}
            />
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              justifyContent='space-between'
            >
              <Typography variant='body1'>Producto entregado</Typography>
              <Checkbox onChange={handleProductDelivered} />
            </Stack>

            {detail?.product.status !== ProductStatus.AVAILABLE ? (
              <>
                <Label color='warning'>Producto no disponible</Label>
              </>
            ) : (
              <>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  justifyContent='space-between'
                >
                  <Typography variant='body1'>
                    Añadir notas al detalle
                  </Typography>
                  <Switch
                    checked={detailWithNote}
                    onChange={handleChangeDetailWithNote}
                  />
                </Stack>

                {detailWithNote && (
                  <FormControl fullWidth>
                    <Stack
                      flexWrap='wrap'
                      flexDirection='column'
                      spacing={2}
                      alignItems='end'
                      width='100%'
                    >
                      <TextField
                        id='descripcion-pedido'
                        label='Notas'
                        margin='dense'
                        multiline
                        rows={3}
                        sx={{
                          width: '100%'
                        }}
                        defaultValue={description}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          setDescription(e.target.value);
                        }}
                      />
                    </Stack>
                  </FormControl>
                )}
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={closeModal}>Cancelar</Button>

          {detail?.product.status === ProductStatus.AVAILABLE && (
            <LoadingButton
              onClick={handleCreateDetail}
              variant='contained'
              loading={isLoading}
              startIcon={<ShoppingCartIcon />}
              // disabled={
              //   !isOnline
              //   // (detail.product.options.length > 0 && !selectedOption)
              // }
            >
              Añadir
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
});
