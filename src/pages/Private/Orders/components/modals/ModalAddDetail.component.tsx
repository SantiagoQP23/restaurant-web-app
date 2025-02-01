import { useState } from "react";

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
  Chip,
  useMediaQuery,
  useTheme,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material/";

import { ICreateOrderDetail, Order } from "../../../../../models/orders.model";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { selectOrders } from "../../../../../redux/slices/orders/orders.slice";

import { CreateOrderDetailDto } from "../../dto/create-order-detail.dto";
import { LoadingButton } from "@mui/lab";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CounterInput } from "../CounterInput.component";
import { ProductOption, ProductStatus } from "../../../../../models";
import { Label } from "../../../../../components/ui";
import { useNewOrderStore } from "../../store/newOrderStore";
import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react";
import { Scrollbar } from "../../../components";
import { formatMoney } from "../../../Common/helpers/format-money.helper";
import { useCreateOrderDetail } from "../../hooks";

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
 */
export const ModalAddDetail = NiceModal.create<Props>(({ detail }) => {
  const modal = useModal();
  console.log("detail", detail);
  const product = detail?.product;
  const availableOptions = product?.options
    ? product?.options.filter((option) => option.isAvailable)
    : [];

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(detail?.quantity || 1);
  const [selectedOption, setSelectedOption] = useState<
    ProductOption | undefined
  >(detail.productOption ? detail.productOption : undefined);

  const { addDetail, details, updateDetail } = useNewOrderStore(
    (state) => state
  );
  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: createOrderDetail,
    isLoading,
    isOnline,
  } = useCreateOrderDetail();

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const closeModal = () => {
    modal.hide();
    setDescription("");
  };

  /**
   * @version 1.1 20/12/2023 Adds product option
   */
  const addProductoToOrder = (order: Order) => {
    const data: CreateOrderDetailDto = {
      orderId: order.id,
      productId: detail!.product.id,
      price: detail!.product.price,
      quantity,
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
      addProductoToOrder(activeOrder);
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
          productOption: selectedOption,
        });
      } else {
        addDetail({
          ...detail!,
          quantity,
          description,
          productOption: selectedOption,
        });
        enqueueSnackbar(`${detail?.product.name} agregado`, {
          variant: "success",
        });
      }
    }

    setDescription("");
    closeModal();
  };

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <DialogContent
          sx={{
            width: 300,
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1">
                {detail?.product.category.name}
              </Typography>
              <Typography variant="h4">{detail?.product.name}</Typography>
            </Box>
            <Typography variant="h4">${detail?.product.price}</Typography>

            {/* <List sx={{ p: 0 }} dense>
              {detail?.product.options.map((option) => (
                <ListItem key={option.id}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} />
                  <ListItemText primary={option.name} />
                </ListItem>
              ))}
            </List> */}
            {/* {availableOptions.length > 0 && (
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Opciones
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    const option = availableOptions.find(
                      (option) => `${option.id}` === e.target.value
                    );
                    setSelectedOption(option);
                  }}
                >
                  {availableOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={`${option?.name} ${formatMoney(option?.price)}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )} */}

            <Box>
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
            </Box>

            {detail?.product.description && (
              <Box>
                <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                  {detail?.product.description}
                </Typography>
              </Box>
            )}

            {detail?.product.status !== ProductStatus.AVAILABLE ? (
              <>
                <Label color="warning">Producto no disponible</Label>
              </>
            ) : (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  my={2}
                >
                  <CounterInput
                    value={detail?.quantity || 1}
                    onChange={handleQuantityChange}
                  />
                </Stack>

                <FormControl fullWidth>
                  <TextField
                    id="descripcion-pedido"
                    label="Notas"
                    margin="dense"
                    multiline
                    rows={3}
                    defaultValue={description}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      setDescription(e.target.value);
                    }}
                  />
                </FormControl>
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={closeModal}>Cancelar</Button>

          {detail?.product.status === ProductStatus.AVAILABLE && (
            <LoadingButton
              onClick={handleCreateDetail}
              variant="contained"
              loading={isLoading}
              startIcon={<ShoppingCartIcon />}
              disabled={
                !isOnline ||
                (detail.product.options.length > 0 && !selectedOption)
              }
            >
              Añadir
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
});
