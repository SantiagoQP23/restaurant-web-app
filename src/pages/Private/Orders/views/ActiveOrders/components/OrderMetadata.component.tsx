import { FC } from 'react';
import {
  Grid,
  CardHeader,
  Box,
  alpha,
  useTheme,
  Stack,
  Typography
} from '@mui/material';
import { PeopleOutlined, PersonOutlined, Notes } from '@mui/icons-material';
import { Order } from '../../../../../../models';

interface Props {
  order: Order;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
}

/**
 * Enhanced metadata section with better visual hierarchy
 */
export const OrderMetadata: FC<Props> = ({ order, color }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1.5} px={2} py={1}>
      {/* People Count */}
      <Grid item xs={6}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <PeopleOutlined
            sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
          />
          <Stack spacing={0}>
            <Typography variant='caption' color='text.secondary'>
              Personas
            </Typography>
            <Typography variant='body1' fontWeight={600}>
              {order.people}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      {/* Waiter Info */}
      <Grid item xs={12}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <PersonOutlined
            sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
          />
          <Stack spacing={0}>
            <Typography variant='caption' color='text.secondary'>
              Mesero
            </Typography>
            <Typography variant='body1' fontWeight={500}>
              {order.user.person.firstName} {order.user.person.lastName}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      {/* Notes (if exists) */}
      {order.notes && (
        <Grid item xs={12}>
          <Stack direction='row' spacing={1} alignItems='flex-start'>
            <Notes
              sx={{
                color: theme.palette.text.secondary,
                fontSize: 20,
                mt: 0.25
              }}
            />
            <Stack spacing={0}>
              <Typography variant='caption' color='text.secondary'>
                Notas
              </Typography>
              <Typography
                variant='body2'
                color='text.primary'
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {order.notes}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};
