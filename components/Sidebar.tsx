
import React from 'react';
import type { ViewType } from '../types';
import { DashboardIcon } from './icons/DashboardIcon';
import { ProductIcon } from './icons/ProductIcon';
import { TransactionIcon } from './icons/TransactionIcon';
import { SupplierIcon } from './icons/SupplierIcon';
import { BoxIcon } from './icons/BoxIcon';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const navItems: { name: ViewType; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: 'Dashboard', icon: DashboardIcon },
  { name: 'Produk', icon: ProductIcon },
  { name: 'Transaksi', icon: TransactionIcon },
  { name: 'Supplier', icon: SupplierIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center text-blue-600">
          <BoxIcon className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">ERP Inventaris</h1>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveView(item.name)}
                className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeView === item.name
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
