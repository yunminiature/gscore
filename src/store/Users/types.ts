export const enum ActionTypes {
  ADD_USER = "ADD_USER"
}
export interface UserType{
  id: number,
  userName: string,
  email: string,
  password: string,
}

export interface UsersType{
  users: Array<UserType>
}