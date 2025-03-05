import React from 'react';
import { IconRenderer } from '../common/icons/icon-renderer';
import { iconButtonClass } from '../common/constants';
import { useFormStore } from '../context/store';

export const FormPicker = ({ datatype, filter }) => {


  const onClick = () => {
    useFormStore.getState().setStateItem({ dataViewProps: { type: 'gallery', datatype, filter } });
  };

  return (
    <button title="Pick Item" className={iconButtonClass} onClick={onClick}>
      <IconRenderer icon="TextSearch" size={12} color="currentColor" />
    </button>
  );
};