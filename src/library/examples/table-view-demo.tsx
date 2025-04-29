import React from 'react';
import { TableViewExample } from './table-view-example';

export const TableViewDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Table View Components Demo
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Demonstration of table, card, and tab views with sample data
          </p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TableViewExample />
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow mt-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            This demo showcases the table view components with different view types.
            The components support table, card, and tab views with customizable field mappings.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TableViewDemo;
