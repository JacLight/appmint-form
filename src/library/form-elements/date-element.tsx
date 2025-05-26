import React from 'react';
import { StyledComponent } from './styling';
import { RadixDate } from '../common/radix-date';

export const DateElement = (props: { 
  readOnly?: boolean; 
  change: (value: any) => void; 
  dataPath: string;
  focus: (value?: any) => void; 
  blur: (value: any) => void; 
  mode: string; 
  value: any; 
  schema: any; 
  path: string; 
  name: string; 
  data: any;
  className?: string;
  theme?: any;
  ui?: any;
}) => {
  let variant = props.schema['format'] || props.schema['x-control-variant'] || 'date';
  variant = (variant === 'datetime' || variant === 'date-time') ? 'date-time' : variant;

  const handleChange = (value: string | string[] | null) => {
    props.blur(value);
  };

  const handleFocus = (value?: any) => {
    props.focus(value);
  };

  const handleBlur = (value?: any) => {
    // Additional blur handling if needed
  };

  const { min, max, placeholder, disabled, required } = props.schema;

  return (
    <StyledComponent
      componentType="date"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className="flex items-center w-full"
    >
      {props.schema.prefix && (
        <StyledComponent
          componentType="date"
          part="prefix"
          schema={props.schema}
          theme={props.theme}
          className="mr-2"
        >
          {props.schema.prefix}
        </StyledComponent>
      )}
      
      <div className="flex-1">
        <RadixDate
          value={props.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          variant={variant as any}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={props.readOnly || props.schema.readOnly}
          required={required}
          schema={props.schema}
          theme={props.theme}
          className={props.className}
        />
      </div>

      {props.schema.suffix && (
        <StyledComponent
          componentType="date"
          part="suffix"
          schema={props.schema}
          theme={props.theme}
          className="ml-2"
        >
          {props.schema.suffix}
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
