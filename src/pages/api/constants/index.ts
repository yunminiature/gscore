export const BASE_URL = "https://gscore-back.herokuapp.com/api/"

export enum PATHS {
  SIGN_IN = "users/sign-in",
  SIGN_UP = "users/sign-up",
  UPDATE_DATA = "users/",
  UPDATE_PASSWORD = "users/update-password",

  GET_PRODUCTS = "products",

  GET_SUBSCRIBES = "subscribe/self",
  CHANGE_PRODUCT = "subscribe/change-product",
  BUY_SUBSCRIBE = "payments/buy",

  GET_CODES = "code/self",
  ACTIVATE_CODE = "code/activate",
  MANAGE_CODES = "code/manage"
}