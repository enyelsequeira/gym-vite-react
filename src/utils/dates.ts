import dayjs from 'dayjs';

const BASE_DATE_FORMAT = 'YYYY-MM-DD';
const TODAY = dayjs().format(BASE_DATE_FORMAT);

const STANDARD_VIEW_DATE_FORMAT = 'MMM D, YYYY';
const StandardViewDateFormat = (date: string) => dayjs(date).format(STANDARD_VIEW_DATE_FORMAT);

export { BASE_DATE_FORMAT, TODAY, STANDARD_VIEW_DATE_FORMAT, StandardViewDateFormat };
