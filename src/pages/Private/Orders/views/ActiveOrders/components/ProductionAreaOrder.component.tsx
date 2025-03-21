import { Order, IOrderDetail, OrderStatus } from '../../../../../../models';
import { ProductionArea } from '../../../../Common/models/production-area.model';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DetailInProgress } from './DetailInProgress.component';
import { useState } from 'react';
import { Label } from '../../../../../../components/ui';

interface Props {
  orderId: string;
  details: IOrderDetail[];
  productionArea: ProductionArea;
  order: Order;
}

export const ProductionAreaOrder = ({
  details,
  productionArea,
  orderId,
  order
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(
    order.status === OrderStatus.DELIVERED ? true : false
  );

  const detailsArea = details.filter(
    (detail) => detail.product.productionArea.id === productionArea.id
  );

  const detailsStatus = expanded
    ? detailsArea.filter((detail) => detail.quantity === detail.qtyDelivered)
    : detailsArea.filter((detail) => detail.quantity !== detail.qtyDelivered);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const totalProducts = detailsArea.reduce(
    (acc, detail) => acc + detail.quantity,
    0
  );

  if (detailsArea.length === 0) return null;

  return (
    <Box>
      <Accordion
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center'
          },
          border: '1px solid',
          borderRadius: '10px',
          mb: 2
        }}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant='h6'>
            <b>{productionArea.name}</b>: {`${totalProducts} productos`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {order.status !== OrderStatus.DELIVERED && (
            <Tabs
              value={expanded ? 1 : 0}
              onChange={handleExpanded}
              indicatorColor='primary'
              // allowScrollButtonsMobile
              variant='scrollable'
              scrollButtons='auto'
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'transparent',

                  borderColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: '0',
                  color: 'text.primary'
                },
                '& .MuiTab-indicatorSpan': {
                  borderRadius: '10px 10px 0 0',
                  color: 'text.primary'
                }
              }}
            >
              {
                <Tab
                  // disabled={order.status === OrderStatus.DELIVERED}
                  label='Por entregar'
                  icon={
                    <Label>
                      {
                        detailsArea?.filter(
                          (detail) => detail.quantity !== detail.qtyDelivered
                        ).length
                      }
                    </Label>
                  }
                  iconPosition='end'
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: (theme) => theme.colors.alpha.black[100]
                    }
                  }}
                />
              }
              <Tab
                label={'Entregado'}
                icon={
                  <Label>
                    {
                      detailsArea?.filter(
                        (detail) => detail.quantity === detail.qtyDelivered
                      ).length
                    }
                  </Label>
                }
                iconPosition='end'
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: (theme) => theme.colors.alpha.black[100]
                  }
                }}
              />
            </Tabs>
          )}
          <Stack spacing={1}>
            {detailsStatus.map((detail) => (
              <DetailInProgress
                key={detail.id}
                detail={detail}
                orderId={orderId}
                typeOrder={order.type}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
