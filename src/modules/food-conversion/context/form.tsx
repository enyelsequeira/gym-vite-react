import { createFormContext } from '@mantine/form';

// Definition of form values is required
export interface FormValues {
  sourceFood: string | null;
  targetFood: string | null;
  amount: number | '';
}

export const [FormConversionProvider, useFormConversionContext, useFormConversion] =
  createFormContext<FormValues>();
