import React from 'react';
import { CollectionForm } from './library/form-view';
import { CollectionTable } from './library/table-view';

export const AppmintForm = (props: { initData, rules?, schema, theme?, datatype?, id, onChange?: (path, value, data, files, error) => void }) => {
  const { initData, schema, theme, datatype, rules, id, onChange } = props;
  return <CollectionForm data={initData || {}} path={''} schema={schema} accessMode={''} theme={theme} rules={rules} datatype={datatype} id={id} onChange={onChange} />
}

export const AppmintTable = (props: { title?, rules?, schema?, datatype?, description?, id, data?}) => {
  const { schema, datatype, description, rules, title } = props;
  return <CollectionTable title={title} description={description} data={props.data || {}} path={''} schema={schema} accessMode={''} datatype={datatype} filterPreset={{}} />
}
