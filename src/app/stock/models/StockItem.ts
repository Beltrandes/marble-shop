import { Stock } from "./Stock"
import { StockMovement } from "./StockMovement"

export interface StockItem {
  id: string
  name: string
  details: string
  quantity: number
  stock: Stock
  stockMovement: StockMovement[]
}
