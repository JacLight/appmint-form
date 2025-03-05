import React, { useEffect, useRef, useState } from 'react';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';
import EmojiPicker from '../common/icons/icon-picker';
import ViewManager from '../common/view-manager/view-manager';
import { IconRenderer } from '../common/icons/icon-renderer';
import { iconButtonClass } from '../common/constants';

interface IconPickerElementProps {
  blur?: (value: string) => void;
  focus?: () => void;
  change?: (value: string) => void;
  value?: string;
  path?: string;
  label?: string;
  name?: string;
  data?: any;
  schema?: any;
  autoUnselect?: boolean;
  theme?: any;
  className?: string;
}

export const IconPickerElement: React.FC<IconPickerElementProps> = (props) => {
  // Extract styling from schema
  const customStyling = props.schema ? extractStylingFromSchema(props.schema) : undefined;

  // Get icon-picker-element styling
  const containerClasses = getComponentPartStyling('icon-picker-element', 'container', '', props.theme, customStyling);
  const iconClasses = getComponentPartStyling('icon-picker-element', 'icon', '', props.theme, customStyling);
  const buttonClasses = getComponentPartStyling('icon-picker-element', 'button', '', props.theme, customStyling);
  const dropdownClasses = getComponentPartStyling('icon-picker-element', 'dropdown', '', props.theme, customStyling);
  const optionClasses = getComponentPartStyling('icon-picker-element', 'option', '', props.theme, customStyling);
  const selectedOptionClasses = getComponentPartStyling('icon-picker-element', 'selectedOption', '', props.theme, customStyling);

  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef(null);

  // Handle change
  const handleChange = (value: string) => {
    if (props.change) {
      props.change(value);
    }
  };

  // Handle blur
  const handleBlur = () => {
    if (props.blur && props.value) {
      props.blur(props.value);
    }
  };

  // Handle focus
  const handleFocus = () => {

  };

  return (
    <StyledComponent
      componentType="icon-picker-element"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className={twMerge("flex gap-2 items-center", props.className)}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <button ref={ref} className={iconButtonClass} onClick={() => setShowPicker(!showPicker)}>
        <IconRenderer icon={props.value} className={iconClasses} />
      </button>
      {showPicker && (
        <ViewManager id='icon-picker' placement={{ ref: ref }} className={dropdownClasses}>
          <EmojiPicker />
        </ViewManager>
      )}
    </StyledComponent>
  );
};
