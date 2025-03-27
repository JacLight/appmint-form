import React from 'react';
import { classNames } from '../utils';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

export const MapElementNew = (props: {
  id;
  className;
  style;
  center;
  zoom;
  mapPoints;
  refresh?;
  schema?;
  theme?;
}) => {

  return (
    <StyledComponent
      componentType="map"
      part="container-element"
      schema={props.schema}
      theme={props.theme}
      className={twMerge('w-full h-full', props.className)}
      style={props.style}
      id={props.id}
    >
      <StyledComponent
        componentType="map"
        part="map"
        schema={props.schema}
        theme={props.theme}
        className="w-full h-full"
      >
        MapElementNew
      </StyledComponent>

      {/* Map controls would go here */}
      <StyledComponent
        componentType="map"
        part="controls"
        schema={props.schema}
        theme={props.theme}
        className="absolute top-2 right-2"
      >
        {/* Controls content */}
      </StyledComponent>

      {/* Map markers would be rendered here */}
      {props.mapPoints && props.mapPoints.map((point, index) => (
        <StyledComponent
          key={index}
          componentType="map"
          part="marker"
          schema={props.schema}
          theme={props.theme}
          className="absolute"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`
          }}
        >
          {/* Marker content */}
        </StyledComponent>
      ))}
    </StyledComponent>
  );
};
