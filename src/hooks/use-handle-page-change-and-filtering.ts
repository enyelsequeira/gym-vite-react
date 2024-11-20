import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';

type FilterParams = {
  searchParam: string;
  value: string;
};

const useHandlePageChangeAndFiltering = () => {
  const search = useSearch({
    strict: false,
  });
  const navigate = useNavigate();
  const handlePageChange = useCallback(
    async (page: number) => {
      await navigate({
        search: {
          ...search,
          page,
        },
      });
    },
    [search, navigate]
  );

  const handleGlobalFilterChange = useCallback(
    async ({ searchParam, value }: FilterParams) => {
      if (value !== searchParam) {
        await navigate({
          search: {
            ...search,
            [searchParam]: value,
            // Don't reset page if clearing the filter
            page: value ? 1 : search.page,
          },
        });
      }
    },
    [search, navigate]
  );

  return {
    handlePageChange,
    handleGlobalFilterChange,
  };
};

export default useHandlePageChangeAndFiltering;
