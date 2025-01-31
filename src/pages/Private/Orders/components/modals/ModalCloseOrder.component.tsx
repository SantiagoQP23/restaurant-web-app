import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { Order, TypeOrder } from "../../../../../models/orders.model";
import { EventsEmitSocket } from "../../interfaces/events-sockets.interface";
import { SocketResponse } from "../../interfaces/responses-sockets.interface";
import { useSnackbar } from "notistack";
import { SocketContext } from "../../../../../context/SocketContext";
import { UpdateOrderDto } from "../../dto/update-order.dto";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../../../redux";
import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react";

interface Props {
  order: Order;
}


/**
 * Modal to close order
 * @version 1.1 13/12/2023 Add NiceModal
 */
export const ModalCloseOrder = NiceModal.create<Props>(({ order }) => {
  const modal = useModal();

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const closeModal = () => {
    modal.hide();
  };

  const submitPayOrder = () => {
    console.log("pagar orden");

    const data: UpdateOrderDto = {
      id: order!.id,
      isClosed: true,
    };

    socket?.emit(
      EventsEmitSocket.updateOrder,
      data,
      (response: SocketResponse) => {
        console.log(response);

        if (response.ok) {
          dispatch(deleteOrder(order!.id));

          closeModal();
        } else {
          enqueueSnackbar(response.msg, { variant: "error" });
        }
      }
    );
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle id="alert-dialog-title" textAlign="center" variant="h4">
        Cerrar pedido
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            <b>Mesa: </b>
            {`${
              order?.type === TypeOrder.IN_PLACE
                ? `Mesa ${order?.table?.name || ""}`
                : "Para llevar"
            }`}
          </Typography>

          <Box>
            <Typography variant="h4" textAlign="center">
              ¿Desea cerrar el pedido?
            </Typography>

            <Typography color="secondary" fontSize={12} textAlign="center">
              Luego de cerrar el pedido ya no podrá editarlo
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={submitPayOrder}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
