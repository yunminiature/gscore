import {httpClient} from '../http';
import {PATHS} from '../constants';

export const getCodes = async () => {
  return await httpClient.get(PATHS.GET_CODES)
}