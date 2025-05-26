import React from 'react';
import { RadixDate } from '../common/radix-date';

interface DateTimePickerProps {
  onChange?: (value: any) => void;
  placeholder?: string;
  isRange?: boolean;
  showPreset?: boolean;
  className?: string;
  mode?: 'date-time' | 'date' | 'time';
  min?: string;
  max?: string;
  startDate?: string;
  endDate?: string;
  readOnly?: boolean;
  disabled?: boolean;
  schema?: any;
  theme?: any;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const handleChange = (value: string | string[] | null) => {
    if (props.onChange) {
      if (props.isRange && Array.isArray(value)) {
        props.onChange({ 
          startDate: value[0] || null, 
          endDate: value[1] || null 
        });
      } else {
        props.onChange({ 
          startDate: value, 
          endDate: null 
        });
      }
    }
  };

  // Determine the current value based on props
  const currentValue = props.isRange 
    ? [props.startDate, props.endDate].filter(Boolean)
    : props.startDate;

  return (
    <RadixDate
      value={currentValue}
      onChange={handleChange}
      variant={props.isRange ? 'range' : (props.mode as any)}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      readOnly={props.readOnly}
      className={props.className}
      schema={props.schema}
      theme={props.theme}
    />
  );
};