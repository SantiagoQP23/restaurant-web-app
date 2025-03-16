import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { IDay } from '../../models/day.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAsync } from '../../../../../hooks/useAsync';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { Staff } from '../../models/staff.interface';
import { estimateStaff } from '../../helpers/estimate-staff.helper';
import { Bar } from 'react-chartjs-2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PdfStaffPlaning } from './PdfStaffPlaning.component';
import { TitlePage } from '../../../components/TitlePage.component';

export const StaffPlaning = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [days, setDays] = useState<IDay[]>([]);

  const [staffs, setStaffs] = useState<Staff[]>([]);

  const navigate = useNavigate();

  const getAffluenceCall = async () => {};

  const loadAffluenceState = (data: IDay[]) => {
    setDays(data);

    // setStaffs(data.map(day => {

    //   let affluenceDay: number = 0;

    //   const affluence = day.affluences.find(affluence => affluence.type === TypeAffluence["PREDICTED"]);

    //   if (affluence)
    //     affluenceDay = affluence.affluence;

    //   return estimateStaff(affluenceDay);

    // }))

    console.log(staffs);
  };

  const { enqueueSnackbar } = useSnackbar();

  const dataNextWeek = {
    labels: days.slice(10).map((day) => day.name + ' ' + day.date),
    datasets: [
      {
        label: 'Chefs',
        data: staffs.slice(10).map((staff) => staff.chefs),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Camareros',
        data: staffs.slice(10).map((staff) => staff.waiters),
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Cocineros',
        data: staffs.slice(10).map((staff) => staff.cooks),
        backgroundColor: 'rgba(75,192,200,0.2)'
      }
    ]
  };

  const dataThisWeek = {
    labels: days.slice(0, 10).map((day) => day.name + ' ' + day.date),
    datasets: [
      {
        label: 'Chefs',
        data: staffs.slice(0, 10).map((staff) => staff.chefs),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Camareros',
        data: staffs.slice(0, 10).map((staff) => staff.waiters),
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Cocineros',
        data: staffs.slice(0, 10).map((staff) => staff.cooks),
        backgroundColor: 'rgba(75,192,200,0.2)'
      }
    ]
  };

  return (
    <>
      <TitlePage title='Planificación del personal' />

      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pb: 2 }}
      >
        <Box>
          <Stack direction='row' spacing={2}>
            {/* <LoadingButton variant="contained" loading={loading} >
              Actualizar Planificación
            </LoadingButton> */}

            {
              days.length > 0 && staffs.length > 0 && <></>

              // <PDFDownloadLink
              //   document={<PdfStaffPlaning days={days} staffs={staffs} />}
              //   fileName="PlanificacionPersonal.pdf"
              // >
              //   <Button variant='outlined' >

              //     Exportar a PDF
              //   </Button>

              // </PDFDownloadLink>
            }
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={1}>
        <Grid
          container
          spacing={1}
          item
          xs={12}
          sx={{ display: 'flex', alignContent: 'start' }}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Planificación del personal esta semana' />
              <CardContent>
                <Bar data={dataThisWeek}></Bar>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title='Planificación del personal de la siguiente semana' />
              <CardContent>
                <Bar data={dataNextWeek}></Bar>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          spacing={1}
          sx={{ display: 'flex', alignContent: 'start' }}
        >
          {staffs.slice(0).map((staff, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card>
                <CardHeader title={days[index].name + ' ' + days[index].date} />
                <CardContent>
                  {/* <Typography variant="body1" align='center'>Asistencia: <b>{days[index].affluences.find(affluence => affluence.type === TypeAffluence["PREDICTED"])?.affluence}</b></Typography> */}

                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body1'>
                    Chefs: <b>{staff.chefs}</b>
                  </Typography>
                  <Typography variant='body1'>
                    Camareros: <b>{staff.waiters}</b>
                  </Typography>
                  <Typography variant='body1'>
                    Cocineros: <b>{staff.cooks}</b>
                  </Typography>

                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body1' align='center'>
                    Total: <b>{staff.total}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
