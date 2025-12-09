
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ProductView from './components/ProductView';
import TransactionView from './components/TransactionView';
import SupplierView from './components/SupplierView';
import type { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Produk':
        return <ProductView />;
      case 'Transaksi':
        return <TransactionView />;
      case 'Supplier':
        return <SupplierView />;
      default:
        return <DashboardView />;
    }
  };

  const getTitle = () => {
    if (activeView === 'Dashboard') return 'Ringkasan Stok';
    if (activeView === 'Produk') return 'Daftar Semua Barang';
    return activeView;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
