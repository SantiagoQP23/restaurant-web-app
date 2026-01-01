import {
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog
} from '@mui/material';
import { updateProduct } from '../../../../../../redux';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../../../../../hooks/useRedux';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { IProduct } from '../../../../../../models';
import { useUpdateProduct } from '../../../hooks/useProducts';

export interface Props {
  product: IProduct;
}

export const ModalDeleteProduct = NiceModal.create<Props>(({ product }) => {
  const modal = useModal();

  const { mutateAsync, isPending } = useUpdateProduct();

  const closeModal = () => {
    modal.hide();
  };

  const dispatch = useAppDispatch();

  const submitDeleteProduct = async () => {
    await mutateAsync({ id: product!.id, isActive: false }).then((product) => {
      dispatch(updateProduct(product));
      closeModal();
    });
  };
  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <DialogTitle id='alert-dialog-title'>
          {`¿Esta seguro de eliminar el producto ${product!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            El producto ya no estará disponible en el menú
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color='inherit'>
            Cancelar
          </Button>
          <LoadingButton
            loading={isPending}
            variant='contained'
            color='error'
            onClick={submitDeleteProduct}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
});
