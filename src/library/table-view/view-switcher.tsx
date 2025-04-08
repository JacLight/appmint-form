import React from 'react';
import { IconRenderer } from '../common/icons/icon-renderer';

export interface ViewSwitcherProps {
  viewType: 'table' | 'card' | 'tab';
  onChange: (view: 'table' | 'card' | 'tab') => void;
  className?: string;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewType, onChange, className = '' }) => {
  return (
    <div className={`flex space-x-1 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      <button
        onClick={() => onChange('table')}
        className={`p-1.5 rounded-l ${viewType === 'table' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        title="Table View"
      >
        <IconRenderer icon="Table" className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('card')}
        className={`p-1.5 ${viewType === 'card' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        title="Card View"
      >
        <IconRenderer icon="Grid" className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('tab')}
        className={`p-1.5 rounded-r ${viewType === 'tab' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        title="Tab View"
      >
        <IconRenderer icon="Layers" className="w-4 h-4" />
      </button>
    </div>
  );
};
