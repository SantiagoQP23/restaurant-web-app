import { SyntheticEvent, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  Grid,
  Typography,
  Tab,
  Tabs,
  Box,
  Paper,
  Chip,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';

import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { OrderStatus } from '../../../../../../models/orders.model';

import { ActiveOrder } from './ActiveOrder.component';

import {
  DoneAllOutlined,
  PendingOutlined,
  Restaurant
} from '@mui/icons-material';

import { ModalStartOrder } from './ModalStartOrder.component';
import { useProductionAreasStore } from '../../../../Common/store/production-areas-store';
import { ProductionArea } from '../../../../Common/models/production-area.model';

/**
 * Component to render active order
 * @author Santiago Quirumbay
 * @version 1.1 16/12/2023 Adds productionArea field.
 */
export const ListActiveOrders = () => {
  const { productionAreaActive, productionAreas, setProductionAreaActive } =
    useProductionAreasStore();

  const { orders } = useSelector(selectOrders);

  const [statusOrderFilter, setStatusOrderFilter] = useState<OrderStatus>(
    OrderStatus.PENDING
  );

  const filterOrdersByProductionArea = (productionArea: ProductionArea) => {
    return orders.filter((order) => {
      const details = productionArea
        ? order.details.filter(
            (detail) => detail.product.productionArea.id === productionArea.id
          )
        : order.details;

      return details.length >= 1;
    });
  };

  // const ordersFilteredByProductionArea = productionAreaActive
  //   ? filterOrdersByProductionArea(productionAreaActive)
  //   : orders;
  const ordersFilteredByProductionArea = orders;

  const ordersFiltered = ordersFilteredByProductionArea.filter(
    (order) => order.status === statusOrderFilter
  );

  const handleChangeArea = (_: SyntheticEvent, newValue: number) => {
    const productionArea = productionAreas.find(
      (productionArea) => productionArea.id === newValue
    );

    if (productionArea) {
      setProductionAreaActive(productionArea);
    }
  };

  return (
    <>
      <ModalStartOrder />
      {/* <Box
        sx={{
          display: "flex",
          
          overflowX: "auto",
        }}
      >
        <Tabs
          value={productionAreaActive?.id || ""}
          onChange={handleChangeArea}
          variant="scrollable"
        >
          {productionAreas.map((productionArea) => (
            <Tab
              key={productionArea.id}
              label={productionArea.name}
              value={productionArea.id}
              icon={
                <Chip
                  label={filterOrdersByProductionArea(productionArea).length}
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box> */}

      <Box
        sx={{
          py: 0.5,
          mt: 2,

          // overflowX: "auto",
          // // flexGrow: 1,
          // bgcolor: "background.paper",
          // border: `1px solid ${theme.colors.alpha.black[10]}`,
          // borderRadius: "10px",
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex'
          },
          gap: '0.5rem'
        }}
      >
        <Tabs
          value={statusOrderFilter}
          variant='scrollable'
          indicatorColor='primary'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: !statusOrderFilter
                ? 'primary.main'
                : statusOrderFilter === OrderStatus.PENDING
                  ? 'warning.main'
                  : statusOrderFilter === OrderStatus.IN_PROGRESS
                    ? 'info.main'
                    : 'success.main',
              borderRadius: '10px 10px 0 0',
              borderColor: 'transparent',
              borderBottom: 'transparent'
            }
          }}
        >
          <Tab
            label={
              <>
                <Typography variant='body1' component='span'>
                  Pendientes
                </Typography>
                <Chip
                  label={
                    ordersFilteredByProductionArea.filter(
                      (order) => order.status === OrderStatus.PENDING
                    ).length
                  }
                  color='warning'
                  size='small'
                  sx={{ ml: 1 }}
                />
              </>
            }
            value={OrderStatus.PENDING}
            onClick={() => setStatusOrderFilter(OrderStatus.PENDING)}
            icon={<PendingOutlined />}
            iconPosition='start'
          />

          <Tab
            label={
              <>
                <Typography variant='body1' component='span'>
                  En preparación
                </Typography>
                <Chip
                  label={
                    ordersFilteredByProductionArea.filter(
                      (order) => order.status === OrderStatus.IN_PROGRESS
                    ).length
                  }
                  color='info'
                  size='small'
                  sx={{ ml: 1 }}
                />
              </>
            }
            value={OrderStatus.IN_PROGRESS}
            onClick={() => setStatusOrderFilter(OrderStatus.IN_PROGRESS)}
            icon={<Restaurant />}
            iconPosition='start'
          />

          <Tab
            label={
              <>
                <Typography variant='body1' component='span'>
                  Entregados
                </Typography>
                <Chip
                  label={
                    ordersFilteredByProductionArea.filter(
                      (order) => order.status === OrderStatus.DELIVERED
                    ).length
                  }
                  color='success'
                  size='small'
                  sx={{ ml: 1 }}
                />
              </>
            }
            value={OrderStatus.DELIVERED}
            onClick={() => setStatusOrderFilter(OrderStatus.DELIVERED)}
            icon={<DoneAllOutlined />}
            iconPosition='start'
          />
        </Tabs>
      </Box>

      <Box py={1} px={0.5} minHeight={400}>
        {ordersFiltered.length === 0 ? (
          <Typography variant='body1' align='center' mt={5}>
            No hay pedidos
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {ordersFiltered.map((order, index) => {
              {
                /* const details = productionAreaActive */
              }
              {
                /*   ? order.details.filter( */
              }
              {
                /*       (detail) => */
              }
              {
                /*         detail.product.productionArea.id === */
              }
              {
                /*         productionAreaActive?.id */
              }
              {
                /*     ) */
              }
              {
                /*   : order.details; */
              }

              {
                /* if (details.length >= 1) */
              }
              return (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                  <ActiveOrder
                    order={order}
                    index={index}
                    color={
                      order.status === OrderStatus.PENDING
                        ? 'warning'
                        : order.status === OrderStatus.IN_PROGRESS
                          ? 'info'
                          : 'success'
                    }
                    productionArea={productionAreaActive || undefined}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 0,
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none'
          },
          backgroundColor: 'background.paper',
          zIndex: 1000
        }}
        elevation={5}
      >
        <BottomNavigation
          showLabels
          value={statusOrderFilter}
          onChange={(event, newValue) => {
            setStatusOrderFilter(newValue);
          }}
        >
          <BottomNavigationAction
            sx={{
              '& .Mui-selected': {
                color: (theme) => theme.palette.warning.main,
                // borderColor: (theme) => theme.palette.success.main,
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.warning.main}`
              }
            }}
            label='Pendientes'
            value={OrderStatus.PENDING}
            icon={
              <Chip
                label={
                  ordersFilteredByProductionArea.filter(
                    (order) => order.status === OrderStatus.PENDING
                  ).length
                }
                color='warning'
                size='small'
              />
            }
          />
          <BottomNavigationAction
            sx={{
              '& .Mui-selected': {
                color: (theme) => theme.palette.info.main,
                // borderColor: (theme) => theme.palette.info.main,
                borderBottom: (theme) => `2px solid ${theme.palette.info.main}`
              }
            }}
            label='Preparando'
            value={OrderStatus.IN_PROGRESS}
            icon={
              <Chip
                label={
                  ordersFilteredByProductionArea.filter(
                    (order) => order.status === OrderStatus.IN_PROGRESS
                  ).length
                }
                color='info'
                size='small'
              />
            }
          />
          <BottomNavigationAction
            sx={{
              '& .Mui-selected': {
                color: (theme) => theme.palette.success.main,
                // borderColor: (theme) => theme.palette.warning.main,
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.success.main}`
              }
            }}
            label='Entregados'
            value={OrderStatus.DELIVERED}
            icon={
              <Chip
                label={
                  ordersFilteredByProductionArea.filter(
                    (order) => order.status === OrderStatus.DELIVERED
                  ).length
                }
                color='success'
                size='small'
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
