import React, { useEffect, useState, useRef } from 'react';
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '../common/select-components';
import withPortal from '../common/with-portal';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ElementIcon } from './element-icon';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

// Create a portal-wrapped version of ListboxOptions
const PortalListboxOptions = ({ children, className, id, triggerRef }) => {
  // Use the withPortal HOC to render the dropdown outside of any containers with position: relative
  const PortalWrapper = withPortal(ListboxOptions);

  return (
    <PortalWrapper
      usePortal={true}
      id={id}
      triggerRef={triggerRef}
      className={className}
    >
      {children}
    </PortalWrapper>
  );
};

export const SelectManyList = (props: { blur?; change?; focus?; mode?; schema?; path?; name?; data?; value?; options?; dataPath?; className?; buttonClassName?; theme?}) => {
  const [selected, setSelected] = useState<any>();
  const listboxRef = useRef(null);

  useEffect(() => {
    if (props.value) {
      const item = props.options?.find(i => i.value === props.value);
      setSelected(item);
    }
  }, [props.options]);

  const handleChange = item => {
    setSelected(item);
    props.change(item.value, item);
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

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={containerClasses} ref={listboxRef}>
        <ListboxButton className={twMerge(buttonClasses, props.buttonClassName)}>
          <span className="flex items-center min-h-5">
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
        </ListboxButton>
        <PortalListboxOptions
          id={`listbox-options-${props.path || props.name || 'default'}`}
          className={twMerge(optionsClasses, 'absolute z-50 max-w-sm w-full', props.className)}
          triggerRef={listboxRef}
        >
          {options?.map(item => {
            const iconOrImage = <ElementIcon icon={item.icon} image={item.image} className={iconClasses} mode={props.mode} path={props.path} />;
            return (
              <ListboxOption
                key={item.value}
                className={({ active }) =>
                  twMerge(
                    optionClasses,
                    active ? optionActiveClasses : optionInactiveClasses
                  )
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      {iconOrImage}
                      {!hideOptionLabel && (
                        <span className={twMerge(
                          labelClasses,
                          selected ? labelSelectedClasses : labelUnselectedClasses
                        )}>
                          {item.label}
                        </span>
                      )}
                    </div>
                    {selected ? (
                      <span className={twMerge(
                        'absolute top-2 inset-y-0 right-2 flex items-center',
                        selectedIconClasses,
                        active ? selectedIconActiveClasses : selectedIconInactiveClasses
                      )}>
                        <Check aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            );
          })}
        </PortalListboxOptions>
      </div>
    </Listbox>
  );
};
