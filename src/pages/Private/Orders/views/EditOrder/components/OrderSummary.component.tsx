import { FC, useState } from 'react';

import {
  CircleRounded,
  Edit,
  EditOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Notes,
  Visibility
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  CardHeader,
  Stack,
  Divider,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  stepConnectorClasses,
  StepIcon,
  CardActions,
  useTheme,
  MobileStepper
} from '@mui/material';
import { format } from 'date-fns';
import { IUser } from '../../../../../../models';

import {
  Order,
  OrderStatus,
  TypeOrder
} from '../../../../../../models/orders.model';

import { useUpdateOrder } from '../../../hooks';

import { ComboBoxUser } from '../../../components/ComboBoxUser.component';

import { useInvoiceStore } from '../../../store/invoiceStore';
import { BillsList } from './BillsList.component';
import { useModal } from '../../../../../../hooks';
import { ModalEditOrder } from './ModalEditOrder.component';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { OrderDetails } from './OrderDetails.component';
import { LabelStatusOrder } from '../../../components';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses
} from '@mui/lab';
import { EditOrderStatus } from './EditOrderStatus.component';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

interface PropsOrder {
  order: Order;
}

/**
 * Componente to show order summary
 * @version v1.1 22-12-2023 Adds bills
 */
export const OrderSummary: FC<PropsOrder> = ({ order }) => {
  const { handleClose, handleOpen, isOpen } = useModal();

  const [activeStatus, setActiveStatus] = useState(getStepIndex(order.status));
  const theme = useTheme();

  function getStepIndex(status: OrderStatus) {
    switch (status) {
      case OrderStatus.PENDING:
        return 0;
      case OrderStatus.IN_PROGRESS:
        return 1;
      case OrderStatus.DELIVERED:
        return 2;
      default:
        return 0;
    }
  }

  const { step: activeStep } = useInvoiceStore((state) => state);

  const { mutate: updateOrder } = useUpdateOrder();

  const [showUser, setShowUser] = useState<boolean>(!!order.user);

  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const handleChangeUser = (user: IUser | null) => {
    console.log(user);

    if (!user) return;

    updateOrder({
      id: order.id,
      userId: user?.id || 'none'
    });
  };

  return (
    <>
      <ModalEditOrder open={isOpen} closeModal={handleClose} order={order} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <OrderDetails order={order} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            {/* <EditOrderStatus orderId={order.id} status={order.status} /> */}
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: 'h5' }}
                title={`Pedido #${order.num}`}
                subheader={format(new Date(order.createdAt), 'dd/MM/yyy HH:mm')}
                action={
                  <Button
                    onClick={handleOpen}
                    size='small'
                    startIcon={<EditOutlined />}
                  >
                    Editar
                  </Button>
                }
              />

              <CardContent>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={4}>
                    <Typography variant='body1'>Tipo de orden</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant='body2' textAlign='right'>
                      {order.type === TypeOrder.IN_PLACE
                        ? 'Para servir'
                        : 'Para llevar'}
                    </Typography>
                  </Grid>

                  {order.type === TypeOrder.IN_PLACE && (
                    <>
                      <Grid item xs={4}>
                        <Typography variant='body1'>Mesa</Typography>
                      </Grid>

                      <Grid item xs={8}>
                        <Typography variant='body2' textAlign='right'>
                          Mesa {order.table?.name || 'No seleccionada'}
                        </Typography>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={5}>
                    <Typography variant='body1'>Hora de entrega</Typography>
                  </Grid>

                  <Grid item xs={7}>
                    <Typography variant='body2' textAlign='right'>
                      {format(new Date(order.deliveryTime), 'dd/MM/yyy HH:mm')}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='body1'>Personas</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant='body2' textAlign='right'>
                      {order.people}
                    </Typography>
                  </Grid>

                  {order.notes && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant='body1'>Notas</Typography>
                        <Typography variant='subtitle1'>
                          {order.notes}
                        </Typography>
                      </Grid>
                    </>
                  )}

                  <Grid
                    item
                    xs={12}
                    display='flex'
                    flexDirection='row'
                    gap={1}
                    alignItems='center'
                    justifyContent='flex-end'
                  >
                    <Typography variant='h5'>
                      {formatMoney(order.total)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <Stack spacing={1} divider={<Divider />}>
                {activeStep === 0 && (
                  <Box>
                    <CardHeader
                      title='Mesero'
                      action={
                        <IconButton onClick={handleShowUser} size='small'>
                          {!showUser && order.user ? (
                            <Visibility />
                          ) : (
                            <EditOutlined />
                          )}
                        </IconButton>
                      }
                    />

                    <CardContent>
                      {showUser && order.user ? (
                        <Stack spacing={0.5}>
                          <Typography variant='body1'>
                            {order.user?.person.firstName +
                              ' ' +
                              order.user?.person.lastName}
                          </Typography>
                          <Typography variant='body2'>
                            {order.user?.person.numPhone || 'Sin teléfono'}
                          </Typography>

                          <Typography variant='body2'>
                            {order.user?.person.email || 'Sin correo'}
                          </Typography>
                        </Stack>
                      ) : (
                        <ComboBoxUser
                          user={null}
                          handleChangeUser={handleChangeUser}
                        />
                      )}
                    </CardContent>
                  </Box>
                )}
              </Stack>
            </Card>

            {order.bills.length > 0 && <BillsList bills={order.bills} />}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
