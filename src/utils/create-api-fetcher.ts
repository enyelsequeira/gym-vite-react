import { API } from '@/server';
import { constructParamsAllowMultiple } from '@/utils/create-query-params';
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

// Add select function type parameter
export const createPaginatedQueryOptions = <
  T,
  P extends PaginationParams,
  R = PaginatedResponse<T>,
>({
  queryKey,
  endpoint,
  params,
  debounceFields = [],
  select,
}: {
  queryKey: string[];
  endpoint: string;
  params: P;
  debounceFields?: (keyof P)[];
  select?: (data: PaginatedResponse<T>) => R;
}) => {
  const debouncedValues = Object.fromEntries(
    Object.entries(params)
      .filter(([key]) => debounceFields.includes(key as keyof P))
      .map(([key, value]) => [key, useDebouncedValue(value, 600)[0]])
  );

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
    ...(select && { select }),
  });
};

// Update the hook creator to include select function
export const createPaginatedQuery = <T, P extends PaginationParams, R = PaginatedResponse<T>>({
  queryKey,
  endpoint,
  debounceFields = [],
  select,
}: {
  queryKey: string[];
  endpoint: string;
  debounceFields?: (keyof P)[];
  select?: (data: PaginatedResponse<T>) => R;
}) => {
  return (params: P = {} as P) => {
    return useQuery({
      ...createPaginatedQueryOptions<T, P, R>({
        queryKey,
        endpoint,
        params,
        debounceFields,
        select,
      }),
    });
  };
};
