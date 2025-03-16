import { useState, useEffect } from 'react';

export const useCounter = (
  initialState = 1,
  step = 1,
  max?: number,
  min: number = 0
) => {
  const [state, setCounter] = useState(initialState);

  const increment = () => {
    setCounter(state != max ? state + step : state);
  };

  const decrement = () => {
    const value = state - step;

    if (value >= min) {
      setCounter(state > 0 && state != min ? value : state);
    }
  };

  useEffect(() => {
    setCounter(initialState);
  }, [initialState]);

  return {
    state,
    increment,
    decrement,
    setCounter
  };
};
