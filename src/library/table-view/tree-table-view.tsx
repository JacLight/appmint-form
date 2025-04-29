import React, { useState, useEffect, useCallback } from 'react';
import { InlineEditCell } from './inline-edit-cell';
import { ColumnHead } from './column-head';
import { RowHandler } from './row-handler';
import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { TableColumns } from './table-columns';
import { ColumnFilters } from './column-filters';
import { IndeterminateCheckbox } from '../common/indeterminate-checkbox';
import { classNames } from '../utils';
import { IconRenderer } from '../common/icons/icon-renderer';
import { TableFilter } from './table-filter';
import { TablePagination } from './table-pagination';
import { TablePresetFilter } from './table-preset-filter';
import { TableButtons } from './table-buttons';
import { TableGroup } from './table-group';
import { convertSchemaToColumns } from './generate.colums';
import { getRandomString, toTitleCase } from '../utils';

// Interface for tree configuration
export interface TreeConfig {
  parentField: string;      // Field containing parent ID
  idField?: string;         // Field serving as unique ID (defaults to row.id)
  expandedByDefault?: boolean; // Whether nodes should be expanded by default
}

// Interface for tree node
interface TreeNode {
  id: string;
  data: any;
  children: TreeNode[];
  depth: number;
  parentId: string | null;
  expanded?: boolean;
}

export type TableEvents = 'data-request' | 'data-loaded' | 'select' | 'export' | 'refresh' | 'delete' | 'add' | 'datatype';
export type RowEvents = 'edit' | 'delete' | 'view' | 'clone' | 'select';

// Stubs for missing dependencies
const GenerateSchema = {
  json: (title, data) => ({
    title,
    type: 'object',
    properties: {}
  })
};

export const TreeTableView = (props: {
  hash?;
  options?;
  title?;
  description?;
  data?;
  path?;
  columns?;
  filterPreset?;
  schema?;
  filters?;
  accessMode?;
  inlineEdit?;
  datatype?;
  isDemo?;
  onRowEvent?: (event: RowEvents, rowId, row) => any;
  onTableEvent?: (event: TableEvents, option, selected) => any;
  onRowDataEvent?: (event: RowEvents, rowId, row) => any;
  isLoading?;
  cellRenderers?;
  treeConfig?: TreeConfig;
}) => {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 40 });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [datatype, setDatatype] = useState(props.datatype);
  const [globalFilter, setGlobalFilter] = useState('');

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // State for tree data
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  // State for flattened visible rows
  const [visibleRows, setVisibleRows] = useState<any[]>([]);
  const [editedData, setEditedData] = useState<Record<string, any>>({});

  // Get tree configuration
  const treeConfig: TreeConfig = props.treeConfig || {
    parentField: 'parentId',
    idField: 'id',
    expandedByDefault: true
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (newPagination: any) => {
      setPagination(newPagination);
      setCurrentPage(newPagination.pageIndex);
    },
    globalFilterFn: 'fuzzy' as any,
    enableMultiRowSelection: true,
  });

  useEffect(() => {
    let schema = props.schema;
    if (!schema) {
      schema = GenerateSchema.json(props.title || getRandomString(6), props.data);
    }
    const [row0] = Array.isArray(props?.data) ? props?.data : [];
    let auditFields;
    let idField;
    let dataPrefix;
    if (props.datatype || row0?.id) {
      auditFields = true;
      idField = 'sk';
      dataPrefix = 'data';
    } else if (row0 && typeof row0 === 'object') {
      for (const key in ['_id', 'id', 'uid', 'key', 'name', 'title', 'label']) {
        if (row0[key]) {
          idField = key;
          break;
        }
      }
    }
    const columns = props.columns || convertSchemaToColumns(idField, schema, props.cellRenderers);
    setColumns(columns);
    if (props.isDemo) {
      setData(generateFakeData(columns, 100));
    } else if (props.data) {
      setData(props.data);
    }
  }, [props.data, props.hash, props.datatype, props.schema, props.columns]);

  // Transform flat data into tree structure
  useEffect(() => {
    if (!data.length) return;

    const idField = treeConfig.idField || 'id';
    const parentField = treeConfig.parentField;
    const expandedByDefault = treeConfig.expandedByDefault !== false;

    // Create a map of all rows by ID for quick lookup
    const rowsById = new Map();
    data.forEach(row => {
      const id = row[idField] || row.id;
      rowsById.set(id, row);

      // Initialize expanded state if not already set
      if (expandedRows[id] === undefined) {
        expandedRows[id] = expandedByDefault;
      }
    });

    // Build tree structure
    const tree: TreeNode[] = [];
    const nodeMap = new Map();

    // First pass: create nodes
    data.forEach(row => {
      const id = row[idField] || row.id;
      const parentId = row[parentField] || null;

      const node: TreeNode = {
        id,
        data: row,
        children: [],
        depth: 0,
        parentId,
        expanded: expandedRows[id] || expandedByDefault
      };

      nodeMap.set(id, node);
    });

    // Second pass: build relationships
    nodeMap.forEach((node, id) => {
      const parentId = node.parentId;

      if (parentId && nodeMap.has(parentId)) {
        // This is a child node
        const parentNode = nodeMap.get(parentId);
        parentNode.children.push(node);
        node.depth = parentNode.depth + 1;
      } else {
        // This is a root node
        tree.push(node);
      }
    });

    setTreeData(tree);

    // Update expanded rows state
    const newExpandedRows = { ...expandedRows };
    nodeMap.forEach((node, id) => {
      if (newExpandedRows[id] === undefined) {
        newExpandedRows[id] = expandedByDefault;
      }
    });
    setExpandedRows(newExpandedRows);

    // Flatten visible tree based on expanded state
    flattenTree(tree);
  }, [data, treeConfig]);

  // Flatten tree based on expanded state
  const flattenTree = (nodes: TreeNode[]) => {
    const result: any[] = [];

    const processNode = (node: TreeNode) => {
      result.push(node.data);

      if (node.expanded && node.children.length > 0) {
        node.children.forEach(child => processNode(child));
      }
    };

    nodes.forEach(node => processNode(node));
    setVisibleRows(result);
  };

  // Toggle expanded state for a row
  const toggleExpanded = (id: string) => {
    const newExpandedRows = { ...expandedRows };
    newExpandedRows[id] = !newExpandedRows[id];
    setExpandedRows(newExpandedRows);

    // Update expanded state in tree data
    const updateNodeExpanded = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.id === id) {
          node.expanded = newExpandedRows[id];
        }
        if (node.children.length > 0) {
          updateNodeExpanded(node.children);
        }
      });
    };

    updateNodeExpanded(treeData);

    // Recompute visible rows
    flattenTree(treeData);
  };

  // Find node depth by ID
  const getNodeDepth = (id: string): number => {
    const findDepth = (nodes: TreeNode[], targetId: string): number => {
      for (const node of nodes) {
        if (node.id === targetId) {
          return node.depth;
        }

        if (node.children.length > 0) {
          const childDepth = findDepth(node.children, targetId);
          if (childDepth >= 0) {
            return childDepth;
          }
        }
      }

      return -1;
    };

    return findDepth(treeData, id);
  };

  // Check if a node has children
  const hasChildren = (id: string): boolean => {
    const findNode = (nodes: TreeNode[], targetId: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === targetId) {
          return node;
        }

        if (node.children.length > 0) {
          const foundNode = findNode(node.children, targetId);
          if (foundNode) {
            return foundNode;
          }
        }
      }

      return null;
    };

    const node = findNode(treeData, id);
    return node ? node.children.length > 0 : false;
  };

  // Get the ID field from a row
  const getRowId = (row: any): string => {
    const idField = treeConfig.idField || 'id';
    return row[idField] || row.id;
  };

  // Handle saving edited cell data
  const handleSaveCell = useCallback((value: any, row: any, column: any) => {
    const rowId = getRowId(row);
    const columnKey = column.accessorKey;

    // Update the edited data state
    setEditedData(prev => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [columnKey]: value
      }
    }));

    // Update the row data
    const updatedRow = { ...row, [columnKey]: value };

    // Find and update the row in the data array
    const updatedData = data.map(item =>
      getRowId(item) === rowId ? updatedRow : item
    );

    // Update the data state
    setData(updatedData);

    // Notify parent component if onRowEvent is provided
    if (props.onRowEvent) {
      props.onRowEvent('edit', rowId, updatedRow);
    }
  }, [data, props.onRowEvent]);

  // Handle canceling cell edit
  const handleCancelEdit = useCallback(() => {
    // No state changes needed for cancel
  }, []);

  const onTableEvent = async (e, option) => {
    let name;
    if (typeof e === 'object') {
      e.preventDefault();
      name = e.currentTarget.name;
    } else {
      name = e;
    }

    if (props.onTableEvent) {
      const selected: any[] = table.getSelectedRowModel().rows.map(row => row.original) || [];
      selectedRows.forEach(row => {
        const record = data[row];
        if (record) {
          selected.push(record);
        }
      });
      if (await props.onTableEvent(name, option, selected)) {
        return;
      }
    }

    if (name === 'datatype') {
      setDatatype(option);
    }
  };

  const selectRow = e => {
    const id = e.currentTarget.id;
    const index = selectedRows.indexOf(id);
    let selected;
    if (index > -1) {
      selected = selectedRows.filter(row => row !== id);
    } else {
      selected = [...selectedRows, id];
    }
    setSelectedRows(selected);

    if (props.onRowEvent) {
      props.onRowEvent('select', id, selected);
    }
  };

  const canSearch = props.options?.search !== false;
  const slimRow = props.options?.slimRow === true || props.options?.compact === true;
  const showGroup = props.options?.grouping !== false;
  const showPagination = props.options?.pagination !== false;

  const title = typeof props.title === 'undefined' && props.datatype ? toTitleCase(props.datatype) : props.title;

  return (
    <div className="h-[calc(100%-8px)] w-[calc(100%-8px)] p-2 mx-auto my-auto overflow-hidden min-w-[600px] dark:bg-gray-900/80 bg-white/80 rounded-xl shadow-lg">
      {canSearch && (
        <div className="lg:flex items-center">
          {(title || props.description) && <div className="lg:flex gap-3">
            <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">{title || ''}</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{props.description}</p>
          </div>
          }
          <div className="flex justify-between items-center gap-5 w-full">
            <TableFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} datatype={datatype} onTableEvent={onTableEvent} />
            <TableButtons onTableEvent={onTableEvent} options={props.options} selectedRows={selectedRows} />
          </div>
        </div>
      )}
      {(showGroup || props.filterPreset) && (
        <div className="lg:flex justify-between items-center gap-10 mt-4">
          {props.filterPreset && <TablePresetFilter filterPreset={props.filterPreset} />}
          {showGroup && <TableGroup />}
        </div>
      )}
      <div
        className={classNames(
          canSearch && showGroup ? 'h-[calc(100%-300px)] ' : canSearch && !showGroup ? 'h-[calc(100%-150px)] ' : !canSearch && showGroup ? 'h-[calc(100%-150px)]' : 'h-[calc(100%-90px)]',
          'mt-8 flow-root w-full overflow-auto',
        )}
      >
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="sticky top-0 z-10 bg-white dark:bg-gray-800 w-full">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 flex gap-2 items-center">
                    <IndeterminateCheckbox
                      {...{
                        checked: table.getIsAllPageRowsSelected(),
                        indeterminate: table.getIsSomePageRowsSelected(),
                        onChange: table.getToggleAllPageRowsSelectedHandler(),
                        className: 'w-4 h-4 mb-[5px] dark:bg-gray-700 dark:border-gray-400',
                      }}
                    />
                    <TableColumns table={table} />
                    <ColumnFilters table={table} />
                  </th>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-1 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                      <ColumnHead header={header} />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visibleRows.map(row => {
                const rowId = getRowId(row);
                const depth = getNodeDepth(rowId);
                const hasChildNodes = hasChildren(rowId);
                const isExpanded = expandedRows[rowId] || false;

                return (
                  <tr
                    key={rowId}
                    id={rowId}
                    className={classNames(
                      (selectedRows.includes(rowId)) && 'bg-cyan-100 dark:bg-cyan-900',
                      'cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-800'
                    )}
                    onClick={selectRow}
                  >
                    <td className={classNames(slimRow ? 'py-1' : 'py-2', 'relative whitespace-nowrap pl-2 pr-4 text-right text-sm font-medium sm:pr-0')}>
                      <RowHandler row={{ id: rowId, original: row }} onRowEvent={props.onRowEvent} options={props.options} datatype={props.datatype} onRowDataEvent={props.onRowDataEvent} />
                    </td>
                    {columns.map((column, cellIndex) => {
                      const value = row[column.accessorKey];
                      const cellRenderer = props.cellRenderers?.[column.accessorKey];
                      const render = cellRenderer ? cellRenderer(value, row) : value;

                      // Add tree controls to the first cell
                      if (cellIndex === 0) {
                        return (
                          <td key={column.accessorKey} className={classNames(slimRow ? 'py-1' : 'py-2', 'px-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 truncate')}>
                            <div className="flex items-center">
                              {/* Indentation based on depth */}
                              <div style={{ width: `${depth * 20}px` }} />

                              {/* Expand/collapse button if has children */}
                              {hasChildNodes ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpanded(rowId);
                                  }}
                                  className="mr-1 p-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                  <IconRenderer
                                    icon={isExpanded ? 'ChevronDown' : 'ChevronRight'}
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  />
                                </button>
                              ) : (
                                <div className="w-6" /> // Spacer for leaf nodes
                              )}

                              {/* Cell content */}
                              {render}
                            </div>
                          </td>
                        );
                      }

                      // Regular cells
                      return (
                        <td key={column.accessorKey} className={classNames(slimRow ? 'py-1' : 'py-2', 'px-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 truncate')}>
                          {props.inlineEdit ? (
                            <InlineEditCell
                              value={render}
                              row={row}
                              column={column}
                              schema={props.schema}
                              onSave={handleSaveCell}
                              onCancel={handleCancelEdit}
                            />
                          ) : (
                            render
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="dark:bg-gray-800">
                <td className="p-1 px-3">
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                      className: 'dark:bg-gray-700 dark:border-gray-400',
                    }}
                  />
                </td>
                <td colSpan={20} className="dark:text-gray-100">Page Rows ({visibleRows.length})</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {showPagination && <TablePagination table={table} />}
    </div>
  );
};

// Helper function to generate fake data (stub)
const generateFakeData = (columns, count) => {
  return Array.from({ length: count }, (_, i) => {
    const row = {};
    columns.forEach(col => {
      row[col.accessorKey] = `Value ${i}-${col.accessorKey}`;
    });
    return row;
  });
};
