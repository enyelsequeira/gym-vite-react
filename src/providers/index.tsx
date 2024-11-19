import { theme } from '@/theme';
import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
