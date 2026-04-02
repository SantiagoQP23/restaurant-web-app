import { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Button,
  Stack,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tooltip,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { TitlePage } from '../../../components';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ITable, OrderStatus, TypeOrder } from '../../../../../models';
import { useNewOrderStore } from '../../store/newOrderStore';
import { Label } from '../../../../../components/ui';
import { TakeAwayOrders } from './components/TakeAwayOrders.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, selectTables } from '../../../../../redux';
import NiceModal from '@ebay/nice-modal-react';
import { NewOrderModal } from '../../components/modals/NewOrderModal.component';
import { OrderList } from './components/OrderList.component';
import { fontWeight } from '@mui/system';
import { Table } from './components/Table.component';
import { TableInfo } from './components/TableInfo.component';

enum DashboardViews {
  ALL = 'ALL',
  TABLES = 'TABLES',
  USERS = 'USERS',
  TAKE_AWAY = 'TAKE_AWAY'
}

interface HeaderBoxProps {
  title: string;
  count: number | string;
}

const HeaderBox = ({ title, count }: HeaderBoxProps) => {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Typography variant='body2' sx={{ fontWeight: 'semibold' }}>
        {title}
      </Typography>
      <Typography variant='h4' sx={{ fontWeight: 'normal' }}>
        {count}
      </Typography>
      {/* <Chip label={count} size='small' /> */}
    </Box>
  );
};

enum StatusTable {
  FREE = 'FREE',
  BUSY = 'BUSY'
}

export const Tables = () => {
  const { tables } = useSelector(selectTables);
  const [activeTable, setActiveTable] = useState<ITable | null>(null);

  const [tablesStatus, setTablesStatus] = useState<string>('');
  const [filteredTables, setFilteredTables] = useState<ITable[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setTablesStatus(value);

    if (value === StatusTable.FREE) {
      setFilteredTables(tables.filter((table) => table.isAvailable));
    } else if (value === StatusTable.BUSY) {
      setFilteredTables(tables.filter((table) => !table.isAvailable));
    } else {
      setFilteredTables(tables);
    }
  };

  const handleClickTable = (table: ITable) => {
    if (table.isAvailable) {
      NiceModal.show(NewOrderModal);
    } else {
      setActiveTable(table);
    }
  };

  const handleOpenDrawer = (table: ITable) => {
    // dispatchRedux(setActiveTable(table));
  };

  useEffect(() => {
    setFilteredTables(tables);
  }, [tables]);

  const openNewOrderModal = () => {
    NiceModal.show(NewOrderModal);
    // setOrderType(TypeOrder.TAKE_AWAY);
    //
    // navigate('/orders/add');
  };

  return (
    <>
      <Container maxWidth='lg' sx={{ minHeight: '100vh' }}>
        <Box height='100%' minHeight='100%' flex={1}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item spacing={1} xs={12} md={6} lg={8}>
              <TitlePage title='Mesas' />

              <Grid container spacing={1}>
                {filteredTables.map((table) => (
                  <Grid key={table.id} item xs={6} md={3} lg={2} p={1}>
                    <Table table={table} handleClickTable={handleClickTable} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {activeTable && (
              <Grid item xs={12} md={6} lg={4}>
                <TableInfo table={activeTable} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
