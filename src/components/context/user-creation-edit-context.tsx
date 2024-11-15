import type { CreateUserRequest } from '@/modules/users/hooks/create-new-user.tsx';
import { createFormContext, hasLength, isEmail, isNotEmpty } from '@mantine/form';
import { defaultCountries, parseCountry } from 'react-international-phone';

export const INITIAL_USER_VALUES: CreateUserRequest = {
  username: '',
  name: '',
  lastName: '',
  email: '',
  password: '',
  type: 'USER',
  city: '',
  country: '',
  phone: '',
  occupation: '',
  height: undefined,
  weight: undefined,
  targetWeight: undefined,
  dateOfBirth: new Date(),
  gender: undefined,
  activityLevel: undefined,
};

const phoneValidation = (value?: string) => {
  if (!value) return 'Please enter a phone number';

  try {
    // First, extract just the digits from the entire phone number
    const allDigits = value.replace(/\D/g, '');

    // Phone number must have at least 7 digits (excluding country code)
    if (allDigits.length < 8) {
      return 'Phone number is too short';
    }

    if (allDigits.length > 15) {
      return 'Phone number is too long';
    }

    // Check if it starts with a valid country code
    let isValidCountryCode = false;
    // Sort countries by dial code length (descending) to check longer codes first
    const sortedCountries = [...defaultCountries].sort(
      (a, b) => parseCountry(b).dialCode.length - parseCountry(a).dialCode.length
    );

    for (const country of sortedCountries) {
      const dialCode = parseCountry(country).dialCode;
      if (allDigits.startsWith(dialCode)) {
        isValidCountryCode = true;
        break;
      }
    }

    if (!isValidCountryCode) {
      return 'Invalid country code';
    }

    return null;
  } catch (error) {
    return 'Please enter a valid phone number';
  }
};

export const validateUserForm = {
  username: hasLength({ min: 3, max: 50 }, 'Username must be between 3 and 50 characters'),
  name: hasLength({ min: 1, max: 100 }, 'Name must be between 1 and 100 characters'),
  lastName: hasLength({ min: 1, max: 100 }, 'Last name must be between 1 and 100 characters'),
  email: isEmail('Please enter a valid email address'),
  password: hasLength({ min: 8 }, 'Password must be at least 8 characters long'),
  type: isNotEmpty('Please select a user type'),
  height: isNotEmpty('Please enter a height'),
  weight: isNotEmpty('Please enter a weight'),
  targetWeight: isNotEmpty('Please enter a target weight'),
  country: isNotEmpty('Please select a country'),
  city: isNotEmpty('Please enter a city'),
  phone: phoneValidation,
  occupation: isNotEmpty('Please enter an occupation'),
  dateOfBirth: isNotEmpty('Please enter a date of birth'),
  gender: isNotEmpty('Please select a gender'),
  activityLevel: isNotEmpty('Please select an activity level'),
};
export const transformUserFormValues = (values: CreateUserRequest) => ({
  ...values,
  height: values.height ? Number(values.height) : undefined,
  weight: values.weight ? Number(values.weight) : undefined,
  targetWeight: values.targetWeight ? Number(values.targetWeight) : undefined,
});

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<CreateUserRequest>();
