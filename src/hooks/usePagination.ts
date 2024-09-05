import { useEffect, useState } from 'react';

export const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const maxPage = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length, rowsPerPage]);

  function currentData() {
    const begin = (currentPage - 1) * rowsPerPage;
    const end = begin + rowsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  function handleRowsPerPage(number) {
    setRowsPerPage(number);
    setCurrentPage(1); // Reset to first page to avoid confusion on data display
  }

  return {
    next,
    prev,
    jump,
    rowsPerPage,
    handleRowsPerPage,
    currentData: currentData(),
    currentPage,
    maxPage,
  };
};
