import { isNotEmpty } from '../utils';
import { dotPathToDash } from './element-helpers';
import React, { useEffect } from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema } from './styling/style-utils';

export const ElementCommonView = (props: { id?; readOnly?; disabled?; className?; tag?; ui?; path; theme?; name?; children?; alt?; src?; onClick?}) => {
  let dashPath = '';
  if (!dotPathToDash) {
    console.error('dotPathToDash is not defined', { id: props.id, path: props.path, name: props.name });
    throw new Error('dotPathToDash is not defined');
  } else {
    dashPath = dotPathToDash(props?.path, props?.name);
  }

  useEffect(() => { }, []);

  const clickHandler = e => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const onDoubleClick = e => { };

  const onBlur = e => { };

  // Extract styling from schema or ui prop
  const customStyling = props.ui ? extractStylingFromSchema({ 'x-ui': props.ui }) : undefined;

  // Get component type from name or use a default
  const componentType = props.name?.includes('-') ? props.name.split('-')[1] : 'common';
  const part = props.name?.includes('-') ? props.name.split('-')[0] : props.name;

  // Use StyledComponent to handle styling
  return (
    <StyledComponent
      componentType={componentType}
      part={part}
      schema={{ 'x-ui': props.ui }}
      theme={props.theme}
      className={props.className}
      as={props.tag || 'div'}
      data-ui-name={props.name}
      readOnly={props.readOnly}
      id={props.id || dashPath}
      onClick={clickHandler}
      onBlur={onBlur}
      onDoubleClick={onDoubleClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyledComponent>
  );
};
