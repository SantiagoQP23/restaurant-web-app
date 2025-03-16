import { useState } from 'react';
import { Period } from '../pages/Private/Common/dto/period.model';
import { SelectChangeEvent } from '@mui/material';

export const usePaginationAsync = () => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const resetPage = () => {
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    resetPage();
  };

  return {
    // Getters
    page,
    rowsPerPage,

    // Setters
    nextPage,
    prevPage,
    resetPage,

    // Handlers
    handleChangePage,
    handleChangeRowsPerPage
  };
};
