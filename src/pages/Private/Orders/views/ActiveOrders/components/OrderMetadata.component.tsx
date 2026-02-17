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
    <Stack spacing={1.5} px={2} pb={1}>
      {/* People Count */}
      {/* <Box> */}
      {/*   <Grid container direction='row' spacing={1} alignItems='center'> */}
      {/*     <Grid item xs={3} display='flex' alignItems='center' gap={0.5}> */}
      {/*       <PeopleOutlined */}
      {/*         sx={{ color: theme.palette.text.secondary, fontSize: 20 }} */}
      {/*       /> */}
      {/*       <Typography variant='caption' color='text.secondary'> */}
      {/*         Personas */}
      {/*       </Typography> */}
      {/*     </Grid> */}
      {/*     <Grid item xs={9}> */}
      {/*       <Typography variant='body1' fontWeight={600}> */}
      {/*         {order.people} */}
      {/*       </Typography> */}
      {/*     </Grid> */}
      {/*   </Grid> */}
      {/* </Box> */}

      {/* Waiter Info */}
      <Box>
        <Grid container direction='row' spacing={1} alignItems='center'>
          <Grid item xs={3} display='flex' alignItems='center' gap={0.5}>
            <PersonOutlined
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant='caption' color='text.secondary'>
              Mesero
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant='body1' fontWeight={500}>
              {order.user.person.firstName} {order.user.person.lastName}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Notes (if exists) */}
      {order.notes && (
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
      )}
    </Stack>
  );
};
