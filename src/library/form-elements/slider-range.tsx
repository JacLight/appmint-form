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
  showInput?: boolean;
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
  const trackClasses = getComponentPartStyling('slider-range', 'track', '', theme, customStyling);
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
      className={classNames("relative flex gap-4 items-center justify-between", variant === 'vertical' ? '  rotate-90 w-fit min-w-24' : 'w-full')}
    >
      <StyledComponent
        componentType="slider-range"
        part="track"
        schema={schema}
        theme={theme}
        className="relative w-full h-2"
      >
        {/* Rail background */}
        <StyledComponent
          componentType="slider-range"
          part="rail"
          schema={schema}
          theme={theme}
          as="div"
          className="w-full h-2 bg-gray-200 rounded-full absolute"
        />

        {/* Selected range indicator */}
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />

        {/* We need a different approach to make both thumbs work */}
        <div className="relative w-full h-2">
          {/* Min thumb - custom implementation */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1 -ml-2 z-10"
            style={{
              left: `${minPercentage}%`
            }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startValue = minValue;
              const range = actualMax - actualMin;
              const trackWidth = e.currentTarget.parentElement?.clientWidth || 1;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaValue = (deltaX / trackWidth) * range;
                const newValue = Math.max(
                  actualMin,
                  Math.min(maxValue, Math.round((startValue + deltaValue) / actualStep) * actualStep)
                );

                if (newValue <= maxValue) {
                  setMinValue(newValue);
                  if (change) change(newValue, maxValue);
                }
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                if (blur) blur(minValue, maxValue);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />

          {/* Max thumb - custom implementation */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1 -ml-2 z-20"
            style={{
              left: `${maxPercentage}%`
            }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startValue = maxValue;
              const range = actualMax - actualMin;
              const trackWidth = e.currentTarget.parentElement?.clientWidth || 1;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaValue = (deltaX / trackWidth) * range;
                const newValue = Math.max(
                  minValue,
                  Math.min(actualMax, Math.round((startValue + deltaValue) / actualStep) * actualStep)
                );

                if (newValue >= minValue) {
                  setMaxValue(newValue);
                  if (change) change(minValue, newValue);
                }
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                if (blur) blur(minValue, maxValue);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        </div>
      </StyledComponent>

      {showInput ? (
        <StyledComponent
          componentType="slider"
          part="input"
          schema={schema}
          theme={theme}
          as="input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          title={schema?.title || name || "Value input"}
          aria-label={schema?.title || name || "Value input"}
          className="w-full max-w-16 bg-sky-50 rounded outline-none text-sm border border-sky-500 p-1 text-right"
        />
        :
        <StyledComponent
          componentType="slider"
          part="input"
          schema={schema}
          theme={theme}
          as="input"
          type="number"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          title={schema?.title || name || "Value input"}
          aria-label={schema?.title || name || "Value input"}
          className="w-full max-w-16 bg-sky-50 rounded outline-none text-sm border border-sky-500 p-1 text-right"
        />
      ) : (
      showValue && (
      <StyledComponent
        componentType="slider"
        part="value"
        schema={schema}
        theme={theme}
        as="div"
        className="text-xs font-semibold text-gray-600 min-w-8 text-right"
      >
        {minValue} :  {maxValue}
      </StyledComponent>
      )
      )}
    </StyledComponent>
  );
};
