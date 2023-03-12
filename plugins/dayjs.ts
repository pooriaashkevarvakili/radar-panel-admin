import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import jalaliday from 'jalaliday';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(jalaliday);
