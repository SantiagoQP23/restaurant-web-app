import { Typography } from '@mui/material';
import { Label } from '../../../components/ui';
import { FC } from 'react';

interface Props {
  status: boolean;
}

export const LabelStatus: FC<Props> = ({ status }) => {
  return (
    <Label color={status ? 'success' : 'error'}>
      <Typography fontWeight='bold'>
        {status ? 'Activo' : 'Inactivo'}
      </Typography>
    </Label>
  );
};
