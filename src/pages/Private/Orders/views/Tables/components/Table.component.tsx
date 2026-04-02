import { FC } from 'react';

import { Circle, TableBarOutlined } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  Box,
  Typography,
  CardHeader,
  Chip
} from '@mui/material';
import { ITable } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { DrawerOrder } from '../../../components';
import NiceModal from '@ebay/nice-modal-react';
import { NewOrderModal } from '../../../components/modals/NewOrderModal.component';

interface Props {
  table: ITable;
  handleClickTable: (table: ITable) => void;
}

export const Table: FC<Props> = ({ table, handleClickTable }) => {
  const { orders } = useSelector(selectOrders);

  const ordersTable = orders.filter((order) => order.table?.id === table.id);

  const isAvailable = ordersTable.length === 0;

  const showOrdersTableDrawer = () => NiceModal.show(DrawerOrder, { table });

  const handleClick = () => {
    if (table.isAvailable) {
      NiceModal.show(NewOrderModal, { defaultTable: table });
    } else {
      handleClickTable(table);
    }
  };

  return (
    <Card
      sx={{
        border: isAvailable ? 'none' : 1,
        borderColor: isAvailable ? 'divider' : 'primary.main'
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: '100%',
          minHeight: '80px'
        }}
      >
        <Box
          sx={{
            p: 2
            //   display: "flex",
            //   flexDirection: "column",
            //   gap: 1,
            //   justifyContent: "center",
            //   alignItems: "center",
          }}
        >
          <Typography variant='h6'>Mesa {table.name}</Typography>

          {ordersTable.length > 0 ? (
            <Typography variant='body2'>
              {ordersTable.length} Pedidos
            </Typography>
          ) : (
            <Typography variant='body2'></Typography>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
