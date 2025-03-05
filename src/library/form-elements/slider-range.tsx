import React, { useState, useEffect } from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';
import { classNames } from '../utils';

interface SliderRangeProps {
  min?: number;
  max?: number;
  step?: number;
  data?: [number, number];
  blur?: (minValue: number, maxValue: number) => void;
  change?: (minValue: number, maxValue: number) => void;
  schema?: any;
  theme?: any;
  path?: string;
  name?: string;
  storeId?: string;
  showLabels?: boolean;
}

export const SliderRangeElement: React.FC<SliderRangeProps> = ({
  min = 0,
  max = 100,
  step = 1,
  data = [0, 0],
  blur,
  change,
  schema,
  theme,
  path,
  name,
  storeId,
  showLabels = true
}) => {
  // Extract styling from schema
  const customStyling = schema ? extractStylingFromSchema(schema) : undefined;

  // Get slider range styling
  const containerClasses = getComponentPartStyling('slider-range', 'container', '', theme, customStyling);
  const minTrackClasses = getComponentPartStyling('slider-range', 'minTrack', '', theme, customStyling);
  const maxTrackClasses = getComponentPartStyling('slider-range', 'maxTrack', '', theme, customStyling);
  const thumbClasses = getComponentPartStyling('slider-range', 'thumb', '', theme, customStyling);
  const railClasses = getComponentPartStyling('slider-range', 'rail', '', theme, customStyling);
  const valueClasses = getComponentPartStyling('slider-range', 'value', '', theme, customStyling);

  // Parse schema values if provided
  const schemaMin = schema?.min !== undefined ?
    (typeof schema.min === 'string' ? parseFloat(schema.min) : schema.min) : min;
  const schemaMax = schema?.max !== undefined ?
    (typeof schema.max === 'string' ? parseFloat(schema.max) : schema.max) : max;
  const schemaStep = schema?.step !== undefined ?
    (typeof schema.step === 'string' ? parseFloat(schema.step) : schema.step) : step;

  // Use schema values if available, otherwise use props
  const actualMin = schemaMin !== undefined ? schemaMin : min;
  const actualMax = schemaMax !== undefined ? schemaMax : max;
  const actualStep = schemaStep !== undefined ? schemaStep : step;

  const [minValue, setMinValue] = useState(data[0] || actualMin);
  const [maxValue, setMaxValue] = useState(data[1] || actualMax);

  // Update state when data prop changes
  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 2) {
      setMinValue(data[0]);
      setMaxValue(data[1]);
    }
  }, [data]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue <= maxValue) {
      setMinValue(newValue);

      if (change) {
        change(newValue, maxValue);
      }

      if (blur) {
        blur(newValue, maxValue);
      }
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= minValue) {
      setMaxValue(newValue);

      if (change) {
        change(minValue, newValue);
      }

      if (blur) {
        blur(minValue, newValue);
      }
    }
  };

  // Calculate percentages for the gradient backgrounds
  const minPercentage = ((minValue - actualMin) / (actualMax - actualMin)) * 100;
  const maxPercentage = ((maxValue - actualMin) / (actualMax - actualMin)) * 100;
  const variant = schema?.['x-control-variant'] || 'horizontal';

  return (
    <StyledComponent
      componentType="slider-range"
      part="container"
      schema={schema}
      theme={theme}
      className={classNames("flex flex-col  space-y-2", variant === 'vertical' ? '  rotate-90 w-fit min-w-24' : 'w-full')}
    >
      <StyledComponent
        componentType="slider-range"
        part="minTrack"
        schema={schema}
        theme={theme}
        className="relative w-full"
      >
        <StyledComponent
          componentType="slider-range"
          part="rail"
          schema={schema}
          theme={theme}
          as="div"
          className="w-full h-2 bg-gray-200 rounded-full"
        />

        <StyledComponent
          as="input"
          componentType="slider-range"
          part="thumb"
          schema={schema}
          theme={theme}
          key={`${storeId}-${name}-min`}
          type="range"
          min={actualMin}
          max={actualMax}
          step={actualStep}
          value={minValue}
          onChange={handleMinChange}
          title={`Minimum ${schema?.title || name || "value"}`}
          aria-label={`Minimum ${schema?.title || name || "value"}`}
          aria-valuemin={actualMin}
          aria-valuemax={actualMax}
          aria-valuenow={minValue}
          className="w-full h-2 absolute top-0 left-0 appearance-none cursor-pointer bg-transparent outline-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${minPercentage}%, #e5e7eb ${minPercentage}%, #e5e7eb 100%)`,
            WebkitAppearance: 'none',
          }}
        />
      </StyledComponent>

      <StyledComponent
        componentType="slider-range"
        part="maxTrack"
        schema={schema}
        theme={theme}
        className="relative w-full"
      >
        <StyledComponent
          componentType="slider-range"
          part="rail"
          schema={schema}
          theme={theme}
          as="div"
          className="w-full h-2 bg-gray-200 rounded-full"
        />

        <StyledComponent
          as="input"
          componentType="slider-range"
          part="thumb"
          schema={schema}
          theme={theme}
          key={`${storeId}-${name}-max`}
          type="range"
          min={actualMin}
          max={actualMax}
          step={actualStep}
          value={maxValue}
          onChange={handleMaxChange}
          title={`Maximum ${schema?.title || name || "value"}`}
          aria-label={`Maximum ${schema?.title || name || "value"}`}
          aria-valuemin={actualMin}
          aria-valuemax={actualMax}
          aria-valuenow={maxValue}
          className="w-full h-2 absolute top-0 left-0 appearance-none cursor-pointer bg-transparent outline-none"
          style={{
            background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${maxPercentage}%, #3b82f6 ${maxPercentage}%, #3b82f6 100%)`,
            WebkitAppearance: 'none',
          }}
        />
      </StyledComponent>

      {showLabels && (
        <StyledComponent
          componentType="slider-range"
          part="value"
          schema={schema}
          theme={theme}
          as="div"
          className="text-xs font-semibold text-gray-600 mt-1"
        >
          {minValue} - {maxValue}
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
