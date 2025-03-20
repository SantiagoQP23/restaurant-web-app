import React, { FC } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { CashRegister } from '../../../models/cash-register.model';
import { CloseCashRegisterModal } from '../../CloseCashRegister/CloseCashRegisterModal.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowOutward,
  Lock,
  SaveAlt,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Box,
  IconButton
} from '@mui/material';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { useEncryptMoney } from '../../../../Common/hooks/useEncrypt';
import { format } from 'date-fns';

interface Props {
  cashRegister: CashRegister;
}

export const CashRegisterCard: FC<Props> = ({ cashRegister }) => {
  const { activeCashRegister, setActiveCashRegister } = useCashRegisterStore(
    (state) => state
  );

  const showCloseCashRegisterModal = (cashRegister: CashRegister) =>
    NiceModal.show(CloseCashRegisterModal, { cashRegister });

  const onClick = () => setActiveCashRegister(cashRegister);

  const balanceEncrypt = useEncryptMoney(formatMoney(cashRegister.balance));

  const incomeEncrypt = useEncryptMoney(formatMoney(cashRegister.totalIncome));

  const expenseEncrypt = useEncryptMoney(
    formatMoney(cashRegister.totalExpense)
  );

  const toggleVisibility = () => {
    balanceEncrypt.toggleVisibility();
    incomeEncrypt.toggleVisibility();
    expenseEncrypt.toggleVisibility();
  };

  return (
    <Card
      sx={{
        border: (theme) =>
          activeCashRegister?.id === cashRegister.id
            ? `1px solid ${theme.palette.primary.main}`
            : ''
      }}
      onClick={onClick}
    >
      <CardHeader
        title={'Caja '}
        titleTypographyProps={{
          variant: 'h5'
        }}
        subheader={
          cashRegister.createdBy.person.firstName +
          ' ' +
          cashRegister.createdBy.person.lastName +
          ' - ' +
          format(new Date(cashRegister.createdAt), 'HH:mm')
        }
        action={
          <IconButton onClick={toggleVisibility} size='small'>
            {!balanceEncrypt.visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
        // avatar={<Paid color="success" fontSize="large" />}
      />
      <CardContent>
        <Typography variant='h3' mb={1}>
          {balanceEncrypt.txtMoney}
        </Typography>

        <Box display='flex' justifyContent='center'>
          <ListItem>
            <ArrowCircleDown color='success' sx={{ mr: 1 }} />
            <ListItemText
              primary={incomeEncrypt.txtMoney}
              primaryTypographyProps={{
                variant: 'h4',
                color: 'success.main'
              }}
            />
          </ListItem>

          <ListItem>
            <ArrowCircleUp color='error' sx={{ mr: 1 }} />
            <ListItemText
              primary={expenseEncrypt.txtMoney}
              primaryTypographyProps={{
                variant: 'h4',
                color: 'error.main'
              }}
            />
          </ListItem>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={1}>
          <Grid item xs={12} display='flex' justifyContent='center' gap={1}>
            <Button size='small' startIcon={<SaveAlt />}>
              Depositar
            </Button>
            <Button startIcon={<ArrowOutward />} size='small'>
              Transferir
            </Button>
            <Button
              onClick={() => showCloseCashRegisterModal(cashRegister)}
              color='error'
              size='small'
              startIcon={<Lock />}
            >
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
