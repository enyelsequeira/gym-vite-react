export const constructQueryParams = (params: Record<string, any>) =>
  Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

export const constructParamsAllowZeros = (params: Record<string, any>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

export const constructParamsAllowMultiple = (params: Record<string, any>) => {
  const queryParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        });
      } else {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  });

  return queryParts.join('&');
};
