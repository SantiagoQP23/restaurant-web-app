import { useState, useEffect } from 'react';

export const usePagination = <T>(list: T[]) => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const paginatedList = list.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    page,
    rowsPerPage,
    nextPage,
    prevPage,
    resetPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedList
  };
};
