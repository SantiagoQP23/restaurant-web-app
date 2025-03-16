import { FC } from 'react';

import {
  Card,
  CardHeader,
  Grid,
  Typography,
  Button,
  CardActions,
  Chip,
  Divider,
  Stack
} from '@mui/material';

import {
  Check,
  TableRestaurant,
  Person,
  Restaurant,
  Undo,
  PlayCircleOutline,
  People,
  TakeoutDining,
  TimerOutlined,
  Notes
} from '@mui/icons-material';

import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { OrderStatus, TypeOrder } from '../../../../../../models/orders.model';

import { Order } from '../../../../../../models';
import { statusModalStartOrder } from '../../../services/orders.service';
import { BtnAddProduct } from './BtnAddProduct.component';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateOrder } from '../../../hooks';
import { LabelStatusOrder } from '../../../components/LabelStatusOrder.component';
import { useOrderHelper } from '../../../hooks/useOrders';
import { ProductionArea } from '../../../../Common/models/production-area.model';
import { useProductionAreasStore } from '../../../../Common/store/production-areas-store';
import { ProductionAreaOrder } from './ProductionAreaOrder.component';

interface Props {
  order: Order;
  setStatusFilter?: (status: OrderStatus) => void;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  index: number;
  productionArea?: ProductionArea;
}

/**
 * Component to render active order
 * @author Santiago Quirumbay
 * @version 1.1 16/12/2023 Adds productionArea field.
 * @version 1.2 28/12/2023 Updates useUpdateOrder hook.
 */
export const ActiveOrder: FC<Props> = ({
  order,
  setStatusFilter,
  color,
  index,
  productionArea
}) => {
  // const color= "primary";

  const details = productionArea
    ? order.details.filter(
        (detail) => detail.product.productionArea.id === productionArea?.id
      )
    : order.details;

  const { getFirstPendingOrder } = useOrderHelper();

  const { productionAreas } = useProductionAreasStore();

  const queryClient = useQueryClient();

  queryClient.prefetchQuery(['order', order.id], () => order);

  const { mutate: updateOrder } = useUpdateOrder();

  const handleStartOrder = (order: Order) => {
    const firstOrder = getFirstPendingOrder();

    if (firstOrder.id === order.id) {
      changeStatusOrder(OrderStatus.IN_PROGRESS);
    } else {
      statusModalStartOrder.setSubject({ value: true, order });
    }
  };

  const changeStatusOrder = (status: OrderStatus) => {
    const data: UpdateOrderDto = {
      id: order.id,
      status
    };

    updateOrder(data);
  };

  if (details.length === 0) return null;

  return (
    <>
      <Card
        sx={{
          borderTop: (theme) => `5px solid ${theme.palette[color].main}`
        }}
        variant='elevation'
      >
        <CardHeader
          title={
            <Stack
              spacing={0.5}
              direction='column'
              my={1}
              alignItems='center'
              justifyContent='center'
            >
              <Chip
                label={index + 1}
                color={color}
                size='small'
                variant='outlined'
              />

              <Typography variant='h3'>{`N° ${order.num}`}</Typography>
              <LabelStatusOrder status={order.status} />
            </Stack>
          }
        />

        <Grid container spacing={1} alignItems='center' px={1}>
          <Grid item xs={12}>
            <CardHeader
              sx={{
                px: 1,
                py: 0.5
              }}
              avatar={<TimerOutlined />}
              // title='Hora de entrega'
              titleTypographyProps={{
                variant: 'subtitle2'
              }}
              subheaderTypographyProps={{
                variant: 'h5',
                color: 'inherith'
              }}
              subheader={`${formatDistance(
                new Date(order.deliveryTime),
                new Date(),
                {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: es
                }
              )}`}
            />
          </Grid>

          <Grid item xs={6}>
            <CardHeader
              sx={{
                px: 1,
                py: 0.5
              }}
              avatar={
                order.type === TypeOrder.IN_PLACE ? (
                  <Restaurant />
                ) : (
                  <TakeoutDining />
                )
              }
              // title='Orden'
              titleTypographyProps={{
                variant: 'subtitle2'
              }}
              subheaderTypographyProps={{
                variant: 'h5',
                color: 'inherith'
              }}
              subheader={
                order.type === TypeOrder.IN_PLACE
                  ? 'Para servir'
                  : 'Para llevar'
              }
            />
          </Grid>

          <Grid item xs={6}>
            <CardHeader
              sx={{
                px: 1,
                py: 0.5
              }}
              avatar={<People />}
              // title='Personas'
              titleTypographyProps={{
                variant: 'subtitle2'
              }}
              subheaderTypographyProps={{
                variant: 'h5',
                color: 'inherith'
              }}
              subheader={`${order.people}`}
            />
            <Card></Card>
          </Grid>

          {order.type === TypeOrder.IN_PLACE && (
            <>
              <Grid item xs={12}>
                <CardHeader
                  sx={{
                    px: 1,
                    py: 0.5
                  }}
                  avatar={<TableRestaurant />}
                  // title='Mesa'
                  titleTypographyProps={{
                    variant: 'subtitle2'
                  }}
                  subheaderTypographyProps={{
                    variant: 'h5',
                    color: 'inherith'
                  }}
                  subheader={`Mesa ${order.table?.name}` || 'No seleccionada'}
                />

                <Card></Card>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <CardHeader
              sx={{
                px: 1,
                py: 0.5
              }}
              avatar={<Person />}
              // title='Mesero'
              titleTypographyProps={{
                variant: 'subtitle2'
              }}
              subheaderTypographyProps={{
                variant: 'h5',
                color: 'inherith'
              }}
              subheader={`${order.user.person.firstName} ${order.user.person.lastName}`}
            />
          </Grid>

          {order.notes && (
            <>
              <Grid item xs={12}>
                <CardHeader
                  sx={{
                    px: 1,
                    py: 0.5
                  }}
                  avatar={<Notes />}
                  title='Notas'
                  titleTypographyProps={{
                    variant: 'subtitle2'
                  }}
                  subheaderTypographyProps={{
                    variant: 'h5',
                    color: 'inherith'
                  }}
                  subheader={order.notes}
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* <Divider sx={{ mb: 0.5, mt: 1, mx: 1 }} /> */}

        <Stack spacing={1.5} sx={{ px: 1, mt: 1 }}>
          {/* {order.status !== OrderStatus.DELIVERED && (
            <Tabs
              value={expanded ? 1 : 0}
              onChange={handleExpanded}
              indicatorColor="primary"
              // allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                zIndex: 1,

                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",

                  borderColor: "transparent",
                  boxShadow: "none",
                  borderRadius: "0",
                  color: "text.primary",
                },
                "& .MuiTab-indicatorSpan": {
                  backgroundColor: color + ".main",
                  borderRadius: "10px 10px 0 0",
                  color: "text.primary",
                },
                "& .Mui-selected": {
                  borderRadius: "0",
                  borderBottom: (theme) =>
                    `3px solid ${theme.palette[color].main}`,
                  color: "text.primary",
                },
                "& .Mui-selected:hover": {
                  color: (theme) => theme.palette[color].main,
                },
              }}
            >
              {
                <Tab
                  // disabled={order.status === OrderStatus.DELIVERED}
                  label="Por entregar"
                  icon={
                    <Label color={color}>
                      {
                        details?.filter(
                          (detail) => detail.quantity !== detail.qtyDelivered
                        ).length
                      }
                    </Label>
                  }
                  iconPosition="end"
                  sx={{
                    "&.Mui-selected, &.Mui-selected:hover": {
                      color: (theme) => theme.colors.alpha.black[100],
                    },
                  }}
                />
              }
              <Tab
                label={"Entregado"}
                icon={
                  <Label color={color}>
                    {
                      details?.filter(
                        (detail) => detail.quantity === detail.qtyDelivered
                      ).length
                    }
                  </Label>
                }
                iconPosition="end"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: (theme) => theme.colors.alpha.black[100],
                  },
                }}
              />
            </Tabs>
          )} */}
          <Stack spacing={1} direction='column'>
            {productionAreas.map((area) => (
              <ProductionAreaOrder
                key={area.id}
                details={order.details}
                productionArea={area}
                orderId={order.id}
                order={order}
              />
            ))}
          </Stack>

          {/* {!expanded ? (
            details
              ?.filter((detail) => detail.quantity !== detail.qtyDelivered)
              .map((detail) => (
                <DetailInProgress
                  key={detail.id}
                  detail={detail}
                  orderId={order.id}
                />
              ))
          ) : details?.filter(
              (detail) => detail.quantity === detail.qtyDelivered
            ).length >= 1 ? (
            details
              .filter((detail) => detail.quantity === detail.qtyDelivered)
              .map((detail) => (
                <DetailInProgress
                  key={detail.id}
                  detail={detail}
                  orderId={order.id}
                />
              ))
          ) : (
            <Box>
              <Typography
                variant="body1"
                color="gray"
                my={5}
                textAlign="center"
              >
                No hay productos entregados
              </Typography>
            </Box>
          )} */}

          <BtnAddProduct order={order} />
        </Stack>

        <Divider
          sx={{
            mt: 1,
            display: order.status === OrderStatus.DELIVERED ? 'none' : 'block'
          }}
        />

        <CardActions
          sx={{
            justifyContent:
              order.status === OrderStatus.PENDING ? 'center' : 'space-between'
          }}
        >
          {order.status === OrderStatus.PENDING ? (
            <Button
              startIcon={<PlayCircleOutline />}
              onClick={() => {
                handleStartOrder(order);
              }}
              variant='outlined'
              color='warning'
            >
              Iniciar
            </Button>
          ) : (
            order.status === OrderStatus.IN_PROGRESS && (
              <>
                <Button
                  onClick={() => {
                    changeStatusOrder(OrderStatus.PENDING);
                    setStatusFilter && setStatusFilter(OrderStatus.PENDING);
                  }}
                  color='warning'
                  startIcon={<Undo />}
                >
                  Pendiente
                </Button>

                <Button
                  color='success'
                  startIcon={<Check />}
                  onClick={() => changeStatusOrder(OrderStatus.DELIVERED)}
                >
                  Entregado
                </Button>
              </>
            )
          )}
        </CardActions>
      </Card>
    </>
  );
};
