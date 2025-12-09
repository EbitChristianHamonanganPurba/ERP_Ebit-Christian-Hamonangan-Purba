
import type { Product } from './types';
import { StockStatus } from './types';

export const PRODUCTS: Product[] = [
  { sku: 'ELK-001', name: 'Laptop Gaming Pro', category: 'Elektronik', price: 15000000, stock: 5, status: StockStatus.Critical },
  { sku: 'FUR-042', name: 'Kursi Ergonomis', category: 'Furniture', price: 2500000, stock: 45, status: StockStatus.Safe },
  { sku: 'ATK-101', name: 'Kertas A4 (Rim)', category: 'Alat Tulis', price: 55000, stock: 120, status: StockStatus.Safe },
  { sku: 'ELK-009', name: 'Monitor 24 Inch', category: 'Elektronik', price: 1800000, stock: 8, status: StockStatus.Critical },
  { sku: 'OTO-005', name: 'Oli Mesin 1L', category: 'Otomotif', price: 75000, stock: 60, status: StockStatus.Safe },
  { sku: 'FUR-011', name: 'Meja Kantor Kayu', category: 'Furniture', price: 1200000, stock: 2, status: StockStatus.Critical },
  { sku: 'ATK-023', name: 'Pulpen Box (12 pcs)', category: 'Alat Tulis', price: 25000, stock: 250, status: StockStatus.Safe },
  { sku: 'ELK-015', name: 'Keyboard Mechanical', category: 'Elektronik', price: 950000, stock: 15, status: StockStatus.Safe },
];
