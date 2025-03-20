import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { Typography, Stack } from '@mui/material';

export const Clock = () => {
  const [date, setDate] = useState(new Date());

  const { lastUpdatedOrders } = useSelector(selectOrders);

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <Stack direction='row' spacing={2} pb={1}>
        <Stack>
          <Typography variant='caption'>Fecha </Typography>
          <Typography variant='body1'>
            {format(date, 'eeee dd MMMM yyyy', { locale: es })}
          </Typography>
        </Stack>

        <Stack>
          <Typography variant='caption'>Ult. actualización </Typography>
          <Typography variant='body1'>
            {'Hace ' +
              formatDistance(new Date(lastUpdatedOrders), new Date(), {
                locale: es
              })}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
