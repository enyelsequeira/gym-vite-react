import { TablePagination } from '@/components/pagination';
import { Flex, Loader } from '@mantine/core';
import {
  type MRT_ColumnDef,
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
  tableOptions?: Partial<MRT_TableOptions<TData>>;
  enablePagination?: boolean;
  paginationOptions?: {
    activePage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
  };
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
  enablePagination = true,
  tableOptions = {},
  paginationOptions,
}: UseBaseTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    onGlobalFilterChange?.(value);
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
    enableFilterMatchHighlighting: false,

    // Initial state settings
    initialState: {
      density: 'xs',
      showGlobalFilter: true,
    },

    // Pagination settings when enabled

    manualPagination: true,
    rowCount: totalRows,
    manualFiltering: true,
    onGlobalFilterChange: handleGlobalFilterChange,
    paginationDisplayMode: 'custom',

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
      ...tableOptions.state,
      globalFilter,
      isLoading,
      showSkeletons: isLoading,
    },
    renderBottomToolbar: () =>
      paginationOptions ? (
        <Flex
          align="center"
          justify="flex-end"
          px={'xs'}
          gap={'md'}
          py={'md'}
          pos="relative"
          style={{
            borderTop: '1px solid #E4E7EC',
          }}
        >
          <TablePagination
            total={paginationOptions.totalPages}
            page={paginationOptions.activePage}
            onChange={paginationOptions.onPageChange}
            siblings={1}
            boundaries={1}
          />
          <Flex align={'center'} w={'30px'} h={'30px'}>
            {isFetching ? <Loader size={'sm'} /> : null}
          </Flex>
        </Flex>
      ) : null,
    // Allow override of any options
    ...tableOptions,
  });
};
