import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Close,
  CreditCardOutlined,
  Delete,
  DeleteOutline,
  VisibilityOutlined
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TableContainer,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { Bill } from '../../../../models/bill.model';
import { BillDetailsTable } from './BillDetailsTable.component';
import { Label } from '../../../../components/ui';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { useNavigate } from 'react-router-dom';
import { DeleteBillModal } from './DeleteBillModal.component';
import { Scrollbar } from '../../components';

interface Props {
  bill: Bill;
}

const headerHeight = '64px';

export const DrawerBill = NiceModal.create<Props>(({ bill }) => {
  const modal = useModal();
  const navigate = useNavigate();
  const theme = useTheme();

  const closeDrawer = () => {
    modal.hide();
  };

  const showDeleteBillModal = () => {
    NiceModal.show(DeleteBillModal, { bill });
  };

  const navitateToEditBill = () => {
    closeDrawer();
    navigate(`/bills/${bill.id}/edit`);
  };

  const navigateToBill = () => {
    closeDrawer();
    navigate(`/bills/${bill.id}`);
  };

  const handleDeleteBill = () => {
    closeDrawer();
    showDeleteBillModal();
  };
  return (
    <>
      <Drawer
        anchor='right'
        open={modal.visible}
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
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
              flexGrow: 1,
              gap: 0.5
            }}
          >
            <Typography variant='h5'>Cuenta N°{bill.num}</Typography>
            {bill.isActive && (
              <Label color={bill.isPaid ? 'success' : 'warning'}>
                {bill.isPaid ? 'Pagado' : 'Por pagar'}
              </Label>
            )}
          </Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            {bill.isActive ? (
              <Tooltip title='Eliminar'>
                <IconButton color='error' onClick={handleDeleteBill}>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
            ) : (
              <Label color='error'>Eliminado</Label>
            )}
            <Tooltip title='Cerrar'>
              <IconButton color='primary' onClick={closeDrawer}>
                <Close />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Scrollbar height={'100%'}>
          <Stack direction='column' spacing={2} px={2} mt={1}>
            <Box>
              <Typography color='text.secondary' fontSize='0.8rem'>
                Creado por
              </Typography>
              <Typography variant='h6'>
                {bill.createdBy.person.firstName}{' '}
                {bill.createdBy.person.lastName}
              </Typography>
            </Box>
            <Card>
              <CardHeader title='Detalle' />
              <TableContainer>
                <BillDetailsTable details={bill.details} />
              </TableContainer>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant='h5' fontWeight='bold'>
                Total: {formatMoney(bill.total)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant='outlined'
                color='primary'
                onClick={navigateToBill}
                startIcon={<VisibilityOutlined />}
              >
                Ver
              </Button>

              {!bill.isPaid && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={navitateToEditBill}
                  disabled={bill.isPaid || !bill.isActive}
                  startIcon={<CreditCardOutlined />}
                >
                  Cobrar
                </Button>
              )}
            </Box>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
});
