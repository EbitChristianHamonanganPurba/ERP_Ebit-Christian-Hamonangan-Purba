
export enum StockStatus {
  Safe = 'Aman',
  Critical = 'Stok Kritis',
}

export interface Product {
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: StockStatus;
}

export type ViewType = 'Dashboard' | 'Produk' | 'Transaksi' | 'Supplier';
