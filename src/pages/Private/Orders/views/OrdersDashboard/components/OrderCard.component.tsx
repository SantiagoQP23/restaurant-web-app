import {
  TimerOutlined,
  People,
  Receipt,
  MoreVert,
  Assignment,
  TableRestaurant,
  TakeoutDining,
  TableBar,
  EditOutlined,
  Done,
  TakeoutDiningOutlined,
  TableBarOutlined,
  AssignmentOutlined,
  PeopleOutlined
} from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardHeader,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Popover,
  MenuItem,
  Alert
} from '@mui/material';
import { format, formatDistance, formatRelative } from 'date-fns';
import { Order, OrderStatus, TypeOrder } from '../../../../../../models';
import { FC } from 'react';
import { LabelStatusOrder } from '../../../components/LabelStatusOrder.component';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { getTypeOrder } from '../../../../Common/helpers/get-type-order.helper';
import { LabelStatusPaid, ModalCloseOrder } from '../../../components';
import { es } from 'date-fns/locale';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import {
  bindTrigger,
  usePopupState,
  bindPopover
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';

interface Props {
  order: Order;
  selected?: boolean;
  onClick?: () => void;
}

export const OrderCard: FC<Props> = ({ order, selected, onClick }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverOrder1'
  });
  const navigate = useNavigate();

  const date = formatDistance(new Date(order.createdAt), new Date(), {
    locale: es
  });

  const handleEdit = () => {
    popupState.close();
    handleClick();
    navigate(`/orders/list/edit/${order.id}`);
  };

  const handleClick = () => {
    onClick && onClick();
  };

  const isCloseableOrder =
    (order.status === OrderStatus.DELIVERED && order.isPaid) ||
    order.status === OrderStatus.CANCELLED;

  const showModalCloseOrder = () => {
    NiceModal.show(ModalCloseOrder, {
      order
    });
  };

  const handleClose = () => {
    popupState.close();
    handleClick();
    showModalCloseOrder();
  };

  return (
    <>
      <Box
        sx={{
          border: 1,
          borderColor: selected ? 'primary.main' : 'divider',
          boxShadow: 'none',
          borderRadius: 1,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
        onClick={handleClick}
      >
        {/* <CardActionArea
        onClick={() => {
          onClick && onClick();
          navigate(`/orders/list/edit/${order.id}`);
        }}
      > */}
        <Stack direction='row' spacing={1} alignItems='center'>
          <LabelStatusOrder status={order.status} />
          <LabelStatusPaid isPaid={order.isPaid} />
        </Stack>
        <Box display='flex' alignItems='center' gap={1}>
          {order.type === TypeOrder.TAKE_AWAY ? (
            <>
              <TakeoutDiningOutlined fontSize='small' />
              <Typography variant='h6'>{getTypeOrder(order.type)}</Typography>
            </>
          ) : (
            <>
              {<TableBarOutlined fontSize='small' />}
              <Typography variant='h6'>
                {`Mesa ${order.table?.name}`}
              </Typography>
            </>
          )}
        </Box>

        <Box display='flex' alignItems='center' color='text.secondary' gap={2}>
          <Box display='flex' alignItems='center' gap={0.5}>
            <AssignmentOutlined
              fontSize='small'
              sx={{ fontSize: 18, mr: 0.5 }}
            />
            <Typography>N° {order.num}</Typography>
          </Box>
          <Box display='flex' alignItems='center' gap={0.5}>
            <TimerOutlined fontSize='small' sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography fontSize='0.8rem'>{date}</Typography>
          </Box>
          <Box display='flex' alignItems='center' gap={0.5}>
            <PeopleOutlined fontSize='small' sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography fontSize='0.8rem' fontWeight='bold'>
              {order.people}
            </Typography>
          </Box>
        </Box>
        {order.notes && (
          <Box display='flex' flexDirection='column' px={2}>
            <Typography variant='subtitle1'>Notas</Typography>

            <Typography variant='body1'>{order.notes}</Typography>
          </Box>
        )}

        <Stack spacing={1} sx={{ px: 2, my: 1 }}>
          {order.details.map((detail) => {
            const showProductOptionName =
              detail.product.options.length > 1 && detail.productOption;
            return (
              <Box key={detail.id} display='flex'>
                <Typography variant='body1' width='10%'>
                  {detail.quantity}
                  {/* {index < order.details.length - 1 ? "," : "."} */}
                </Typography>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body1'>
                    {detail.product.name}{' '}
                    {showProductOptionName && detail.productOption?.name}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {detail.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
        {/*   </AccordionDetails> */}
        {/* </Accordion> */}
        <Stack spacing={2}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body1'>{`${order.user.person.firstName} ${order.user.person.lastName} `}</Typography>
            <Box display='flex' alignItems='center' gap={0.5}>
              <Typography align='right' variant='h6'>
                {formatMoney(order.total)}
              </Typography>
            </Box>
          </Box>
        </Stack>
        {/* </CardActionArea> */}
      </Box>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140,
              zIndex: 1000
            }
          }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditOutlined fontSize='small' sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={!isCloseableOrder}>
          <Done fontSize='small' sx={{ mr: 2 }} />
          Cerrar
        </MenuItem>
      </Popover>
    </>
  );
};
