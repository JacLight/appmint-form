import { CollectionTable } from './app';

export { InlineEditCell } from './inline-edit-cell';
export { CollectionTableView } from './view-table';
export { CollectionTableCardView } from './view-cards';
export { CollectionTreeView } from './renderer/view-tree';
export { TreeTableView } from './tree-table-view';
export { CollectionTabView } from './view-tabs';
export { ViewSwitcher } from './view-switcher';
export { CollectionViewContainer } from './collection-view-container';
export { TableCardRenderer } from './view-card-renderer';
export { CollectionTableCardPopup } from './view-card-popup';
export { CollectionTable } from './app';
export type { RowEvents, TableEvents } from './app';
export type { TreeConfig } from './tree-table-view';

// Card fields mapping type
export type CardFieldsMap = {
  title?: string;
  subtitle?: string;
  status?: string;
  timestamp?: string;
  image?: string;
  tags?: string;
  type?: string;
  [key: string]: string | undefined;
};

export default CollectionTable;
