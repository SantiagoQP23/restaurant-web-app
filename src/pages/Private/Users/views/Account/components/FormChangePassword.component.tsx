import {
  Card,
  CardContent,
  TextField,
  Container,
  FormControl,
  Alert,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  ChangePassword,
  ChangePasswordDto
} from '../../../dto/change-password.dto';
import { useChangePasswordUser } from '../../../hooks/useUsers';
import { LoadingButton } from '@mui/lab';

export const FormChangePassword = () => {
  const { isPending, mutateAsync } = useChangePasswordUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ChangePassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // const [isSamePassword, setIsSamePassword] = useState(true);

  const onSubmit = (form: ChangePassword) => {
    if (form.newPassword !== form.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      // setIsSamePassword(false);

      return;
    }

    const { confirmPassword, ...rest } = form;

    const data: ChangePasswordDto = rest;

    mutateAsync(data).then(() => {
      reset();
    });
  };

  const validateSamePassword = (): boolean => {
    if (watch('confirmPassword').length > 0)
      return watch('confirmPassword') === watch('newPassword');

    return true;
  };

  const isSamePassword = validateSamePassword();

  return (
    <>
      <Container maxWidth='xs'>
        <Card>
          <CardContent>
            <FormControl
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              fullWidth
            >
              <Stack spacing={2}>
                <TextField
                  label='Contraseña actual'
                  type='password'
                  fullWidth
                  {...register('currentPassword', {
                    required: 'Este campo es requerido'
                  })}
                />
                <TextField
                  label='Nueva contraseña'
                  type='password'
                  fullWidth
                  {...register('newPassword', {
                    required: 'Este campo es requerido',
                    minLength: {
                      value: 6,
                      message: 'Minimo 6 caracteres'
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                      message:
                        'Minimo 6 caracteres, al menos una letra mayúscula, una letra minúscula y un número'
                    }
                  })}
                  helperText={
                    errors.newPassword?.message ||
                    'Minimo 6 caracteres, al menos una letra mayúscula, una letra minúscula y un número'
                  }
                  error={!!errors.newPassword}
                />

                <TextField
                  label='Confirmar contraseña'
                  type='password'
                  fullWidth
                  {...register('confirmPassword', {
                    required: 'Este campo es requerido'
                  })}
                  helperText={errors.confirmPassword?.message}
                  error={!!errors.confirmPassword}
                />

                {!isSamePassword && (
                  <Alert severity='error'>Las contraseñas no coinciden</Alert>
                )}

                <LoadingButton
                  variant='contained'
                  color='primary'
                  type='submit'
                  loading={isPending}
                  disabled={!isSamePassword}
                >
                  Cambiar contraseña
                </LoadingButton>
              </Stack>
            </FormControl>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
