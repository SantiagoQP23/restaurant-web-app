import { FC } from 'react';
import { Footfall } from '../../../models/day.interface';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Line } from 'react-chartjs-2';

interface Props {
  footfalls: Footfall[];
}

export const ChartSimulatedFootfall: FC<Props> = ({ footfalls }) => {
  const dataFootfall = {
    labels: footfalls?.map((footfall) => footfall.date),
    datasets: [
      {
        data: footfalls?.map((footfall) => footfall.quantity),
        label: 'Asistencia',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5
      }
    ]
  };

  return (
    <>
      <Card>
        <CardHeader title={'Asistencia del año '} />
        <CardContent>
          <Line data={dataFootfall}></Line>
        </CardContent>
      </Card>
    </>
  );
};
