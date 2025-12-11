import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../redux';
import { Fingerprint, Mail, Phone } from '@mui/icons-material';
import { MyOrders } from './components/MyOrders.component';

enum TabStatus {
  MY_ORDERS = 'my-orders',
  INFORMATION = 'information'
}

export const Profile = () => {
  const { user } = useSelector(selectAuth);

  const [tab, setTab] = useState(TabStatus.MY_ORDERS);

  return (
    <>
      <TitlePage title='Perfil' />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h4' mt={5}>
                {user?.person.firstName} {user?.person.lastName}
              </Typography>
              {/* <Typography variant='subtitle1'>{user}</Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ my: 2 }}>
        <Tabs value={tab} onChange={(e, value) => setTab(value)}>
          <Tab value={TabStatus.MY_ORDERS} label='Mis pedidos' />
          <Tab value={TabStatus.INFORMATION} label='Información' />
        </Tabs>
      </Box>

      {tab === TabStatus.MY_ORDERS && (
        <>
          <MyOrders />
        </>
      )}

      {tab === TabStatus.INFORMATION && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant='h4' mb={1}>
                    Información
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          m: 0,
                          p: 0
                        }}
                      >
                        <Mail />
                      </ListItemIcon>

                      <ListItemText primary={user?.person.email} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>

                      <ListItemText primary={user?.person.numPhone} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Fingerprint />
                      </ListItemIcon>

                      <ListItemText
                        primary={user?.person.identification?.type}
                        secondary={user?.person.identification?.num}
                      />
                    </ListItem>
                  </List>

                  {/* <Typography variant='subtitle1'>Email</Typography>
              <Typography variant='h5'>{user?.person.email}</Typography>
              <Typography variant='subtitle1'>Teléfono</Typography>
              <Typography variant='h5'>{user?.person.numPhone}</Typography>
              <Typography variant='subtitle1'>Identificación</Typography>
              <Typography variant='h5'>{user?.person.identification.type}: {user?.person.identification.num}</Typography> */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
