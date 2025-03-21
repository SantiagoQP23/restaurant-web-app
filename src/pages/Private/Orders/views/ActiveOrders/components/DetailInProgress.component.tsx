import { FC, useState } from 'react';

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
  Checkbox
} from '@mui/material';

import { IOrderDetail, TypeOrder } from '../../../../../../models';
import {
  CheckCircle,
  CheckCircleOutline,
  LocalDiningOutlined,
  More,
  MoreVertOutlined,
  PlusOne,
  PlusOneOutlined,
  TakeoutDiningOutlined
} from '@mui/icons-material';
import { UpdateOrderDetailDto } from '../../../dto';
import { useUpdateOrderDetail } from '../../../hooks';
import NiceModal from '@ebay/nice-modal-react';
import { ModalEditOrderDetail } from '../../../components';
import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 6px;
        
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
 */
export const DetailInProgress: FC<Props> = ({ detail, orderId, typeOrder }) => {
  const { mutate: update } = useUpdateOrderDetail();

  const [checked, setChecked] = useState(
    detail.qtyDelivered === detail.quantity
  );

  const editDetail = () => {
    NiceModal.show(ModalEditOrderDetail, { detail: detail, orderId: orderId });
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    if (value) {
      updateQtyDelivered(detail.quantity);
    } else {
      updateQtyDelivered(0);
    }

    setChecked(event.target.checked);
  };

  const updateQtyDelivered = (qtyDelivered: number) => {
    const data: UpdateOrderDetailDto = {
      orderId: orderId!,
      id: detail!.id,
      qtyDelivered: qtyDelivered
    };

    update(data);
  };

  const handleAddOne = () => {
    updateQtyDelivered(detail.qtyDelivered + 1);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: detail.quantity > 1 ? 'flex-start' : 'center',
          p: 1
        }}
      >
        <ListItemIcon>
          <Chip
            label={
              <Typography
                variant='h4'
                color={
                  detail.qtyDelivered === detail.quantity
                    ? 'GrayText'
                    : 'textPrimary'
                }
              >
                {detail.quantity}
              </Typography>
            }
            variant={
              detail.qtyDelivered !== detail.quantity ? 'filled' : 'outlined'
            }
          />
        </ListItemIcon>

        <ListItemText
          primary={
            <Stack direction='row' alignItems='center' gap={1}>
              {detail.product.name}
              {detail.productOption && (
                <Chip
                  sx={{ ml: 1 }}
                  label={`${detail.productOption?.name} `}
                  size='small'
                />
              )}
              {detail.typeOrderDetail !== typeOrder && (
                detail.typeOrderDetail === TypeOrder.IN_PLACE ? <LocalDiningOutlined /> : <TakeoutDiningOutlined />

              )}
            </Stack>
          }
          primaryTypographyProps={{
            variant: 'h4',
            color:
              detail.qtyDelivered === detail.quantity
                ? 'GrayText'
                : 'textPrimary',
            sx: {
              textDecoration:
                detail.qtyDelivered === detail.quantity
                  ? 'line-through'
                  : 'none'
              ,
              alignItems: 'center'
            }
          }}
          secondary={
            <>
              <Typography whiteSpace='pre-wrap' variant='body1' mb={1}>
                {detail.description}
              </Typography>
              {detail.quantity !== detail.qtyDelivered && (
                <Box display='flex' alignItems='center' width='100%' gap={1}>
                  <Stack
                    direction='column'
                    alignItems='right'
                    mt={0.5}
                    flexGrow={1}
                  >
                    <LinearProgressWrapper
                      value={(detail.qtyDelivered * 100) / detail.quantity}
                      color='info'
                      variant='determinate'
                      sx={{
                        width: '100%'
                      }}
                    />
                    <Typography variant='subtitle1' fontSize={12}>
                      {detail.quantity - detail.qtyDelivered} por entregar
                    </Typography>
                  </Stack>
                </Box>
              )}

              {/* <Box display="flex" justifyContent="space-between">
                <Typography>
                  {formatDistance(new Date(detail.createdAt), new Date(), {
                    locale: es,
                  })}
                
                </Typography>
                <Typography>
                  {formatDistance(new Date(detail.updatedAt), new Date(), {
                    locale: es,
                  })}
                 
                </Typography>
              </Box> */}
            </>
          }
        />

        <Stack direction='row' spacing={0.5}>
          {detail.quantity !== detail.qtyDelivered && (
            <>
              {detail.quantity > 1 && (
                <IconButton size='small' onClick={handleAddOne}>
                  <PlusOneOutlined />
                </IconButton>
              )}
              <Checkbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                checked={checked}
                onChange={handleChangeChecked}
                inputProps={{ 'aria-label': 'controlled' }}
                color='success'
              />
            </>
          )}
          <IconButton onClick={editDetail} size='small'>
            <MoreVertOutlined />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};
