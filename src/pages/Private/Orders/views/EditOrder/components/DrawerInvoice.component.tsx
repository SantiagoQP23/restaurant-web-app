import { FC } from 'react';

import {
  Drawer,
  Typography,
  Box,
  Card,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Stack,
  IconButton,
  TextField,
  Button,
  FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDrawerInvoiceStore } from '../../../store/drawerInvoiceStore';
import { format } from 'date-fns';
import { CardHeader, Divider } from '@mui/material/';
import { CloseOutlined, DeleteOutline, Print } from '@mui/icons-material';
import { Invoice } from '../../../models/Invoice.model';
import { Label } from '../../../../../../components/ui';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { getPaymentMethod } from '../../../../Common/helpers/get-payment-method';
import { useForm } from 'react-hook-form';
import { UpdateInvoiceDto } from '../../../dto';
import { useUpdateInvoiceOrder } from '../../../hooks/useInvocesOrder';
import { generateInvoicePdf } from '../../../../Invoices/helpers/generateInvoicePdf.helper';
import { useRestaurant } from '@/pages/Private/Restaurant/hooks/useRestaurant';
interface PropsFormInvoice {
  invoice: Invoice;
  orderId: string;
}

const FormInvoice: FC<PropsFormInvoice> = ({ invoice, orderId }) => {
  const { register, handleSubmit } = useForm<UpdateInvoiceDto>({
    defaultValues: {
      id: invoice.id,
      comments: invoice.comments,
      notaDeVenta: invoice.notaDeVenta,
      orderId: orderId
    }
  });

  const { updateInvoiceOrder } = useUpdateInvoiceOrder();

  const onSubmit = (data: UpdateInvoiceDto) => {
    console.log(data);

    updateInvoiceOrder(data);
  };

  return (
    <>
      <FormControl fullWidth component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Observaciones'
              multiline
              rows={3}
              {...register('comments')}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label='Nota de venta'
              type='number'
              {...register('notaDeVenta', {
                valueAsNumber: true
              })}
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <Button variant='contained' fullWidth type='submit'>
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const DrawerInvoice: FC<Props> = ({ open, handleClose }) => {
  const theme = useTheme();

  const { activeOrder } = useSelector(selectOrders);

  const { activeInvoice, handleCloseDrawer, handleOpenModal } =
    useDrawerInvoiceStore((state) => state);
  const { data: restaurant } = useRestaurant();

  const handlePrint = async () => {
    if (activeInvoice && restaurant?.currentRestaurant) {
      const pdf = await generateInvoicePdf(
        activeInvoice,
        restaurant.currentRestaurant
      );
      pdf.open();
    }
  };

  const handleOpenModalDelete = () => {
    handleOpenModal();
  };

  return (
    <>
      <div>
        <Drawer
          anchor='right'
          open={open}
          onClose={handleClose}
          sx={{
            width: 'auto',
            zIndex: 2000

            // minWidth: {xs: '100vw', sm: '100%', md: '100%', lg: '100%', xl: '100%'},
          }}
        >
          <Box
            sx={{
              display: 'flex',
              p: 1,
              [theme.breakpoints.down('sm')]: { width: '100vw' },
              [theme.breakpoints.up('sm')]: { width: 500, flexShrink: 0 }

              // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
            }}
          >
            {!activeInvoice ? (
              <Box>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  No hay factura seleccionada
                </Typography>
              </Box>
            ) : (
              <>
                <Stack direction='column' spacing={2} width='95%'>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <IconButton onClick={handleCloseDrawer}>
                      <CloseOutlined />
                    </IconButton>

                    <Stack direction='row' spacing={1}>
                      {!activeInvoice.isActive ? (
                        <>
                          <Label color='error'>Anulada </Label>
                        </>
                      ) : (
                        !activeOrder?.isClosed && (
                          <>
                            <IconButton color='inherit' onClick={handlePrint}>
                              <Print />
                            </IconButton>

                            <IconButton
                              color='error'
                              onClick={handleOpenModalDelete}
                            >
                              <DeleteOutline />
                            </IconButton>
                          </>
                        )
                      )}
                    </Stack>
                  </Stack>
                  <Divider />

                  <Box px={2}>
                    <Typography variant='h4' textAlign='center'>
                      Restaurante Doña Yoli
                    </Typography>

                    <Typography variant='h4' textAlign='center' mt={2}>
                      Comprobante N° {activeInvoice.transactionNumber}
                    </Typography>

                    {activeInvoice.notaDeVenta && (
                      <Typography variant='h5' textAlign='center' mt={1}>
                        Nota de venta N° {activeInvoice.notaDeVenta}
                      </Typography>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant='subtitle2'
                        fontSize={12}
                        fontWeight='bold'
                      >
                        Fecha
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography variant='body1' textAlign='right'>
                        {format(
                          new Date(activeInvoice.createdAt),
                          'dd/MM/yyy HH:mm'
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant='subtitle2'
                        fontSize={12}
                        fontWeight='bold'
                      >
                        Cliente
                      </Typography>
                    </Grid>

                    {activeInvoice.client && (
                      <Grid item xs={8}>
                        <Typography variant='h6' textAlign='right'>
                          {activeInvoice.client.person.lastName}{' '}
                          {activeInvoice.client.person.firstName}
                        </Typography>
                        <Typography
                          variant='h6'
                          textAlign='right'
                          component='div'
                          sx={{ flexGrow: 1 }}
                        >
                          {activeInvoice.client.address}
                        </Typography>

                        <Typography
                          variant='h6'
                          textAlign='right'
                          component='div'
                          sx={{ flexGrow: 1 }}
                        >
                          {activeInvoice.client.person.numPhone}
                        </Typography>
                      </Grid>
                    )}

                    <Grid item xs={4}>
                      <Typography
                        variant='subtitle2'
                        fontSize={12}
                        fontWeight='bold'
                      >
                        Cobrado por{' '}
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography textAlign='right'>
                        {activeInvoice.user.person.firstName}{' '}
                        {activeInvoice.user.person.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant='subtitle2'
                        fontSize={12}
                        fontWeight='bold'
                      >
                        Método de pago
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography textAlign='right'>
                        {activeInvoice.paymentMethod &&
                          getPaymentMethod(activeInvoice.paymentMethod)}

                        {': ' + formatMoney(activeInvoice.amountPaid || 0)}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography
                        variant='subtitle2'
                        fontSize={12}
                        fontWeight='bold'
                      >
                        Cambio
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography textAlign='right'>
                        {formatMoney(activeInvoice.difference || 0)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title='Productos' />
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableCell>Cantidad</TableCell>
                              <TableCell>Producto</TableCell>
                              <TableCell>Precio</TableCell>
                              <TableCell>Total</TableCell>
                            </TableHead>

                            <TableBody>
                              {activeInvoice.details.map((detail) => (
                                <TableRow key={detail.id}>
                                  <TableCell align='center'>
                                    {detail.quantity}
                                  </TableCell>
                                  <TableCell>
                                    {detail.orderDetail.product.name}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {formatMoney(detail.orderDetail.price)}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {formatMoney(detail.amount)}
                                  </TableCell>
                                </TableRow>
                              ))}

                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  align='right'
                                  sx={{
                                    border: 'none'
                                  }}
                                >
                                  <Typography
                                    variant='subtitle1'
                                    color='textSecondary'
                                  >
                                    Subtotal
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align='right'
                                  sx={{
                                    border: 'none'
                                  }}
                                >
                                  <Typography variant='subtitle1'>
                                    {formatMoney(activeInvoice.amount)}
                                  </Typography>
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  align='right'
                                  sx={{
                                    border: 'none'
                                  }}
                                  size='small'
                                >
                                  <Typography
                                    variant='subtitle1'
                                    color='textSecondary'
                                  >
                                    Descuento
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align='right'
                                  sx={{
                                    border: 'none'
                                  }}
                                  size='small'
                                >
                                  <Typography variant='h5' color='error'>
                                    {' '}
                                    - {formatMoney(activeInvoice.discount || 0)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} align='right'>
                                  <Typography
                                    variant='h6'
                                    color='textSecondary'
                                  >
                                    Total
                                  </Typography>
                                </TableCell>
                                <TableCell align='right'>
                                  <Typography variant='h4'>
                                    {formatMoney(activeInvoice.total || 0)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      {activeInvoice &&
                        activeInvoice.isActive &&
                        activeOrder && (
                          <FormInvoice
                            invoice={activeInvoice}
                            orderId={activeOrder.id}
                          />
                        )}
                    </Grid>
                  </Grid>
                </Stack>
              </>
            )}
          </Box>
        </Drawer>
      </div>
    </>
  );
};
