import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI
import {
  IconButton,
  Container,
  CircularProgress,
  Button,
  Stack,
  Box,
  Typography,
  Popover,
  MenuItem
} from '@mui/material';

import { selectOrders, setActiveOrder } from '../../../../../redux';

import { OrderActionType, OrderContext } from '../../context/Order.context';

import { OrderSummary } from './components';
import { useOrder } from '../../hooks';
import { PayOrder } from './components/PayOrder.component';
import { useInvoiceStore } from '../../store/invoiceStore';
import { Account } from './components/Account.component';
import {
  ArrowBackIos,
  PointOfSaleOutlined,
  Print,
  DeleteOutline,
  RemoveCircle,
  ChevronLeft,
  EditOutlined,
  MoreVert
} from '@mui/icons-material';
import { DrawerInvoice } from './components/DrawerInvoice.component';
import { useDrawerInvoiceStore } from '../../store/drawerInvoiceStore';
import { statusModalDeleteOrder } from '../../services/orders.service';

import { OrderStatus } from '../../../../../models';
import { ModalDeleteInvoice } from '../../components/modals/ModalDeleteInvoice.component';

// import { generateOrderPdf } from "../../helpers/pdf-orders";
import { LabelStatusOrder } from '../../components/LabelStatusOrder.component';
import { LabelStatusPaid } from '../../components/LabelStatusPaid.component';
import NiceModal from '@ebay/nice-modal-react';
import { ModalCloseOrder } from '../../components';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import { CreateBillModal } from './components/CreateBillModal.component';
import { generateOrderPdf } from '../../helpers/pdf-orders';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';

/**
 * Componente for edit order
 *
 * @author Santiago Quirumbay
 * @version v1.1 22-12-2023 Adds bills
 *
 * @author Santiago Quirumbay
 * @version v1.2 18-02-2025 Fix: Validation to close order
 * @author Steven Rosales
 * @version v1.3 17/03/2025 Adds type order
 *
 * @author Steven Rosales
 * @version V1.0 29-03-2025 Add restaurant information to PDF
 */
export const EditOrder = () => {
  const navigate = useNavigate();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverOrder2'
  });

  const { open: openDrawer, handleCloseDrawer } = useDrawerInvoiceStore(
    (state) => state
  );

  const { restaurant } = useRestaurantStore((state) => state);

  const { orderId } = useParams();

  if (!orderId) navigate('/orders');

  const {
    step: activeStep,
    setStep: changeStep,
    handleBackStep,
    // handleNextStep,
    // resetDetails,
    reset
  } = useInvoiceStore((state) => state);

  const { dispatch } = useContext(OrderContext);

  const { activeOrder } = useSelector(selectOrders);

  // const orderDelivered = false;

  const { isPending } = useOrder(orderId!);

  const handleCloseOrder = () => {
    if (activeOrder) NiceModal.show(ModalCloseOrder, { order: activeOrder });
  };

  const openCreateBillModal = () => {
    console.log('openModal');
    if (activeOrder) NiceModal.show(CreateBillModal, { order: activeOrder });
  };

  const openPDF = async () => {
    if (activeOrder && restaurant) {
      const pdf = await generateOrderPdf(activeOrder, restaurant);
      pdf.open();
    }
  };

  const handleEdit = () => {
    popupState.close();
  };

  // const handleClose = () => {
  //   popupState.close();
  // };

  const paidBills =
    activeOrder?.bills.filter((bill) => bill.isPaid).length || 0;

  const isDeleteableOrder =
    activeOrder?.status === OrderStatus.PENDING && paidBills === 0;

  const isCloseableOrder =
    activeOrder?.status === OrderStatus.DELIVERED && activeOrder?.isPaid;

  // const BtnNext = () => (
  //   <Button
  //     color="inherit"
  //     onClick={handleNextStep}
  //     endIcon={<ArrowRight fontSize="small" />}
  //     size="small"
  //   >
  //     Siguiente
  //   </Button>
  // );

  const BtnBack = () => (
    <Button
      color='inherit'
      onClick={handleBackStep}
      startIcon={<ArrowBackIos fontSize='small' />}
      size='small'
    >
      Atras
    </Button>
  );

  const eliminarPedido = () => {
    if (activeOrder) statusModalDeleteOrder.setSubject(true, activeOrder);
  };

  // orderDelivered = activeOrder?.details?.find(
  //   (detail) => detail.qtyDelivered >= 1
  // )
  //   ? true
  //   : false;

  useEffect(() => {
    changeStep(0);
    return () => {
      dispatch({ type: OrderActionType.RESET });
      setActiveOrder(null);
      reset();
    };
  }, []);

  if (isPending) return <CircularProgress />;

  if (!activeOrder) return <></>;

  return (
    <>
      <DrawerInvoice open={openDrawer} handleClose={handleCloseDrawer} />
      <ModalDeleteInvoice />
      <Container maxWidth='md' sx={{ mb: 4 }}>
        <Stack
          spacing={2}
          my={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'normal', sm: 'space-between' }}
          alignItems={{ sm: 'center' }}
        >
          <Box display='flex' alignItems='center' gap={1}>
            <IconButton size='small' onClick={() => navigate('/orders')}>
              <ChevronLeft />
            </IconButton>
            <Stack direction='column' spacing={1}>
              <Box display='flex' gap={1} alignItems='end'>
                <Typography variant='h3' fontWeight={500}>
                  {`Pedido #${activeOrder.num}`}
                </Typography>
              </Box>
              <Box display='flex' gap={1} alignItems='end'>
                <LabelStatusOrder status={activeOrder.status} />

                <LabelStatusPaid isPaid={activeOrder.isPaid} />
              </Box>
            </Stack>
          </Box>

          <Stack direction='row' justifyContent='flex-end' spacing={1}>
            {!activeOrder.isPaid && (
              <Button
                startIcon={<PointOfSaleOutlined />}
                variant='contained'
                size='small'
                onClick={() => openCreateBillModal()}
              >
                Crear cuentas
              </Button>
            )}
            {isCloseableOrder && !activeOrder.isClosed && (
              <Button
                variant='contained'
                size='small'
                startIcon={<RemoveCircle />}
                onClick={handleCloseOrder}
              >
                Cerrar pedido
              </Button>
            )}
            <Button variant='text' {...bindTrigger(popupState)} size='small'>
              <MoreVert />
            </Button>
          </Stack>
        </Stack>

        {isPending ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            {
              // <Stepper
              //   activeStep={activeStep}
              //   alternativeLabel
              //   sx={{
              //     background: "transparent",
              //   }}
              // >
              //   <Step>
              //     <StepLabel>Carrito</StepLabel>
              //   </Step>
              //   <Step>
              //     <StepLabel>Cuenta</StepLabel>
              //   </Step>
              // </Stepper>
            }

            {activeStep === 0 && <OrderSummary order={activeOrder} />}

            {activeStep === 1 && <Account order={activeOrder} />}

            {activeStep === 2 && (
              <>
                <PayOrder order={activeOrder} />

                <Stack direction='row'>
                  <BtnBack />
                </Stack>
              </>
            )}
          </>
        )}
      </Container>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140,
              zIndex: 1000
            }
          }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={openPDF}>
          <Print fontSize='small' sx={{ mr: 2 }} />
          Imprimir
        </MenuItem>
        <MenuItem
          onClick={eliminarPedido}
          disabled={!isDeleteableOrder}
          sx={{ color: 'error.main' }}
        >
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>{' '}
    </>
  );
};
