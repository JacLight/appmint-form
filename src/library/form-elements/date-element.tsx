import React, { useEffect, useState } from 'react';
import { DateTimePicker } from './date-time-picker';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

export const DateElement = (props: { change; focus; blur; mode; value; schema; path; name; data; reloadValue; theme?}) => {
  const [dateTime, setDateTime] = useState<any>();
  let variant = props.schema['format'] || props.schema['x-control-variant'] || 'date';
  variant = (variant === 'datetime' || variant === 'date-time') ? 'date-time' : variant;

  useEffect(() => {
    if (props.value) {
      setDateTime(new Date(props.value));
    }
  }, []);

  const getDateFromValue = e => {
    const date = new Date(e.target.value);
    if (date.toString() === 'Invalid Date') {
      return '';
    } else {
      return date.toISOString();
    }
  };

  const handleBlur = e => {
    e.preventDefault();
    props.blur(getDateFromValue(e));
  };

  const handleChange = ({ startDate, endDate }) => {
    let newDate;
    if (variant === 'date') {
      newDate = new Date(startDate);
    } else if (variant === 'time') {
      newDate = startDate;
      props.blur(startDate);
      return;
    } else {
      newDate = new Date(startDate);
    }
    if (newDate.toString() === 'Invalid Date') return;
    props.blur(newDate.toISOString());
  };

  const handleFocus = e => {
    e.preventDefault();
    props.focus(e.target.value);
  };

  const { min, max, disabled, readOnly, prefix, suffix, placeholder } = props.schema;

  // Extract styling from schema
  const customStyling = extractStylingFromSchema(props.schema);

  // Get date styling
  const containerClasses = getComponentPartStyling('date', 'container', props.theme, customStyling);
  const inputClasses = getComponentPartStyling('date', 'input', props.theme, customStyling);
  const prefixClasses = getComponentPartStyling('date', 'prefix', props.theme, customStyling);
  const suffixClasses = getComponentPartStyling('date', 'suffix', props.theme, customStyling);
  const calendarClasses = getComponentPartStyling('date', 'calendar', props.theme, customStyling);

  return (
    <StyledComponent
      componentType="date"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className="flex items-center"
    >
      {prefix && (
        <StyledComponent
          componentType="date"
          part="prefix"
          schema={props.schema}
          theme={props.theme}
        >
          {prefix}
        </StyledComponent>
      )}
      <DateTimePicker
        onChange={handleChange}
        startDate={dateTime}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        mode={variant}
        isRange={false}
        className={twMerge(inputClasses, 'flex-1')}
        placeholder={placeholder}
      />
      {suffix && (
        <StyledComponent
          componentType="date"
          part="suffix"
          schema={props.schema}
          theme={props.theme}
        >
          {suffix}
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
