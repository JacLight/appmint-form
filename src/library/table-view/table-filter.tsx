import React, { useState } from 'react';
import { classNames } from '../utils';

// Stubs for missing components
const DebouncedInput = (props) => (
  <input {...props} onChange={(e) => props.onChange(e.target.value)} />
);

// Stub for CollectionHelper
const CollectionHelper = {
  getInstance: () => ({
    getCollectionOptions: () => []
  })
};

// Stub for SelectManyList
const SelectManyList = (props) => (
  <select
    value={props.value}
    onChange={(e) => props.change(e.target.value)}
    className="border-0 text-sm px-2 focus:outline-none focus:ring-0"
    aria-label={props.schema?.placeholder || "Select datatype"}
    title={props.schema?.placeholder || "Select datatype"}
  >
    <option value="">{props.schema?.placeholder || "Select..."}</option>
  </select>
);

export const TableFilter: React.FC<any> = ({ globalFilter, setGlobalFilter, datatype, onTableEvent }) => {
  const [searchOnServer, setSearchOnServer] = useState(false);

  const changeSearchMode = e => {
    e.preventDefault();
    setSearchOnServer(!searchOnServer);
  };

  const onCollectionChange = e => {
    onTableEvent('datatype', e);
  };

  return (
    <div className="shadow w-full lg:max-w-80  bg-white border border-block  text-sm border-gray-200 flex gap-2 items-center mr-2  rounded overflow-hidden">
      <button onClick={changeSearchMode} className={classNames(searchOnServer ? 'bg-green-100' : 'bg-sky-100', 'px-2 py-2 hover:bg-orange-200')}>
        {searchOnServer ? 'server' : 'local'}{' '}
      </button>
      <DebouncedInput className="border-0 text-sm w-64 px-2 focus:outline-none focus:ring-0" placeholder="Search all columns..." onChange={value => setGlobalFilter(value)} type="text" value={globalFilter ?? ''} />
      {datatype && <SelectManyList options={CollectionHelper.getInstance().getCollectionOptions()} change={onCollectionChange} value={datatype} schema={{ placeholder: 'Select Datatype' }} />}
    </div>
  );
};
