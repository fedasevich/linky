import { differenceInDays, parseISO } from 'date-fns';

export const getDifferenceInDays = (date: string) => {
  return differenceInDays(parseISO(date), Date.now());
};
