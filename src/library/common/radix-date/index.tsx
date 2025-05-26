import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, isValid } from 'date-fns';
import { Calendar, Clock, CalendarDays } from 'lucide-react';
import 'react-day-picker/style.css';

interface RadixDateProps {
  value?: string | string[] | Date | Date[];
  onChange?: (value: string | string[] | null) => void;
  onFocus?: (value?: any) => void;
  onBlur?: (value?: any) => void;
  variant?: 'date' | 'time' | 'date-time' | 'range';
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  schema?: any;
  theme?: any;
}

export const RadixDate: React.FC<RadixDateProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  variant = 'date',
  placeholder,
  min,
  max,
  disabled = false,
  readOnly = false,
  className = '',
  required = false,
  schema,
  theme
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | Date[] | undefined>();
  const [timeValue, setTimeValue] = useState('');

  const isRange = variant === 'range' || Array.isArray(value);
  const hasTime = variant === 'date-time' || variant === 'time';

  // Parse value to Date objects
  useEffect(() => {
    if (!value) {
      setInternalValue(undefined);
      setTimeValue('');
      return;
    }

    if (Array.isArray(value)) {
      // Range mode
      const dates = value
        .map(v => {
          if (typeof v === 'string') return isValid(parseISO(v)) ? parseISO(v) : null;
          if (v instanceof Date) return isValid(v) ? v : null;
          return null;
        })
        .filter(Boolean) as Date[];
      setInternalValue(dates.length > 0 ? dates : undefined);
    } else {
      // Single date mode
      let date: Date | null = null;
      if (typeof value === 'string') {
        if (variant === 'time') {
          setTimeValue(value);
          return;
        }
        date = isValid(parseISO(value)) ? parseISO(value) : null;
      } else if (value instanceof Date) {
        date = isValid(value) ? value : null;
      }
      
      if (date) {
        setInternalValue(date);
        if (hasTime) {
          setTimeValue(format(date, 'HH:mm'));
        }
      } else {
        setInternalValue(undefined);
        setTimeValue('');
      }
    }
  }, [value, variant, hasTime]);

  // Format display value
  const getDisplayValue = (): string => {
    if (!internalValue) {
      if (variant === 'time' && timeValue) return timeValue;
      return '';
    }

    if (Array.isArray(internalValue)) {
      // Range display
      if (internalValue.length === 0) return '';
      if (internalValue.length === 1) {
        return hasTime 
          ? format(internalValue[0], 'MMM dd, yyyy HH:mm')
          : format(internalValue[0], 'MMM dd, yyyy');
      }
      return hasTime
        ? `${format(internalValue[0], 'MMM dd, yyyy HH:mm')} - ${format(internalValue[1], 'MMM dd, yyyy HH:mm')}`
        : `${format(internalValue[0], 'MMM dd, yyyy')} - ${format(internalValue[1], 'MMM dd, yyyy')}`;
    } else {
      // Single date display
      if (variant === 'time') return timeValue;
      return hasTime 
        ? format(internalValue, 'MMM dd, yyyy HH:mm')
        : format(internalValue, 'MMM dd, yyyy');
    }
  };

  // Handle date selection
  const handleDateSelect = (date: Date | Date[] | undefined) => {
    if (!onChange) return;

    if (variant === 'time') {
      // Time only mode
      return;
    }

    if (isRange) {
      if (!date) {
        setInternalValue(undefined);
        onChange(null);
        return;
      }

      const dateArray = Array.isArray(date) ? date : [date];
      setInternalValue(dateArray);
      
      const isoValues = dateArray.map(d => {
        if (hasTime && timeValue) {
          const [hours, minutes] = timeValue.split(':').map(Number);
          const newDate = new Date(d);
          newDate.setHours(hours, minutes);
          return newDate.toISOString();
        }
        return d.toISOString();
      });
      
      onChange(isoValues);
    } else {
      if (!date) {
        setInternalValue(undefined);
        onChange(null);
        return;
      }

      const singleDate = Array.isArray(date) ? date[0] : date;
      setInternalValue(singleDate);

      if (hasTime && timeValue) {
        const [hours, minutes] = timeValue.split(':').map(Number);
        const newDate = new Date(singleDate);
        newDate.setHours(hours, minutes);
        onChange(newDate.toISOString());
      } else {
        onChange(singleDate.toISOString());
      }
    }

    if (!hasTime) {
      setOpen(false);
    }
  };

  // Handle time change
  const handleTimeChange = (newTimeValue: string) => {
    setTimeValue(newTimeValue);
    
    if (variant === 'time') {
      onChange?.(newTimeValue);
      return;
    }

    if (!internalValue || !onChange) return;

    const [hours, minutes] = newTimeValue.split(':').map(Number);
    
    if (Array.isArray(internalValue)) {
      const updatedDates = internalValue.map(date => {
        const newDate = new Date(date);
        newDate.setHours(hours, minutes);
        return newDate.toISOString();
      });
      onChange(updatedDates);
    } else {
      const newDate = new Date(internalValue);
      newDate.setHours(hours, minutes);
      onChange(newDate.toISOString());
    }
  };

  // Min/max date constraints
  const minDate = min ? (isValid(parseISO(min)) ? parseISO(min) : undefined) : undefined;
  const maxDate = max ? (isValid(parseISO(max)) ? parseISO(max) : undefined) : undefined;

  const getIcon = () => {
    switch (variant) {
      case 'time':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'range':
        return <CalendarDays className="w-4 h-4 text-gray-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  if (variant === 'time') {
    return (
      <div className={`relative ${className}`}>
        <input
          type="time"
          value={timeValue}
          onChange={(e) => handleTimeChange(e.target.value)}
          onFocus={() => onFocus?.(timeValue)}
          onBlur={() => onBlur?.(timeValue)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          placeholder={placeholder || 'Select time'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {getIcon()}
        </div>
      </div>
    );
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={disabled || readOnly}
          onClick={() => onFocus?.(getDisplayValue())}
          className={`w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
        >
          <div className="flex items-center justify-between">
            <span className={!getDisplayValue() ? 'text-gray-400' : 'text-gray-900'}>
              {getDisplayValue() || placeholder || `Select ${variant}`}
            </span>
            {getIcon()}
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
          sideOffset={4}
          align="start"
        >
          <div className="space-y-4">
            {/* Calendar */}
            <DayPicker
              mode={isRange ? 'range' : 'single'}
              selected={internalValue as any}
              onSelect={handleDateSelect as any}
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after: maxDate }] : [])
              ]}
              className="!font-sans"
            />

            {/* Time picker for date-time variant */}
            {hasTime && (
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 border-t pt-4">
              <button
                type="button"
                onClick={() => {
                  setInternalValue(undefined);
                  setTimeValue('');
                  onChange?.(null);
                  setOpen(false);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  onBlur?.(getDisplayValue());
                  setOpen(false);
                }}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RadixDate;