import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import NiceModal from '@ebay/nice-modal-react';
import { useAccounts } from '../hooks/useAccounts';
import { AccountItem } from './AccountItem.component';
import { ModalCreateAccount } from './ModalCreateAccount.component';

export const AccountsList = () => {
  const { data: accounts, isLoading } = useAccounts();

  const showModalCreateAccount = () => {
    NiceModal.show(ModalCreateAccount);
  };

  return (
    <Stack gap={2} mb={2}>
      <Typography variant='h6' gutterBottom>
        Cuentas
      </Typography>

      {isLoading ? (
        <Box display='flex' justifyContent='center' py={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {accounts?.map((account) => (
            <Grid item xs={12} md={4} key={account.id}>
              <AccountItem account={account} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box>
        <Button startIcon={<Add />} onClick={showModalCreateAccount}>
          Crear cuenta
        </Button>
      </Box>
    </Stack>
  );
};
