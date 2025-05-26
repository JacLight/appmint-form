import React, { useState } from 'react';
import { classNames } from '../utils';
import { SelectManyList } from '../controls';

const DebouncedInput = (props) => (
  <input {...props} onChange={(e) => props.onChange(e.target.value)} />
);

export const TableFilter: React.FC<any> = ({ globalFilter, setGlobalFilter, datatype, onTableEvent, datatypeOptions }) => {
  const [searchOnServer, setSearchOnServer] = useState(false);

  const changeSearchMode = e => {
    e.preventDefault();
    setSearchOnServer(!searchOnServer);
  };

  const onCollectionChange = e => {
    onTableEvent('datatype', e);
  };

  return (
    <div className="shadow w-full lg:max-w-80 bg-white dark:bg-gray-800 border border-block text-sm border-gray-200 dark:border-gray-700 flex gap-2 items-center mr-2 rounded overflow-hidden">
      <button
        onClick={changeSearchMode}
        className={classNames(
          searchOnServer ? 'bg-green-100 dark:bg-green-900' : 'bg-sky-100 dark:bg-sky-900',
          'px-2 py-2 hover:bg-orange-200 dark:hover:bg-orange-800 dark:text-white w-20'
        )}
      >
        {searchOnServer ? 'server' : 'local'}{' '}
      </button>
      <DebouncedInput
        className="border-0 text-sm w-64 px-2 focus:outline-none focus:ring-0 bg-transparent dark:placeholder-gray-400"
        placeholder="Search all columns..."
        onChange={value => setGlobalFilter(value)}
        type="text"
        value={globalFilter ?? ''}
      />
      {datatype && <SelectManyList options={datatypeOptions|| []} change={onCollectionChange} value={datatype} schema={{ placeholder: 'Select Datatype' }} />}
    </div>
  );
};
