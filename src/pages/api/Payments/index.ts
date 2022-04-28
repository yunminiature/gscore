import {httpClient} from '../http';
import {PATHS} from '../constants';

export const buySubscribe = async (request: {priceId: number}) => {
  return await httpClient.post(PATHS.BUY_SUBSCRIBE, JSON.stringify(request))
}