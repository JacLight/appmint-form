import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '../common/select-components';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ElementIcon } from './element-icon';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

export const SelectManyList = (props: { blur?; change?; focus?; mode?; schema?; path?; name?; data?; value?; options?; dataPath?; className?; buttonClassName?; theme?}) => {
  const [selected, setSelected] = useState<any>();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [dropdownPlacement, setDropdownPlacement] = useState<'bottom' | 'top'>('bottom');
  const buttonRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Update selected item when options or value changes
  useEffect(() => {
    if (props.value) {
      const item = props.options?.find(i => i.value === props.value);
      setSelected(item);
    }
  }, [props.options, props.value]);

  // Calculate dropdown position when it opens
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    
    // Determine if dropdown should appear above or below the button
    const placement = spaceBelow < 200 && spaceAbove > spaceBelow ? 'top' : 'bottom';
    setDropdownPlacement(placement);
    
    // Calculate position
    setDropdownPosition({
      top: placement === 'bottom' ? buttonRect.bottom + window.scrollY : buttonRect.top - (optionsRef.current?.offsetHeight || 0) + window.scrollY,
      left: buttonRect.left + window.scrollX,
      width: buttonRect.width
    });
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return undefined;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) && 
        optionsRef.current && 
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (item) => {
    setSelected(item);
    props.change(item.value, item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = [{ label: '', value: undefined }, ...(props.options || [])];
  const hideOptionLabel = props.schema ? props.schema['x-hide-option-label'] : undefined;

  // Extract styling from schema
  const customStyling = extractStylingFromSchema(props.schema);

  // Get listbox styling
  const containerClasses = getComponentPartStyling('listbox', 'container', '', props.theme, customStyling);
  const buttonClasses = getComponentPartStyling('listbox', 'button', '', props.theme, customStyling);
  const optionsClasses = getComponentPartStyling('listbox', 'options', '', props.theme, customStyling);
  const optionClasses = getComponentPartStyling('listbox', 'option', '', props.theme, customStyling);
  const optionActiveClasses = getComponentPartStyling('listbox', 'optionActive', '', props.theme, customStyling);
  const optionInactiveClasses = getComponentPartStyling('listbox', 'optionInactive', '', props.theme, customStyling);
  const iconClasses = getComponentPartStyling('listbox', 'icon', '', props.theme, customStyling);
  const selectedIconClasses = getComponentPartStyling('listbox', 'selectedIcon', '', props.theme, customStyling);
  const selectedIconActiveClasses = getComponentPartStyling('listbox', 'selectedIconActive', '', props.theme, customStyling);
  const selectedIconInactiveClasses = getComponentPartStyling('listbox', 'selectedIconInactive', '', props.theme, customStyling);
  const labelClasses = getComponentPartStyling('listbox', 'label', '', props.theme, customStyling);
  const labelSelectedClasses = getComponentPartStyling('listbox', 'labelSelected', '', props.theme, customStyling);
  const labelUnselectedClasses = getComponentPartStyling('listbox', 'labelUnselected', '', props.theme, customStyling);
  const placeholderClasses = getComponentPartStyling('listbox', 'placeholder', '', props.theme, customStyling);
  const chevronClasses = getComponentPartStyling('listbox', 'chevron', '', props.theme, customStyling);

  // Custom button component that uses our own state management
  const CustomButton = () => (
    <div 
      ref={buttonRef}
      className={twMerge(buttonClasses, props.buttonClassName, "relative cursor-pointer")}
      onClick={toggleDropdown}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown();
        }
      }}
    >
      <span className="flex items-center min-h-5 mr-8">
        {selected ? (
          <>
            <ElementIcon icon={selected.icon} image={selected.image} className={iconClasses} mode={props.mode} />
            {!hideOptionLabel && (
              <span className={twMerge(labelSelectedClasses)}>
                {selected.label}
              </span>
            )}
          </>
        ) : (
          <span className={placeholderClasses}>
            {props.schema?.placeholder || 'Select an option'}
          </span>
        )}
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-1 flex items-center pr-px">
        <ChevronsUpDown className={chevronClasses} aria-hidden="true" />
      </span>
    </div>
  );

  // Custom dropdown options component
  const DropdownOptions = () => {
    if (!isOpen) return null;

    // Create portal for dropdown to avoid clipping issues
    return createPortal(
      <div 
        ref={optionsRef}
        className={twMerge(
          optionsClasses, 
          'fixed z-[9999] overflow-auto shadow-lg rounded-md'
        )}
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          maxHeight: '250px'
        }}
        role="listbox"
      >
        {options?.map(item => {
          const isItemSelected = selected && selected.value === item.value;
          const iconOrImage = <ElementIcon icon={item.icon} image={item.image} className={iconClasses} mode={props.mode} path={props.path} />;
          
          return (
            <div
              key={item.value || 'empty'}
              className={twMerge(
                optionClasses,
                isItemSelected ? optionActiveClasses : optionInactiveClasses,
                "cursor-pointer"
              )}
              onClick={() => handleChange(item)}
              role="option"
              aria-selected={isItemSelected}
            >
              <div className="flex items-center">
                {iconOrImage}
                {!hideOptionLabel && (
                  <span className={twMerge(
                    labelClasses,
                    isItemSelected ? labelSelectedClasses : labelUnselectedClasses
                  )}>
                    {item.label}
                  </span>
                )}
              </div>
              {isItemSelected && (
                <span className={twMerge(
                  'absolute top-2 inset-y-0 right-2 flex items-center',
                  selectedIconClasses,
                  isItemSelected ? selectedIconActiveClasses : selectedIconInactiveClasses
                )}>
                  <Check aria-hidden="true" />
                </span>
              )}
            </div>
          );
        })}
      </div>,
      document.body
    );
  };

  return (
    <div className={containerClasses}>
      <CustomButton />
      <DropdownOptions />
    </div>
  );
};
