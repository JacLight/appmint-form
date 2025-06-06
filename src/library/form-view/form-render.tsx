import { LoadingIndicator } from '../common/loading-indicator';
import { formLayouts } from '../context/store';
import { getElementTheme } from '../context/store';
import { useFormStore } from '../context/form-store-context';
import { FormElementRender } from '../form-elements';
import { ElementWrapperLayout } from '../form-elements/element-wrapper-layout';
import { classNames } from '../utils';
import { deepCopy } from '../utils';
import { isEmpty } from '../utils';
import { isNotEmpty } from '../utils';
import { FormRenderArray } from './form-render-array';
import React, { useEffect, useState } from 'react';
import { runElementRules } from './form-rules';
import { getWatchedPaths } from './form-utils';
import { getTemplateValue } from './form-validator';
import { useShallow } from 'zustand/shallow';
import { StyledComponent } from '../form-elements/styling';

export const FormRender = (props: {
  storeId;
  path;
  dataPath;
  name;
  className;
  arrayIndex?;
  parentDataPath?;
  layoutPath?;
  arrayControl?;
}) => {
  const { name, path, dataPath, className, arrayIndex, layoutPath } = props;
  const store = useFormStore();
  const { dataPathTimestamp, theme } = store(
    useShallow(state => ({
      dataPathTimestamp: state.timestamp[dataPath],
      theme: state.theme,
    }))
  );
  const {
    getItemValue,
    setStateItem,
    applyRuleResult,
    getSchemaItem,
  } = store.getState();
  const [ruleActions, setRuleActions] = useState<any>({});

  useEffect(() => {
    let schema = getSchemaItem(path);
    let watchedPaths = getWatchedPaths(
      schema,
      props.parentDataPath,
      props.arrayIndex
    );
    if (isNotEmpty(watchedPaths)) {
      store.getState().updateWatchedPath(props.dataPath, watchedPaths);
    }
    if (schema?.rules) {
      const arrayData =
        typeof arrayIndex === 'number'
          ? getItemValue(`${props.parentDataPath}.${arrayIndex}`)
          : null;
      const _ruleActions = runElementRules(schema, getItemValue(''), arrayData);
      setRuleActions(_ruleActions);
    }
  }, [
    path,
    props.parentDataPath,
    props.arrayIndex,
    props.dataPath,
    props.storeId,
    arrayIndex,
  ]);

  useEffect(() => {
    if (dataPathTimestamp) {
      let schema = getSchemaItem(path);
      if (schema?.rules) {
        const arrayData =
          typeof arrayIndex === 'number'
            ? getItemValue(`${props.parentDataPath}.${arrayIndex}`)
            : null;
        const _ruleActions = runElementRules(
          schema,
          getItemValue(''),
          arrayData
        );
        setRuleActions(_ruleActions);
      }
    }
  }, [dataPathTimestamp, path, props.parentDataPath, arrayIndex]);

  let schema = getSchemaItem(path);
  if (schema?.hidden || ruleActions.hide) return null;

  if (!schema)
    return (
      <div className="text-xs w-full text-center text-red-400 py-4 text-red-500">
        empty schema
      </div>
    );

  schema = deepCopy(schema);
  applyRuleResult(dataPath, schema);

  let properties;
  let childPath;
  if (schema.type === 'object') {
    properties = schema.properties;
    childPath = path ? path + '.properties' : 'properties';
  } else {
    properties = schema;
    childPath = path;
  }

  if (!properties)
    return (
      <div className="text-xs w-full text-center text-red-400">
        empty properties
      </div>
    );

  let layoutComponent = null;
  if (isNotEmpty(schema['x-layout'])) {
    const layouts = schema['x-layout'];
    layoutComponent = Object.keys(layouts).map(layoutId => {
      const layoutInfo = layouts[layoutId];
      const RenderWithLayout = formLayouts[layoutInfo.type];
      const elementRender = (
        <RenderWithLayout
          key={layoutId}
          path={path ? path + '.properties' : 'properties'}
          layoutPath={
            path ? path + '.x-layout.' + layoutId : 'x-layout.' + layoutId
          }
          className={className}
          dataPath={dataPath}
          schema={schema}
          storeId={props.storeId}
        />
      );
      if (path === '') {
        store
          .getState()
          .updateRenderedElement(path ? path + '.properties' : 'properties', {
            render: elementRender,
          });
      }
      return elementRender;
    });
  }

  if (schema?.hidden || ruleActions.hide) return null;
  if (schema.title) {
    const data = getItemValue('');
    const arrayData = getItemValue(dataPath);
    schema = deepCopy(schema);
    schema.title = getTemplateValue(schema?.title, props.parentDataPath, {
      ...data,
      ...arrayData,
    });
  }

  const renderElements = (fieldName, field) => {
    if (isEmpty(field))
      return (
        <div className="text-xs w-full text-center text-red-400">
          empty field - {fieldName}
        </div>
      );
    const fieldPath = childPath + '.' + fieldName;
    const valuePath = dataPath ? dataPath + '.' + fieldName : fieldName;
    const hasControl = field['x-control'] && field['x-control'] !== 'container';
    const _schema = getSchemaItem(fieldPath);
    if (field.type === 'object' && hasControl) {
      return (
        <FormElementRender
          key={fieldName}
          mode="view"
          name={fieldName}
          path={fieldPath}
          dataPath={valuePath}
          parentDataPath={dataPath}
          storeId={props.storeId}
        />
      );
    } else if (field.type === 'array' && hasControl) {
      return (
        <FormElementRender
          key={fieldName}
          mode="view"
          name={fieldName}
          path={fieldPath}
          dataPath={valuePath}
          parentDataPath={dataPath}
          storeId={props.storeId}
        />
      );
    } else if (field.type === 'object') {
      return (
        <FormRender
          key={fieldName}
          path={fieldPath}
          className=""
          dataPath={valuePath}
          name={fieldName}
          parentDataPath={dataPath}
          storeId={props.storeId}
        />
      );
    } else if (field.type === 'array') {
      return (
        <FormRenderArray
          key={fieldName}
          path={fieldPath}
          dataPath={valuePath}
          parentDataPath={dataPath}
          childPath={childPath}
          name={fieldName}
          arrayIndex={arrayIndex}
          fieldName={fieldName}
          schema={field}
          className={className}
          hasControl={hasControl}
          storeId={props.storeId}
        />
      );
    } else {
      return (
        <FormElementRender
          key={fieldName}
          mode="view"
          name={fieldName}
          path={fieldPath}
          dataPath={valuePath}
          parentDataPath={dataPath}
          arrayIndex={arrayIndex}
          storeId={props.storeId}
        />
      );
    }
  };

  console.log('render', path, dataPath);
  if (
    ['string', 'number', 'boolean'].includes(properties.type) ||
    properties['x-control']
  ) {
    return (
      <FormElementRender
        key={path}
        mode="view"
        name={props.name}
        path={path}
        dataPath={dataPath}
        parentDataPath={dataPath}
        arrayIndex={arrayIndex}
        storeId={props.storeId}
      />
    );
  }

  const render = (
    <StyledComponent
      componentType="form"
      part={props.arrayControl ? 'container-array' : 'container'}
      schema={schema}
      theme={theme}
      id={dataPath}
      data-ui-name={path ? null : 'cb-form-root'}
      className="cb-form-root"
    >
      {layoutComponent}
      {Object.keys(properties).map(fieldName => {
        const field = properties[fieldName];
        if (!field) {
          console.error('field not found', fieldName, properties);
          return <div key={fieldName}>`field not found ${fieldName}`</div>;
        }
        const fieldPath = childPath + '.' + fieldName;
        const valuePath = dataPath ? dataPath + '.' + fieldName : fieldName;
        if (field.layoutGroup && field.layoutGroup !== layoutPath) return null;
        if (field.hidden) return null;
        if (field.group) {
          const groupFields = Object.keys(properties)
            .filter(
              key =>
                !properties[key]?.hideIn?.includes('form') &&
                !properties[key]?.hidden &&
                properties[key]?.group === field.group
            )
            .map(key => ({ key, field: properties[key] }));
          const fieldIndex = groupFields.findIndex(f => f.key === fieldName);
          if (fieldIndex !== 0) return null;
          const groupPath = childPath + '.' + field.group;
          return (
            <StyledComponent
              componentType={props.arrayControl ? 'form-array' : 'form'}
              part="group"
              schema={schema}
              theme={theme}
              data-ui-name="control-group"
              className="flex items-center"
              key={groupPath}
            >
              {groupFields.map(({ key, field }) => {
                const elementRender = renderElements(key, field);
                if (path === '') {
                  store.getState().updateRenderedElement(fieldPath, {
                    render: elementRender,
                  });
                }
                return elementRender;
              })}
            </StyledComponent>
          );
        } else {
          const elementRender = renderElements(fieldName, field);
          if (path === '') {
            store.getState().updateRenderedElement(fieldPath, {
              render: elementRender,
            });
          }
          return elementRender;
        }
      })}
    </StyledComponent>
  );

  if (path === '') {
    return render;
  }
  return (
    <ElementWrapperLayout
      mode="view"
      key={path}
      path={path}
      name={name}
      schema={schema}
      theme={theme}
      arrayControl={props.arrayControl}
    >
      {render}
    </ElementWrapperLayout>
  );
};
