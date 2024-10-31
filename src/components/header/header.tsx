import Logo from '@/components/logo.tsx';
import { useLogout } from '@/modules/auth/use-login.tsx';
import { useSession } from '@/providers/auth.tsx';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  Tooltip,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { GiFeatheredWing } from 'react-icons/gi';

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { mutate } = useLogout();
  const { session } = useSession();
  return (
    <Box maw={1700} py={'lg'} px={'sm'} mx={'auto'}>
      <Flex component={'header'} align={'center'} justify={'space-between'}>
        <Link to={'/'}>
          <Flex align={'center'} gap={'xs'} w={'fit-content'} px={'md'}>
            <Logo />
          </Flex>
        </Link>

        <Burger hiddenFrom="sm" onClick={toggleDrawer} />
        <Flex visibleFrom="sm" align={'center'} gap={'sm'}>
          <Text fw={500}>Stories</Text>
          <Text fw={500}>Pricing</Text>
          <Text fw={500}>About</Text>
          <Group>
            {session?.user ? (
              <Text fw={'bold'}>
                Hello{' '}
                <Text
                  component={'span'}
                  fw={900}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                >
                  <Link to={'/profile'}>{session.user.username}</Link>
                </Text>
              </Text>
            ) : (
              <Button variant="default" type={'button'}>
                <Link to={'/login'}>Log in</Link>
              </Button>
            )}
            {session?.user ? (
              <Tooltip label={'Logout'}>
                <ActionIcon
                  variant={'transparent'}
                  onClick={() => {
                    mutate({
                      id: `${session.user?.id}`,
                    });
                  }}
                >
                  <IconLogout />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Button>Sign up</Button>
            )}
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
            {session?.user ? (
              <Text fw={'bold'}>
                Hello{' '}
                <Text
                  component={'span'}
                  fw={900}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                >
                  {session.user.username}
                </Text>
              </Text>
            ) : (
              <Button variant="default" type={'button'}>
                <Link to={'/login'}>Log in</Link>
              </Button>
            )}
            {session?.user ? (
              <Tooltip label={'Logout'}>
                <ActionIcon
                  variant={'transparent'}
                  onClick={() => {
                    mutate({
                      id: `${session.user?.id}`,
                    });
                  }}
                >
                  <IconLogout />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Button>Sign up</Button>
            )}
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
export default Header;
