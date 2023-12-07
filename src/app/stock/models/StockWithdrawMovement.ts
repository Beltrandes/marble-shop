import { Employee } from "./Employee"
import { StockItem } from "./StockItem"

export interface StockWithdrawMovement {
  id: string
  employee: Employee
  stockItem: StockItem
  movementDate: Date
  initialQuantity: number
  withdrawalQuantity: number
}
