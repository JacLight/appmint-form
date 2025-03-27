import React from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

export const PreviewElement = (props: {
  path;
  name;
  value?;
  schema?;
  theme?;
}) => {


  const imageUrl = props.value || '';

  // Alt text for accessibility
  const altText = props.schema?.alt || props.schema?.title || 'Preview image';

  return (
    <StyledComponent
      componentType="preview"
      part="container-element"
      schema={props.schema}
      theme={props.theme}
      className="w-full flex justify-center"
    >
      {imageUrl && (
        <StyledComponent
          componentType="preview"
          part="image"
          schema={props.schema}
          theme={props.theme}
          as="img"
          src={imageUrl}
          alt={altText}
          className="max-h-32 w-full max-w-48 object-contain"
        />
      )}
      {!imageUrl && (
        <StyledComponent
          componentType="preview"
          part="placeholder"
          schema={props.schema}
          theme={props.theme}
          className="h-32 w-full max-w-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200 rounded"
        >
          No preview available
        </StyledComponent>
      )}
    </StyledComponent>
  );
};
