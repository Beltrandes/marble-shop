import { Employee } from "./Employee"
import { StockItem } from "./StockItem"

export interface StockMovement {
  id: string
  employee: Employee
  item: StockItem
  movementDate: Date
  initialQuantity: number
  withdrawalQuantity: number
}
