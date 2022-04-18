import {httpClient} from '../http';
import {PATHS} from '../constants';

export const getProducts = async () => {
  return await httpClient.get(PATHS.GET_PRODUCTS)
}