import {
  Done,
  DownloadOutlined,
  EditOutlined,
  SendOutlined
} from '@mui/icons-material';
import {
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Stack,
  CardHeader,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { statusModalPayOrder } from '../../services/orders.service';
import { OrderStatus, TypeOrder } from '../../../../../models/orders.model';

import { es } from 'date-fns/locale';
import { PdfReceiptOrder } from './pdf/PdfReceiptOrder.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { LabelStatusOrder } from '../../components/LabelStatusOrder.component';

export const ReceiptOrder = () => {
  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);

  const endEdit = () => {
    if (activeOrder) {
      !activeOrder.isPaid
        ? navigate('/orders/list/edit/' + activeOrder.id)
        : navigate('/orders');
    }
  };

  const payOrder = () => {
    statusModalPayOrder.setSubject(true, activeOrder!);
  };

  if (!activeOrder) {
    return <>No se ha seleccionado un pedido</>;
  }

  return (
    <>
      <Container maxWidth='lg'>
        <TitlePage title='Comprobante de pedido' />

        <Stack direction='row' spacing={1} justifyContent='space-between'>
          <Box>
            {!activeOrder.isPaid && (
              <IconButton onClick={endEdit}>
                <EditOutlined />
              </IconButton>
            )}

            <PDFDownloadLink
              document={<PdfReceiptOrder order={activeOrder!} />}
              fileName={'pedido-' + activeOrder!.id}
            >
              <IconButton>
                <DownloadOutlined />
              </IconButton>
            </PDFDownloadLink>

            <Tooltip title='Enviar por correo. Próximamente'>
              <IconButton>
                <SendOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          {!activeOrder.isPaid && (
            <Button
              startIcon={<Done />}
              variant='outlined'
              color='inherit'
              onClick={payOrder}
              disabled={activeOrder.status !== OrderStatus.DELIVERED}
              size='small'
            >
              Marcar como pagado
            </Button>
          )}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            my: 1
          }}
        ></Box>

        <Card>
          <CardHeader
            title={
              <Typography variant='h4'> Restaurante Doña Yoli </Typography>
            }
            action={
              <Stack spacing={1}>
                <Box display='flex' justifyContent='right'>
                  <LabelStatusOrder status={activeOrder.status} />
                </Box>
                <Box>
                  <Typography variant='h4'>
                    Pedido N° {activeOrder.num}
                  </Typography>
                </Box>
              </Stack>
            }
          />

          <CardContent>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Box flexBasis='50%'>
                <Typography variant='h5' mb={1}>
                  Mesero
                </Typography>
                <Typography variant='body1'>
                  {activeOrder.user.person.firstName}{' '}
                  {activeOrder.user.person.lastName}
                </Typography>
                <Typography variant='body1'>
                  {activeOrder.user.person.email}
                </Typography>
                <Typography variant='body1'>
                  {activeOrder.user.person.numPhone}
                </Typography>
              </Box>
            </Stack>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              my={2}
            >
              <Box>
                <Typography variant='h5' mb={1}>
                  Mesa
                </Typography>
                <Typography variant='body1'>
                  {activeOrder.type === TypeOrder.IN_PLACE
                    ? `Mesa ${activeOrder.table?.name || ''}`
                    : 'Para llevar'}
                </Typography>
              </Box>
              <Box>
                <Typography variant='h5' mb={1}>
                  Fecha
                </Typography>
                <Typography variant='body1'>
                  {format(
                    new Date(activeOrder?.createdAt),
                    'dd MMMM yyyy HH:mm',
                    { locale: es }
                  )}
                </Typography>
              </Box>

              <Box>
                <Typography variant='h5' mb={1}>
                  Personas
                </Typography>
                <Typography variant='body1'>{activeOrder?.people}</Typography>
              </Box>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              my={2}
            ></Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell align='right'>Precio</TableCell>
                    <TableCell align='right'>Subtotal</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {activeOrder.details.map((detail) => {
                    return (
                      <>
                        <TableRow
                          key={detail.id}
                          sx={{
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <TableCell align='center'>
                            {detail.quantity}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 'bold'
                            }}
                          >
                            {detail.product.name}
                          </TableCell>
                          <TableCell align='right'>
                            ${detail.product.price}
                          </TableCell>
                          <TableCell align='right'>${detail.amount}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}

                  <TableRow>
                    <TableCell
                      align='right'
                      colSpan={3}
                      sx={{
                        border: 'none'
                      }}
                    >
                      <Typography variant='h4'>Total</Typography>
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        border: 'none'
                      }}
                    >
                      ${activeOrder.total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
