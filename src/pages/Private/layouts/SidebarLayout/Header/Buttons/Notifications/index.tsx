import {
  alpha,
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { format, formatDistance, subDays } from 'date-fns';
import {
  Assignment,
  AssignmentOutlined,
  Ballot,
  Close,
  CloseRounded,
  DvrOutlined,
  ExpandLess,
  Input,
  ReadMore
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectAuth, selectOrders } from '../../../../../../../redux';
import { Label } from '../../../../../../../components/ui';
import { getPaymentMethod } from '../../../../../Common/helpers/get-payment-method';
import {
  OrderStatus,
  OrderStatusPay,
  TypeOrder
} from '../../../../../../../models';
import { getTypeOrder } from '../../../../../Common/helpers/get-type-order.helper';
import { formatMoney } from '../../../../../Common/helpers/format-money.helper';
import { LabelStatusOrder } from '../../../../../Orders/components/LabelStatusOrder.component';
import {
  Stack,
  ListItemSecondaryAction,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  CardHeader,
  ListItemButton,
  Button
} from '@mui/material';
import { TabsStatusOrder } from '../../../../../Orders/components/TabsStatusOrder.component';
import { useNavigate } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { DrawerMyOrders } from './DrawerMyOrders.component';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.info.main, 0.1)};
        color: ${theme.palette.info.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;
        font-weight: bold;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.info.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { orders } = useSelector(selectOrders);

  const { user } = useSelector(selectAuth);

  const [statusOrderFilter, setStatusOrderFilter] =
    useState<OrderStatus | null>(OrderStatus.PENDING);

  const [statusPayFilter, setStatusPayFilter] = useState<
    OrderStatusPay | string
  >(' ');

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const theme = useTheme();

  const navigate = useNavigate();

  const handleEditOrder = (id: string): void => {
    handleClose();
    navigate(`/orders/list/edit/${id}`);
  };

  const openDrawerMyOrders = () => {
    NiceModal.show(DrawerMyOrders);
  };

  const ordersUser = orders.filter((order) => order.user.id === user!.id);

  let ordersFiltered = statusOrderFilter
    ? ordersUser.filter((order) => order.status === statusOrderFilter)
    : orders;

  ordersFiltered =
    statusPayFilter !== ' '
      ? ordersFiltered.filter(
          (order) =>
            (order.isPaid ? OrderStatusPay.PAY : OrderStatusPay.NO_PAY) ===
            statusPayFilter
        )
      : ordersFiltered;

  return (
    <>
      <Tooltip arrow title='Mis pedidos'>
        <IconButton
          ref={ref}
          onClick={openDrawerMyOrders}
          sx={
            {
              // border: `1px solid ${theme.palette.divider}`,
            }
          }
        >
          <Badge
            badgeContent={''}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            color='info'
            variant='dot'
            // size="small"
          >
            <AssignmentOutlined />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h4'>Mis pedidos</Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Label color='info'>{ordersUser.length}</Label>
            <IconButton onClick={handleClose}>
              <ExpandLess />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            mb: 1,
            width: 250
            // displays: 'flex',
            // justifyContent: 'right',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <ListItem
              sx={{
                backgroundColor: theme.colors.warning.lighter,
                borderRadius: 1,
                color: theme.palette.warning.main
              }}
            >
              <ListItemText primary='Pendientes' />
              <ListItemSecondaryAction>
                <Label color='warning'>
                  {
                    ordersUser.filter(
                      (order) => order.status === OrderStatus.PENDING
                    ).length
                  }
                </Label>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: theme.colors.info.lighter,
                borderRadius: 1,
                color: theme.palette.info.main
              }}
            >
              <ListItemText primary='En preparación' />
              <ListItemSecondaryAction>
                <Label color='info'>
                  {
                    ordersUser.filter(
                      (order) => order.status === OrderStatus.IN_PROGRESS
                    ).length
                  }
                </Label>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: theme.colors.success.lighter,
                borderRadius: 1,
                color: theme.palette.success.main
              }}
            >
              <ListItemText primary='Entregados' />
              <ListItemSecondaryAction>
                <Label color='success'>
                  {
                    ordersUser.filter(
                      (order) => order.status === OrderStatus.DELIVERED
                    ).length
                  }
                </Label>
              </ListItemSecondaryAction>
            </ListItem>

            <Button
              onClick={() => {
                handleClose();
                navigate('/users/profile');
              }}
            >
              Ver todos
            </Button>

            {/* <ListItemButton
              color='primary'
              
              
            >
              <ListItemText
                primary="Ver todos"
                onClick={() => {
                  handleClose();
                  navigate('/orders/list');
                }}
              />

            </ListItemButton> */}
          </List>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
