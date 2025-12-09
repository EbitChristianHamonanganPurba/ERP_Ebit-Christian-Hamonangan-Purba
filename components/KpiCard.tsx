
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconBgColor: string;
  iconColor: string;
  description?: string;
  footerText?: string;
  footerIcon?: 'check' | 'arrow';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, iconBgColor, iconColor, description, footerText }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
      {footerText && (
        <div className="flex items-center text-sm text-green-600 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {footerText}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
