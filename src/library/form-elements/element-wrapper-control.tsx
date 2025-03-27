import { classNames } from '../utils';
import { isEmpty } from '../utils';
import { toSentenceCase } from '../utils';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ElementIcon } from './element-icon';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { StyledComponent } from './styling';

const fixedLabel = ['checkbox', 'radio', 'switch', 'button', 'color', 'icon-button', 'date', 'date-time', 'date-range', 'lookup'];

export const ElementWrapperControl = (props: {
  mode;
  children;
  controlType;
  activeDataPath;
  isActive;
  hasValue;
  path;
  error?;
  name;
  theme?;
  arrayIndex?;
  schema?: { validations; hidden; name; title; hideLabel; position; children; image?; icon?; labelPosition; iconPosition?; error?; description };
}) => {
  const { path, name, schema, controlType, isActive, hasValue, activeDataPath } = props;
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const errorMsg = props.error || schema.error;
    setErrorMsg(errorMsg);
  }, [path, props.error]);

  if (isEmpty(schema) && isEmpty(props.children)) return null;
  if (isEmpty(schema)) return props.children;

  const iconPosition = schema.iconPosition || '';
  let labelPosition = schema.labelPosition || 'auto';
  if (labelPosition === 'auto' && props.mode === 'design') {
    labelPosition = 'top';
  }
  const labelStartEnd = schema.labelPosition === 'start' || schema.labelPosition === 'end';
  const inlineControls = ['checkbox', 'radio', 'switch', 'button', 'icon-button'];
  const isInline = inlineControls.includes(schema['x-control-variant']);
  const iconStarEnd = !(schema.iconPosition === 'beforeLabel' || schema.iconPosition === 'afterLabel');

  let info = '';
  if (schema?.validations?.length > 0) {
    const hasMaxLength = schema.validations.find(v => v.validation === 'maxLength');
    const hasMinLength = schema.validations.find(v => v.validation === 'minLength');
    if (hasMaxLength && hasMinLength) {
      info = 'Min ' + hasMinLength.arg + ' Max ' + hasMaxLength.arg;
    } else if (hasMaxLength) {
      info = 'Max ' + hasMaxLength.arg;
    } else if (hasMinLength) {
      info = 'Min ' + hasMinLength.arg;
    }
  }

  const isFixedLabel = fixedLabel.includes(controlType);

  // Extract styling from schema
  const customStyling = extractStylingFromSchema(schema);

  // Get help container styling
  const helpContainerClasses = getComponentPartStyling(controlType, 'helpContainer', '', props.theme, customStyling);

  const description =
    schema.description || info ? (
      <StyledComponent
        componentType={controlType}
        part="description"
        schema={schema}
        theme={props.theme}
        className={twMerge(
          iconStarEnd && labelStartEnd && schema.icon && !isInline && helpContainerClasses,
          'cb-control-error'
        )}
      >
        {schema.description || ''} {info}
      </StyledComponent>
    ) : null;


  const error = errorMsg ? (
    <StyledComponent
      componentType={controlType}
      part="error"
      schema={schema}
      theme={props.theme}
      className="cb-control-help"
    >
      {errorMsg}
    </StyledComponent>
  ) : null;
  const icon = schema.icon?.length == 2 ? schema.icon : typeof schema.icon === 'string' ? <ElementIcon ui={schema['x-ui']} icon={schema?.icon} image={schema?.image} mode={props.mode} theme={props.theme} /> : null;
  const inputClasses = classNames(isInline ? 'w-fit' : 'w-full', ['start', 'end'].includes(iconPosition) && ' flex gap-2 items-center');
  const element = (
    <StyledComponent
      componentType={controlType}
      part="input-container"
      schema={schema}
      theme={props.theme}
      className={inputClasses}
    >
      {!!icon && iconPosition === 'start' && icon} {props.children} {!!icon && iconPosition === 'end' && icon}
    </StyledComponent>
  );



  let label;
  const caption = schema.title ? schema.title : toSentenceCase(schema.name || props.name || '');

  if (caption && !schema.hideLabel) {
    if (iconPosition === 'beforeLabel' || iconPosition === 'afterLabel') {
      label = (
        <StyledComponent
          componentType={controlType}
          part="label"
          schema={schema}
          theme={props.theme}
          className={twMerge(
            labelStartEnd && !isInline && '-mt-5',
            'cb-label-with-icon flex gap-2 text-xs items-center'
          )}
        >
          {iconPosition === 'beforeLabel' && icon}
          <StyledComponent
            componentType={controlType}
            part="label-inner"
            schema={schema}
            theme={props.theme}
            className="control-label-inner"
          >
            {caption}
          </StyledComponent>
          {iconPosition === 'afterLabel' && icon}
        </StyledComponent>
      );
    } else {
      label = (
        <StyledComponent
          componentType={controlType}
          part="label"
          schema={schema}
          theme={props.theme}
          className={twMerge(
            labelPosition === 'auto' && !isFixedLabel && !hasValue && 'opacity-0',
            labelPosition === 'auto' && hasValue && '!text-[8px]  opacity-100',
            labelStartEnd && !isInline && '-mt-5',
            'cb-label text-xs',
            'transition-all duration-200',
          )}
        >
          {caption}
        </StyledComponent>
      );
    }
  }

  const className = `cb-control label-${labelPosition}  ${schema.hideLabel ? 'hide-label' : ''}  ${schema.hidden ? ' opacity-60 ' : ''} `;

  if (labelStartEnd && isInline) {
    return (
      <StyledComponent
        componentType={controlType}
        part={props.arrayIndex > -1 ? 'element-root-array' : 'element-root'}
        schema={schema}
        theme={props.theme}
        className={twMerge('relative w-full', className)}
        data-ui-name="control"
      >
        <StyledComponent
          componentType={controlType}
          part="inner"
          schema={schema}
          theme={props.theme}
          data-ui-name="control-inner"
          className={'w-full cb-control-input items-center flex gap-4'}
        >
          {labelPosition === 'end' && element}
          <div className="w-full">
            {label}
          </div>
          {labelPosition === 'start' && element}
        </StyledComponent>
        {description}
        {error}
      </StyledComponent>
    );
  }

  if (labelStartEnd) {
    return (
      <StyledComponent
        componentType={controlType}
        part={props.arrayIndex > -1 ? 'element-root-array' : 'element-root'}
        schema={schema}
        theme={props.theme}
        data-ui-name="control"
        className={twMerge('relative w-full', className)}
      >
        <div className="flex gap-4 items-center">
          {labelPosition === 'start' && label}
          <StyledComponent
            componentType={controlType}
            part="inner"
            schema={schema}
            theme={props.theme}
            data-ui-name="control-inner"
            className={'w-full'}
          >
            {element}
          </StyledComponent>
          {labelPosition === 'end' && label}
        </div>
        {description}
        {error}
      </StyledComponent>
    );
  }

  return (
    <StyledComponent
      componentType={controlType}
      part={props.arrayIndex > -1 ? 'element-root-array' : 'element-root'}
      schema={schema}
      theme={props.theme}
      data-ui-name="control"
      className={twMerge('relative w-full', className)}
    >
      {labelPosition !== 'bottom' && label}
      {element}
      {labelPosition === 'bottom' && label}
      {description}
      {error}
    </StyledComponent>
  );
}
