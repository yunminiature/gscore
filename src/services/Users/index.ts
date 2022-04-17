import {Request} from "next/dist/server/web/spec-compliant/request";
import {httpClient} from '../http';
import {PATHS} from '../constants';
import {SignUpDto, SignInDto} from "../../store/User/types";

export const signUp = async (request: SignUpDto) => {
  return await httpClient.post(PATHS.SIGN_UP, JSON.stringify(request))
}

export const signIn = async (request: SignInDto) => {
  return await httpClient.post(PATHS.SIGN_IN, JSON.stringify(request))
}