import { Group, Popover, ScrollArea, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import {
  type CountryIso2,
  FlagImage,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { type ReactNode, forwardRef, useRef, useState } from 'react';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: ReactNode;
}

interface CountrySelectorProps {
  country: ReturnType<typeof parseCountry>;
  setCountry: (iso2: CountryIso2) => void;
}

const CountrySelector = forwardRef<HTMLButtonElement, CountrySelectorProps>(
  ({ country, setCountry }, ref) => {
    const [opened, setOpened] = useState(false);

    return (
      <Popover opened={opened} onChange={setOpened} width={320} position="bottom-start">
        <Popover.Target>
          <UnstyledButton ref={ref} onClick={() => setOpened((o) => !o)}>
            <Group gap="xs">
              <FlagImage iso2={country.iso2} />
              <Text size="sm" c="dimmed">
                +{country.dialCode}
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <ScrollArea h={300}>
            <Stack gap={0}>
              {defaultCountries.map((c) => {
                const countryItem = parseCountry(c);
                return (
                  <UnstyledButton
                    key={countryItem.iso2}
                    py="xs"
                    px="md"
                    onClick={() => {
                      setCountry(countryItem.iso2);
                      setOpened(false);
                    }}
                  >
                    <Group>
                      <FlagImage iso2={countryItem.iso2} />
                      <Text size="sm">{countryItem.name}</Text>
                      <Text size="xs" c="dimmed" ml="auto">
                        +{countryItem.dialCode}
                      </Text>
                    </Group>
                  </UnstyledButton>
                );
              })}
            </Stack>
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    );
  }
);

CountrySelector.displayName = 'CountrySelector';

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, label, error }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { ref: selectRef, width: selectWidth } = useElementSize();

    const { inputValue, handlePhoneValueChange, country, setCountry } = usePhoneInput({
      defaultCountry: 'us',
      value,
      onChange: (data) => {
        onChange?.(data.phone);
      },
      inputRef,
    });

    return (
      <TextInput
        ref={ref}
        label={label}
        value={inputValue}
        onChange={handlePhoneValueChange}
        error={error}
        leftSection={<CountrySelector ref={selectRef} country={country} setCountry={setCountry} />}
        leftSectionWidth={selectWidth ? selectWidth + 16 : 100}
        variant="filled"
        radius="md"
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
