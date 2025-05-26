import React from 'react';
import { StyledComponent } from './styling';
import { RadixDate } from '../common/radix-date';

export const DateRangeElement = (props: {
  change: (value: any) => void;
  focus: (value?: any) => void;
  blur: (value: any) => void;
  mode: string;
  value: any;
  schema: any;
  path: string;
  name: string;
  data: any;
  theme?: any;
  ui?: any;
}) => {
  let variant = props.schema['x-control-variant'] || 'date';
  variant = (variant === 'date-time' || variant === 'datetime') ? 'date-time' : variant;

  const handleChange = (value: string | string[] | null) => {
    props.blur(value);
  };

  const handleFocus = (value?: any) => {
    props.focus(value);
  };

  const handleBlur = (value?: any) => {
    // Additional blur handling if needed
  };

  const { min, max, disabled, readOnly, prefix, suffix, placeholder, required } = props.schema;

  return (
    <StyledComponent
      componentType="date-range"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className="flex items-center w-full"
    >
      {prefix && (
        <StyledComponent
          componentType="date-range"
          part="prefix"
          schema={props.schema}
          theme={props.theme}
          className="mr-2"
        >
          {prefix}
        </StyledComponent>
      )}
      
      <div className="flex-1">
        <RadixDate
          value={props.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          variant="range"
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          schema={props.schema}
          theme={props.theme}
        />
      </div>

      {suffix && (
        <StyledComponent
          componentType="date-range"
          part="suffix"
          schema={props.schema}
          theme={props.theme}
          className="ml-2"
        >
          {suffix}
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
