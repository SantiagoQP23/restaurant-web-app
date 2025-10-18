import { Add, ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Button,
  Typography,
  TextField,
  Container,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFetchAndLoad } from '../../../../../hooks';
import { ICreateTable } from '../../../../../models';
import {
  addTable,
  selectTables,
  setActiveTable,
  updateTable
} from '../../../../../redux/slices/tables';
import {
  createTable,
  updateTable as updateTableS
} from '../../services/tables.service';

import { useForm } from 'react-hook-form';
import { TitlePage } from '../../../components/TitlePage.component';
import { useUpdateTable } from '../../hooks/useTables';
import { UpdateTableDto } from '../../dto/table.dto';

const initialTable: ICreateTable = {
  name: '',
  description: '',
  chairs: 4
};

export const EditTable = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { loading, callEndpoint, cancelEndpoint } = useFetchAndLoad();

  const updateTableMutation = useUpdateTable();

  const { activeTable } = useSelector(selectTables);

  let table: ICreateTable;

  if (activeTable) {
    const { id, isAvailable, ...restTable } = activeTable!;
    table = restTable;
  } else {
    table = initialTable;
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateTable>({
    defaultValues: table
  });

  const onSubmit = async (form: ICreateTable) => {
    if (activeTable) {
      const data: UpdateTableDto = {
        id: activeTable.id,
        isAvailable: activeTable.isAvailable,
        name: form.name,
        description: form.description,
        chairs: form.chairs
      };

      updateTableMutation.mutate(data);
    } else {
      await callEndpoint(createTable(form))
        .then((resp) => {
          const { data } = resp;
          dispatch(addTable(data));
          dispatch(setActiveTable(data));
          enqueueSnackbar('Mesa añadida', { variant: 'success' });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Error al crear', { variant: 'error' });
        });
    }
  };

  return (
    <>
      <TitlePage title={`${activeTable ? 'Editar' : 'Crear'} mesa`} />

      <Card sx={{ maxWidth: 350, margin: '0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} display='flex' justifyContent='center'>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin='dense'
                  label='Nombre de la mesa'
                  type='text'
                  fullWidth
                  {...register('name', {
                    required: 'Este campo es requerido'
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin='dense'
                  label='Descripción'
                  type='text'
                  fullWidth
                  {...register('description', {})}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin='dense'
                  label='Asientos'
                  type='number'
                  fullWidth
                  {...register('chairs', {
                    required: 'Este campo es requerido',
                    maxLength: { value: 2, message: ' ' },
                    valueAsNumber: true
                  })}
                  error={!!errors.chairs}
                  helperText={errors.chairs?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction='row' spacing={2} justifyContent='right'>
                  {loading && (
                    <Button
                      color='error'
                      onClick={() => cancelEndpoint()}
                      variant='text'
                    >
                      Cancelar
                    </Button>
                  )}
                  <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={loading}
                  >
                    {activeTable ? `Editar` : 'Crear'}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
