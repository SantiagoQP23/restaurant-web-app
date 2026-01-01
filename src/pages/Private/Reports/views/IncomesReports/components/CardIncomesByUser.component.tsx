import {
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { usePaginationAsync } from '../../../../../../hooks/usePaginationAsync';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
// import { IncomeByUser,  } from "../../../services/dashboard.service";
import { EditOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { Period } from '../../../../Common/dto/period.model';

export const CardIncomesByUser = () => {
  // const {
  //   period,
  //   startDate,
  //   endDate,
  //   endDateChecked,
  //   handleChangeEndDate,
  //   handleChangeEndDateChecked,
  //   handleChangePeriod,
  //   handleChangeStartDate,

  // } = useDateFilter(Period.TODAY);

  // const {
  //  page, nextPage, prevPage, rowsPerPage,

  //   handleChangePage,
  //   handleChangeRowsPerPage,

  //    } = usePaginationAsync();

  // const { data, refetch, isPending, isFetching } = useQuery<IncomeByUser[]>(['best-selling-products', { period, startDate, endDate, offset: page, limit: rowsPerPage }], () => {
  //   return getIncomesByUser({  startDate, endDate: endDateChecked ? endDate : null, offset: page, limit: rowsPerPage })
  // })

  // useEffect(() => {
  //   refetch();
  // }, [ endDateChecked])

  return (
    <Card>
      {/* 
      <CardHeader
        title='Ingresos por usuario'
       />

      <Stack
        direction={{ xs: 'column' }}
        spacing={2}

        p={2}

      >
        <FormControl>
          <InputLabel id="select-period-label">Periodo</InputLabel>
          <Select
            labelId="select-period-label"

            value={period}
            onChange={handleChangePeriod}
            fullWidth
            label="Periodo"
          >
            <MenuItem value='today'>Hoy</MenuItem>
            <MenuItem value='week'>Esta semana</MenuItem>
            <MenuItem value='month'>Este mes</MenuItem>
            <MenuItem value='year'>Este Año</MenuItem>
            <MenuItem value='custom'>Personalizado</MenuItem>


          </Select>
        </FormControl>

        {

          period === 'custom' && <>
            <Stack direction='column'>

              <DesktopDatePicker
                label="Fecha de inicio"
                inputFormat="yyyy-MM-dd"
                value={startDate}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
                disableFuture
                maxDate={endDate ? endDate : undefined}

              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={endDateChecked}
                    onChange={handleChangeEndDateChecked}
                  />

                }
                label='Fecha de fin'
              />

              {



                startDate && endDateChecked &&

                <DesktopDatePicker
                  label="Fecha de fin"
                  inputFormat="yyyy-MM-dd"
                  value={endDate}
                  onChange={handleChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={startDate}
                  disableFuture

                />
              }


            </Stack>

          </>
        }


      </Stack>

      <Divider />


      <List>
        {

          isLoading || isFetching
            ? <Typography variant='h6' align='center' my={2}>
              <CircularProgress />
            </Typography>
            :
          data && 
          data.length === 0 
          ? <Typography variant='h6' align='center' my={2}>No hay datos</Typography>
          :
          data?.map((data, index) => (
            <ListItem>
              
              <ListItemText
                primary={data.user.person.firstName + ' ' + data.user.person.lastName}

                primaryTypographyProps={
                  {
                    variant: 'h5',
                  }
                }

                // secondaryTypographyProps={{
                //   color: 'green'
                // }}
              />
              <ListItemSecondaryAction>
              <Typography variant='h4'>${data.total}</Typography>
              </ListItemSecondaryAction>

            </ListItem>
          ))
        }

      </List>

     


      <CardActions
        sx={{
          px: 2,
          justifyContent: 'flex-end'
        }}
      >
        <Typography variant='h4' >
          Total: ${data?.reduce((acc, curr) => acc + curr.total, 0)}
          </Typography>
      </CardActions>

 */}
    </Card>
  );
};
