import { Assessment, AssignmentInd } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  CardActions,
  CardActionArea
} from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';

export const SimulatorAffluenceSummary = () => {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={<Assessment color='primary' sx={{ fontSize: 40 }} />}
          title={<Typography variant='h4'>Simulador de afluencia</Typography>}
        />

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            disableRipple
            to='simulation'
            component={RouterLink}
            variant='text'
          >
            Ver más
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
