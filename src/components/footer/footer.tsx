import { ActionIcon, Flex, Group, Text, rem } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { GiFeatheredWing } from 'react-icons/gi';

function FooterSocial() {
  return (
    <Flex justify={'space-between'} maw={1700} py={'xl'} px={'sm'} mx={'auto'}>
      <Flex align={'center'} gap={'xs'} w={'fit-content'} px={'md'}>
        <Text fz={'xl'} fw={'bold'} td={'underline'}>
          Active Life
        </Text>
        <GiFeatheredWing />
      </Flex>
      <Group gap={0} justify="flex-end" wrap="nowrap">
        <ActionIcon size="lg" color="gray" variant="subtle">
          <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon size="lg" color="gray" variant="subtle">
          <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon size="lg" color="gray" variant="subtle">
          <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
export default FooterSocial;
