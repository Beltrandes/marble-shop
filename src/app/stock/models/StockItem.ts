import { Stock } from "./Stock"
import { StockWithdrawMovement } from "./StockWithdrawMovement"

export interface StockItem {
  id: string
  name: string
  details: string
  quantity: number
  stock: Stock
  stockMovement: StockWithdrawMovement[]
}
