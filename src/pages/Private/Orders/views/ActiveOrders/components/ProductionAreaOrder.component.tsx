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
  Typography,
  LinearProgress,
  Chip,
  alpha,
  useTheme,
  Badge
} from '@mui/material';
import { ExpandMore, Restaurant } from '@mui/icons-material';
import { DetailInProgress } from './DetailInProgress.component';
import { useState, useMemo } from 'react';
import { Label } from '../../../../../../components/ui';

interface Props {
  orderId: string;
  details: IOrderDetail[];
  productionArea: ProductionArea;
  order: Order;
}

/**
 * Enhanced Production Area Order Component
 * Displays order items grouped by production area with improved UI
 * @version 2.0 - Enhanced UI with progress indicators and better visual design
 */
export const ProductionAreaOrder = ({
  details,
  productionArea,
  orderId,
  order
}: Props) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean>(
    order.status === OrderStatus.DELIVERED ? true : false
  );

  // Memoized calculations for performance
  const detailsArea = useMemo(
    () =>
      details.filter(
        (detail) => detail.product.productionArea.id === productionArea.id
      ),
    [details, productionArea.id]
  );

  const detailsStatus = useMemo(
    () =>
      expanded
        ? detailsArea.filter(
            (detail) => detail.quantity === detail.qtyDelivered
          )
        : detailsArea.filter(
            (detail) => detail.quantity !== detail.qtyDelivered
          ),
    [expanded, detailsArea]
  );

  const statistics = useMemo(() => {
    const totalProducts = detailsArea.reduce(
      (acc, detail) => acc + detail.quantity,
      0
    );

    const deliveredProducts = detailsArea.reduce(
      (acc, detail) => acc + detail.qtyDelivered,
      0
    );

    const pendingProducts = totalProducts - deliveredProducts;

    const completionPercentage =
      totalProducts > 0 ? (deliveredProducts / totalProducts) * 100 : 0;

    const pendingCount = detailsArea.filter(
      (detail) => detail.quantity !== detail.qtyDelivered
    ).length;

    const deliveredCount = detailsArea.filter(
      (detail) => detail.quantity === detail.qtyDelivered
    ).length;

    return {
      totalProducts,
      deliveredProducts,
      pendingProducts,
      completionPercentage,
      pendingCount,
      deliveredCount
    };
  }, [detailsArea]);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  // Use consistent neutral color for all production areas
  const areaColor = theme.palette.text.secondary;

  if (detailsArea.length === 0) return null;

  return (
    <Box>
      <Accordion
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            margin: '12px 0'
          },
          borderRadius: '12px !important',
          mb: 1.5,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:before': {
            display: 'none'
          },
          background: alpha(areaColor, 0.02)
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore
              sx={{
                color: areaColor,
                fontSize: 28
              }}
            />
          }
          sx={{
            px: 2,
            py: 0.5,
            background: alpha(areaColor, 0.05),
            '&:hover': {
              background: alpha(areaColor, 0.08)
            }
          }}
        >
          <Stack
            direction='row'
            spacing={1.5}
            alignItems='center'
            sx={{ width: '100%', pr: 2 }}
          >
            {/* Icon */}
            <Box
              sx={{
                bgcolor: alpha(areaColor, 0.15),
                color: areaColor,
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Restaurant fontSize='small' />
            </Box>

            {/* Title and Stats */}
            <Stack spacing={0.5} flexGrow={1}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Typography variant='subtitle1' fontWeight={600}>
                  {productionArea.name}
                </Typography>
                <Chip
                  label={`${statistics.totalProducts} items`}
                  size='small'
                  sx={{
                    bgcolor: alpha(areaColor, 0.15),
                    color: areaColor,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24
                  }}
                />
              </Stack>

              {/* Progress Bar */}
              <Stack direction='row' spacing={1} alignItems='center'>
                <LinearProgress
                  variant='determinate'
                  value={statistics.completionPercentage}
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: alpha(areaColor, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: areaColor,
                      borderRadius: 3
                    }
                  }}
                />
                <Typography
                  variant='caption'
                  fontWeight={600}
                  sx={{
                    color: areaColor,
                    minWidth: 40,
                    textAlign: 'right'
                  }}
                >
                  {Math.round(statistics.completionPercentage)}%
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          {/* Tabs for Pending/Delivered */}
          {order.status !== OrderStatus.DELIVERED && (
            <Tabs
              value={expanded ? 1 : 0}
              onChange={handleExpanded}
              variant='fullWidth'
              sx={{
                minHeight: 42,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  backgroundColor: '#eee',
                  border: 'none'
                },
                '& .MuiTab-root': {
                  minHeight: 42,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: theme.palette.text.secondary,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha('#eee', 0.02),
                    fontWeight: 600
                  },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04)
                  }
                }
              }}
            >
              <Tab
                label={
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <span>Por entregar</span>
                    <Badge
                      badgeContent={statistics.pendingCount}
                      color='warning'
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: alpha(theme.palette.warning.main, 0.2),
                          color: theme.palette.warning.main,
                          fontWeight: 'bold',
                          fontSize: '0.7rem'
                        }
                      }}
                    >
                      <Box sx={{ width: 8 }} />
                    </Badge>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <span>Entregado</span>
                    <Badge
                      badgeContent={statistics.deliveredCount}
                      color='success'
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: alpha(theme.palette.success.main, 0.2),
                          color: theme.palette.success.main,
                          fontWeight: 'bold',
                          fontSize: '0.7rem'
                        }
                      }}
                    >
                      <Box sx={{ width: 8 }} />
                    </Badge>
                  </Stack>
                }
              />
            </Tabs>
          )}

          {/* Details List */}
          <Stack spacing={0} sx={{ bgcolor: alpha(areaColor, 0.01) }}>
            {detailsStatus.length > 0 ? (
              detailsStatus.map((detail, index) => (
                <Box
                  key={detail.id}
                  sx={{
                    borderBottom:
                      index < detailsStatus.length - 1
                        ? `1px solid ${alpha(theme.palette.divider, 0.05)}`
                        : 'none'
                  }}
                >
                  <DetailInProgress
                    detail={detail}
                    orderId={orderId}
                    typeOrder={order.type}
                  />
                </Box>
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant='body2' color='text.secondary'>
                  {expanded
                    ? 'No hay productos entregados'
                    : 'Todos los productos han sido entregados'}
                </Typography>
              </Box>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
