import { ChangeEvent, FC } from 'react';

import {
  Typography,
  Paper,
  InputBase,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
  placeholder: string;
  loading?: boolean;
  value?: string;
  reset?: () => void;
}

export const InputSearch: FC<Props> = ({
  handleChange,
  search,
  placeholder,
  loading = false,
  value,
  reset
}) => {
  return (
    <>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'transparent',
          border: '1px solid #aaa'
        }}
      >
        <InputBase
          type='text'
          onChange={handleChange}
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'Buscar' }}
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          value={value}
        />

        {value && reset && value?.length > 0 && (
          <IconButton onClick={reset}>
            <Close />
          </IconButton>
        )}

        <IconButton
          type='button'
          sx={{ p: '10px' }}
          aria-label='search'
          onClick={search}
        >
          {loading ? <CircularProgress size='small' /> : <Search />}
        </IconButton>
      </Paper>
    </>
  );
};
