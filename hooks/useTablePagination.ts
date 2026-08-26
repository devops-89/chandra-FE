import {useState } from 'react';

export function useTablePagination(tableKey: string, defaultPage = 0, defaultLimit = 10) {
  const [page, setPageState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`${tableKey}_page`);
      return saved ? parseInt(saved, 10) : defaultPage;
    }
    return defaultPage;
  });

  const [rowsPerPage, setRowsPerPageState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`${tableKey}_limit`);
      return saved ? parseInt(saved, 10) : defaultLimit;
    }
    return defaultLimit;
  });

  const setPage = (newPage: number) => {
    setPageState(newPage);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`${tableKey}_page`, newPage.toString());
    }
  };

  const setRowsPerPage = (newLimit: number) => {
    setRowsPerPageState(newLimit);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`${tableKey}_limit`, newLimit.toString());
    }
  };

  return { page, setPage, rowsPerPage, setRowsPerPage };
}
