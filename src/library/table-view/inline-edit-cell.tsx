import React, { useState, useEffect, useRef } from 'react';
import { elementToNameMap } from '../form-elements/all-elements';
import { determineMetaType } from './generate.colums';
import { IconRenderer } from '../common/icons/icon-renderer';
import { classNames } from '../utils';

interface InlineEditCellProps {
  value: any;
  row: any;
  column: any;
  schema?: any;
  onSave: (value: any, row: any, column: any) => void;
  onCancel: () => void;
}

export const InlineEditCell: React.FC<InlineEditCellProps> = ({
  value,
  row,
  column,
  schema,
  onSave,
  onCancel
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Determine the field type from schema or column metadata
  const getFieldType = () => {
    if (!schema) return 'text';

    const fieldPath = column.accessorKey.split('.');
    let fieldSchema = schema;
    
    // Navigate through nested schema properties
    for (const part of fieldPath) {
      if (fieldSchema.properties && fieldSchema.properties[part]) {
        fieldSchema = fieldSchema.properties[part];
      } else if (fieldSchema.items && fieldSchema.items.properties && fieldSchema.items.properties[part]) {
        fieldSchema = fieldSchema.items.properties[part];
      } else {
        // If we can't find the field in the schema, use the column meta type
        return mapMetaTypeToFieldType(column.meta);
      }
    }

    // Determine field type from schema
    if (fieldSchema.enum) return 'selectsingle';
    if (fieldSchema.format === 'date-time' || fieldSchema.format === 'date') return 'date';
    if (fieldSchema.format === 'email') return 'text'; // Use text with email validation
    if (fieldSchema.format === 'uri' || fieldSchema.format === 'url') return 'text'; // Use text with URL validation
    if (fieldSchema.type === 'boolean') return 'selectsingle'; // Use select with true/false options
    if (fieldSchema.type === 'number' || fieldSchema.type === 'integer') return 'number';
    if (fieldSchema.type === 'array') return 'selectmany';
    
    // Default to text
    return 'text';
  };

  // Map meta type to field type
  const mapMetaTypeToFieldType = (metaType: string) => {
    switch (metaType) {
      case 'boolean': return 'selectsingle';
      case 'date': return 'date';
      case 'email': return 'text';
      case 'file': return 'file';
      case 'image': return 'file';
      case 'link': return 'text';
      case 'enum': return 'selectsingle';
      case 'number': return 'number';
      case 'array': return 'selectmany';
      case 'object': return 'text'; // Could be improved with a JSON editor
      case 'string': return 'text';
      case 'status': return 'selectsingle';
      default: return 'text';
    }
  };

  // Get enum options from schema
  const getEnumOptions = () => {
    if (!schema) return [];

    const fieldPath = column.accessorKey.split('.');
    let fieldSchema = schema;
    
    // Navigate through nested schema properties
    for (const part of fieldPath) {
      if (fieldSchema.properties && fieldSchema.properties[part]) {
        fieldSchema = fieldSchema.properties[part];
      } else if (fieldSchema.items && fieldSchema.items.properties && fieldSchema.items.properties[part]) {
        fieldSchema = fieldSchema.items.properties[part];
      } else {
        return [];
      }
    }

    return fieldSchema.enum || [];
  };

  // Handle click outside to cancel editing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsEditing(false);
        onCancel();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, onCancel]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(value);
  };

  const handleSave = () => {
    onSave(editValue, row, column);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Render the appropriate form element based on field type
  const renderFormElement = () => {
    const fieldType = getFieldType();
    const ElementComponent = elementToNameMap[fieldType] || elementToNameMap.default;
    
    // Common props for all form elements
    const commonProps = {
      name: column.accessorKey,
      value: editValue,
      onChange: (val: any) => setEditValue(val),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      autoFocus: true,
      className: "w-full p-1 border border-blue-500 rounded",
      ref: inputRef
    };

    // Special handling for select elements
    if (fieldType === 'selectsingle') {
      const options = getEnumOptions().map(option => ({
        value: option,
        label: option
      }));
      
      // For boolean fields
      if (options.length === 0 && column.meta === 'boolean') {
        return (
          <ElementComponent
            {...commonProps}
            options={[
              { value: true, label: 'True' },
              { value: false, label: 'False' }
            ]}
          />
        );
      }
      
      return <ElementComponent {...commonProps} options={options} />;
    }
    
    // For other element types
    return <ElementComponent {...commonProps} />;
  };

  // If not editing, show the display value with an edit button
  if (!isEditing) {
    return (
      <div className="flex items-center justify-between group">
        <div className="truncate">{value}</div>
        <button
          onClick={handleStartEdit}
          className="invisible group-hover:visible p-1 text-gray-500 hover:text-blue-500"
          title="Edit"
        >
          <IconRenderer icon="Edit" className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // If editing, show the form element
  return (
    <div ref={wrapperRef} className="flex items-center space-x-1">
      <div className="flex-grow">
        {renderFormElement()}
      </div>
      <div className="flex space-x-1">
        <button
          onClick={handleSave}
          className="p-1 text-green-500 hover:text-green-700"
          title="Save"
        >
          <IconRenderer icon="Check" className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 text-red-500 hover:text-red-700"
          title="Cancel"
        >
          <IconRenderer icon="X" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
