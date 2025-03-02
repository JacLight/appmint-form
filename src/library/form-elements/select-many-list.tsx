import React, { useEffect, useState } from 'react';
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from '../common/headless-replacements';
import { Check, ChevronsUpDown } from 'lucide-react';
import { classNames } from '../utils';
import { ElementIcon } from './element-icon';

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
  const themeClass = themeClasses[props.theme] || themeClasses['default'];
  const hideOptionLabel = props.schema ? props.schema['x-hide-option-label'] : undefined;

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative  w-full">
        <ListboxButton className={classNames(props.buttonClassName, themeClass.button)}>
          <span className="flex items-center">
            {selected ? (
              <>
                <ElementIcon icon={selected.icon} image={selected.image} className="h-10 w-10 flex-shrink-0 rounded-full" mode={props.mode} />
                {!hideOptionLabel && (
                  <span className="block truncate">{selected.label}</span>
                )}
              </>
            ) : (
              <span className="block truncate text-gray-400">{props.schema?.placeholder || 'Select an option'}</span>
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-1 flex items-center pr-px">
            <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
        <ListboxOptions anchor="bottom start" className={classNames('z-[1110] max-w-96', props.className, themeClass.options)}>
          {options?.map(item => {
            const iconOrImage = <ElementIcon icon={item.icon} image={item.image} className="h-5 w-5 flex-shrink-0 rounded-full" mode={props.mode} path={props.path} />;
            return (
              <ListboxOption key={item.value} className={({ active }) => classNames(active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')} value={item}>
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      {iconOrImage}
                      {!hideOptionLabel && (
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{item.label}</span>
                      )}
                    </div>
                    {selected ? (
                      <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </div>
    </Listbox >
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
