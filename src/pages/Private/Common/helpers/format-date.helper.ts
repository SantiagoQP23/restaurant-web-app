import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (newValue: Date | string) => {
  const date = format(new Date(newValue), 'yyyy-MM-dd', { locale: es });

  return date;
};

export const formatDateToPicker = (newValue: Date | string) => {
  // Añadir un día
  const date = addDays(new Date(newValue), 1);

  return date;
};
