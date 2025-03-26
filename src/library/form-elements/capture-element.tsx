import React from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import CameraCaptureComponent from '../common/capture';

export const CaptureElement = ({ schema, name, value, theme, path }) => {

  return (
    <StyledComponent
      componentType="signature"
      part="container"
      schema={schema}
      theme={theme}
      className=""
      id={name}
    >
      <CameraCaptureComponent />
    </StyledComponent>
  );
};
