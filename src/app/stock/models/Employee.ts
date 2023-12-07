import { StockWithdrawMovement } from "./StockWithdrawMovement"

export interface Employee {
  id: string
  name: string
  movements: StockWithdrawMovement[]
}
