export const enum CodeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  HOLD = "HOLD"
}

export interface ManageCodesDto{
  codesIds: Array <number>,
  subscribeId: number
}

export interface CodeDto{
  id: number,
  code: string,
  origin: string,
  status: CodeStatus,
  subscribeId: number,
  subscribe:{
    productId: number
  }
}