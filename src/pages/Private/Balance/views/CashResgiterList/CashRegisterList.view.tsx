import {
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination
} from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { useAllCashRegister } from '../../hooks/useCashRegister';
import { format } from 'date-fns';
import { Label } from '../../../../../components/ui';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { Period } from '../../../Common/dto/period.model';

export const CashRegisterList = () => {
  const {
    cashRegisterQuery,
    period,
    handleChangePeriod,
    startDate,
    handleChangeStartDate,
    handleChangeEndDate,
    endDate,
    ...filter
  } = useAllCashRegister();

  const navigate = useNavigate();

  return (
    <>
      <TitlePage
        title='Historial de  cajas'
        // action={
        //   <Button
        //     variant="contained"
        //   >
        //     Descargar reporte
        //   </Button>
        // }
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Lista' />

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

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Creado por</TableCell>
                    <TableCell>Cerrado por</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Balance</TableCell>

                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cashRegisterQuery.data?.cashRegisters.map((cashRegister) => (
                    <TableRow key={cashRegister.id}>
                      <TableCell>
                        <Typography variant='h5'>
                          {cashRegister.createdBy.person.firstName}{' '}
                          {cashRegister.createdBy.person.lastName}
                        </Typography>
                        {format(
                          new Date(cashRegister.createdAt),
                          'dd/MM/yyyy HH:mm'
                        )}
                      </TableCell>
                      <TableCell>
                        {cashRegister.isClosed ? (
                          <>
                            <Typography variant='h5'>
                              {cashRegister.createdBy.person.firstName}{' '}
                              {cashRegister.createdBy.person.lastName}
                            </Typography>
                            <Typography>
                              {format(
                                new Date(cashRegister.closedAt!),
                                'dd/MM/yyyy HH:mm'
                              )}
                            </Typography>
                          </>
                        ) : (
                          <Typography>-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {cashRegister.isClosed ? (
                          <Label color='error'>Cerrado</Label>
                        ) : (
                          <Label color='success'>Abierto</Label>
                        )}
                      </TableCell>
                      <TableCell>{formatMoney(cashRegister.balance)}</TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => navigate(`${cashRegister.id}`)}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={cashRegisterQuery.data?.count || 0}
              rowsPerPage={filter.rowsPerPage}
              page={filter.page}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
