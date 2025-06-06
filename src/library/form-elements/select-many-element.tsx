import React, { useEffect } from 'react';
import { SelectManyList } from './select-many-list';
import { SelectManyCombo } from './select-many-combo';
import { SelectManyRadio } from './select-many-radio';
import { SelectManyCheckbox } from './select-many-checkbox';
import { isEmpty, isNotEmpty, toSentenceCase } from '../utils';
import { StyledComponent } from './styling';
import { extractStylingFromSchema } from './styling/style-utils';
import { useFormStore } from '../context/form-store-context';

const getSelectType = type => {
  const selectTypes = {
    select: SelectManyList,
    combo: SelectManyCombo,
    chip: SelectManyCombo,
    radio: SelectManyRadio,
    checkbox: SelectManyCheckbox,
    switch: SelectManyCheckbox,
    image: SelectManyCheckbox,
  };

  return selectTypes[type] || SelectManyList;
};

export const SelectManyElement = (props: {
  storeId?;
  blur;
  change;
  theme?;
  focus;
  mode;
  schema;
  path;
  name;
  data;
  value;
  dataPath;
  ui?;
  className?;
  updateRepository;
}) => {
  const [options, setOptions] = React.useState([]);
  const store = useFormStore();

  const dataString = JSON.stringify(props.data);
  useEffect(() => {
    if (props.schema?.options || props.schema?.enum) {
      let options = props.schema?.options || props.schema?.enum;
      if (isNotEmpty(options) && typeof options[0] === 'string') {
        options = options.map(o => ({ value: o, label: toSentenceCase(o) }));
      }
      setOptions(checkAndFixOptions(options));
    } else if (props.schema?.dataSource) {
      if (store.getState().onFormEvent) {
        (async () => {
          const dataOptions = await store
            .getState()
            .onFormEvent('getSelectOptions', {
              dataSource: props.schema.dataSource,
              data: props.data,
            });
          setOptions(checkAndFixOptions(dataOptions));
        })();
      }
    }
    // const pathsToWatch = getWatchedPaths(props.schema, props.parentDataPath, arrayIndex);
    // if (isNotEmpty(pathsToWatch) && typeof useFormStore === 'function') {
    //   useFormStore.getState().updateWatchedPath(props.dataPath, pathsToWatch);
    // }
  }, [dataString, props.schema]);

  const checkAndFixOptions = options => {
    if (!Array.isArray(options) || isEmpty(options)) return [];
    if (typeof options[0] === 'string') {
      return options.map(o => ({ label: o, value: o }));
    } else {
      return options;
    }
  };

  const onChange = value => {
    if (props.change) {
      if (props.schema.fetchData && typeof value === 'string') {
        const original = options.find(o => o.value === value).original;
        props.updateRepository(props.dataPath, original);
      }
      if (props.schema.type === 'string' && typeof value !== 'string') {
        props.change(JSON.stringify(value));
      } else {
        props.change(value);
      }
    }
  };

  const onBlur = value => {
    if (props.change) {
      if (props.schema.type === 'string' && typeof value !== 'string') {
        props.blur(JSON.stringify(value));
      }
      if (props.schema.type === 'array' && typeof value === 'string') {
        props.blur(JSON.parse(value));
      } else {
        props.blur(value);
      }
    }
  };

  const onFocus = value => {};

  // Extract styling from schema
  const customStyling = extractStylingFromSchema(props.schema);

  let variant = props.schema['x-control-variant'];
  const defaultType = getSelectType(
    props.schema.type === 'array' ? 'combo' : 'select'
  );
  const Element = getSelectType(variant) || getSelectType(defaultType);

  return (
    <StyledComponent
      componentType="select-many"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className={props.className}
    >
      <Element
        path={props.path}
        theme={props.theme}
        dataPath={props.dataPath}
        variant={variant}
        name={props.name}
        schema={props.schema}
        mode={props.mode}
        options={Array.isArray(options) ? options : []}
        blur={onBlur}
        change={onChange}
        focus={onFocus}
        value={props.value}
      />
    </StyledComponent>
  );
};
