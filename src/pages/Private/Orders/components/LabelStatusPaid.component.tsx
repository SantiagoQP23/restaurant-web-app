import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { Label } from '../../../../components/ui';
import { Paid, Pending } from '@mui/icons-material';

interface Props {
  isPaid: boolean;
  onlyIcon?: boolean;
}

export const LabelStatusPaid: FC<Props> = ({ isPaid, onlyIcon = false }) => {
  return (
    <>
      <Typography variant='h4' display='flex' alignItems='center'>
        <Label color={isPaid ? 'success' : 'warning'}>
          <Box mr={onlyIcon ? 0 : 1}>
            {isPaid ? <Paid fontSize='small' /> : <Paid fontSize='small' />}
          </Box>
          {!onlyIcon && (isPaid ? 'Pagado' : 'Por pagar')}
        </Label>
      </Typography>
    </>
  );
};
