import { FC, useState, useCallback, useMemo } from 'react';

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
  useTheme
} from '@mui/material';

import { IOrderDetail, TypeOrder } from '../../../../../../models';
import {
  CheckCircle,
  CheckCircleOutline,
  PlusOneOutlined,
  MoreVertOutlined
} from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../../../dto';
import { useUpdateOrderDetail } from '../../../hooks';
import NiceModal from '@ebay/nice-modal-react';
import { ModalEditOrderDetail } from '../../../components';

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

interface Props {
  detail: IOrderDetail;
  orderId: string;
  typeOrder: TypeOrder;
}

/**
 * Component to show the details of the order in progress
 * @author Santiago Quirumbay
 * @version 1.1 20/12/2023 Adds product options chip
 * @version 1.2 28/12/2023 Adds useUpdateOrderDetail hook
 * @version 1.3 01/03/2025 Fix: Buttons to increase quantity delivered
 * @version 1.4 20-01-2025 Adds order detail type icon
 * @version 1.5 03-01-2026 Enhanced UI, performance optimizations, removed commented code
 */
export const DetailInProgress: FC<Props> = ({ detail, orderId, typeOrder }) => {
  const theme = useTheme();
  const { mutate: update } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(
    detail.qtyDelivered === detail.quantity
  );

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

  const editDetail = useCallback(() => {
    NiceModal.show(ModalEditOrderDetail, { detail: detail, orderId: orderId });
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

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: detail.quantity > 1 ? 'flex-start' : 'center',
        px: 2,
        py: 1.5,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.action.hover, 0.02)
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: 48 }}>
        <Checkbox
          icon={<CheckCircleOutline />}
          checkedIcon={<CheckCircle />}
          checked={checked}
          onChange={handleChangeChecked}
        />
      </ListItemIcon>
      {/* Quantity Badge */}
      {/*   <Chip */}
      {/*     label={detail.quantity} */}
      {/*     size='small' */}
      {/*     variant={!isCompleted ? 'filled' : 'outlined'} */}
      {/*     color={!isCompleted ? 'primary' : 'default'} */}
      {/*     sx={{ */}
      {/*       fontWeight: 600, */}
      {/*       fontSize: '0.875rem', */}
      {/*       minWidth: 32, */}
      {/*       height: 28, */}
      {/*       opacity: isCompleted ? 0.5 : 1 */}
      {/*     }} */}
      {/*   /> */}
      {/* </ListItemIcon> */}

      {/* Product Info */}
      <ListItemText
        primary={
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography
              variant='subtitle1'
              fontWeight={isCompleted ? 400 : 500}
              color={isCompleted ? 'text.secondary' : 'text.primary'}
              sx={{
                textDecoration: isCompleted ? 'line-through' : 'none'
              }}
            >
              {detail.quantity} x {detail.product.name}
            </Typography>

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
          </Stack>
        }
        secondary={
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

            {/* Progress Bar */}
            {!isCompleted && (
              <Stack spacing={0.5} mt={0.5}>
                <LinearProgressWrapper
                  value={progressPercentage}
                  color='primary'
                  variant='determinate'
                />
                <Typography
                  variant='caption'
                  color='text.secondary'
                  fontWeight={500}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {remainingQuantity}{' '}
                  {remainingQuantity === 1 ? 'por entregar' : 'por entregar'}
                </Typography>
              </Stack>
            )}
          </Stack>
        }
      />

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
          <MoreVertOutlined fontSize='small' />
        </IconButton>
      </Stack>
    </Box>
  );
};
