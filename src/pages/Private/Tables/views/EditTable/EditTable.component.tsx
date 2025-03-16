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
          enqueueSnackbar('Mesa añadida', { variant: 'success' });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Error al crear', { variant: 'error' });
        });
    }
  };

  const handleCancel = () => {
    dispatch(setActiveTable(null));
    navigate(-1);
  };

  return (
    <>
      <TitlePage title={`${activeTable ? 'Editar' : 'Crear'} mesa`} />

      <Container maxWidth='xs'>
        <Grid container display='flex' justifyContent='space-between'>
          <Grid item display='flex' justifyContent='left' alignItems='center'>
            <Button onClick={handleCancel}>
              <ArrowBack />
            </Button>
            <Typography variant='h5'>
              {activeTable ? `Mesa ${activeTable.name}` : 'Añadir mesa'}{' '}
            </Typography>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={1}
                display='flex'
                justifyContent='center'
              >
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
                    helperText={
                      <Typography color='red'>
                        {errors.name?.message}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin='dense'
                    label='Descripción'
                    type='text'
                    fullWidth
                    {...register('description', {})}
                    error={!!errors.description}
                    helperText={
                      <Typography color='red'>
                        {errors.description?.message}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoFocus
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
                    helperText={
                      <Typography color='red'>
                        {errors.chairs?.message}
                      </Typography>
                    }
                  />
                </Grid>

                <LoadingButton
                  variant='outlined'
                  type='submit'
                  loading={loading}
                >
                  {activeTable ? `Editar` : 'Crear'}
                </LoadingButton>

                {loading && (
                  <Button
                    color='error'
                    variant='outlined'
                    onClick={() => cancelEndpoint()}
                  >
                    Cancelar
                  </Button>
                )}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
