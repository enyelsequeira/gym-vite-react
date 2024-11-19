import { defaultCountries } from 'react-international-phone';

export const transformCountriesData = () => {
  return defaultCountries.map((country) => {
    const [countryName, countryCode] = country;
    return {
      label: countryName,
      value: countryCode.toUpperCase(),
    };
  });
};
