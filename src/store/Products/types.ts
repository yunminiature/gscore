export const enum ActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
}

export interface Product {
  id: number,
  sitesCount: number,
  name: string,
  prices: Array <{
    id: number,
    isActive: boolean,
    productId: number,
    price: string
  }>
}