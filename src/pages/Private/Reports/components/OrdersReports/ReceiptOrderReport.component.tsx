import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Label } from '../../../../../components/ui';
import { OrderStatus, OrderStatusSpanish } from '../../../../../models';
import { selectOrders } from '../../../../../redux';
import {
  statusModalDiscountOrder,
  statusModalPayOrder
} from '../../../Orders/services/orders.service';
import { PdfReceiptOrder } from '../../../Orders/views/OrderReceipt/pdf/PdfReceiptOrder.component';

export const ReceiptOrderReport = () => {
  const navigate = useNavigate();

  const { activeOrder } = useSelector(selectOrders);

  const endEdit = () => {
    navigate(-1);
  };

  // const openModalDiscount = () => {
  //   statusModalDiscountOrder.setSubject(true, activeOrder!);
  // }

  // const payOrder = () => {
  //   statusModalPayOrder.setSubject(true, activeOrder!);

  // }

  if (!activeOrder) {
    return <>No se ha seleccionado un pedido</>;
  }

  return (
    <>
      <Grid
        container
        display='flex'
        justifyContent='space-between'
        mb={2}
        alignItems='center'
      >
        <Button
          variant='outlined'
          onClick={() => {
            endEdit();
          }}
        >
          <ArrowBack />
          {activeOrder.isPaid ? 'Editar pedido' : 'Volver a pedidos'}
        </Button>
        <Typography variant='h4'> Comprobante de pedido </Typography>

        {
          <PDFDownloadLink
            document={<PdfReceiptOrder order={activeOrder!} />}
            fileName={'pedido-' + activeOrder!.id}
          >
            <Button variant='contained'>Descargar PDF</Button>
          </PDFDownloadLink>
        }
      </Grid>

      {/*  <PDFViewer style={{ height: "90vh", width: "100%"}}>
        <ReceiptPdf order={activeOrder} />
      </PDFViewer> */}

      <Container maxWidth='sm'>
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box>
                <Typography variant='h5' fontWeight='bold'>
                  Pedido N° {activeOrder.num}
                </Typography>
              </Box>

              <Box>
                <Typography variant='subtitle1'>Mesa</Typography>
                <Typography variant='h5' fontWeight='bold' align='right'>
                  12
                </Typography>
              </Box>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              my={2}
            >
              <Box>
                <Typography variant='subtitle1'>Fecha</Typography>
                <Typography variant='h5'>
                  {format(
                    new Date(activeOrder?.createdAt),
                    'dd MMMM yyyy HH:mm',
                    { locale: es }
                  )}
                </Typography>
              </Box>
              <Label color='info'>
                {OrderStatusSpanish[`${activeOrder.status as OrderStatus}`]}
              </Label>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              my={2}
            >
              <Typography variant='body1'>
                Mesero:{' '}
                <b>
                  {activeOrder.user.person.firstName}{' '}
                  {activeOrder.user.person.lastName}{' '}
                </b>
              </Typography>
              <Box>
                <Typography variant='h5' fontWeight='bold'>
                  Personas
                </Typography>
                <Typography variant='body1' align='right'>
                  {activeOrder?.people}
                </Typography>
              </Box>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              my={2}
            >
              {/* <Typography variant='body1'>Cliente: <b>{activeOrder?.client?.person.firstName} {activeOrder?.client?.person.lastName} </b></Typography> */}
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h4' fontWeight='bold'>
                Productos
              </Typography>

              <Typography variant='subtitle1'>
                Cantidad: {activeOrder.details.length}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            {activeOrder.details.map((detail, index) => {
              return (
                <>
                  <Box
                    key={detail.id}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mt={2}
                  >
                    <Box>
                      <Typography variant='h5'>
                        {' '}
                        {detail.quantity} - {detail.product.name}
                      </Typography>
                      <Typography variant='subtitle1'>
                        ${detail.product.price}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h5'>${detail.amount}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                </>
              );
            })}

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            ></Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={2}
            >
              <Typography variant='h4' fontWeight='bold'>
                Subtotal{' '}
              </Typography>
              {/* <Typography variant='h4' fontWeight='bold'>${activeOrder.amount}</Typography> */}
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={2}
            >
              <Typography variant='h4' fontWeight='bold'>
                Descuento{' '}
              </Typography>
              {/* <Typography variant='h4' fontWeight='bold'>${activeOrder.discount}</Typography> */}
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={2}
            >
              <Typography variant='h4' fontWeight='bold'>
                Total{' '}
              </Typography>
              <Typography variant='h4' fontWeight='bold'>
                ${activeOrder.total}
              </Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              mt={2}
            >
              <Stack direction='row' spacing={2}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={payOrder}
                  disabled={activeOrder.status !== OrderStatus.DELIVERED}

                >
                  Cobrar
                </Button>

                <Button

                  variant="contained"
                  color="secondary"
                  onClick={openModalDiscount}
                  disabled={activeOrder.status === OrderStatus.PAID}

                >
                  Descuento
                </Button> */}

                <PDFDownloadLink
                  document={<PdfReceiptOrder order={activeOrder!} />}
                  fileName={'pedido-' + activeOrder!.id}
                >
                  <Button variant='contained'>PDF</Button>
                </PDFDownloadLink>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
