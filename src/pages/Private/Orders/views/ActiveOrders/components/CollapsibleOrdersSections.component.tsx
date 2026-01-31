import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Grid,
  Box,
  Stack
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
          <Accordion
            key={section.status}
            defaultExpanded={section.defaultExpanded}
            sx={{
              mb: 2,
              borderRadius: 2,
              '&:before': {
                display: 'none'
              },
              '&.Mui-expanded': {
                margin: '0 0 16px 0'
              }
            }}
            elevation={2}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                minHeight: 64,
                backgroundColor: (theme) =>
                  `${theme.palette[section.color].light}15`,
                borderLeft: (theme) =>
                  `4px solid ${theme.palette[section.color].main}`,
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0'
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  my: 2
                }
              }}
            >
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ flex: 1 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: (theme) => theme.palette[section.color].main
                  }}
                >
                  {section.icon}
                </Box>
                <Typography
                  variant='h6'
                  sx={{
                    color: (theme) => theme.palette[section.color].main,
                    fontWeight: 600
                  }}
                >
                  {section.title}
                </Typography>
                <Chip
                  label={orderCount}
                  color={section.color}
                  size='small'
                  sx={{ fontWeight: 600 }}
                />
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
        );
      })}
    </Box>
  );
};
