'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

import { useWidth } from '@/hooks';

export const CustomPagination = ({
  currentPage,
  maxPage,
  jump,
  prev,
  next,
}) => {
  const width = useWidth();
  const isMobile = width < 640;

  if (maxPage <= 1) {
    return (
      <Pagination className="mt-5 flex items-center justify-between">
        <PaginationPrevious onClick={prev} className="cursor-pointer" />
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationLink size={isMobile ? 'iconSm' : 'icon'} isActive>
              {1}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
        <PaginationNext onClick={next} className="cursor-pointer" />
      </Pagination>
    );
  }

  return (
    <Pagination className="mt-5 flex items-center justify-between">
      <PaginationPrevious onClick={prev} className="cursor-pointer" />
      <PaginationContent>
        <PaginationItem onClick={() => jump(1)} className="cursor-pointer">
          <PaginationLink
            size={isMobile ? 'iconSm' : 'icon'}
            isActive={1 === currentPage}
          >
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
            <PaginationLink size={isMobile ? 'iconSm' : 'icon'} isActive>
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
          <PaginationLink
            size={isMobile ? 'iconSm' : 'icon'}
            isActive={maxPage === currentPage}
          >
            {maxPage}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
      <PaginationNext onClick={next} className="cursor-pointer" />
    </Pagination>
  );
};
