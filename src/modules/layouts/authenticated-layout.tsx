import { useLogout } from '@/modules/auth/use-login.tsx';
import classes from '@/modules/layouts/profile-navigation.module.css';
import { useSession } from '@/providers/auth.tsx';
import {
  AppShell,
  Burger,
  Button,
  Divider,
  Group,
  Paper,
  ScrollArea,
  SegmentedControl,
  Text,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowBarBoth,
  IconBarbell,
  IconBellRinging,
  IconChartBar,
  IconChevronRight,
  IconLogout,
  IconPassword,
  IconReceipt2,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { type PropsWithChildren, useState } from 'react';

const tabs = {
  account: [
    { link: '/profile', label: 'Settings', icon: IconBellRinging },
    { link: '/diet', label: 'Diet', icon: IconReceipt2 },
    { link: '/overview', label: 'Overview', icon: IconChartBar },
    { link: '/change-password', label: 'Change Password', icon: IconPassword },
    { link: '/food-conversion', label: 'Food Conversion', icon: IconArrowBarBoth },
  ],
  general: [
    { link: '/food', label: 'Foods', icon: IconShoppingCart },
    { link: '/users', label: 'Users', icon: IconUsers },
    { link: '/exercises', label: 'exercises', icon: IconBarbell },
  ],
};

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const { session } = useSession();
  const { mutate, isPending } = useLogout();
  const [opened, { toggle }] = useDisclosure();
  const [section, setSection] = useState<'account' | 'general'>('account');
  const [active, setActive] = useState('Billing');

  const links = tabs[section].map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <ThemeIcon variant="light" size="lg" color="blue">
        <item.icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <span>{item.label}</span>
      <IconChevronRight
        className={classes.linkIcon}
        stroke={1.5}
        style={{ marginLeft: 'auto', opacity: 0.5, width: rem(16) }}
      />
    </Link>
  ));

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          background: 'var(--mantine-color-body)',
          borderBottom: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              <IconSettings style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
            </ThemeIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          background: 'var(--mantine-color-body)',
          borderRight: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <AppShell.Section>
          <Paper withBorder p="md" radius="md" mb="md">
            <Group>
              <ThemeIcon
                size="xl"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                {session?.user?.username?.charAt(0).toUpperCase()}
              </ThemeIcon>
              <div>
                <Text fw={500} size="sm">
                  Hello, {session?.user?.username}
                </Text>
                <Text size="xs" c="dimmed">
                  {session?.user?.type}
                </Text>
              </div>
            </Group>
          </Paper>

          <SegmentedControl
            value={section}
            onChange={(value: any) => setSection(value)}
            fullWidth
            data={[
              { label: 'Account', value: 'account' },
              { label: 'System', value: 'general', disabled: session.user?.type !== 'ADMIN' },
            ]}
            style={{ marginBottom: rem(16) }}
          />
        </AppShell.Section>

        <Divider my="sm" />

        <AppShell.Section grow component={ScrollArea}>
          <div className={classes.linksContainer}>{links}</div>
        </AppShell.Section>

        <Divider my="sm" />

        <AppShell.Section>
          <Button
            variant="light"
            fullWidth
            leftSection={
              <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
            mb="sm"
          >
            Change account
          </Button>

          <Button
            variant="light"
            color="red"
            fullWidth
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={() => {
              mutate({
                id: `${session.user?.id}`,
              });
            }}
            loading={isPending}
          >
            Logout
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          background: 'var(--mantine-color-gray-0)',
          minHeight: '100vh',
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default ProfileLayout;
