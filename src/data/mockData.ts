
import { Category, InventoryItem, InventoryTransaction } from "../types/inventory";

export const categories: Category[] = [
  {
    id: '1',
    name: 'Eletrônicos',
    description: 'Dispositivos eletrônicos e acessórios'
  },
  {
    id: '2',
    name: 'Ferramentas',
    description: 'Ferramentas e equipamentos'
  },
  {
    id: '3',
    name: 'Material de Escritório',
    description: 'Suprimentos e materiais de escritório'
  },
  {
    id: '4',
    name: 'Móveis',
    description: 'Móveis e acessórios'
  },
  {
    id: '5',
    name: 'Outros',
    description: 'Itens diversos'
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Notebook Dell XPS 13',
    description: 'Notebook Dell XPS 13 com processador i7, 16GB RAM e 512GB SSD',
    categoryId: '1',
    quantity: 5,
    minQuantity: 2,
    price: 6999.90,
    unit: 'unidade',
    location: 'Sala 101',
    status: 'AVAILABLE',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10')
  },
  {
    id: '2',
    name: 'Monitor LG 27"',
    description: 'Monitor LG de 27 polegadas, resolução 4K',
    categoryId: '1',
    quantity: 8,
    minQuantity: 3,
    price: 1899.90,
    unit: 'unidade',
    location: 'Sala 102',
    status: 'AVAILABLE',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '3',
    name: 'Furadeira DeWalt',
    description: 'Furadeira de impacto DeWalt 20V',
    categoryId: '2',
    quantity: 3,
    minQuantity: 1,
    price: 899.90,
    unit: 'unidade',
    location: 'Depósito',
    status: 'AVAILABLE',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  },
  {
    id: '4',
    name: 'Resma de Papel A4',
    description: 'Resma de papel A4 com 500 folhas',
    categoryId: '3',
    quantity: 20,
    minQuantity: 5,
    price: 25.90,
    unit: 'pacote',
    location: 'Almoxarifado',
    status: 'AVAILABLE',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: '5',
    name: 'Cadeira de Escritório',
    description: 'Cadeira ergonômica para escritório',
    categoryId: '4',
    quantity: 10,
    minQuantity: 2,
    price: 599.90,
    unit: 'unidade',
    location: 'Depósito',
    status: 'AVAILABLE',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-01')
  },
  {
    id: '6',
    name: 'Mouse Logitech MX Master',
    description: 'Mouse sem fio Logitech MX Master 3',
    categoryId: '1',
    quantity: 7,
    minQuantity: 3,
    price: 499.90,
    unit: 'unidade',
    location: 'Sala 101',
    status: 'AVAILABLE',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: '7',
    name: 'Extensão Elétrica',
    description: 'Extensão elétrica de 5 metros com 4 tomadas',
    categoryId: '5',
    quantity: 12,
    minQuantity: 3,
    price: 49.90,
    unit: 'unidade',
    location: 'Almoxarifado',
    status: 'AVAILABLE',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-01')
  }
];

export const inventoryTransactions: InventoryTransaction[] = [
  {
    id: '1',
    itemId: '1',
    type: 'IN',
    quantity: 5,
    date: new Date('2023-01-10'),
    notes: 'Compra inicial'
  },
  {
    id: '2',
    itemId: '2',
    type: 'IN',
    quantity: 10,
    date: new Date('2023-01-15'),
    notes: 'Compra inicial'
  },
  {
    id: '3',
    itemId: '2',
    type: 'OUT',
    quantity: 2,
    date: new Date('2023-02-05'),
    notes: 'Enviado para setor de TI'
  },
  {
    id: '4',
    itemId: '3',
    type: 'IN',
    quantity: 3,
    date: new Date('2023-02-01'),
    notes: 'Compra inicial'
  },
  {
    id: '5',
    itemId: '4',
    type: 'IN',
    quantity: 25,
    date: new Date('2023-02-10'),
    notes: 'Compra inicial'
  },
  {
    id: '6',
    itemId: '4',
    type: 'OUT',
    quantity: 5,
    date: new Date('2023-03-10'),
    notes: 'Enviado para setor administrativo'
  },
  {
    id: '7',
    itemId: '5',
    type: 'IN',
    quantity: 10,
    date: new Date('2023-03-01'),
    notes: 'Compra inicial'
  },
  {
    id: '8',
    itemId: '6',
    type: 'IN',
    quantity: 10,
    date: new Date('2023-03-15'),
    notes: 'Compra inicial'
  },
  {
    id: '9',
    itemId: '6',
    type: 'OUT',
    quantity: 3,
    date: new Date('2023-04-05'),
    notes: 'Enviado para setor de design'
  },
  {
    id: '10',
    itemId: '7',
    type: 'IN',
    quantity: 15,
    date: new Date('2023-04-01'),
    notes: 'Compra inicial'
  },
  {
    id: '11',
    itemId: '7',
    type: 'OUT',
    quantity: 3,
    date: new Date('2023-04-15'),
    notes: 'Enviado para recepção'
  }
];
