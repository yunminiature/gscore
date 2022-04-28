export const enum CodeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  HOLD = "HOLD"
}

export interface CodeDto{
  id: number,
  code: string,
  origin: string,
  status: CodeStatus,
  subscribeId: number
}