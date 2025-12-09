
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PRODUCTS } from '../constants';
import KpiCard from './KpiCard';
import { BoxIcon } from './icons/BoxIcon';
import { AlertIcon } from './icons/AlertIcon';
import { WalletIcon } from './icons/WalletIcon';
import { PlusIcon } from './icons/PlusIcon';
import { StockStatus } from '../types';

const DashboardView: React.FC = () => {
  const totalSku = PRODUCTS.length;
  const lowStockCount = PRODUCTS.filter(p => p.status === StockStatus.Critical).length;
  const totalAssetValue = PRODUCTS.reduce((acc, p) => acc + p.price * p.stock, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const chartData = [...PRODUCTS]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map(p => ({ name: p.sku, stok: p.stock }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard
          title="Total SKU Barang"
          value={totalSku.toString()}
          icon={BoxIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          footerText="Aktif"
          footerIcon="check"
        />
        <KpiCard
          title="Stok Menipis (Alert)"
          value={lowStockCount.toString()}
          icon={AlertIcon}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          description="Barang di bawah Reorder Point"
        />
        <KpiCard
          title="Total Nilai Aset"
          value={formatCurrency(totalAssetValue)}
          icon={WalletIcon}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          description="Valuasi berdasarkan harga beli"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Stok Terbanyak</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                <Bar dataKey="stok" fill="#3B82F6" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <PlusIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Kelola Inventaris</h3>
            <p className="text-sm text-gray-500 mb-4">Tambahkan SKU baru ke dalam database.</p>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Tambah Barang Baru
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
