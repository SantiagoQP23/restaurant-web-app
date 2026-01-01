import { Delete, Print, Share } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useInvoice } from '../../../Orders/hooks/useInvoices';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generateInvoicePdf } from '../../helpers/generateInvoicePdf.helper';
import { useRestaurant } from '@/pages/Private/Restaurant/hooks/useRestaurant';

export const Invoice = () => {
  const { invoiceId } = useParams();

  if (!invoiceId) return <div>Not found</div>;

  const { invoiceQuery } = useInvoice(invoiceId);

  const { data, isPending } = invoiceQuery;
  const { data: restaurant } = useRestaurant();

  const handlePrint = async () => {
    if (data && restaurant?.currentRestaurant) {
      const pdf = await generateInvoicePdf(data, restaurant.currentRestaurant);
      pdf.open();
    }
  };

  if (isPending) return <div>Loading...</div>;

  if (!data) return <div>Not found</div>;

  return (
    <>
      <Stack
        spacing={1}
        my={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'normal', sm: 'space-between' }}
        alignItems={{ sm: 'center' }}
      >
        <Stack direction='row' alignItems='center' justifyContent='flex-start'>
          <Box>
            <Typography variant='h3'>
              Comprobante N° {data.transactionNumber}
            </Typography>
          </Box>
        </Stack>

        <Stack direction='row' justifyContent='flex-end' spacing={1}>
          <Button color='error'>
            <Delete />
          </Button>
          <Button>
            <Share />
          </Button>

          <Button
            variant='contained'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Stack>
      </Stack>

      <Card>
        <CardHeader
          title={<Typography variant='h4'> Restaurante Doña Yoli </Typography>}
          action={
            <Box>
              <Typography variant='h4'>
                Pedido N° {data.transactionNumber}
              </Typography>
            </Box>
          }
        />

        <CardContent>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            // Establecer el tamaño de los elementos
          >
            <Box flexBasis='50%'>
              <Typography variant='h5' mb={1}>
                Cliente
              </Typography>
              <Typography variant='body1'>{data.client?.address}</Typography>
              <Typography variant='body1'>
                {data.client?.person.email}
              </Typography>
              <Typography variant='body1'>
                {data.client?.person.numPhone}
              </Typography>
              <Typography variant='body1'>
                {data.client?.person.firstName} {data.client?.person.lastName}
              </Typography>
            </Box>
            <Box flexBasis='50%'>
              <Typography variant='h5' mb={1}>
                Mesero
              </Typography>
              <Typography variant='body1'>
                {data.user.person.firstName} {data.user.person.lastName}
              </Typography>
              <Typography variant='body1'>{data.user.person.email}</Typography>
              <Typography variant='body1'>
                {data.user.person.numPhone}
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
                Fecha
              </Typography>
              <Typography variant='body1'>
                {format(new Date(data?.createdAt), 'dd MMMM yyyy HH:mm', {
                  locale: es
                })}
              </Typography>
            </Box>
          </Box>

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
                {data.details.map((detail) => {
                  return (
                    <>
                      <TableRow
                        key={detail.id}
                        sx={{
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <TableCell align='center'>{detail.quantity}</TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 'bold'
                          }}
                        >
                          {detail.product.name}
                        </TableCell>
                        <TableCell align='right'>
                          {formatMoney(detail.product.price)}
                        </TableCell>
                        <TableCell align='right'>
                          {formatMoney(detail.amount)}
                        </TableCell>
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
                    {formatMoney(data.total || 0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};
