import type { PaginatedResponse } from '@/utils/create-api-fetcher.ts';

// 1. Base type that all entities must have
interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// 2. Helper type to get entity-specific fields
type RequiredEntityFields<T extends BaseEntity> = Omit<T, keyof BaseEntity>;

// 3. Configuration interface for the function
interface OptimisticConfig<T extends BaseEntity, K> {
  // The data to create the entity from
  data: K;
  // Array of field names that need date conversion
  dateFields?: Array<keyof K & string>;
  // Any default values for fields
  defaultFields?: Partial<RequiredEntityFields<T>>;
}

/**
 * Creates an optimistic entity for use before server response
 *
 * @example
 * // For a User entity
 * interface User extends BaseEntity {
 *   username: string;
 *   email: string;
 *   dateOfBirth?: string;
 * }
 *
 * // Create an optimistic user
 * const optimisticUser = createOptimisticEntity<User, CreateUserRequest>({
 *   data: { username: 'john', email: 'john@example.com', dateOfBirth: new Date() },
 *   dateFields: ['dateOfBirth'],
 *   defaultFields: { }
 * });
 */
export const createOptimisticEntity = <
  // T is the final entity type (e.g., User, Food)
  T extends BaseEntity,
  // K is the input data type (e.g., CreateUserRequest)
  K extends Partial<RequiredEntityFields<T>>,
>({
  data,
  dateFields = [],
  defaultFields = {},
}: OptimisticConfig<T, K>): T => {
  // 1. Create a copy of the data to safely modify
  const processedData = { ...data } as Record<string, unknown>;

  // 2. Convert any Date objects to ISO strings
  dateFields.forEach((field) => {
    const value = data[field];
    if (value instanceof Date) {
      processedData[field] = value.toISOString();
    }
  });

  // 3. Combine everything into the final entity
  return {
    // Add any default field values first
    ...defaultFields,
    // Add the processed data
    ...processedData,
    // Add the base entity fields
    id: -Math.random(), // Negative ID to identify it as optimistic
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as T;
};
/**
 * Updates paginated query data with an optimistic entry
 */
export const updateQueryWithOptimisticData = <T extends BaseEntity>(
  oldData: PaginatedResponse<T>,
  optimisticEntry: T
): PaginatedResponse<T> => ({
  ...oldData,
  data: [optimisticEntry, ...oldData.data.slice(0, -1)],
  page: {
    ...oldData.page,
    totalElements: oldData.page.totalElements + 1,
  },
});
