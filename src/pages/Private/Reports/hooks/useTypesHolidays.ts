import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TypeHoliday } from '../models/type-holiday.model';
import {
  createHoliday,
  deleteHoliday,
  getTypesHolidays,
  updateHoliday
} from '../services/holidays.service';
import { useSnackbar } from 'notistack';
import { UpdateHolidayDto } from '../views/FootfallSimulation/dto/update-holiday.dto';
import { Holiday } from '../models/holiday.model';
import { CreateHolidayDto } from '../views/FootfallSimulation/dto/create-holiday.dto';

export const useTypesHolidays = () => {
  return useQuery<TypeHoliday[]>(['typesHolidays'], getTypesHolidays);
};

export const useUpdateTypeHoliday = (callback?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation<Holiday, unknown, UpdateHolidayDto>(
    (data) => updateHoliday(data.id, data),
    {
      onSuccess: async (data) => {
        console.log(data);
        enqueueSnackbar('Feriado actualizado', { variant: 'success' });
        await queryClient.cancelQueries(['holidays']);

        const previousHolidays = queryClient.getQueryData<Holiday[]>([
          'holidays'
        ]);

        if (previousHolidays) {
          queryClient.setQueryData(
            ['holidays'],
            previousHolidays.map((currentHoliday) => {
              if (currentHoliday.id === data!.id) {
                return data;
              }
              return currentHoliday;
            })
          );
        }

        callback && callback();

        return { previousHolidays };
      },
      onError: (error) => {
        console.log(error);
        enqueueSnackbar('Error al actualizar feriado', { variant: 'error' });
      }
    }
  );
};

export const useCreateTypeHoliday = (callback?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation<Holiday, unknown, CreateHolidayDto>(createHoliday, {
    onSuccess: async (data) => {
      enqueueSnackbar('Feriado creado', { variant: 'success' });

      await queryClient.cancelQueries(['holidays']);

      const previousHolidays = queryClient.getQueryData<Holiday[]>([
        'holidays'
      ]);

      if (previousHolidays) {
        queryClient.setQueryData(['holidays'], [...previousHolidays, data]);
      }

      callback && callback();

      return { previousHolidays };
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al crear feriado', { variant: 'error' });
    }
  });
};

export const useDeleteTypeHoliday = (callback?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation<Holiday, unknown, string>(deleteHoliday, {
    onSuccess: async (data) => {
      await queryClient.cancelQueries(['holidays']);

      const previousHolidays = queryClient.getQueryData<Holiday[]>([
        'holidays'
      ]);

      if (previousHolidays) {
        queryClient.setQueryData(
          ['holidays'],
          previousHolidays.filter(
            (currentHoliday) => currentHoliday.id !== data.id
          )
        );
      }

      callback && callback();

      return { previousHolidays };
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Error al eliminar feriado', { variant: 'error' });
    }
  });
};
