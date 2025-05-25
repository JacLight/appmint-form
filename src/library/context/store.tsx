import { FormLayoutAccordion } from '../form-view/form-layout-accordion';
import { FormLayoutTab } from '../form-view/form-layout-tab';
import { getRandomString } from '../utils';
import { getComponentPartStyling } from '../form-elements/styling/style-utils';
import { LegacyTheme, ThemeStyling } from '../form-elements/styling/theme-settings';

export const formLayouts = {
  accordion: FormLayoutAccordion,
  tab: FormLayoutTab,
};

export interface FormStoreProps {
  datatype?: string;
  schema?: any;
  theme?: any;
  ref?: string;
  storeId: string;
  activePath?: string;
  activeDataPath?: string;
  timestamp?: { [key: string]: number };
  page?: number;
  data: any;
  error: any;
  rules?: any;
  accessMode: string;
  watchedPaths: { [key: string]: string[] };
  ruleResults?: { [key: string]: any[] };
  activePage?: number;
  collectionForm?: boolean;
  email?: string;
  files: any;
  readOnly?: boolean;
  dataBindValue?: any;
  repository: { [key: string]: any };
  notifications?: any[];
  dataViewProps?: any;
  refreshPath(path: string): void;
  setStateItem: (item: { [key: string]: any }) => void;
  getStateItem: (key: string) => any;
  getSchemaItem: (path?: string) => any;
  getItemValue: (path?: string) => any;
  getDefaultValue: (path: string, schema?: any, schemaPath?: string, data?: any) => any;
  getError: (path?: string, startsWith?: boolean) => any;
  updateError: (path: string, message?: string) => void;
  clearError: () => void;
  updateBulkError: (validation: { valid; errors: any[]; message; validationResults: { path; error; message }[] }) => void;
  clearData?: () => void;
  setItemValue: (path: string, value: any, arrayIndex?, silent?: boolean, isFile?: boolean) => void;
  initForm: (formConfig: { data?; readOnly?; path?; schema; rules?; theme?; accessMode?; storeId; datatype?; onChangeCallback? }) => void;
  removeArrayValue: (path: string, index) => void;
  updateWatchedPath: (watcher: string, paths: string[]) => void;
  applyRuleResult: (path?, schema?) => any;
  onChangeCallback?: (path: string, value: any, data: any, files: any, error: any) => void;
  updateRepository: (path: string, value?: any) => void;
  onFormEvent: (eventName: any, params: any, options?: any) => Promise<any>;
}

export const showNotice = (message, type: string) => {
  if (typeof message !== 'string') return;
  const notification = { id: getRandomString(6), title: '', message, type, status: 'new' };
};

export const getElementTheme = (componentType: string, theme: string | ThemeStyling = 'default'): LegacyTheme => {
  if (!componentType) return null;

  if (theme === 'unstyled') return { classes: [], style: {}, className: '' };

  // Get styling using the modern system
  const className = getComponentPartStyling(componentType, 'container', '', theme);

  // Return in the format expected by existing code
  return {
    classes: className.split(' ').filter(Boolean),
    style: {},
    className,
  };
};

export const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-yellow-100 text-yellow-700',
  sent: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-red-100 text-red-700',
  archived: 'bg-gray-100 text-gray-700',
  deleted: 'bg-gray-100 text-gray-700',
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'text-green-600 bg-green-50 ring-green-600/20',
  inactive: 'text-red-600 bg-red-50 ring-red-600/20',
  trial: 'text-blue-600 bg-blue-50 ring-blue-600/20',
  suspended: 'text-red-600 bg-red-50 ring-red-600/20',
  expired: 'text-red-600 bg-red-50 ring-red-600/20',
  grace: 'text-yellow-600 bg-yellow-50 ring-yellow-600/20',
};

export const planColors = {
  free: 'text-gray-600 bg-gray-100 ring-gray-500/10',
  basic: 'text-blue-700 bg-blue-100 ring-blue-600/20',
  pro: 'text-yellow-800 bg-yellow-100 ring-yellow-600/20',
  enterprise: 'text-green-700 bg-green-100 ring-green-600/20',
  team: 'text-indigo-700 bg-indigo-100 ring-indigo-600/20',
};
