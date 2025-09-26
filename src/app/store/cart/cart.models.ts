export interface CartItem {
  id: number;
  [key: string]: any;
}

export interface CartState {
  selectedGame: Record<string, any> | null;
  items: CartItem[];
}
