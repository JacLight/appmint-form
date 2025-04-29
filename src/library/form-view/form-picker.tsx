import React, { useEffect } from 'react';
import { IconRenderer } from '../common/icons/icon-renderer';
import { iconButtonClass } from '../utils/constants';
import { useFormStore } from '../context/form-store-context';
import { getTemplateValue } from './form-validator';
import { isNotEmpty } from '../utils';
import DataGalleryView from '../common/data-gallery-view';

export const FormPicker = ({ schema, dataPath, parentDataPath }) => {
  const store = useFormStore();
  const { getItemValue, refreshPath, removeArrayValue, getSchemaItem, setItemValue } = store.getState();
  const [showPicker, setShowPicker] = React.useState(false);
  const [datatype, setDatatype] = React.useState(null);
  const { source, collection, value, filter } = schema.dataSource || schema || {};

  useEffect(() => {
    const data = { ...(getItemValue() || {}), ...(getItemValue(parentDataPath) || {}) };
    const datatypeArray = getTemplateValue(collection || value, parentDataPath, data);
    const datatype = Array.isArray(datatypeArray) && isNotEmpty(datatypeArray) ? datatypeArray[0] : datatypeArray;
    setDatatype(datatype);
    if (!datatype) {
      store.getState().onFormEvent('showNotice', {message: 'No datatype found for the picker',type: 'error'});
    }
  }, [showPicker]);

  const onTableEvent = async (event, options, selections) => {
    console.log('onTableEvent', event, options, selections);
    if (event !== 'select') {
      return false; // Return a value for all code paths
    }
    
    if (selections) {
      const rows = selections.map(selection => {
        const { datatype, sk, name, title, slug, email, username } = selection?.original || selection || {};
        const row = { datatype, sk, id: sk, name, title, slug, email, username, value };
        Object.keys(row).forEach(key => {
          if (row[key] === undefined) {
            delete row[key];
          }
        });
        return row;
      });
      if (schema.type === 'object') {
        const firstRow = isNotEmpty(rows) ? rows[0] : {};
        setItemValue(dataPath, firstRow);
      } else if (schema.type === 'string') {
        const firstRow = isNotEmpty(rows) ? rows[0] : {};
        setItemValue(dataPath, JSON.stringify(firstRow));
      } else {
        setItemValue(dataPath, rows);
      }
    } else {
      setItemValue(dataPath, undefined);
    }
    setShowPicker(false);
    return true;
  };

  const selectedIds = (getItemValue(dataPath) || []).map(item => {
    const { id, sk } = item || {};
    return id || sk;
  });
  return (
    <div>
      {showPicker && datatype && <DataGalleryView datatype={datatype} filter={filter} selectedIds={selectedIds} onClose={() => setShowPicker(false)} onTableEvent={onTableEvent} />}
      <button title="Pick Item" className={iconButtonClass} onClick={() => setShowPicker(!showPicker)}>
        <IconRenderer icon="TextSearch" size={12} color="currentColor" />
      </button>
    </div>
  );
};
