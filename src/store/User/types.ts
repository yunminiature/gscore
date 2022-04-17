export const enum ActionTypes {
  ADD_PACKAGE = "ADD_PACKAGE",
  SIGN_IN = "SIGN_IN"
}

export interface SignInDto {
  email: string,
  password: string,
}

export interface SignUpDto extends SignInDto{
  username: string,
}

export interface User {
  token: string,
  package: number,
  user: {
    id: number,
    email: string,
    username: string,
    //sub:[],
    //codes:[]
  }
}