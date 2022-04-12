export const enum ActionTypes {
  ADD_CURRENT_USER = "ADD_CURRENT_USER",
  ADD_PACKAGE = "ADD_PACKAGE"
}
export interface CurrentUserType{
  currentUser: {
    id: number,
    packageId: number
  }
}
