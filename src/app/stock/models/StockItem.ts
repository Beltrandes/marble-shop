import { Stock } from "./Stock"
import { StockEntriesMovement } from "./StockEntriesMovement"
import { StockWithdrawMovement } from "./StockWithdrawMovement"

export interface StockItem {
  id: string
  name: string
  details: string
  quantity: number
  stock: Stock
  stockWithdrawMovement: StockWithdrawMovement[],
  stockEntriesMovement: StockEntriesMovement[]
}
