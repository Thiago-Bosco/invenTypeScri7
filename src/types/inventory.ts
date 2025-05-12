
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
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  purchaseDate?: Date;
  warrantyExpiration?: Date;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'DECOMMISSIONED';
  currentLocation?: string;
  location?: string; // Adding this property to match what's used in mockData
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryTransaction = {
  id: string;
  itemId: string;
  type: 'IN' | 'OUT' | 'TRANSFER';
  quantity: number;
  date: Date;
  notes?: string;
  responsiblePerson?: string;
  sourceLocation?: string;
  destinationLocation?: string;
};

export type Location = {
  id: string;
  name: string;
  address?: string;
  type: 'DATA_CENTER' | 'OFFICE' | 'WAREHOUSE' | 'CLIENT_SITE' | 'OTHER';
  notes?: string;
};

