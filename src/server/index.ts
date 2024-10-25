import wretch from 'wretch';

export const API = wretch('http://localhost:9999').options({
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
