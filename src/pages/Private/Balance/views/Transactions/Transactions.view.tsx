import { useTransactions } from '../../hooks/useTransactions';
import { TransactionsTable } from './components/TransactionsTable.view';
import {
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  TablePagination,
  TextField
} from '@mui/material';
import { TitlePage } from '../../../components';
import { DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { Period } from '../../../Common/dto/period.model';

export const Transactions = () => {
  const {
    period,
    handleChangePeriod,
    startDate,
    handleChangeStartDate,
    handleChangeEndDate,
    endDate,
    transactionsQuery: { data },
    ...filter
  } = useTransactions();

  return (
    <>
      <TitlePage title='Transacciones' />

      <Card>
        <CardHeader title='Transacciones' />
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id='select-period-label'>Periodo</InputLabel>
              <Select
                labelId='select-period-label'
                value={period}
                onChange={handleChangePeriod}
                fullWidth
                label='Periodo'
                size='medium'
              >
                <MenuItem value={Period.DAILY}>Diario</MenuItem>
                <MenuItem value={Period.MONTHLY}>Mensual</MenuItem>
                <MenuItem value={Period.YEARLY}>Anual</MenuItem>

                <MenuItem value={Period.CUSTOM}>Personalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <DesktopDatePicker
              label='Fecha de inicio'
              inputFormat={
                period === Period.MONTHLY
                  ? 'yyyy MMMM'
                  : period === Period.YEARLY
                    ? 'yyyy'
                    : 'yyyy-MM-dd'
              }
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
              disableFuture
              maxDate={endDate ? endDate : undefined}
              views={
                period === Period.MONTHLY
                  ? ['month', 'year']
                  : period === Period.YEARLY
                    ? ['year']
                    : ['day']
              }
            />
          </Grid>

          {startDate && period === Period.CUSTOM && (
            <Grid item xs={12} md={4}>
              <DesktopDateTimePicker
                label='Fecha de fin'
                inputFormat='yyyy-MM-dd'
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                disableFuture
              />
            </Grid>
          )}
        </Grid>
        {data && data.count > 0 && (
          <TableContainer>
            <TransactionsTable transactions={data.transactions} />
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data?.count || 0}
          rowsPerPage={filter.rowsPerPage}
          page={filter.page}
          onPageChange={filter.handleChangePage}
          onRowsPerPageChange={filter.handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};
