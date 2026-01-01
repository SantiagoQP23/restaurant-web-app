import { loadAbort } from '../../../../helpers/load-abort-axios.helper';
import restauranteApi from '../../../../api/restauranteApi';
import { Holiday } from '../models/holiday.model';
import { SubjectHoliday } from '../helpers/subjects-simulation.helper';
// import { CreateHolidayDto } from '../views/FootfallSimulation/dto/create-holiday.dto';
// import { UpdateHolidayDto } from '../views/FootfallSimulation/dto/update-holiday.dto';
// import { UpdateTypeHolidayDto } from '../views/FootfallSimulation/dto/update-type-holiday.dto';
import { TypeHoliday } from '../models/type-holiday.model';

// Temporary type until FootfallSimulation DTOs are created
type CreateHolidayDto = any;

export const statusModalHoliday = new SubjectHoliday();
export const statusModalDeleteHoliday = new SubjectHoliday();

// export const updateTypeHoliday = async (
//   holiday: UpdateTypeHolidayDto
// ): Promise<TypeHoliday> => {
//   const { data } = await restauranteApi.patch<TypeHoliday>(
//     `type-holiday/${holiday.id}`,
//     holiday
//   );
//
//   return data;
// };

export const getTypesHolidays = async (): Promise<TypeHoliday[]> => {
  const { data } = await restauranteApi.get<TypeHoliday[]>(`type-holiday`);

  return data;
};

export const deleteHoliday = async (holidayId: string): Promise<Holiday> => {
  const { data } = await restauranteApi.delete<Holiday>(`holiday/${holidayId}`);

  return data;
};

// export const getTypesHolidays = () => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<TypeHoliday[]>(`type-holiday`,
//       { signal: controller.signal }),
//     controller
//   }
// }

export const getHolidays = async (): Promise<Holiday[]> => {
  const { data } = await restauranteApi.get<Holiday[]>(`holiday`);

  return data;
};

// export const getHolidays = () => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<Holiday[]>(`holiday/simulation`,
//       { signal: controller.signal }),
//     controller
//   }

// }
export const getHolidaysPrediction = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<Holiday[]>(`holiday/prediction`, {
      signal: controller.signal
    }),
    controller
  };
};

export const getHolidayById = (id: string) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<Holiday>(`holiday/${id}`, {
      signal: controller.signal
    }),
    controller
  };
};

export const createHoliday = async (
  holiday: CreateHolidayDto
): Promise<Holiday> => {
  const { data } = await restauranteApi.post<Holiday>(`holiday`, holiday);

  return data;
};

// export const createHoliday = (holiday: CreateHolidayDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.post<Holiday>(`holiday`,
//       holiday,
//       { signal: controller.signal }),
//     controller
//   }

// }

// export const updateHoliday = async (
//   holidayId: string,
//   holiday: UpdateHolidayDto
// ): Promise<Holiday> => {
//   const { data } = await restauranteApi.patch<Holiday>(
//     `holiday/${holidayId}`,
//     holiday
//   );
//
//   return data;
// };

// export const updateHoliday = (holidayId: string, holiday: UpdateHolidayDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<Holiday>(`holiday/${holidayId}`,
//       holiday,
//       { signal: controller.signal }),
//     controller
//   }

// }

// export const updateTypeHoliday = (holidayId: string, holiday: UpdateTypeHolidayDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<Holiday>(`type-holiday/${holidayId}`,
//       holiday,
//       { signal: controller.signal }),
//     controller
//   }

// }
