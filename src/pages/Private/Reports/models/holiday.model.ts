import { TypeHoliday } from './type-holiday.model';

export interface Holiday {
  id: string;
  date: string;
  typeHoliday: TypeHoliday;
  isActive: boolean;
}
