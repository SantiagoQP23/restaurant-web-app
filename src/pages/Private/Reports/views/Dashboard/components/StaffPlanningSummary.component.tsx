import { Groups } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  CardActions
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

export const StaffPlanningSummary = () => {
  return (
    <>
      <Card>
        <CardHeader
          avatar={<Groups color='info' sx={{ fontSize: 40 }} />}
          title={
            <Typography variant='h4'>Planificación del personal</Typography>
          }
        />

        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            disableRipple
            to='staff-planning'
            component={RouterLink}
            variant='text'
          >
            Ver más
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
