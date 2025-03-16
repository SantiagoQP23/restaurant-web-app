import { FC } from 'react';

import { Typography, Stack, Button, InputBase } from '@mui/material';

import { Pagination } from '@mui/material';
import { useModal } from '../../../../../../hooks';
import { useNewOrderStore } from '../../../store/newOrderStore';

export const PeopleCounter: FC = () => {
  const { setPeople, people } = useNewOrderStore();

  const handleChangePeople = (value: number) => {
    setPeople(value);
  };

  const { isOpen, handleOpen } = useModal();

  return (
    <>
      <Typography variant='subtitle1'>Personas</Typography>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Pagination
          count={5}
          hidePrevButton
          hideNextButton
          // variant='outlined'
          color='primary'
          page={people || 0}
          onChange={(e, value) => handleChangePeople(value)}
        />

        {!isOpen && people <= 5 && (
          <Button variant='outlined' size='small' onClick={handleOpen}>
            Otro
          </Button>
        )}

        {isOpen && (
          <InputBase
            value={people || ''}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (newValue >= 0) {
                handleChangePeople(newValue);
              }
            }}
            type='number'
            inputProps={{
              min: 0
            }}
            sx={{
              border: (theme) => `1px solid ${theme.colors.primary.main} `,
              borderRadius: '8px',
              padding: '0 8px',
              width: '80px'
            }}
            size='small'
          />
        )}

        {/* <CounterInput
          value={state.people || 1}
          onChange={handleChangePeople}
          min={1}

        /> */}
      </Stack>
    </>
  );
};
