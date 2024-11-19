import dayjs from 'dayjs';

const BASE_DATE_FORMAT = 'YYYY-MM-DD';
const TODAY = dayjs().format(BASE_DATE_FORMAT);

export { BASE_DATE_FORMAT, TODAY };
