import React, { useState, useEffect } from 'react';
import { CollectionTableView } from './view-table';
import { CollectionTableCardView, CardFieldsMap } from './view-cards';
import { CollectionTabView } from './view-tabs';
import { ViewSwitcher } from './view-switcher';

export interface CollectionViewContainerProps {
  table: any;
  selectRow: (row: any) => void;
  selectedRows: string[];
  slimRow?: boolean;
  onRowEvent?: (event: string, option: any, selected: any) => void;
  options?: any;
  itemRenderer?: React.ComponentType<any>;
  onRowDataEvent?: (event: string, id: string, row: any) => void;
  datatype?: string;
  
  // View configuration
  defaultViewType?: 'table' | 'card' | 'tab';
  viewType?: 'table' | 'card' | 'tab';
  onViewTypeChange?: (viewType: 'table' | 'card' | 'tab') => void;
  
  // Card view configuration
  cardFieldsMap?: CardFieldsMap;
  
  // Tab view configuration
  tabField?: string;
  contentViewType?: 'table' | 'card';
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

export const CollectionViewContainer: React.FC<CollectionViewContainerProps> = (props) => {
  const { 
    defaultViewType = 'table',
    viewType: controlledViewType,
    onViewTypeChange,
    cardFieldsMap,
    tabField = 'type',
    contentViewType = 'table',
    defaultTab = 'all',
    onTabChange,
    ...restProps
  } = props;
  
  // State for view type (controlled or uncontrolled)
  const [internalViewType, setInternalViewType] = useState<'table' | 'card' | 'tab'>(defaultViewType);
  
  // Use controlled value if provided, otherwise use internal state
  const viewType = controlledViewType !== undefined ? controlledViewType : internalViewType;
  
  // Update internal state when defaultViewType changes
  useEffect(() => {
    if (controlledViewType === undefined) {
      setInternalViewType(defaultViewType);
    }
  }, [defaultViewType, controlledViewType]);
  
  // Handle view type change
  const handleViewTypeChange = (newViewType: 'table' | 'card' | 'tab') => {
    if (onViewTypeChange) {
      onViewTypeChange(newViewType);
    } else {
      setInternalViewType(newViewType);
    }
    
    // Save preference to localStorage
    try {
      localStorage.setItem('preferredViewType', newViewType);
    } catch (e) {
      console.warn('Failed to save view preference to localStorage', e);
    }
  };
  
  // Load saved preference on mount
  useEffect(() => {
    if (controlledViewType === undefined) {
      try {
        const savedViewType = localStorage.getItem('preferredViewType') as 'table' | 'card' | 'tab' | null;
        if (savedViewType && ['table', 'card', 'tab'].includes(savedViewType)) {
          setInternalViewType(savedViewType);
        }
      } catch (e) {
        console.warn('Failed to load view preference from localStorage', e);
      }
    }
  }, [controlledViewType]);
  
  return (
    <div className="relative">
      {/* View Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <ViewSwitcher viewType={viewType} onChange={handleViewTypeChange} />
      </div>
      
      {/* Render appropriate view based on viewType */}
      {viewType === 'table' && (
        <CollectionTableView 
          table={restProps.table}
          selectRow={restProps.selectRow}
          selectedRows={restProps.selectedRows}
          slimRow={restProps.slimRow || false}
          onRowEvent={restProps.onRowEvent || (() => {})}
          options={restProps.options || {}}
          onRowDataEvent={restProps.onRowDataEvent || (() => {})}
          datatype={restProps.datatype || ''}
        />
      )}
      
      {viewType === 'card' && (
        <CollectionTableCardView 
          table={restProps.table}
          selectRow={restProps.selectRow}
          selectedRows={restProps.selectedRows}
          slimRow={restProps.slimRow || false}
          onRowEvent={restProps.onRowEvent || (() => {})}
          options={restProps.options || {}}
          itemRenderer={restProps.itemRenderer}
          onRowDataEvent={restProps.onRowDataEvent || (() => {})}
          datatype={restProps.datatype || ''}
          cardFieldsMap={cardFieldsMap}
        />
      )}
      
      {viewType === 'tab' && (
        <CollectionTabView 
          table={restProps.table}
          selectRow={restProps.selectRow}
          selectedRows={restProps.selectedRows}
          slimRow={restProps.slimRow || false}
          onRowEvent={restProps.onRowEvent || (() => {})}
          options={restProps.options || {}}
          itemRenderer={restProps.itemRenderer}
          onRowDataEvent={restProps.onRowDataEvent || (() => {})}
          datatype={restProps.datatype || ''}
          tabField={tabField} 
          contentViewType={contentViewType}
          defaultTab={defaultTab}
          onTabChange={onTabChange}
          cardFieldsMap={cardFieldsMap}
        />
      )}
    </div>
  );
};
