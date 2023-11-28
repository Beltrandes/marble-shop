import { StockMovement } from "./StockMovement"

export interface Employee {
  id: string
  name: string
  movements: StockMovement[]
}
