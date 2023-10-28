import { IMAGES } from '../constants/images';
import { ValueOf } from '../types/ValueOf/valueOf.type';

export const getImageUrl = (url: ValueOf<typeof IMAGES> | string) => {
  return `${import.meta.env.VITE_API_URL}/static/${url}`;
};
