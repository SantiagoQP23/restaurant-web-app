import { Add } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export const AddInvoice = () => {
  const array = [1, 2, 3];

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction='column' spacing={2}>
            {
              // Header
            }
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h4' color='secondary.main'>
                    Factura
                  </Typography>
                </Box>
                <Typography variant='h5'> Restaurante Doña Yoli</Typography>
                <Typography variant='h5'> Av. 1 de Mayo # 1-23</Typography>

                <Typography variant='h5'> Tel: 123456789</Typography>
              </Box>

              <Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h4' color='secondary.main'>
                    {' '}
                    Cliente
                  </Typography>
                  <IconButton size='small' color='secondary'>
                    <Add />
                  </IconButton>
                </Box>
                <Typography variant='h5'>Santiago Quirumbay</Typography>
                <Typography variant='h5'> Av. 1 de Mayo # 1-23</Typography>

                <Typography variant='h5'> Tel: 123456789</Typography>
              </Box>
            </Stack>

            {
              // Table
            }
            <Stack direction='row'>
              <DatePicker
                value={new Date()}
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} size='small' />}
                label='Fecha'
              />
            </Stack>

            <Stack spacing={1} divider={<Divider />}>
              {array.map((value) => (
                <>
                  <Grid container key={value}>
                    <Grid item xs={12} sm={3} key={value}>
                      <TextField
                        fullWidth
                        size='small'
                        label='Producto'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size='small'
                        label='Descripción'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size='small'
                        label='Cantidad'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size='small'
                        label='Precio'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size='small'
                        label='Total'
                        variant='outlined'
                        disabled
                      />
                    </Grid>
                  </Grid>
                </>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
