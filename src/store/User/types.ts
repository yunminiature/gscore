export const enum ActionTypes {
  ADD_PACKAGE = "ADD_PACKAGE",
  SIGN_OUT = "SIGN_OUT"
}

export interface SignInDto {
  email: string,
  password: string,
}

export interface SignUpDto extends SignInDto{
  username: string,
}

export interface UpdatePassword{
  currentPassword: string,
  newPassword: string
}

export interface UserDto{
  id: number,
  email: string,
  username: string,
  //sub:[],
  //codes:[]
}

export interface User {
  token: string,
  package: number,
  user: UserDto,
  status: string,
  error: string
}