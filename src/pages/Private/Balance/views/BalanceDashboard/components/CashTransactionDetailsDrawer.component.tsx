import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CloseOutlined, Print } from '@mui/icons-material';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Grid,
  Button
} from '@mui/material';
import { Scrollbar } from '../../../../components';
import { CashTransaction } from '../../../models/cash-transaction.model';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { format } from 'date-fns';

interface Props {
  transaction: CashTransaction;
}

export const CashTransactionDetailsDrawer = NiceModal.create<Props>(
  ({ transaction }) => {
    const drawer = useModal();

    const closeDrawer = () => {
      drawer.hide();
    };

    return (
      <Drawer
        anchor='right'
        open={drawer.visible}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: {
              xs: '100vw',
              sm: '80vw',
              md: 500
            },
            border: 'none',
            overflow: 'hidden'
          }
        }}
        sx={{
          zIndex: 10000
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          p={2}
        >
          <Box>
            <Typography variant='h4'>Transacción</Typography>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            <IconButton onClick={closeDrawer} size='small'>
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />
        <Scrollbar height={'100%'}>
          <Stack p={2} spacing={2}>
            <Box>
              <Typography variant='h4' textAlign='center'>
                {transaction.description}
              </Typography>
              <Typography
                variant='subtitle1'
                textAlign='center'
                fontSize='0.8rem'
              >
                {transaction.category.name}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant='h3'
                textAlign='center'
                color={
                  transaction.type === 'INCOME' ? 'success.main' : 'error.main'
                }
              >
                {transaction.type === 'INCOME' ? '+' : '-'}{' '}
                {formatMoney(transaction.amount)}
              </Typography>
              <Typography
                variant='subtitle1'
                textAlign='center'
                fontSize='0.8rem'
              >
                {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm')}
              </Typography>
            </Box>

            <Box>
              <Typography variant='subtitle1'>Registrado por</Typography>
              <Typography variant='h6'>
                {transaction.createdBy.person.firstName}{' '}
                {transaction.createdBy.person.lastName}
              </Typography>
            </Box>
            <Box>
              <Typography variant='subtitle1'>Realizado por</Typography>
              <Typography variant='h6'>
                {transaction.performedBy.person.firstName}{' '}
                {transaction.performedBy.person.lastName}
              </Typography>
            </Box>
          </Stack>
          <Grid container spacing={2} px={2}>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <Button
                variant='outlined'
                onClick={() => {
                  drawer.hide();
                }}
                startIcon={<Print />}
              >
                Imprimir
              </Button>
            </Grid>
          </Grid>
        </Scrollbar>
      </Drawer>
    );
  }
);
