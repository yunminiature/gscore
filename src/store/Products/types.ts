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

export interface Products {
  products: Array <Product>,
  isLoading: boolean,
  error: string
}