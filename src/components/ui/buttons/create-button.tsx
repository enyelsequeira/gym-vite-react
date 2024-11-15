import { Button, type ButtonProps, createPolymorphicComponent } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { forwardRef } from 'react';

interface CustomButtonProps extends ButtonProps {
  isPending?: boolean;
}

const CreateNewButton = createPolymorphicComponent<'button', CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(({ ...others }, ref) => (
    <Button
      variant="gradient"
      type="submit"
      gradient={{ from: 'blue', to: 'cyan' }}
      radius="md"
      px="xl"
      loading={others.isPending}
      leftSection={<IconDeviceFloppy size={20} />}
      {...others}
      ref={ref}
    >
      {others.children}
    </Button>
  ))
);

export default CreateNewButton;
