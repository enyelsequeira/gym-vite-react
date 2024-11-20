import { z } from 'zod';

const baseSearchParams = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});
export const nameSearchParam = z.string().optional();

/**
 * Creates a pagination query schema with additional search/filter fields
 * @param additionalFields - Extra fields to add to the pagination schema
 */
export function ExtendBaseSearchParams<T extends z.ZodRawShape>(additionalFields: T) {
  return baseSearchParams.extend(additionalFields);
}
