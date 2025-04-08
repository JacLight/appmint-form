import React, { useState, useEffect } from 'react';
import { ColumnHead } from '../column-head';
import { RowHandler } from '../row-handler';
import { flexRender } from '@tanstack/react-table';
import { TableColumns } from '../table-columns';
import { ColumnFilters } from '../column-filters';
import { IndeterminateCheckbox } from '../../common/indeterminate-checkbox';
import { classNames } from '../../utils';
import { IconRenderer } from '../../common/icons/icon-renderer';

// Interface for tree configuration
interface TreeConfig {
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

export const CollectionTreeView = (props: { 
  table; 
  selectRow; 
  selectedRows; 
  slimRow; 
  onRowEvent; 
  options; 
  onRowDataEvent; 
  datatype 
}) => {
  const { table, selectedRows, slimRow, selectRow } = props;
  
  // Get tree configuration from options
  const treeConfig: TreeConfig = props.options?.treeConfig || {
    parentField: 'parentId',
    idField: 'id',
    expandedByDefault: true
  };
  
  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  // State for tree data
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  
  // State for flattened visible rows
  const [visibleRows, setVisibleRows] = useState<any[]>([]);
  
  // Transform flat data into tree structure
  useEffect(() => {
    const rows = table.getRowModel().rows;
    if (!rows.length) return;
    
    const idField = treeConfig.idField || 'id';
    const parentField = treeConfig.parentField;
    const expandedByDefault = treeConfig.expandedByDefault !== false;
    
    // Create a map of all rows by ID for quick lookup
    const rowsById = new Map();
    rows.forEach(row => {
      const id = row.original[idField] || row.id;
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
    rows.forEach(row => {
      const id = row.original[idField] || row.id;
      const parentId = row.original[parentField] || null;
      
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
  }, [table.getRowModel().rows, treeConfig]);
  
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
    return row.original[idField] || row.id;
  };
  
  return (
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
                key={row.id}
                id={row.id}
                className={classNames(
                  (selectedRows.includes(row.id) || row.getIsSelected()) && 'bg-cyan-100 dark:bg-cyan-900',
                  'cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-800'
                )}
                onClick={selectRow}
              >
                <td className={classNames(slimRow ? 'py-1' : 'py-2', 'relative whitespace-nowrap pl-2 pr-4 text-right text-sm font-medium sm:pr-0')}>
                  <RowHandler row={row} onRowEvent={props.onRowEvent} options={props.options} onRowDataEvent={props.onRowDataEvent} datatype={props.datatype} />
                </td>
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const render = flexRender(cell.column.columnDef.cell, cell.getContext());
                  
                  // Add tree controls to the first cell
                  if (cellIndex === 0) {
                    return (
                      <td key={cell.id} className={classNames(slimRow ? 'py-1' : 'py-2', 'px-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 truncate')}>
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
                    <td key={cell.id} className={classNames(slimRow ? 'py-1' : 'py-2', 'px-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 truncate')}>
                      {render}
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
  );
};
