import React, { useEffect, useState } from 'react';
import { RadioGroup } from '../common/headless-replacements';
import { CheckCircle } from 'lucide-react';
import { classNames } from '../utils';
import { ElementIcon } from './element-icon';
import { StyledComponent, getComponentPartStyling } from './styling';

export const SelectManyRadio = (props: { blur?; change?; focus?; mode?; schema?; path?; name?; data?; value?; options?; dataPath?; className?; theme?}) => {
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

  const options = [...(props.options || [])];
  const hideOptionLabel = props.schema ? props.schema['x-hide-option-label'] : undefined;

  return (
    <StyledComponent
      componentType="radio"
      part="container"
      schema={props.schema}
      theme={props.theme}
    >
      <RadioGroup value={selected} onChange={handleChange} className="w-full">
        <StyledComponent
          componentType="radio"
          part="group"
          schema={props.schema}
          theme={props.theme}
        >
          {options.map(item => {
            const iconOrImage = <ElementIcon icon={item.icon} image={item.image} className="h-5 w-5 flex-shrink-0 rounded-full" mode={props.mode} path={props.path} />;
            return (
              <RadioGroup.Option
                key={item.value}
                value={item}
                className={({ active, checked }) =>
                  classNames(
                    active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                    checked ?
                      getComponentPartStyling('radio', 'optionSelected', props.theme) :
                      getComponentPartStyling('radio', 'optionUnselected', props.theme),
                    getComponentPartStyling('radio', 'option', props.theme)
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {iconOrImage}
                        {!hideOptionLabel && (
                          <RadioGroup.Label as="span" className={classNames(checked ? 'text-indigo-900 font-semibold' : 'text-gray-900', 'ml-3 block text-sm')}>
                            {item.label}
                          </RadioGroup.Label>
                        )}
                      </div>
                      {checked && (
                        <CheckCircle className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                      )}
                    </div>
                    {item.description && (
                      <StyledComponent
                        componentType="radio"
                        part="description"
                        schema={props.schema}
                        theme={props.theme}
                        as="span"
                      >
                        {item.description}
                      </StyledComponent>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            );
          })}
        </StyledComponent>
      </RadioGroup>
    </StyledComponent>
  );
};
