'use client';

import React from 'react';
import { CollectionForm } from './library/form-view';
import { CollectionTable } from './library/table-view';
import { RowEvents, TableEvents } from './library/table-view';
import {getFormStore, useFormStore} from './library/context/form-store-context';
export type { RowEvents, TableEvents };

export {  registerCustomComponent, registerCustomComponents, clearCustomComponents } from './library/form-view';
export { validateForm,validateFormValue,validateValue, schemaValidator } from './library/form-view/form-validator';
export * from './library/controls';
export {getFormStore,useFormStore}


export interface AppmintFormProps {
  demo?: boolean;
  data?: any;
  path?: string;
  title?: string;
  schema?: any;
  rules?: any;
  theme?: any;
  accessMode?: string;
  id?: string;
  datatype?: string;
  icon?: string;
  readOnly?: boolean;
  hash?: string;
  useAI?: boolean;
  collapsible?: boolean;
  onChange?: (path: string, value: any, data: any, files: any, error: any) => any;
  onFormEvent?: (eventName: any, params: any, options?: any) => Promise<any>;
}

export interface AppmintTableProps {
  hash?: string;
  options?: any;
  title?: string;
  description?: string;
  data?: any[];
  path?: string;
  columns?: any[];
  filterPreset?: any;
  schema?: any;
  filters?: any[];
  selectedIds?: string[];
  accessMode?: string;
  inlineEdit?: boolean;
  datatype?: string;
  isDemo?: boolean;
  onRowEvent?: (event: RowEvents, rowId: string, row: any) => any;
  onTableEvent?: (event: TableEvents, option: any, selected: any[]) => any;
  isLoading?: boolean;
  cellRenderers?: Record<string, (value: any, row: any) => React.ReactNode>;
  itemRenderer?: (item: any) => React.ReactNode;
}

export const AppmintForm: React.FC<AppmintFormProps> = (props) => {
  console.log('AppmintForm', props);
  return <CollectionForm {...props} />;
};

export const AppmintTable: React.FC<AppmintTableProps> = (props) => {
  console.log('AppmintTable', props);
  return <CollectionTable {...props} />;
};
