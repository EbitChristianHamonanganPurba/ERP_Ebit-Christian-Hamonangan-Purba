
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';
import { StockStatus } from '../types';
import { SearchIcon } from './icons/SearchIcon';

const ProductView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return PRODUCTS;
    }
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const getStatusClass = (status: StockStatus) => {
    switch (status) {
      case StockStatus.Safe:
        return 'bg-green-100 text-green-800';
      case StockStatus.Critical:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockClass = (status: StockStatus) => {
     return status === StockStatus.Critical ? 'text-red-600' : 'text-green-600';
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Daftar Semua Barang</h3>
        <div className="relative">
            <input
                type="text"
                placeholder="Cari SKU atau Nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">SKU</th>
              <th scope="col" className="px-6 py-3">Nama Barang</th>
              <th scope="col" className="px-6 py-3">Kategori</th>
              <th scope="col" className="px-6 py-3">Harga Satuan</th>
              <th scope="col" className="px-6 py-3 text-center">Stok</th>
              <th scope="col" className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.sku} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {product.sku}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className={`px-6 py-4 text-center font-bold ${getStockClass(product.status)}`}>
                    {product.stock}
                </td>
                <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(product.status)}`}>
                        {product.status}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductView;
