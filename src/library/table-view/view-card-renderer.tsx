// GenericCardRenderer.jsx
import React, { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import { classNames } from '../utils';
import { IconRenderer } from '../common/icons/icon-renderer';

import { CardFieldsMap } from './view-cards';

// Helper function to detect important fields
const getDefaultCardFieldsMap = (columns) => {
  const columnIds = columns.map(col => col.id);
  const map: CardFieldsMap = {};
  
  // Title: First column or name/title field
  map.title = findField(columnIds, ['name', 'title', 'label']) || columnIds[0];
  
  // Subtitle: Description or second text field
  map.subtitle = findField(columnIds, ['description', 'summary', 'details']);
  
  // Status: Status or state field
  map.status = findField(columnIds, ['status', 'state', 'progress']);
  
  // Timestamp: Any date field
  map.timestamp = findField(columnIds, ['date', 'created', 'updated', 'due', 'modifydate']);
  
  // Image: Any image or avatar field
  map.image = findField(columnIds, ['image', 'avatar', 'photo', 'thumbnail']);
  
  // Tags: Any tags or categories field
  map.tags = findField(columnIds, ['tags', 'categories', 'labels']);
  
  // Type: Type or category field
  map.type = findField(columnIds, ['type', 'category', 'kind']);
  
  return map;
};

// Helper to find a field by common names
const findField = (columnIds, possibleNames) => {
  return columnIds.find(id => 
    possibleNames.some(name => 
      String(id).toLowerCase().includes(name.toLowerCase())
    )
  );
};

export const TableCardRenderer = ({ row, selected, onSelect, slimRow, cardFieldsMap }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get column IDs for mapping
  const columnIds = row.getVisibleCells().map(cell => cell.column.id);
  
  // Use provided cardFieldsMap or generate default
  const fieldMap = cardFieldsMap || getDefaultCardFieldsMap(row.getAllCells().map(cell => cell.column));
  
  // Get cells by field mapping
  const getCell = (fieldName) => {
    if (!fieldName) return null;
    return row.getVisibleCells().find(cell => cell.column.id === fieldMap[fieldName]);
  };
  
  const titleCell = getCell('title');
  const subtitleCell = getCell('subtitle');
  const statusCell = getCell('status');
  const timestampCell = getCell('timestamp');
  const imageCell = getCell('image');
  const tagsCell = getCell('tags');
  const typeCell = getCell('type');

  return (
    <div
      key={row.id}
      id={row.id}
      className={classNames(
        selected ? 'bg-cyan-100 dark:bg-cyan-900' : '',
        'p-6 border rounded-lg shadow-md cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-800 transition-colors duration-200',
        'dark:bg-gray-800 dark:border-gray-700 dark:text-white'
      )}
      onClick={() => onSelect(row)}
      role="button"
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(row);
        }
      }}
      aria-pressed={selected}
      aria-label={`Card for ${row.original.name || 'N/A'}`}
    >
      {/* Card Header with Image (if available) */}
      {imageCell && (
        <div className="h-40 bg-gray-100 dark:bg-gray-700 mb-4 rounded-t-lg overflow-hidden">
          <RecursiveRenderer value={imageCell.getValue()} />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        {/* Title and Status */}
        <div className="flex-1">
          {titleCell && (
            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-lg">
              {flexRender(titleCell.column.columnDef.header, titleCell.getContext())}: <RecursiveRenderer value={titleCell.getValue()} />
            </h3>
          )}
          {subtitleCell && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <RecursiveRenderer value={subtitleCell.getValue()} />
            </p>
          )}
        </div>
        
        {/* Status Indicator */}
        {statusCell && (
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(statusCell.getValue())}`}></span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{statusCell.getValue()}</span>
          </div>
        )}
      </div>
      
      {/* Metadata Section */}
      <div className="space-y-3">
        {/* Timestamp */}
        {timestampCell && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: <RecursiveRenderer value={timestampCell.getValue()} />
          </div>
        )}
        
        {/* Type Tag */}
        {typeCell && (
          <div className="mt-2">
            <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">
              <RecursiveRenderer value={typeCell.getValue()} />
            </span>
          </div>
        )}
        
        {/* Tags */}
        {tagsCell && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Array.isArray(tagsCell.getValue()) 
              ? tagsCell.getValue().map((tag, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))
              : <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  <RecursiveRenderer value={tagsCell.getValue()} />
                </span>
            }
          </div>
        )}
        
        {/* Other Fields (not in the main display) */}
        <div className="space-y-2 mt-3">
          {row.getVisibleCells()
            .filter(cell => {
              // Skip fields that are already displayed in the card
              const fieldValues = Object.values(fieldMap);
              return !fieldValues.includes(cell.column.id) && 
                     (!fieldMap.exclude || !fieldMap.exclude.includes(cell.column.id));
            })
            .map(cell => {
              const header = flexRender(cell.column.columnDef.header, cell.getContext());
              const value = cell.getValue();
              
              // Handle specific cases if needed, e.g., file attachments
              const headerStr = String(header);
              if (headerStr.toLowerCase().includes('file') || headerStr.toLowerCase().includes('attachment')) {
                return (
                  <div key={cell.id} className="flex">
                    <div className="font-semibold w-1/3 dark:text-gray-200">{header}:</div>
                    <div className="w-2/3">
                      {/* Assuming files are URLs */}
                      {isValidUrl(value) ? (
                        <div className="flex items-center">
                          <a href={value} download className="text-blue-500 dark:text-blue-400 hover:underline flex items-center">
                            Download
                            <IconRenderer icon='Download' className="ml-1" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Invalid File</span>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={cell.id} className="flex">
                  <div className="font-semibold w-1/3 dark:text-gray-200">{header}:</div>
                  <div className="w-2/3">
                    <RecursiveRenderer value={value} />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      {/* Expandable Section */}
      <button
        className="mt-4 text-blue-500 dark:text-blue-400 hover:underline"
        onClick={e => {
          e.stopPropagation(); // Prevent card click
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
      {isExpanded && (
        <div className="mt-2">
          {/* Render additional details here */}
          <pre className="text-sm text-gray-700 dark:text-gray-300">{JSON.stringify(row.original, null, 2)}</pre>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          onClick={e => {
            e.stopPropagation();
            // Handle Edit action
            console.log(`Edit row ${row.id}`);
          }}
          aria-label={`Edit ${row.original.name || 'N/A'}`}
        >
          <IconRenderer icon='Edit' />
        </button>
        <button
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          onClick={e => {
            e.stopPropagation();
            // Handle Delete action
            console.log(`Delete row ${row.id}`);
          }}
          aria-label={`Delete ${row.original.name || 'N/A'}`}
        >
          <IconRenderer icon='Trash' />
        </button>
      </div>
    </div>
  );
};

/**
 * RecursiveRenderer Component
 *
 * Props:
 * - value: The data to render, which can be a primitive, array, or object.
 */
const RecursiveRenderer = ({ value }) => {
  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Utility function to check if a string is a valid URL
  const isValidUrl = string => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Utility function to check if a URL points to an image
  const isImageUrl = url => {
    return /\.(jpeg|jpg|gif|png|svg)$/.test(url);
  };

  // Recursive rendering based on the type of value
  if (React.isValidElement(value)) {
    // If it's a React element, render it directly
    return value;
  }

  if (value === null || value === undefined) {
    return <span className="text-gray-500 dark:text-gray-400">N/A</span>;
  }

  if (Array.isArray(value)) {
    return (
      <ul className="list-disc list-inside">
        {value.map((item, index) => (
          <li key={index}>
            <RecursiveRenderer value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object') {
    return (
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {Object.entries(value).map(([key, val]) => (
          <div key={key} className="mb-1">
            <strong>{capitalizeFirstLetter(key)}:</strong> <RecursiveRenderer value={val} />
          </div>
        ))}
      </div>
    );
  }

  // Handle primitive types
  switch (typeof value) {
    case 'boolean':
      return value ?
        <IconRenderer icon='CircleCheck' className="text-green-500 dark:text-green-400 inline-block" /> :
        <IconRenderer icon='CircleX' className="text-red-500 dark:text-red-400 inline-block" />;
    case 'number':
      return <span className="text-right">{value}</span>;

    case 'string':
      if (isValidUrl(value)) {
        if (isImageUrl(value)) {
          return <img src={value} alt="Image" className="w-16 h-16 object-cover rounded" />;
        }
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
            Link
          </a>
        );
      }
      return <span>{value}</span>;

    default:
      return <span>{String(value)}</span>;
  }
};

// Utility functions
const isValidUrl = string => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const isImageUrl = url => {
  return /\.(jpeg|jpg|gif|png|svg)$/.test(url);
};

// Get color based on status
const getStatusColor = (status) => {
  if (!status) return 'bg-gray-500';
  
  const statusStr = String(status).toLowerCase();
  
  if (statusStr.includes('active') || statusStr.includes('published') || statusStr.includes('complete') || statusStr.includes('done')) {
    return 'bg-green-500';
  } else if (statusStr.includes('pending') || statusStr.includes('progress') || statusStr.includes('review')) {
    return 'bg-yellow-500';
  } else if (statusStr.includes('error') || statusStr.includes('failed') || statusStr.includes('rejected')) {
    return 'bg-red-500';
  } else if (statusStr.includes('draft')) {
    return 'bg-blue-500';
  }
  
  return 'bg-gray-500';
};
