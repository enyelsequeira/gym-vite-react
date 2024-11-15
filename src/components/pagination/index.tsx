import { Flex, Pagination } from '@mantine/core';
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from '@tabler/icons-react';

type TablePaginationProps = {
  total: number;
  page: number;
  onChange: (page: number) => void;
  siblings?: number;
  boundaries?: number;
};

function TablePagination({
  total,
  page,
  onChange,
  siblings = 1,
  boundaries = 1,
}: TablePaginationProps) {
  return (
    <Flex align="center" justify="flex-end" gap="md">
      <Pagination
        total={total}
        value={page}
        onChange={onChange}
        siblings={siblings}
        boundaries={boundaries}
        size="md"
        radius="md"
        withEdges
        color={'blue.7'}
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
      />
    </Flex>
  );
}

export { TablePagination };
