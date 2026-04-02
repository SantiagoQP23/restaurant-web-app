import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import {
  selectOrders,
  selectTables,
  setActiveTable
} from '../../../../../../redux';

import { ITable } from '../../../../../../models';

import { Table } from './Table.component';
import NiceModal from '@ebay/nice-modal-react';
import { RegisteredModals } from '../../../../modals';
import { useEffect, useState } from 'react';
import { NewOrderModal } from '../../../components/modals/NewOrderModal.component';

enum StatusTable {
  FREE = 'FREE',
  BUSY = 'BUSY'
}

export const Tables = () => {
  const { tables } = useSelector(selectTables);

  const [tablesStatus, setTablesStatus] = useState<string>('');
  const [filteredTables, setFilteredTables] = useState<ITable[]>([]);

  const dispatchRedux = useDispatch();

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
      handleOpenDrawer(table);
    }
  };

  const handleOpenDrawer = (table: ITable) => {
    dispatchRedux(setActiveTable(table));
  };

  useEffect(() => {
    setFilteredTables(tables);
  }, [tables]);

  return (
    <>
      <Stack direction='row' justifyContent='right' alignItems='center' mb={2}>
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Estado</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={tablesStatus}
              label="Estado"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value={StatusTable.BUSY}>Ocupadas</MenuItem>
              <MenuItem value={StatusTable.FREE}>Disponibles</MenuItem>
            </Select>
          </FormControl>
        </Stack> */}
      </Stack>

      <Grid container spacing={1}>
        {filteredTables.map((table) => (
          <Grid key={table.id} item xs={6} md={3} lg={2} p={1}>
            <Table table={table} handleClickTable={handleClickTable} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
