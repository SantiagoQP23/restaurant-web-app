import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  styled,
  LinearProgress,
  Tab,
  Tabs
} from '@mui/material';
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { ComparisonFootfallMonthly } from './ComparisonFootfallMonthly.component';
import { ComparisonFottfallDaily } from './ComparisonFottfallDaily.component';

export const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 6px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }`
);

enum TabPanel {
  RESUMEN_ANUAL = 0,
  RESUMEN_MENSUAL = 1
}

export const ComparisonFootfall = () => {
  const [tab, setTab] = useState(TabPanel.RESUMEN_ANUAL);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabPanel) => {
    setTab(newValue);
  };

  const predictedData = [100, 150, 200, 250]; // Datos de afluencia predecida
  const actualData = [90, 160, 190, 260]; // Datos de afluencia real

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'], // Etiquetas para cada punto de tiempo
    datasets: [
      {
        label: 'Afluencia Predecida',
        data: predictedData,
        borderColor: 'rgba(75, 192, 192, 1)', // Color de borde para la línea de afluencia predecida
        backgroundColor: 'rgba(75, 192, 192, 0.2)' // Color de fondo para el área debajo de la línea de afluencia predecida
      },
      {
        label: 'Afluencia Real',
        data: actualData,
        borderColor: 'rgba(192, 75, 75, 1)', // Color de borde para la línea de afluencia real
        backgroundColor: 'rgba(192, 75, 75, 0.2)' // Color de fondo para el área debajo de la línea de afluencia real
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

  const maeValue = 10; // Valor del MAE
  const mapeValue = 5; // Valor del MAPE

  const dataMa = {
    labels: ['MAE', 'MAPE'], // Etiquetas de las métricas
    datasets: [
      {
        data: [maeValue, mapeValue], // Valores del MAE y MAPE
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(192, 75, 75, 0.8)'] // Colores de las secciones
      }
    ]
  };

  return (
    <>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Comparación de afluencia Real vs Predicción
      </Typography>

      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab label='Resumen anual' value={TabPanel.RESUMEN_ANUAL} />
        <Tab label='Resumen mensual' value={TabPanel.RESUMEN_MENSUAL} />
      </Tabs>

      {tab === TabPanel.RESUMEN_ANUAL ? (
        <ComparisonFootfallMonthly />
      ) : (
        <ComparisonFottfallDaily />
      )}
    </>
  );
};
