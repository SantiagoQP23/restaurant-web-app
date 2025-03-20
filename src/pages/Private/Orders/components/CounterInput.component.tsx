import { FC, useEffect } from 'react';

import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { Stack, IconButton, InputBase } from '@mui/material';
import { useCounter } from '../hooks';

interface Props {
  min?: number;
  value: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  fullWidth?: boolean;
}

export const CounterInput: FC<Props> = ({
  value,
  min = 1,
  max,
  step,
  onChange,
  fullWidth = false
}) => {
  const {
    state: counter,
    increment,
    decrement,
    setCounter
  } = useCounter(value, step, max, min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;

    if (Number.isNaN(value)) setCounter(0);
    else setCounter(value);

    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    onChange && onChange(counter);
  }, [counter]);

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        width={fullWidth ? '100%' : 110}
        justifyContent='center'
      >
        <IconButton size='small' onClick={decrement}>
          <RemoveCircleOutline />
        </IconButton>

        <InputBase
          value={counter}
          onChange={handleChange}
          type='number'
          size='small'
          inputProps={{
            min: 0.5,
            step: step || 0.5
          }}
          sx={{
            input: { textAlign: 'center', WebkitAppearance: 'none' }
          }}
        />

        <IconButton size='small' onClick={increment}>
          <AddCircleOutline />
        </IconButton>
      </Stack>
    </>
  );
};
