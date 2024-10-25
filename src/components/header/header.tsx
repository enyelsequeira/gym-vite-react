import Logo from '@/components/logo.tsx';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@tanstack/react-router';
import { GiFeatheredWing } from 'react-icons/gi';

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
    <Box maw={1700} py={'lg'} px={'sm'} mx={'auto'}>
      <Flex component={'header'} align={'center'} justify={'space-between'}>
        <Flex align={'center'} gap={'xs'} w={'fit-content'} px={'md'}>
          <Logo />
        </Flex>
        <Burger hiddenFrom="sm" onClick={toggleDrawer} />
        <Flex visibleFrom="sm" align={'center'} gap={'sm'}>
          <Text fw={500}>Stories</Text>
          <Text fw={500}>Pricing</Text>
          <Text fw={500}>About</Text>
          <Group>
            <Button variant="default" type={'button'}>
              <Link to={'/login'}>Log in</Link>
            </Button>
            <Button>Sign up</Button>
          </Group>
        </Flex>
      </Flex>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Flex align={'center'} gap={'xs'} w={'fit-content'} px={'md'}>
            <Text fz={'xl'} fw={'bold'} td={'underline'}>
              Active Life
            </Text>
            <GiFeatheredWing />
          </Flex>
        }
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Flex align={'center'} gap={'sm'} direction={'column'}>
            <Text fw={500}>Stories</Text>
            <Text fw={500}>Pricing</Text>
            <Text fw={500}>About</Text>
          </Flex>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;
