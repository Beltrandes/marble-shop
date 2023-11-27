import { StockItem } from "./StockItem"

export interface Stock {
  id: string
  name: string
  items: StockItem[]
}
