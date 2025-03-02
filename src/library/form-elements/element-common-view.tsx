import { isNotEmpty } from '../utils';
import { dotPathToDash } from './element-helpers';
import { twMerge } from 'tailwind-merge';
import { getElementTheme } from '../context/store';
import React, { useEffect } from 'react';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';

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

  // Support for both old and new styling systems

  // Old styling system
  let styleObj: any = {};
  if (props.ui && props.name) {
    styleObj = props.ui[props.name] || {};
  } else if (props.ui) {
    styleObj = props.ui || {};
  }
  const themeObj = getElementTheme(props.name, props.theme);
  let { classes, style } = styleObj;

  // New styling system - extract styling from ui prop
  const customStyling = props.ui ? extractStylingFromSchema({ 'x-ui': props.ui }) : undefined;

  // Get component type from name or use a default
  const componentType = props.name?.includes('-') ? props.name.split('-')[1] : 'common';
  const part = props.name?.includes('-') ? props.name.split('-')[0] : props.name;

  // Get styling from new system
  const newStyling = getComponentPartStyling(componentType, part, props.theme, customStyling);

  // Combine both styling systems
  let cls = twMerge(
    `w-full element-common`,
    props.className,
    themeObj?.className,
    Array.isArray(classes) && classes.join(' '),
    newStyling
  );

  // Remove special classes
  cls = cls.replaceAll('element-secondary-border', '');
  cls = cls.replaceAll('element-click-border', '');
  cls = cls.replaceAll('element-hover-border', '');

  const elementProps = {
    'data-ui-name': props.name,
    readOnly: props.readOnly,
    id: props.id || dashPath,
    className: cls,
    onClick: clickHandler,
    onBlur: onBlur,
    onDoubleClick: onDoubleClick,
    style: style,
    disabled: props.disabled
  };

  return React.createElement(props.tag || 'div', elementProps, props.children);
};
