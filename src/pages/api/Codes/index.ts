import {httpClient} from '../http';
import {PATHS} from '../constants';
import {ManageCodesDto} from "../../../store/Codes/types";

export const getCodes = async () => {
  return await httpClient.get(PATHS.GET_CODES)
}

export const activateCode = async (request:{code: string}) => {
  return await httpClient.post(PATHS.ACTIVATE_CODE, JSON.stringify(request))
}

export const manageCodes = async (request:ManageCodesDto) => {
  return await httpClient.put(PATHS.MANAGE_CODES, JSON.stringify(request))
}