import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Period } from '../pages/Private/Common/dto/period.model';

export const useDateFilter = (periodo: Period) => {
  const [period, setPeriod] = useState<Period>(periodo);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [endDateChecked, setEndDateChecked] = useState(false);

  const handleChangeEndDateChecked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndDateChecked(event.target.checked);
  };

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as Period);
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    setEndDate(newValue);
  };

  return {
    // Getters
    period,
    startDate,
    endDate,
    endDateChecked,

    // Setters
    setPeriod,
    setStartDate,
    setEndDate,
    setEndDateChecked,

    // Handlers
    handleChangePeriod,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeEndDateChecked
  };
};
