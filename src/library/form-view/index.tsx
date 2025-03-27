import { getElementTheme } from '../context/store';
import { FormStoreProvider, useFormStore } from '../context/form-store-context';
import { LoadingIndicator } from '../common/loading-indicator';
import { FormRender } from './form-render';
import { classNames } from '../utils';
import { deepCopy } from '../utils';
import { FormCollapsible } from './form-collapsible';
import { tabButtonActiveClass, tabButtonClass } from '../utils/constants';
import React, { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { StyledComponent } from '../form-elements/styling';
import DataGalleryView from '../common/data-gallery-view';
import {
  registerCustomComponent,
  registerCustomComponents,
  clearCustomComponents
} from '../form-elements/custom-components';

// Export custom component registration functions
export {
  registerCustomComponent,
  registerCustomComponents,
  clearCustomComponents,
  DataGalleryView
};

// Internal form component that uses the context-provided store
const FormInternal = (props: { demo?; data?; path?; title?; schema?; rules?; theme?; accessMode?; id?; datatype?; icon?; readOnly?; hash?; useAI?; collapsible?; onChange?: (path, value, data, files, error) => void; storeId: string }) => {
  const store = useFormStore();

  const { formRef, activePage } = store(useShallow(state => ({
    formRef: state.storeId,
    activePage: state.activePage
  })));

  useEffect(() => {
    const { data = {}, path, schema, rules, theme, accessMode, datatype, onChange, readOnly, storeId } = props;
    store.getState().initForm({
      data,
      path,
      schema,
      rules,
      theme,
      accessMode,
      storeId,
      datatype,
      onChangeCallback: onChange,
      readOnly
    });
  }, [props.storeId]);

  const setPage = page => {
    store.getState().setStateItem({ activePage: page, error: {} });
  };

  const prevPage = () => {
    if (activePage === 0) return;
    const _activePage = activePage - 1;
    store.getState().setStateItem({ activePage: _activePage, error: {} });
  };

  const nextPage = () => {
    const { getError, updateError, getSchemaItem, getItemValue, setStateItem } = store.getState();

    updateError('root', null);

    const errors = getError();
    if (errors && Object.keys(errors).length > 0) {
      const allErrors = Object.keys(errors)
        .filter(k => k !== 'root')
        .map(k => errors[k])
        .join(', ');
      updateError('root', allErrors);
      return;
    }

    const path = props.path;
    const targetSchema = getSchemaItem(path);
    const thisSchema: any = { type: targetSchema.type };
    if (targetSchema.type === 'object') {
      thisSchema.properties = deepCopy(targetSchema.properties);
    } else if (targetSchema.type === 'array' && targetSchema.items?.type === 'object') {
      thisSchema.items = deepCopy(targetSchema.items);
    } else if (targetSchema.type === 'array') {
      thisSchema.items = deepCopy(targetSchema.items);
      thisSchema.items.required = targetSchema.items.inputRequired ? [targetSchema.items.name] : [];
    }

    // const validationResult = validateForm(getItemValue(''), thisSchema);
    // if (validationResult.valid) {
    const schema = store(state => state.schema);
    if (activePage === schema?.pages?.length - 1) {
      console.log('submit');
      return;
    } else {
      const _activePage = activePage + 1;
      setStateItem({ activePage: _activePage });
    }
    // } else {
    //   updateError('root', validationResult.message);
    // }
  };

  const aiUpdate = data => {
    const storeState = store.getState();
    storeState.setStateItem({
      data: data,
      timestamp: { ...storeState.timestamp, ['root']: Date.now() }
    });
  };

  const aiGetContent = () => {
    return store(state => state.schema);
  };

  // Get necessary state from the store
  const schema = store(state => state.schema);

  if (!schema)
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="text-xs text-red-400 text-center ">no schema defined</div>
        <LoadingIndicator />
      </div>
    );

  const path = activePage > 0 ? 'pages.' + activePage : '';
  const errorMsg = store.getState().getError('root');
  const formTheme = getElementTheme('form', props.theme);
  const titleTheme = getElementTheme('title', props.theme);
  const title = props.title || schema.title;
  const collapsible = props.collapsible || schema.collapsible;

  let tabHeaders = null;
  let pager = null;
  const hasPages = schema?.pages?.length > 1;
  if (hasPages && schema?.theme?.paging === 'tab') {
    tabHeaders = (
      <div className="flex gap-5 items-center justify-start p-2">
        {schema?.pages?.map((page, idx) => {
          return (
            <button key={idx} title={page.title || `Page ${idx + 1}`} onClick={e => setPage(idx)} className={classNames(idx === activePage ? tabButtonActiveClass + ' text-gray-600' : 'text-gray-400 hover:text-gray-600', tabButtonClass)}>
              {page.title || `Page ${idx + 1}`}
            </button>
          );
        })}
      </div>
    );
  } else if (hasPages) {
    pager = (
      <div className="flex justify-between text-sm my-2">
        <button className={classNames(activePage === 0 && 'disabled', ' hover:bg-gray-100 disabled:hover:bg-white py-1 px-4 rounded-lg shadow disabled:text-gray-200')} onClick={prevPage}>
          Back
        </button>
        <button className="hover:bg-gray-100 py-1 px-4 rounded-lg shadow" onClick={nextPage}>
          {activePage === schema?.pages?.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    );
  }

  const render = (
    <StyledComponent
      className="w-full"
      componentType="appmint-form"
      part="root"
      schema={schema}
      theme={props.theme}>
      {tabHeaders}
      {!collapsible && title && (
        <StyledComponent
          componentType="appmint-form"
          part="title"
          schema={schema}
          theme={props.theme}
          data-ui-name="cb-form-title"
          className={classNames('text-base font-semibold text-center', titleTheme.className)}
        >
          {title}
        </StyledComponent>
      )}
      <StyledComponent
        componentType="appmint-form"
        part="container"
        schema={schema}
        theme={props.theme}
        id={props.datatype}
        data-ui-name="cb-form"
        className={classNames(formTheme.className, 'cb-form')}
      >
        {errorMsg && (
          <StyledComponent
            componentType="appmint-form"
            part="error"
            schema={schema}
            data-ui-name="cb-form-error"
            className="cb-control-help text-xs text-red-400 max-w-screen-sm mx-auto"
          >
            <ul>
              {errorMsg.split('\n').map(line => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </StyledComponent>
        )}
        <FormRender path={props.path || path} className="h-full w-full" name={''} dataPath={''} storeId={props.storeId} />
      </StyledComponent>
      {pager}
    </StyledComponent>
  );

  if (collapsible) {
    return (
      <FormCollapsible id={props.storeId} title={title} icon={props.icon}>
        {render}
      </FormCollapsible>
    );
  }

  return render;
};

// Public form component that provides the store context
export const CollectionForm = (props: { demo?; data?; path?; title?; schema?; rules?; theme?; accessMode?; id?; datatype?; icon?; readOnly?; hash?; useAI?; collapsible?; onChange?: (path, value, data, files, error) => void }) => {
  const storeId = props.id || props.hash || 'form-' + Math.random().toString(36).substring(2, 9);

  return (
    <FormStoreProvider storeId={storeId}>
      <FormInternal {...props} storeId={storeId} />
    </FormStoreProvider>
  );
};

export default CollectionForm;
