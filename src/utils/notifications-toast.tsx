import { IconCheck, IconX } from '@tabler/icons-react';

const onSuccessConfig = {
  loading: false,
  icon: <IconCheck />,
  radius: 'lg',
  color: 'green',
  withBorder: false,
};

const onErrorConfig = {
  loading: false,
  radius: 'lg',
  color: 'red',
  icon: <IconX />,
};

const onMutateConfig = {
  loading: true,
  radius: 'lg',
  color: 'blue',
};
export { onSuccessConfig, onMutateConfig, onErrorConfig };
