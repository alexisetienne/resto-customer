/* --- STATE --- */
export interface OrderItem {
  id?: number;
  orderId?: number;
  itemId?: number;
  quantity?: number;
}

export interface Item {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
}
export interface OrderState {
  name?: string;
  homeNumber?: number;
  phone?: number;
  email?: string;
  withdrawalHour?: string;
  orderItems?: Item[];
}
