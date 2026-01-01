import { LoadingButton } from '@mui/lab';
import { TypeOrder } from '../../../../../models';
import { useDrawerInvoiceStore } from '../../store/drawerInvoiceStore';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
  DialogTitle
} from '@mui/material';
import { useRemoveInvoice } from '../../hooks/useInvoices';
import {
  useDeleteInvoice,
  useUpdateInvoiceOrder
} from '../../hooks/useInvocesOrder';
import { UpdateInvoiceDto } from '../../dto';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux';

export const ModalDeleteInvoice = () => {
  const { activeInvoice, handleCloseModal, openModal, handleCloseDrawer } =
    useDrawerInvoiceStore();

  // const { mutateAsync, isPending } = useRemoveInvoice();

  const { activeOrder } = useSelector(selectOrders);

  const { loading, deleteInvoiceOrder } = useDeleteInvoice();

  const submitDeleteInvoice = () => {
    console.log('delete invoice');

    if (activeInvoice && activeOrder) {
      const data: UpdateInvoiceDto = {
        id: activeInvoice.id,
        orderId: activeOrder.id
        // isActive: false
      };

      deleteInvoiceOrder(data);
    }
    // mutateAsync(activeInvoice.id);

    handleCloseModal();
    handleCloseDrawer();
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        zIndex: 2500
      }}
    >
      <DialogTitle>Eliminar factura</DialogTitle>

      <DialogContent>
        <Stack spacing={1} direction='column' justifyContent='center'>
          <Box>
            {/* <Typography variant="body1" color="text.primary"> {
              order?.type === TypeOrder.IN_PLACE

                ?
                `Mesa ${order?.table?.name}`
                : 'Para llevar'

            }</Typography> */}
          </Box>
          {/*           
  {
    order?.client &&

    (<Box>
      <Typography variant="caption" color="text.secondary">Cliente</Typography>
      <Typography variant="body1" color="text.primary">{`${order?.client?.person.firstName} ${order?.client?.person.lastName}`}</Typography>
    </Box>
    )
  } */}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={handleCloseModal} color='inherit'>
          Cancelar
        </Button>
        <LoadingButton
          variant='contained'
          color='error'
          onClick={submitDeleteInvoice}
          loading={loading}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
