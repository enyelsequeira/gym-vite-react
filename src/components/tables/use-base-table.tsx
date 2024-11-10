import {
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table';
import { useState } from 'react';
import classes from './table.module.css';

interface PageInfo {
  totalElements: number;
  totalPages: number;
}

interface QueryResponse<TData> {
  data: TData[];
  page: PageInfo;
}

interface BaseRow {
  id: number;
  [key: string]: any;
}

interface UseBaseTableProps<TData extends BaseRow> {
  columns: MRT_ColumnDef<TData>[];
  data: QueryResponse<TData> | undefined;
  isLoading: boolean;
  isFetching?: boolean;
  renderTopToolbarCustomActions?: MRT_TableOptions<TData>['renderTopToolbarCustomActions'];
  renderBottomToolbar?: MRT_TableOptions<TData>['renderBottomToolbar'];
  onGlobalFilterChange?: (value: string) => void;
  onPaginationChange?: (pagination: MRT_PaginationState) => void;
  tableOptions?: Partial<MRT_TableOptions<TData>>;
  enablePagination?: boolean;
}

/**
 * Custom hook for creating a base table with consistent styling and behavior
 */
export const useBaseTable = <TData extends BaseRow>({
  columns,
  data,
  isLoading,
  isFetching,
  onGlobalFilterChange,
  onPaginationChange,
  enablePagination = true,
  tableOptions = {},
}: UseBaseTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    onGlobalFilterChange?.(value);
  };

  const handlePaginationChange = (
    updater: MRT_PaginationState | ((prev: MRT_PaginationState) => MRT_PaginationState)
  ) => {
    const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
    setPagination(newPagination);
    onPaginationChange?.(newPagination);
  };

  const currentPageData = data?.data ?? [];
  const optimisticItemsCount = currentPageData.filter((item) => item.id < 0).length;
  const totalRows = (data?.page?.totalElements ?? 0) + optimisticItemsCount;

  return useMantineReactTable({
    columns,
    data: currentPageData,
    // Disable various features for cleaner interface
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableBottomToolbar: enablePagination,
    enablePagination,

    // Initial state settings
    initialState: {
      density: 'xs',
    },

    // Pagination settings when enabled
    ...(enablePagination && {
      manualPagination: true,
      rowCount: totalRows,
      manualFiltering: true,
      onGlobalFilterChange: handleGlobalFilterChange,
      onPaginationChange: handlePaginationChange,
      paginationDisplayMode: 'pages',
      mantinePaginationProps: {
        showRowsPerPage: false,
        withEdges: true,
        radius: 'md',
      },
    }),

    // Style customization
    mantineTableProps: {
      p: 'xs',
      striped: false,
      highlightOnHover: false,
      fz: 'sm',
    },
    mantinePaperProps: {
      p: 8,
    },
    mantineTableHeadCellProps: {
      align: 'left',
      c: 'var(--mantine-color-blue-7)',
      fw: 500,
      tt: 'uppercase',
      style: {
        backgroundColor: 'var(--mantine-color-blue-0)',
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      className: row.original.id < 0 ? classes.optimisticRow : undefined,
    }),
    mantineTableBodyCellProps: {
      color: 'var(--mantine-color-blue-7)',
    },

    // State management
    state: {
      pagination,
      globalFilter,
      isLoading,
      showSkeletons: isLoading,
      showProgressBars: isFetching,
    },

    // Allow override of any options
    ...tableOptions,
  });
};
