import { Card, Drawer, Text } from '@mantine/core';
import type { PropsWithChildren } from 'react';

type Props = {
  tableTitle: string;
};
const TableWrapper = ({ tableTitle, children }: PropsWithChildren<Props>) => {
  return (
    <Card padding={'md'} radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs" bg="blue.0" mb={'lg'}>
        <Text fw={500} c="blue.7">
          {tableTitle}
        </Text>
      </Card.Section>
      {children}
    </Card>
  );
};

type TableDrawerType = {
  opened: boolean;
  onClose: () => void;
  title: string;
};
const TableDrawer = ({ children, onClose, opened, title }: PropsWithChildren<TableDrawerType>) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={500} size="lg" c="blue.7">
          {title}
        </Text>
      }
      position="right"
      size="md"
    >
      {children}
    </Drawer>
  );
};

export { TableDrawer, TableWrapper };
