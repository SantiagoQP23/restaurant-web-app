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
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { PaymentMethodItem } from './PaymentMethodItem.component';
import { ModalCreatePaymentMethod } from './ModalCreatePaymentMethod.component';

export const PaymentMethodsList = () => {
  const { data: paymentMethods, isLoading } = usePaymentMethods();

  return (
    <Stack gap={2} mb={2}>
      <Typography variant='h6' gutterBottom>
        Métodos de pago
      </Typography>

      {isLoading ? (
        <Box display='flex' justifyContent='center' py={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paymentMethods?.map((pm) => (
            <Grid item xs={12} md={4} key={pm.id}>
              <PaymentMethodItem paymentMethod={pm} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box>
        <Button
          startIcon={<Add />}
          onClick={() => NiceModal.show(ModalCreatePaymentMethod)}
        >
          Crear método de pago
        </Button>
      </Box>
    </Stack>
  );
};
