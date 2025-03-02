import React, { useEffect, useState } from 'react';
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '../common/headless-replacements';
import { Check, ChevronsUpDown } from 'lucide-react';
import { classNames } from '../utils';
import { ElementIcon } from './element-icon';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

export const SelectManyList = (props: { blur?; change?; focus?; mode?; schema?; path?; name?; data?; value?; options?; dataPath?; className?; buttonClassName?; theme?}) => {
  const [selected, setSelected] = useState<any>();

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
  const containerClasses = getComponentPartStyling('listbox', 'container', props.theme, customStyling);
  const buttonClasses = getComponentPartStyling('listbox', 'button', props.theme, customStyling);
  const optionsClasses = getComponentPartStyling('listbox', 'options', props.theme, customStyling);
  const optionClasses = getComponentPartStyling('listbox', 'option', props.theme, customStyling);
  const optionActiveClasses = getComponentPartStyling('listbox', 'optionActive', props.theme, customStyling);
  const optionInactiveClasses = getComponentPartStyling('listbox', 'optionInactive', props.theme, customStyling);
  const iconClasses = getComponentPartStyling('listbox', 'icon', props.theme, customStyling);
  const selectedIconClasses = getComponentPartStyling('listbox', 'selectedIcon', props.theme, customStyling);
  const selectedIconActiveClasses = getComponentPartStyling('listbox', 'selectedIconActive', props.theme, customStyling);
  const selectedIconInactiveClasses = getComponentPartStyling('listbox', 'selectedIconInactive', props.theme, customStyling);
  const labelClasses = getComponentPartStyling('listbox', 'label', props.theme, customStyling);
  const labelSelectedClasses = getComponentPartStyling('listbox', 'labelSelected', props.theme, customStyling);
  const labelUnselectedClasses = getComponentPartStyling('listbox', 'labelUnselected', props.theme, customStyling);
  const placeholderClasses = getComponentPartStyling('listbox', 'placeholder', props.theme, customStyling);
  const chevronClasses = getComponentPartStyling('listbox', 'chevron', props.theme, customStyling);

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={containerClasses}>
        <ListboxButton className={twMerge(buttonClasses, props.buttonClassName)}>
          <span className="flex items-center">
            {selected ? (
              <>
                <ElementIcon icon={selected.icon} image={selected.image} className={iconClasses} mode={props.mode} />
                {!hideOptionLabel && (
                  <span className={twMerge(labelClasses, labelSelectedClasses)}>
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
        <ListboxOptions anchor="bottom start" className={twMerge(optionsClasses, 'z-[1110] max-w-96', props.className)}>
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
                        'absolute inset-y-0 right-0 flex items-center pr-4',
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
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

const themeClasses = {
  default: {
    button: 'relative w-full cursor-default rounded bg-white pl-3 min-h-9 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5',
    options: 'mt-1 max-h-80 min-w-48 overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  },
  minimal: {
    button: 'relative flex h-10 gap-2  items-center text-sm justify-start whitespace-nowrap rounded-full text-gray-400 hover:text-gray-500 pr-8',
    options: 'bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm',
  },
  settings: {
    button: 'relative w-full cursor-default rounded bg-white pl-3 min-h-8 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5',
    options: 'mt-1 max-h-80 overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  },
  mintflow: {
    button: 'relative w-full cursor-default rounded bg-white pl-2 min-h-6 pr-4 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xm',
    options: 'mt-1 max-h-80 overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm',
  },
};
