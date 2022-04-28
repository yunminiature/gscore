export const enum SubscribeStatus {
  ACTIVE = "ACTIVE",
  UNPAID = "UNPAID",
  CANCELED = "CANCELED"
}

export interface SubscribeDto{
  id: number,
  productId: number,
  currentPeriodStart: string,
  currentPeriodEnd: string,
  status: SubscribeStatus
}