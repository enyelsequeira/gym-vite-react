import { useLogout } from '@/modules/auth/use-login.tsx';
import classes from '@/modules/profile/components/profile-navigation.module.css';
import { useSession } from '@/providers/auth.tsx';
import { AppShell, Burger, Button, Group, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBellRinging,
  IconFileAnalytics,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
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
    // { link: '', label: 'Security', icon: IconFingerprint },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Databases', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
  ],
  general: [
    { link: '', label: 'Orders', icon: IconShoppingCart },
    { link: '', label: 'Receipts', icon: IconLicense },
    { link: '', label: 'Reviews', icon: IconMessage2 },
    { link: '', label: 'Messages', icon: IconMessages },
    { link: '', label: 'Customers', icon: IconUsers },
    { link: '', label: 'Refunds', icon: IconReceiptRefund },
    { link: '', label: 'Files', icon: IconFileAnalytics },
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
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
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
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconSettings size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
            Hello, {session?.user?.username}
          </Text>
          <SegmentedControl
            value={section}
            onChange={(value: any) => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: 'Account', value: 'account' },
              { label: 'System', value: 'general', disabled: session.user?.type !== 'ADMIN' },
            ]}
          />
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          {links}
        </AppShell.Section>
        <AppShell.Section>
          <Button
            fullWidth={true}
            my={'xs'}
            onClick={(event) => event.preventDefault()}
            leftSection={<IconSwitchHorizontal stroke={1.5} />}
          >
            Change account
          </Button>

          <Button
            variant={'outline'}
            color={'red.8'}
            fullWidth={true}
            rightSection={<IconLogout />}
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
      <AppShell.Main bd={'1px solid red'} w={'100%'} bg={'gray.1'}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default ProfileLayout;
