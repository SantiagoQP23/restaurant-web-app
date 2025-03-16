import { useState } from 'react';
import { TypeHoliday } from '../../../models/type-holiday.model';

export const ModalTypeHoliday = () => {
  const [open, setOpen] = useState(false);

  const [typeHoliday, setTypeHoliday] = useState<TypeHoliday>();

  return <div>ModalTypeHoliday</div>;
};
