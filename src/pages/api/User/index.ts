import {httpClient} from '../http';
import {PATHS} from '../constants';
import {SignUpDto, SignInDto, UpdatePassword} from "../../../store/User/types";

export const signUp = async (request: SignUpDto) => {
  return await httpClient.post(PATHS.SIGN_UP, JSON.stringify(request))
}

export const signIn = async (request: SignInDto) => {
  return await httpClient.post(PATHS.SIGN_IN, JSON.stringify(request))
}

export const updateData = async (request: Omit<SignUpDto, "password">) => {
  return await httpClient.patch(PATHS.UPDATE_DATA, JSON.stringify(request))
}

export const updatePassword = async (request: UpdatePassword) => {
    return await httpClient.patch(PATHS.UPDATE_PASSWORD, JSON.stringify(request))
}