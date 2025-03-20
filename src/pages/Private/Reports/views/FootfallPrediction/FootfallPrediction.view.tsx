import {
  useState,
  useRef,
  RefObject,
  FC,
  ReactElement,
  useContext
} from 'react';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { IDay, Footfall } from '../../models/day.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  tabsClasses,
  Button,
  Divider,
  Box,
  Stack,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material';
import { Tabs, Tab } from '@mui/material/';
import { Line } from 'react-chartjs-2';
import { addDays, format, isFuture, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowBack, Settings, Update, Print } from '@mui/icons-material';
import { Day } from '../../components/Day.component';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useReactToPrint } from 'react-to-print';
import { PdfFootfallPrediction } from './pdf/PdfFootfallPrediction.component';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import {
  getHolidays,
  getHolidaysPrediction
} from '../../services/holidays.service';
import { Holiday } from '../../models/holiday.model';
import { SimulationContext } from '../../context/SimulationContext';
import { TitlePage } from '../../../components/TitlePage.component';
import { useQuery } from '@tanstack/react-query';
import { getPredictionFootfall } from '../../services/footfall.service';
import { ComparisonFootfall } from './components/ComparisonFootfall.component';
import {
  useForecastFootfall,
  useUpdateFootfallPrediction
} from '../../hooks/useFootfall';
import { generatePredictionReport } from '../../helpers/pdf-prediction-report.helper';
import { Chart as ChartJS } from 'chart.js';
import html2canvas from 'html2canvas';

// interface PdfAffluencePredictionType {
//   print: () => void;
//   component: ReactElement;
// }

export const FootfallPrediction = () => {
  const { isLoading, data } = useForecastFootfall();

  const chartRef = useRef<ChartJS>(null);

  const { refetch, isFetching } = useUpdateFootfallPrediction();

  const navigate = useNavigate();

  const handleUpdatePrediction = () => {
    refetch();
  };

  const dataChart = {
    labels: data?.map((day) =>
      format(new Date(day.date), 'dd/MM/yyyy', { locale: es })
    ),
    datasets: [
      {
        label: 'Afluencia',
        data: data?.map((day) => Number(day.quantity)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handlePrint = async () => {
    let urlImage = '';

    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current.canvas);

      urlImage = canvas.toDataURL('image/png');
    }

    const pdf = await generatePredictionReport(data || [], urlImage);

    pdf.open();
  };

  return (
    <>
      <TitlePage
        title='Predicción de afluencia'
        action={
          <Stack direction='row' spacing={2}>
            <LoadingButton
              // loading={loading}
              variant='outlined'
              startIcon={<Settings />}
              onClick={() => navigate('simulation')}
              size='small'
            >
              Simulación
            </LoadingButton>
            <Button variant='outlined' onClick={handlePrint} size='small'>
              <Print />
            </Button>
            <LoadingButton
              variant='contained'
              loading={isFetching}
              onClick={handleUpdatePrediction}
              // loading={loadingPrediction}
              // onClick={submitUpdatePrediction}
              startIcon={<Update />}
              size='small'
            >
              Actualizar
            </LoadingButton>

            {/* {
              days.length > 0 &&
              <PDFDownloadLink
                document={<PdfFootfallPrediction days={days.filter((day) => isFuture(addDays(new Date(day.date), 2)))} />}
                fileName="affluence-prediction.pdf"

              >
                <Button
                  variant='outlined'
                >
                  Exportar a PDF
                </Button>

              </PDFDownloadLink>} */}
          </Stack>
        }
      />

      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={4}>
          <Day />
        </Grid> */}

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='Predicción de afluencia'></CardHeader>
            <CardContent>
              {data && (
                <Line data={dataChart} options={options} ref={chartRef} />
              )}
              {/* <Line data={dataPrediction} ></Line> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Predicción de afluencia' />

            <List
              sx={{
                maxHeight: 420,
                overflowX: 'auto',
                bgcolor: 'background.paper'
              }}
            >
              {data?.map((day) => (
                <>
                  <ListItem>
                    <ListItemText
                      primary={format(new Date(day.date), 'eeee dd/MM/yyyy', {
                        locale: es
                      })}
                    />

                    <ListItemSecondaryAction>
                      <Typography variant='h6'>{day.quantity}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </>
              ))}
            </List>
          </Card>

          {/* <Card>
            <CardHeader title={days.length > 0 && `Comparación de Afluencia de ${days[0].date} hasta ${days[days.length - 1].date} `}></CardHeader>
            <CardContent>

              <Line data={data} ></Line>

            </CardContent>
          </Card> */}
        </Grid>

        <Grid item xs={12} md={4}>
          {/* <HolidaysRules /> */}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ComparisonFootfall />
        </Grid>
      </Grid>

      {/* <ModalHoliday /> */}
    </>
  );
};
