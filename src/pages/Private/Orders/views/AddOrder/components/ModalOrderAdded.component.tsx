import { Order } from '../../../../../../models';
import { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import { statusModalAddOrder } from '../../../services/orders.service';
import { useModal } from '../../../../../../hooks';
import {
  ArrowBack,
  Close,
  Edit,
  EditOutlined,
  HomeOutlined,
  Print,
  PrintOutlined,
  SoupKitchen,
  SoupKitchenOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { generateOrderPdf } from '../../../helpers/pdf-orders';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
interface Props {}

/**
 * @author Steven Rosales
 * @version V1.0 29-03-2025 Add restaurant information to PDF
 */
export const ModalOrderAdded: FC<Props> = () => {
  const { handleClose, isOpen, setOpen } = useModal();

  const [order, setOrder] = useState<Order>();

  const { restaurant } = useRestaurantStore((state) => state);

  const suscription$ = statusModalAddOrder.getSubject();

  const navigate = useNavigate();

  const openPDF = async () => {
    if (order && restaurant) {
      const pdf = await generateOrderPdf(order, restaurant);
      pdf.open();
    }
  };
  useEffect(() => {
    suscription$.subscribe((resp) => {
      setOpen(resp.value);

      setOrder(resp.order);
    });

    return () => {};
  }, []);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'right'
          }}
        >
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant='h5' mb={5}>
            Has añadido un nuevo pedido
          </Typography>

          <Typography variant='h6' mb={3}>
            Pedido N° {order?.num}
          </Typography>
          <Stack spacing={1} direction='row' justifyContent='center'>
            <Button variant='outlined' onClick={() => navigate('/orders')}>
              <HomeOutlined />
            </Button>
            <Button variant='outlined' onClick={openPDF} disabled>
              <PrintOutlined sx={{ mr: 1 }} />
              Imprimir
            </Button>
            {/* <Button */}
            {/*   variant='outlined' */}
            {/*   onClick={() => navigate('/orders/actives')} */}
            {/* > */}
            {/*   <SoupKitchenOutlined /> */}
            {/* </Button> */}

            <Button
              variant='outlined'
              onClick={() => navigate(`/orders/list/edit/${order?.id}`)}
            >
              <EditOutlined sx={{ mr: 1 }} />
              Editar
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'center'
          }}
        ></DialogActions>
      </Dialog>
    </>
  );
};
