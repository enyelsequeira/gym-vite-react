import { API } from '@/server';
import { constructParamsAllowMultiple } from '@/utils/create-query-params.ts';
// Base types for pagination
import { useDebouncedValue } from '@mantine/hooks';
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

// Generic function to create paginated query options
export const createPaginatedQueryOptions = <T, P extends PaginationParams>({
  queryKey,
  endpoint,
  params,
  debounceFields = [],
}: {
  queryKey: string[];
  endpoint: string;
  params: P;
  debounceFields?: (keyof P)[];
}) => {
  // Create debounced values for specified fields
  const debouncedValues = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => debounceFields.includes(key as keyof P))
      .map(([key, value]) => [key, useDebouncedValue(value, 600)[0]])
  );

  // Combine debounced and non-debounced params
  const finalParams = {
    ...params,
    ...debouncedValues,
  };

  return queryOptions({
    queryKey: [...queryKey, finalParams],
    queryFn: async () => {
      try {
        const queryString = constructParamsAllowMultiple({
          page: finalParams.page ?? 1,
          limit: finalParams.limit ?? 20,
          ...finalParams,
        });

        return await API.get(`${endpoint}${queryString ? `?${queryString}` : ''}`)
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<PaginatedResponse<T>>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    placeholderData: keepPreviousData,
  });
};

// Generic hook creator for paginated queries
export const createPaginatedQuery = <T, P extends PaginationParams>({
  queryKey,
  endpoint,
  debounceFields = [],
}: {
  queryKey: string[];
  endpoint: string;
  debounceFields?: (keyof P)[];
}) => {
  return (params: P = {} as P) => {
    return useQuery({
      ...createPaginatedQueryOptions<T, P>({
        queryKey,
        endpoint,
        params,
        debounceFields,
      }),
    });
  };
};
