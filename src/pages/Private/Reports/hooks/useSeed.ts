import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { executeSeed } from '../services/footfall.service';

export const useSeed = () => {
  return useQuery(['seed'], executeSeed, {
    enabled: false,
    onSuccess: () => {
      enqueueSnackbar('Simulación iniciada', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Error al iniciar la simulación', { variant: 'error' });
    }
  });
};
