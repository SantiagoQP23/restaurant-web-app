import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Grid,
  Box,
  Stack,
  Card
} from '@mui/material';
import {
  ExpandMore,
  PendingOutlined,
  Restaurant,
  DoneAllOutlined
} from '@mui/icons-material';
import { Order, OrderStatus } from '@/models/orders.model';
import { ProductionArea } from '@/pages/Private/Common/models/production-area.model';
import { ActiveOrder } from './ActiveOrder.component';

interface CollapsibleOrdersSectionsProps {
  orders: Order[];
  productionAreaActive?: ProductionArea;
}

interface OrderSection {
  status: OrderStatus;
  title: string;
  icon: React.ReactNode;
  color: 'warning' | 'info' | 'success';
  defaultExpanded: boolean;
}

export const CollapsibleOrdersSections = ({
  orders,
  productionAreaActive
}: CollapsibleOrdersSectionsProps) => {
  const sections: OrderSection[] = [
    {
      status: OrderStatus.PENDING,
      title: 'Pendientes',
      icon: <PendingOutlined />,
      color: 'warning',
      defaultExpanded: true
    },
    {
      status: OrderStatus.IN_PROGRESS,
      title: 'En preparación',
      icon: <Restaurant />,
      color: 'info',
      defaultExpanded: true
    },
    {
      status: OrderStatus.DELIVERED,
      title: 'Entregados',
      icon: <DoneAllOutlined />,
      color: 'success',
      defaultExpanded: false
    }
  ];

  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {sections.map((section) => {
        const filteredOrders = getOrdersByStatus(section.status);
        const orderCount = filteredOrders.length;

        return (
          <Card
            key={section.status}
            elevation={3}
            sx={{
              mb: 3,
              borderRadius: 2,
              overflow: 'hidden',
              border: (theme) => `1px solid ${theme.palette.divider}`
            }}
          >
            <Accordion
              defaultExpanded={section.defaultExpanded}
              sx={{
                borderRadius: 0,
                boxShadow: 'none',
                '&:before': {
                  display: 'none'
                },
                '&.Mui-expanded': {
                  margin: 0
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  minHeight: 64,
                  backgroundColor: (theme) =>
                    `${theme.palette[section.color].light}15`
                }}
              >
                <Stack sx={{ flex: 1 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      color: (theme) => theme.palette[section.color].main,
                      fontWeight: 500
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography variant='body2'>Pedidos: {orderCount}</Typography>
                </Stack>
              </AccordionSummary>

              <AccordionDetails
                sx={{ p: 2, backgroundColor: 'background.default' }}
              >
                {filteredOrders.length === 0 ? (
                  <Typography
                    variant='body1'
                    align='center'
                    color='text.secondary'
                    py={3}
                  >
                    No hay pedidos {section.title.toLowerCase()}
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {filteredOrders.map((order, index) => (
                      <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <ActiveOrder
                          order={order}
                          index={index}
                          color={section.color}
                          productionArea={productionAreaActive}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </AccordionDetails>
            </Accordion>
          </Card>
        );
      })}
    </Box>
  );
};
