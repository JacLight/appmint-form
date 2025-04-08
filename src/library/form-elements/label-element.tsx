import { statusColors } from '../context/store';
import { classNames } from '../utils';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';

export const LabelElement = (props: { path; name; value; className; schema?; theme?}) => {

  // Get status color if value is a status
  const statusColor = props.value?.toLowerCase ? statusColors[props.value?.toLowerCase()] : undefined;

  return (
    <StyledComponent
      componentType="label"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className={twMerge('px-2 py-1 rounded-lg shadow w-fit', props.className, statusColor)}
    >
      {props.value}
    </StyledComponent>
  );
};
