import { StockItem } from "./StockItem";

export interface StockEntriesMovement {

  id: string,
  stockItem: StockItem,
  movementDate: Date,
  initialQuantity: number,
  addedQuantity: number
}
