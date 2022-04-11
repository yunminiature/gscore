export interface PriceCardType {
  id: number,
  title: string,
  description: string,
  price: number,
  properties: string[]
}

export interface PriceType {
  price: Array<PriceCardType>
}