import { useCallback, useMemo, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export const defaultPagination: UsePaginationOptions = {
  defaultOffset: 0,
  defaultLimit: 10,
};

export interface UsePaginationOptions {
  defaultOffset?: number;
  defaultLimit?: number;
}

interface CommondtoPaging {
  limit?: number;
  offset?: number;
}

export interface UsePaginationReturn extends CommondtoPaging {
  page: number;
  rowsPerPage: number;
  setOffset: (newOffset: number) => void;
  setLimit: (newLimit: number) => void;
  onPageChange: (nextPage: CommondtoPaging) => void;
}

function usePagination(options: UsePaginationOptions = defaultPagination): UsePaginationReturn {
  const [offset, setOffset] = useState<number | undefined>(options.defaultOffset || 0);
  const [limit, setLimit] = useState<number | undefined>(options.defaultLimit || 10);

  const onPageChange = useCallback((nextPage: CommondtoPaging) => {
    unstable_batchedUpdates(() => {
      setOffset(nextPage.offset);
      setLimit(nextPage.limit);
    });
  }, []);

  return useMemo(
    () => ({
      offset,
      limit,
      page: offset ? Math.ceil(offset / (limit ?? 10)) : 1,
      rowsPerPage: limit ?? 10,
      setOffset,
      setLimit,
      onPageChange,
    }),
    [onPageChange, offset, limit]
  );
}

export default usePagination;
