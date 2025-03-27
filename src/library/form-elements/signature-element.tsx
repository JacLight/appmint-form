import React from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import SignatureComponent from '../common/signature';

export const SignatureElement = ({ schema, name, value, theme, path }) => {

  return (
    <StyledComponent
      componentType="signature"
      part="container-element"
      schema={schema}
      theme={theme}
      className=""
      id={name}
    >
      <SignatureComponent />
    </StyledComponent>
  );
};
