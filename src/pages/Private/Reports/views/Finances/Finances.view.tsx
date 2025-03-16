import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell
} from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { Bar } from 'react-chartjs-2';
import { DatePicker } from '@mui/x-date-pickers';
import { DailyFinances } from './components/DailyFinances.component';
import { Label } from '../../../../../components/ui';
import { Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { MonthlyFinances } from './components/MonthlyFinances.component';

enum TabPanel {
  RESUMEN_ANUAL = 0,
  RESUMEN_MENSUAL = 1
}

export const Finances = () => {
  const [tab, setTab] = useState(TabPanel.RESUMEN_ANUAL);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabPanel) => {
    setTab(newValue);
  };

  return (
    <>
      <TitlePage title='Finanzas' />

      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab label='Resumen anual' value={TabPanel.RESUMEN_ANUAL} />
        <Tab label='Resumen mensual' value={TabPanel.RESUMEN_MENSUAL} />
      </Tabs>

      {tab === TabPanel.RESUMEN_ANUAL ? <MonthlyFinances /> : <DailyFinances />}
    </>
  );
};
