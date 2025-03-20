import { People } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { useClients } from '../../../../Clients/hooks/useClients';

export const ClientsSummary = () => {
  const { clientsQuery } = useClients();

  return (
    <Card>
      <CardHeader
        title='Clientes'
        action={
          <Button
            variant='outlined'
            component={RouterLink}
            to='/clients'
            size='small'
          >
            Ver todo
          </Button>
        }
      />

      <CardContent
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}
      >
        <People />
        <Typography variant='h3'>{clientsQuery.data?.length}</Typography>
      </CardContent>
    </Card>
  );
};
