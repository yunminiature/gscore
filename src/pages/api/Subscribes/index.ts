import {httpClient} from '../http';
import {PATHS} from '../constants';
import {ChangeProductDto} from "../../../store/Subscribes/types";

export const getSubscribes = async () => {
  return await httpClient.get(PATHS.GET_SUBSCRIBES)
}

export const changeProduct = async (request:ChangeProductDto) => {
  return await httpClient.post(PATHS.CHANGE_PRODUCT, JSON.stringify(request))
}