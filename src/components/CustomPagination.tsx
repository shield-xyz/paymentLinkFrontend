'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export const CustomPagination = ({
  currentPage,
  maxPage,
  jump,
  prev,
  next,
  isShort = false,
  withRowsPerPage = false,
  handleRowsPerPage,
  rowsPerPage,
}: {
  currentPage: number;
  maxPage: number;
  jump: (page: number) => void;
  prev: () => void;
  next: () => void;
  isShort?: boolean;
  withRowsPerPage?: boolean;
  handleRowsPerPage?: (value: string) => void;
  rowsPerPage?: number;
}) => {
  if (maxPage <= 1) {
    return (
      <Pagination className="mt-5 flex items-center justify-between">
        <PaginationPrevious
          isShort={isShort}
          onClick={prev}
          className="cursor-pointer"
        />
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationLink size="icon" isActive>
              {1}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
        <PaginationNext
          isShort={isShort}
          onClick={next}
          className="cursor-pointer"
        />
      </Pagination>
    );
  }

  return (
    <div className="mt-5 flex items-center gap-2">
      {withRowsPerPage && (
        <Select onValueChange={handleRowsPerPage} value={String(rowsPerPage)}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'5'}>5</SelectItem>
            <SelectItem value={'10'}>10</SelectItem>
            <SelectItem value={'20'}>20</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Pagination className="flex items-center justify-between">
        <PaginationPrevious
          isShort={isShort}
          onClick={prev}
          className="cursor-pointer"
        />
        <PaginationContent>
          <PaginationItem onClick={() => jump(1)} className="cursor-pointer">
            <PaginationLink size="icon" isActive={1 === currentPage}>
              1
            </PaginationLink>
          </PaginationItem>
          {currentPage > 3 && (
            <PaginationItem className="hidden lg:flex">
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage > 2 && (
            <PaginationItem
              onClick={() => jump(currentPage - 1)}
              className="cursor-pointer"
            >
              <PaginationLink>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage !== 1 && currentPage !== maxPage && (
            <PaginationItem
              onClick={() => jump(currentPage)}
              className="cursor-pointer"
            >
              <PaginationLink size="icon" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage < maxPage - 1 && (
            <PaginationItem
              onClick={() => jump(currentPage + 1)}
              className="cursor-pointer"
            >
              <PaginationLink>{currentPage + 1}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage < maxPage - 2 && (
            <PaginationItem className="hidden lg:flex">
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem
            onClick={() => jump(maxPage)}
            className="cursor-pointer"
          >
            <PaginationLink size="icon" isActive={maxPage === currentPage}>
              {maxPage}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
        <PaginationNext
          isShort={isShort}
          onClick={next}
          className="cursor-pointer"
        />
      </Pagination>
    </div>
  );
};
