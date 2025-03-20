import {
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog
} from '@mui/material';
import { ISection } from '../../../../../../models';
import { LoadingButton } from '@mui/lab';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useUpdateSection } from '../../../hooks/useSections';

export interface Props {
  section: ISection;
}

export const ModalDeleteSection = NiceModal.create<Props>(({ section }) => {
  const modal = useModal();

  const updateSectionMutation = useUpdateSection();

  const closeModal = () => {
    modal.hide();
  };

  const submitDeleteSection = async () => {
    updateSectionMutation.mutateAsync({
      id: section.id,
      isActive: false
    });
    closeModal();
  };

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <DialogTitle id='alert-dialog-title'>
          {`¿Esta seguro de eliminar la sección ${section!.name}?`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Se eliminarán todas las categorías y productos que pertenecen a esta
            categoría
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={closeModal} color='inherit'>
            Cancelar
          </Button>
          <LoadingButton
            loading={false}
            variant='contained'
            color='error'
            onClick={submitDeleteSection}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
});
