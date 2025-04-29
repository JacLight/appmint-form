import React, { useState, useEffect } from 'react';
import { CollectionTableView } from './view-table';
import { CollectionTableCardView } from './view-cards';

export interface CollectionTabViewProps {
  table: any;
  tabField: string;
  contentViewType?: 'table' | 'card';
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  selectedRows: string[];
  selectRow: (row: any) => void;
  slimRow?: boolean;
  onRowEvent?: (event: string, option: any, selected: any) => void;
  options?: any;
  itemRenderer?: React.ComponentType<any>;
  onRowDataEvent?: (event: string, id: string, row: any) => void;
  datatype?: string;
  cardFieldsMap?: any;
}

export const CollectionTabView: React.FC<CollectionTabViewProps> = props => {
  const {
    table,
    tabField,
    contentViewType = 'table',
    defaultTab = 'all',
    onTabChange,
    cardFieldsMap,
    ...restProps
  } = props;

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Extract unique values for tabs
  const allRows = table.getRowModel().rows;
  const uniqueTabValues = Array.from(
    new Set(
      allRows.map(row => {
        const value = row.getValue(tabField);
        return value === null || value === undefined
          ? 'Uncategorized'
          : String(value);
      })
    )
  ).sort();

  const tabs: string[] = ['all', ...(uniqueTabValues.map(value => String(value)) || [])];

  // Filter rows based on selected tab
  const filteredRows =
    activeTab === 'all'
      ? allRows
      : allRows.filter(row => {
          const value = row.getValue(tabField);
          const stringValue =
            value === null || value === undefined
              ? 'Uncategorized'
              : String(value);
          return stringValue === activeTab;
        });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Create a modified table object with filtered rows
  const filteredTable = {
    ...table,
    getRowModel: () => ({
      ...table.getRowModel(),
      rows: filteredRows,
    }),
  };

  return (
    <div className="space-y-4">
      {/* Tab Header */}
      <div className="flex space-x-1 mb-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto pb-1">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab === 'all' ? 'All' : tab}
            {tab !== 'all' && (
              <span className="ml-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                {
                  allRows.filter(row => {
                    const value = row.getValue(tabField);
                    const stringValue =
                      value === null || value === undefined
                        ? 'Uncategorized'
                        : String(value);
                    return stringValue === tab;
                  }).length
                }
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content based on selected view type */}
      {contentViewType === 'table' ? (
        <CollectionTableView
          table={filteredTable}
          selectRow={props.selectRow}
          selectedRows={props.selectedRows}
          slimRow={props.slimRow || false}
          onRowEvent={props.onRowEvent || (() => {})}
          options={props.options || {}}
          onRowDataEvent={props.onRowDataEvent || (() => {})}
          datatype={props.datatype || ''}
        />
      ) : (
        <CollectionTableCardView
          table={filteredTable}
          selectRow={props.selectRow}
          selectedRows={props.selectedRows}
          slimRow={props.slimRow || false}
          onRowEvent={props.onRowEvent || (() => {})}
          options={props.options || {}}
          itemRenderer={props.itemRenderer}
          onRowDataEvent={props.onRowDataEvent || (() => {})}
          datatype={props.datatype || ''}
          cardFieldsMap={cardFieldsMap}
        />
      )}
    </div>
  );
};
