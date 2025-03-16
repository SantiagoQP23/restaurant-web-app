import { createContext, FC, useState } from 'react';
import { Holiday } from '../models/holiday.model';

interface ISimulationContext {
  loadHolidays: (holidays: Holiday[]) => void;
  addHoliday: (holiday: Holiday) => void;
  removeHoliday: (holidayId: string) => void;
  updateHoliday: (holiday: Holiday) => void;

  holidays: Holiday[];
}

interface Props {
  children: React.ReactNode;
}

export const SimulationContext = createContext({} as ISimulationContext);

export const SimulationProvider: FC<Props> = ({ children }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const loadHolidays = (holidays: Holiday[]) => {
    sortAndSetHolidays(holidays);
  };

  const addHoliday = (holiday: Holiday) => {
    sortAndSetHolidays([...holidays, holiday]);
  };

  const removeHoliday = (holidayId: string) => {
    const newHolidays = holidays.filter((holiday) => holiday.id !== holidayId);

    sortAndSetHolidays(newHolidays);
  };

  const updateHoliday = (holidayToUpdate: Holiday) => {
    const newHolidays = holidays.map((holiday) => {
      if (holiday.id === holidayToUpdate.id) {
        return holidayToUpdate;
      }

      return holiday;
    });

    sortAndSetHolidays(newHolidays);
  };

  const sortAndSetHolidays = (holidays: Holiday[]) => {
    const feriadosOrdenados = holidays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log({ feriadosOrdenados });

    setHolidays(feriadosOrdenados);
  };

  return (
    <SimulationContext.Provider
      value={{
        loadHolidays,
        addHoliday,
        removeHoliday,
        updateHoliday,

        holidays
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
