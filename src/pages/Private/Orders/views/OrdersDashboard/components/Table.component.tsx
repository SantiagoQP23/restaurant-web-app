import { FC } from 'react';

import { Assignment, Circle, People, TableBar } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  Badge,
  Stack,
  CardHeader
} from '@mui/material';
import { ITable, OrderStatus } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { Label } from '../../../../../../components/ui';
import {
  DrawerOrder,
  LabelStatusOrder,
  orderStatusIconMap,
  colorStatusMap
} from '../../../components';
import NiceModal from '@ebay/nice-modal-react';
import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;
}

export const Table: FC<Props> = ({ table, handleClickTable }) => {
  const { orders } = useSelector(selectOrders);

  const ordersTable = orders.filter((order) => order.table?.id === table.id);

  const people = ordersTable.reduce((acc, order) => {
    return acc + order.people;
  }, 0);

  const isAvailable = ordersTable.length === 0;

  const showOrdersTableDrawer = () => NiceModal.show(DrawerOrder, { table });

  return (
    <Card
      sx={{
        border: (theme) =>
          isAvailable
            ? `2px solid ${theme.palette.success.light}`
            : // : `2px solid ${theme.palette.warning.light}`,
              ``,
        boxShadow: (theme) =>
          isAvailable
            ? `0px 0px 4px ${theme.palette.success.light}`
            : // : `0px 0px 4px ${theme.palette.warning.light}`,
              ``
      }}
    >
      <CardActionArea onClick={showOrdersTableDrawer}>
        <CardHeader
          title={
            <Box display='flex' justifyContent='center' gap={1}>
              <TableBar
                fontSize='small'
                // color={isAvailable ? "secondary" : "inherit"}
              />
              <Typography variant='h5' textAlign='center'>
                {table.name}
              </Typography>
            </Box>
          }
          titleTypographyProps={{
            variant: 'h5',
            textAlign: 'center'
          }}
        />
        <Box
          sx={{
            p: 1
            //   display: "flex",
            //   flexDirection: "column",
            //   gap: 1,
            //   justifyContent: "center",
            //   alignItems: "center",
          }}
        >
          {ordersTable.length > 0 ? (
            <Box display='flex' gap={1} flexDirection='column'>
              {ordersTable.map((order) => (
                <Box
                  key={order.id}
                  width='100%'
                  display='flex'
                  gap={1}
                  border={`2px solid #eee`}
                  borderRadius='5px'
                  p={0.5}
                  justifyContent='space-between'
                >
                  <Badge
                    sx={{
                      border: '1px solid',
                      borderRadius: '5px',
                      borderColor: `${colorStatusMap.get(order.status)}.main`
                    }}
                  >
                    {orderStatusIconMap.get(order.status)}
                  </Badge>
                  <Typography>
                    {format(new Date(order.createdAt), 'HH:mm')}
                  </Typography>
                  <Box display='flex' gap={1} alignItems='center'>
                    <People fontSize='small' />
                    <Typography fontSize='0.8rem'>{order.people}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              alignItems='center'
              display='flex'
              justifyContent='center'
              gap={1}
            >
              <Circle fontSize='small' sx={{ fontSize: 10 }} />
              <Typography fontSize='0.8rem' textAlign='center'>
                {isAvailable ? 'Disponible' : ''}
              </Typography>
            </Box>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
