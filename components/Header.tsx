
import React from 'react';
import { BellIcon } from './icons/BellIcon';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <BellIcon className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
