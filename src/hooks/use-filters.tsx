import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type { MRT_SortingState } from 'mantine-react-table';
import { useCallback, useMemo, useState } from 'react';

export type FilterState<T extends Record<string, string>> = T;

type UseTableFiltersAndSortParams<T extends Record<string, string>> = {
  initialFilters: T;
};

export const useCrudTableFiltersAndSort = <T extends Record<string, string>>({
  initialFilters,
}: UseTableFiltersAndSortParams<T>) => {
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState<T>>(initialFilters);

  const sortBy = useMemo(() => {
    if (sorting.length) {
      setCurrentPage(1);
      return `${sorting[0].id},${sorting[0].desc ? 'DESC' : 'ASC'}`;
    }
    return undefined;
  }, [sorting]);

  const handleFilterChange = useCallback((key: keyof T, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilter = useCallback((key: keyof T) => {
    setFilters((prev) => ({ ...prev, [key]: '' }));
  }, []);

  const renderClearButton = useCallback(
    (key: keyof T) => (
      <ActionIcon
        size="xs"
        c="black"
        variant="transparent"
        onClick={() => clearFilter(key)}
        style={{ display: filters[key] ? 'block' : 'none' }}
      >
        <IconX size={14} />
      </ActionIcon>
    ),
    [clearFilter, filters]
  );

  return {
    sorting,
    setSorting,
    currentPage,
    setCurrentPage,
    filters,
    sortBy,
    handleFilterChange,
    clearFilter,
    renderClearButton,
  };
};
