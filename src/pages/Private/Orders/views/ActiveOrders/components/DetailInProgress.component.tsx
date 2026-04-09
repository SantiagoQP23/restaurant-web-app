import { FC, useState, useCallback, useMemo, useEffect, useRef } from 'react';

import {
  Box,
  Typography,
  styled,
  LinearProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Chip,
  Checkbox,
  alpha,
  useTheme,
  keyframes
} from '@mui/material';

import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

import { IOrderDetail, TypeOrder } from '../../../../../../models';
import {
  CheckCircle,
  CheckCircleOutline,
  PlusOneOutlined,
  MoreVertOutlined,
  EditOutlined
} from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../../../dto';
import { useUpdateOrderDetail } from '../../../hooks';
import NiceModal from '@ebay/nice-modal-react';
import { ModalEditOrderDetail } from '../../../components';
import { EditOrderDetailKitchenModal } from '../../../components/modals/EditOrderDetailKitchenModal.component';

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 6px;
        border-radius: 8px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);

const highlightPulse = keyframes`
  0%   { background-color: transparent; }
  25%  { background-color: rgba(21, 86, 133, 0.50); }
  100% { background-color: transparent; }
`;

interface Props {
  detail: IOrderDetail;
  orderId: string;
  typeOrder: TypeOrder;
  orderCreationDate: Date;
  orderUserId: string;
}

/**
 * Component to show the details of the order in progress
 * @author Santiago Quirumbay
 * @version 1.1 20/12/2023 Adds product options chip
 * @version 1.2 28/12/2023 Adds useUpdateOrderDetail hook
 * @version 1.3 01/03/2025 Fix: Buttons to increase quantity delivered
 * @version 1.4 20-01-2025 Adds order detail type icon
 * @version 1.5 03-01-2026 Enhanced UI, performance optimizations, removed commented code
 * @version 1.6 03-02-2026 Adds real-time update highlight animation
 */
export const DetailInProgress: FC<Props> = ({
  detail,
  orderId,
  typeOrder,
  orderCreationDate,
  orderUserId
}) => {
  const theme = useTheme();
  const { mutate: update } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(
    detail.qtyDelivered === detail.quantity
  );

  const createdBy = detail.createdBy;
  const updatedBy = detail.updatedBy;

  const showCreatedBy = createdBy && createdBy.id !== orderUserId;
  const showUpdatedBy = updatedBy && updatedBy.id !== orderUserId;

  const [isHighlighted, setIsHighlighted] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => setIsHighlighted(false), 7500);
    return () => clearTimeout(timer);
  }, [detail.updatedAt]);

  // Memoized calculations
  const isCompleted = useMemo(
    () => detail.qtyDelivered === detail.quantity,
    [detail.qtyDelivered, detail.quantity]
  );

  const remainingQuantity = useMemo(
    () => detail.quantity - detail.qtyDelivered,
    [detail.quantity, detail.qtyDelivered]
  );

  const progressPercentage = useMemo(
    () => (detail.qtyDelivered * 100) / detail.quantity,
    [detail.qtyDelivered, detail.quantity]
  );

  const isDifferentType = useMemo(
    () => detail.typeOrderDetail !== typeOrder,
    [detail.typeOrderDetail, typeOrder]
  );

  const detailCreatedAt = useMemo(() => {
    const date = new Date(detail.createdAt);

    return Number.isNaN(date.getTime()) ? null : date;
  }, [detail.createdAt]);

  const showDetailCreationDate = useMemo(() => {
    if (!detailCreatedAt) {
      return false;
    }

    return !isSameDay(orderCreationDate, detailCreatedAt);
  }, [detailCreatedAt, orderCreationDate]);

  const editDetail = useCallback(() => {
    NiceModal.show(EditOrderDetailKitchenModal, {
      detail: detail,
      orderId: orderId
    });
  }, [detail, orderId]);

  const updateQtyDelivered = useCallback(
    (qtyDelivered: number) => {
      const data: UpdateOrderDetailDto = {
        orderId: orderId!,
        id: detail!.id,
        qtyDelivered: qtyDelivered
      };

      update(data);
    },
    [orderId, detail, update]
  );

  const handleChangeChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;

      if (value) {
        updateQtyDelivered(detail.quantity);
      } else {
        updateQtyDelivered(0);
      }

      setChecked(value);
    },
    [detail.quantity, updateQtyDelivered]
  );

  const handleAddOne = useCallback(() => {
    updateQtyDelivered(detail.qtyDelivered + 1);
  }, [detail.qtyDelivered, updateQtyDelivered]);

  const showSecondaryInfo = useMemo(() => {
    return (
      detail.description ||
      (detail.tags && detail.tags.length > 0) ||
      detail.qtyDelivered > 0
    );
  }, [detail.description, detail.tags, detail.qtyDelivered]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        px: 1,
        py: 1.5,
        borderRadius: 1,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.action.hover, 0.05)
        },
        ...(isHighlighted && {
          animation: `${highlightPulse} 2.5s ease-out 3`
        })
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Stack
          direction='row'
          spacing={1}
          alignItems='items-center'
          flexGrow={1}
        >
          <Checkbox
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircle />}
            checked={checked}
            onChange={handleChangeChecked}
          />

          {/* Product Info */}
          <Stack
            direction='column'
            spacing={0.5}
            flexGrow={1}
            justifyContent='center'
          >
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography
                variant='subtitle1'
                fontWeight={isCompleted ? 400 : 500}
                color={isCompleted ? 'text.secondary' : 'text.primary'}
                sx={{
                  textDecoration: isCompleted ? 'line-through' : 'none'
                }}
              >
                {detail.quantity} x {detail.product.name}{' '}
                {detail.price !== detail.product.price && `($${detail.price})`}
              </Typography>
            </Stack>

            {/* Type Indicator */}
            {/* {isDifferentType && ( */}
            {/*   <Chip */}
            {/*     label={ */}
            {/*       detail.typeOrderDetail === TypeOrder.IN_PLACE */}
            {/*         ? 'Para servir' */}
            {/*         : 'Para llevar' */}
            {/*     } */}
            {/*     size='small' */}
            {/*     variant='outlined' */}
            {/*     sx={{ */}
            {/*       height: 20, */}
            {/*       fontSize: '0.7rem', */}
            {/*       fontWeight: 500, */}
            {/*       borderColor: alpha(theme.palette.divider, 0.5), */}
            {/*       color: theme.palette.text.secondary */}
            {/*     }} */}
            {/*   /> */}
            {/* )} */}
            {showSecondaryInfo && (
              <Stack spacing={0.5} mt={0.5}>
                {/* Description */}
                {detail.description && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.813rem',
                      opacity: isCompleted ? 0.7 : 1
                    }}
                  >
                    {detail.description}
                  </Typography>
                )}

                {/* Tags */}
                {detail.tags && detail.tags.length > 0 && (
                  <Stack direction='row' flexWrap='wrap' gap={0.5}>
                    {detail.tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size='small'
                        variant='outlined'
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          opacity: isCompleted ? 0.6 : 1
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Progress Bar */}
                {!isCompleted && detail.qtyDelivered > 0 && (
                  <Stack spacing={0.5} mt={0.5}>
                    <LinearProgressWrapper
                      value={progressPercentage}
                      color='primary'
                      variant='determinate'
                    />
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      gap={1}
                    >
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        fontWeight={500}
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {remainingQuantity}{' '}
                        {remainingQuantity === 1
                          ? 'por entregar'
                          : 'por entregar'}
                      </Typography>
                      {showDetailCreationDate && detailCreatedAt && (
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          fontWeight={500}
                          sx={{ fontSize: '0.75rem' }}
                        >
                          {format(detailCreatedAt, 'HH:mm', {
                            locale: es
                          })}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>

        {/* Action Buttons */}
        <Stack direction='row' spacing={0.5} alignItems='center'>
          {!isCompleted && (
            <>
              {/* Add One Button (only if quantity > 1) */}
              {detail.quantity > 1 && (
                <IconButton
                  size='small'
                  onClick={handleAddOne}
                  disabled={detail.qtyDelivered >= detail.quantity}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  <PlusOneOutlined fontSize='small' />
                </IconButton>
              )}

              {/* Complete Checkbox */}
            </>
          )}

          {/* Edit Button */}
          <IconButton
            onClick={editDetail}
            size='small'
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                bgcolor: alpha(theme.palette.action.hover, 0.1)
              }
            }}
          >
            <EditOutlined fontSize='small' />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};
