
export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  quantity: number;
  minQuantity?: number;
  price: number;
  unit: string;
  image?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryTransaction = {
  id: string;
  itemId: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: Date;
  notes?: string;
};
