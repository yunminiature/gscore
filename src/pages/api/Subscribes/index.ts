import {httpClient} from '../http';
import {PATHS} from '../constants';

export const getSubscribes = async () => {
  return await httpClient.get(PATHS.GET_SUBSCRIBES)
}