import { Button, type ButtonProps, createPolymorphicComponent } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { forwardRef } from 'react';

interface CustomButtonProps extends ButtonProps {
  isPending?: boolean;
  withIcon?: boolean;
}

const GenericButton = createPolymorphicComponent<'button', CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(({ withIcon = false, ...others }, ref) => (
    <Button
      type="submit"
      color={'blue.6'}
      radius="md"
      px="sm"
      loading={others.isPending}
      leftSection={withIcon ? <IconDeviceFloppy size={20} /> : null}
      {...others}
      ref={ref}
    >
      {others.children}
    </Button>
  ))
);

export default GenericButton;
