import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/';
import { GroupBy, Period } from '../../Common/dto/period.model';

export enum CustomGroupBy {
  PRODUCT = 'product',
  FECHA = 'fecha'
}

export const useFilterSoldProducts = (periodo: Period) => {
  const [period, setPeriod] = useState<Period>(periodo);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [groupBy, setGroupBy] = useState<GroupBy | null>(GroupBy.DAY);

  const [customGroupBy, setCustomGroupBy] = useState<CustomGroupBy>(
    CustomGroupBy.PRODUCT
  );

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [endDateChecked, setEndDateChecked] = useState(false);

  const handleChangeEndDateChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndDateChecked(event.target.checked);
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    const value = event.target.value as Period;

    if (value === Period.DAILY) {
      setGroupBy(GroupBy.DAY);
    } else if (value === Period.WEEKLY) {
      setGroupBy(GroupBy.WEEK);
    } else if (value === Period.MONTHLY) {
      setGroupBy(GroupBy.DAY);
    } else if (value === Period.YEARLY) {
      setGroupBy(GroupBy.YEAR);
    } else if (value === Period.CUSTOM) {
      setGroupBy(GroupBy.DAY);
    }

    setPeriod(event.target.value as Period);
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    setEndDate(newValue);
  };

  const handleChangeGroupBy = (value: GroupBy | null) => {
    setGroupBy(value);
  };

  const handleChangeCustomGroupBy = (value: CustomGroupBy) => {
    setCustomGroupBy(value);
  };

  return {
    // Getters
    period,
    startDate,
    endDate,
    endDateChecked,
    groupBy,
    customGroupBy,

    // Setters
    setPeriod,
    setStartDate,
    setEndDate,
    setEndDateChecked,

    // Handlers
    handleChangePeriod,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeEndDateChecked,
    handleChangeGroupBy,
    handleChangeCustomGroupBy
  };
};
