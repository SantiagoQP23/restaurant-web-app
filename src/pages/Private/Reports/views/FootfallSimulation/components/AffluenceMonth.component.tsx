import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { FC } from 'react';
import { Typography } from '@mui/material/';

interface Props {
  affluence: number;
  month: string;
}

export const AffluenceMonth: FC<Props> = ({ month, affluence }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='body2'>{month}</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant='h5' component='h2'>
          {affluence}
        </Typography>
        <Typography variant='body2' component='p' color='gray'>
          Asistencia total
        </Typography>
      </CardContent>
    </Card>
  );
};
