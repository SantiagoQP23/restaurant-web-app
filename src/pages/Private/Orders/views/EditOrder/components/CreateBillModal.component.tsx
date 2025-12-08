import React from 'react';
import { Account } from './Account.component';
import NiceModal, {
  muiDialogV5,
  useModal as useNiceModal
} from '@ebay/nice-modal-react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { Order } from '@/models';
// import { useModal } from "@/hooks";

interface Props {
  order: Order;
}

/**
 * Modal to create a bill
 *
 * @author Santiago Quirumbay
 *
 */
export const CreateBillModal = NiceModal.create<Props>(({ order }) => {
  // const { handleClose, isOpen, handleOpen } = useModal();
  const modal = useNiceModal();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeModal = () => {
    modal.hide();
  };

  return (
    <>
      <Dialog {...muiDialogV5(modal)} fullScreen={fullScreen} maxWidth='lg'>
        <DialogTitle>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='h5'>Crear cuenta</Typography>
            </Box>
            <Stack direction='row' spacing={2} alignItems='center'>
              <IconButton onClick={modal.hide} size='small'>
                <CloseOutlined fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Account order={order} onSuccess={closeModal} />
        </DialogContent>
        {/* <DialogActions>
          <Button>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
});
