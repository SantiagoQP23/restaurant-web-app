import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { CashRegisterSummary } from '../CashRegister/components/CashRegisterSummary.view';
import { FormCloseCashRegister } from '../CashRegister/components/FormCloseCashRegister.component';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { CashRegister } from '../../models/cash-register.model';
import { CloseOutlined } from '@mui/icons-material';

interface Props {
  cashRegister: CashRegister;
}

export const CloseCashRegisterModal = NiceModal.create<Props>(
  ({ cashRegister }) => {
    const modal = useModal();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const closeModal = () => {
      modal.hide();
    };

    const onSuccess = () => {
      closeModal();
    };
    return (
      <Dialog {...muiDialogV5(modal)} fullScreen={fullScreen}>
        <DialogTitle>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='h4'>
                Cerrar caja N° {cashRegister.id}
              </Typography>
            </Box>
            <Stack direction='row' spacing={2} alignItems='center'>
              <IconButton onClick={closeModal} size='small'>
                <CloseOutlined fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <CashRegisterSummary cashRegister={cashRegister} />
          <Box mt={2}>
            <FormCloseCashRegister
              cashRegister={cashRegister}
              onSuccess={onSuccess}
            />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
);
