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
  onClick?: () => void;
}

export const OrderCard: FC<Props> = ({ order, onClick }) => {
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
      <Card
        sx={{
          border: '1px solid #e0e0e0',
          boxShadow: 'none'
        }}
      >
        {/* <CardActionArea
        onClick={() => {
          onClick && onClick();
          navigate(`/orders/list/edit/${order.id}`);
        }}
      > */}
        <CardHeader
          title={
            <Box display='flex' alignItems='center' gap={1}>
              {order.type === TypeOrder.TAKE_AWAY ? (
                <>
                  <TakeoutDiningOutlined fontSize='small' />
                  {getTypeOrder(order.type)}
                </>
              ) : (
                <>
                  {<TableBarOutlined fontSize='small' />}
                  {`Mesa ${order.table?.name}`}
                </>
              )}
            </Box>
          }
          subheader={`${order.user.person.firstName} ${order.user.person.lastName} `}
          action={
            <>
              <Stack direction='row' spacing={1} alignItems='center'>
                <LabelStatusOrder status={order.status} simple />
                <IconButton {...bindTrigger(popupState)}>
                  <MoreVert />
                </IconButton>
              </Stack>
            </>
          }
          // avatar={<TableRestaurant />}
        />
        {order.notes && (
          <Box display='flex' flexDirection='column' px={2}>
            <Typography variant='subtitle1'>Notas</Typography>

            <Typography variant='body1'>{order.notes}</Typography>
          </Box>
        )}

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography variant='body1'>
              {order.details.length} productos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1} sx={{}}>
              {order.details.map((detail) => (
                <Box key={detail.id} display='flex'>
                  <Typography variant='body1' width='10%'>
                    {detail.quantity}
                    {/* {index < order.details.length - 1 ? "," : "."} */}
                  </Typography>
                  <Box display='flex' flexDirection='column'>
                    <Typography variant='body1'>
                      {detail.product.name}
                      {detail.productOption && `: ${detail.productOption.name}`}
                    </Typography>
                    <Typography variant='subtitle2'>
                      {detail.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <CardContent>
          <Stack spacing={2}>
            {/* <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              maxWidth: "auto", // Establecer el ancho máximo aquí
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {order.details.map((detail, index) => (
              <Typography variant="body1" key={index}>
                {detail.quantity} {detail.product.name}
                {index < order.details.length - 1 ? "," : "."}
              </Typography>
            ))}
          </Stack> */}
            <Box display='flex' alignItems='center'>
              <TimerOutlined fontSize='small' sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography fontSize='0.8rem'>{date}</Typography>
              <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
              <PeopleOutlined fontSize='small' sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography fontSize='0.8rem' fontWeight='bold'>
                {order.people}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box display='flex' alignItems='center' gap={0.5}>
                <AssignmentOutlined
                  fontSize='small'
                  sx={{ fontSize: 18, mr: 0.5 }}
                />
                <Typography>N° {order.num}</Typography>
              </Box>
              <Box display='flex' alignItems='center' gap={0.5}>
                <LabelStatusPaid isPaid={order.isPaid} />
                <Divider orientation='vertical' flexItem />
                <Typography align='right' variant='h6'>
                  {formatMoney(order.total)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
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
