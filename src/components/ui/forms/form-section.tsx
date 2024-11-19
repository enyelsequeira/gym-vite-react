import { Card, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type FormSectionProps = {
  title: string;
  children: ReactNode;
};

const FormSection = ({ title, children }: FormSectionProps) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs" bg="var(--mantine-color-blue-0)">
      <Text fw={500} c="var(--mantine-color-blue-7)">
        {title}
      </Text>
    </Card.Section>
    {children}
  </Card>
);

export default FormSection;
