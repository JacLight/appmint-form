import React, { useEffect } from 'react';
import { useFormStore } from '../context/form-store-context';
import { classNames, deepCopy, getRandomString, getResponseErrorMessage, toTitleCase } from '../utils';
import { LoadingIndicator } from './loading-indicator';
import { IconRenderer } from './icons/icon-renderer';
import ViewManager from './view-manager/view-manager';
import { AppmintForm, AppmintTable } from '..';
import { iconButtonClass } from '../utils/constants';
import { JSONViewer } from './json-viewer';

const style = {
  left: 'calc(30% / 2)',
  top: 'calc(30% / 4)',
  width: '70%',
  height: '70%',
};

const auditSchema = {
  createdate: { type: 'string', format: 'date-time' },
  modifydate: { type: 'string', format: 'date-time' },
  subschema: { type: 'string' },
  datatype: { type: 'string' },
  tags: { type: 'string' },
  categories: { type: 'string' },
  author: { type: 'string' },
};

export const DataGalleryView = (props: {
  inline?;
  datatype?;
  title?;
  schema?;
  data?;
  filter?;
  options?;
  onClose?;
  onTableEvent?: (
    eventName: string,
    option: any,
    selected: any
  ) => Promise<boolean>;
  onRowEvent?: (eventName: string, rowId: any, row: any) => Promise<boolean>;
  selectedIds?;
}) => {
  const [activeTab, setActiveTab] = React.useState('list');
  const [activeRecord, setActiveRecord] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dataDTO, setDataDTO] = React.useState<any>(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [datatype, setDatatype] = React.useState(props.datatype);

  const store = useFormStore();

  useEffect(() => {
    resetForm(props.datatype);
    setIsLoading(false);

    if (props.data) {
      setDataDTO({
        data: props.data,
        total: props.data.length,
        datatype: props.datatype,
        page: 1,
        rows: baseDataToRows({ data: props.data }),
      } as any);
    } else {
      loadData(true);
    }

    return () => {
      resetForm(null);
    };
  }, [props.datatype, props.data]);

  const resetForm = datatype => {
    setDataDTO(null);
    setError(null);
    setActiveRecord(null);
    setCurrentIndex(0);
    setDatatype(datatype);
  };

  const loadData = (refresh = false) => {
    setIsLoading(true);
    const query = { ...(props.filter || {}) };
    const page = refresh ? 1 : dataDTO?.page || 1;
    if (store.getState().onFormEvent) {
      store
        .getState()
        .onFormEvent('findData', { datatype, query, page, refresh })
        .then(res => {
          const copy = deepCopy(res);
          copy.rows = baseDataToRows(copy);
          setDataDTO(copy);
          const [first] = copy.rows;
          setActiveRecord(first);
        })
        .catch(e => {
          console.error(e);
          store.getState().onFormEvent('showNotice', {
            message: getResponseErrorMessage(e),
            type: 'error',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const baseDataToRows = baseData => {
    const rows = [];
    if (Array.isArray(baseData?.data)) {
      baseData.data.forEach((item, index) => {
        const row = {
          id: index,
          ...item.data,
          sk: item.sk,
          author: item.author,
          state: item.state,
          createdate: item.createdate,
          modifydate: item.modifydate,
          datatype: item.datatype,
          subschema: item.subschema,
        };
        rows.push(row);
      });
    }
    return rows;
  };

  const onTableEvent = async (eventName, option, selected, ...others) => {
    if (props.onTableEvent) {
      const rt = await props.onTableEvent(eventName, option, selected);
      if (rt === true) return;
    }
    if (eventName === 'datatype') {
      resetForm(option);
    }
    if (eventName === 'data-request' && loadData) {
      return await loadData(option);
    }
  };

  const onRowEvent = async (eventName, rowId, row, ...others) => {
    if (props.onRowEvent) {
      const rt = await props.onRowEvent(eventName, rowId, row);
      if (rt === true) return true;
    }

    if (!row?.original?.sk) return false;

    const currentIndex = dataDTO?.data.findIndex(
      item => item.sk === row?.original.sk
    );
    const currentData = dataDTO?.data[currentIndex];
    if (eventName === 'open' || eventName === 'edit' || eventName === 'view') {
      setActiveRecord(currentData);
      setCurrentIndex(currentIndex);
      setActiveTab('detail');
      return true;
    }
    
    // Return false for all other cases
    return false;
  };

  const closeHandler = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const nextRecord = () => {
    setError(null);
    const currentIndex = dataDTO?.data.findIndex(
      item => item.sk === activeRecord?.sk
    );
    if (currentIndex < dataDTO?.data.length - 1) {
      setActiveRecord(dataDTO?.data[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
    // else if (dataDTO?.hasNext) {
    //   loadNextPage();
    // }
  };

  const prevRecord = () => {
    setError(null);
    const currentIndex = dataDTO?.data.findIndex(
      item => item.sk === activeRecord?.sk
    );
    if (currentIndex > 0) {
      setActiveRecord(dataDTO?.data[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const schema = props.schema;
  if (!schema) {
    store.getState().onFormEvent('showNotice',  {message: `No schema found for ${datatype}`, type: 'error'});
    console.error('Invalid datatype', datatype);
    return null;
  }
  const fullSchema = deepCopy(schema);
  fullSchema.properties = { ...fullSchema.properties, ...auditSchema };
  const render = (
    <div className="h-full w-full relative">
      <div className="flex gap-1 w-full bg-gray-100 px-3">
        <button
          onClick={e => setActiveTab('list')}
          className={classNames(
            activeTab === 'list' ? 'bg-cyan-100' : 'bg-gray-50',
            'text-sm px-6 py-2'
          )}
        >
          List
        </button>
        <button
          onClick={e => setActiveTab('detail')}
          className={classNames(
            activeTab === 'detail' ? 'bg-cyan-100' : 'bg-gray-50',
            'text-sm px-6 py-2'
          )}
        >
          Data View
        </button>
      </div>
      {error && (
        <div className=" max-w-screen-md mx-auto bg-red-100 p-2 text-sm text-center">
          {error}
        </div>
      )}
      {isLoading || !dataDTO ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="text-sm flex items-center w-fit gap-5 absolute top-0 right-0 h-9 px-4">
            <div className="bg-purple-700 h-full text-white px-2 py-1">
              {props.title || toTitleCase(datatype)}
            </div>
            <div>{activeRecord?.sk}</div>
            {dataDTO?.total && (
              <div>
                {currentIndex + 1} of {dataDTO?.total}
              </div>
            )}
          </div>
          <div className="h-[calc(100%-100px)] w-full mt-4">
            <ItemList
              selectedIds={props.selectedIds}
              isActive={activeTab === 'list'}
              options={props.options}
              schema={fullSchema}
              datatype={datatype}
              rows={(dataDTO as any)?.rows}
              filter={props.filter}
              onTableEvent={onTableEvent}
              onRowEvent={onRowEvent}
            />
            <ItemDetail
              isActive={activeTab === 'detail'}
              setActiveTab={setActiveTab}
              schema={datatype}
              datatype={datatype}
              data={activeRecord}
            />
          </div>
          <div className="flex items-center gap-4 justify-between absolute bottom-1 w-full px-5 bg-white py-2">
            <button
              onClick={prevRecord}
              className="text-sm hover:bg-cyan-100 pl-2  pr-3 py-1 rounded-full flex items-center gap-2 border border-gray-200"
            >
              <IconRenderer
                icon="ArrowLeft"
                className="w-5 h-5 rounded-full shadow bg-white p-1"
              />{' '}
              <span>Previous</span>
            </button>

            <button
              onClick={nextRecord}
              className="text-sm hover:bg-cyan-100 pl-3  pr-2 py-1 rounded-full flex items-center gap-2 border border-gray-200"
            >
              <span>Next</span>
              <IconRenderer
                icon="ArrowRight"
                className="w-5 h-5 rounded-full shadow bg-white p-1"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );

  if (!datatype && !props.schema) return null;

  if (props.inline === true) {
    return render;
  }
  return (
    <ViewManager
      key="data-gallery-view"
      id="data-gallery-view"
      title="Data Gallery View"
      onClose={closeHandler}
      placement={{x:'center', y:'center'}}
    >
      {render}
    </ViewManager>
  );
};

const ItemList = ({
  schema,
  datatype,
  rows,
  isActive,
  options,
  filter,
  onTableEvent,
  onRowEvent,
  selectedIds,
}) => {
  return (
    <div className={classNames(isActive ? 'flex' : 'hidden', 'h-full')}>
      <AppmintTable
        selectedIds={selectedIds}
        datatype={datatype}
        options={options}
        schema={schema}
        data={rows}
        filters={filter}
        onTableEvent={onTableEvent}
        onRowEvent={onRowEvent}
      />
    </div>
  );
};

const ItemDetail = ({ schema, datatype, data, isActive, setActiveTab }) => {
  const [showJSON, setShowJSON] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const store = useFormStore();

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const onChange = async (path, value, update) => {
    setUpdatedData({ ...updatedData, data: update });
  };

  const saveRecord = async () => {
    setIsLoading(true);
    if (store.getState().onFormEvent) {
        const res = await store.getState().onFormEvent('saveData', updatedData)
          .then(res => {
            setUpdatedData(res);
          })
          .catch(e => {
            console.error(e);
            setError(getResponseErrorMessage(e));
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
  };

  if (!data)
    return (
      <div
        className={classNames(
          isActive ? 'flex items-center justify-center' : 'hidden',
          'h-full'
        )}
      >
        <div className="text-center text-sm text-gray-400 p-4">
          No data selected
        </div>
        <button
          onClick={e => setActiveTab('list')}
          title="Show JSON"
          className={classNames(iconButtonClass)}
        >
          View List
        </button>
      </div>
    );

  if (isLoading || !updatedData) return <LoadingIndicator />;
  return (
    <div className={classNames(isActive ? 'flex' : 'hidden', ' gap-5 h-full')}>
      {error && (
        <div className="text-sm text-red-700 bg-red-50 p-4 max-w-2xl mx-auto text-center">
          {error}
        </div>
      )}
      <div className="px-4 h-full overflow-auto w-full pb-10">
        <AppmintForm
          datatype={datatype}
          schema={schema}
          data={updatedData?.data}
          path=""
          id={updatedData?.sk}
          onChange={onChange}
          hash={
            updatedData?.create_hash ||
            updatedData?.version ||
            getRandomString(6)
          }
        />
        {datatype && (
          <div className="flex items-center justify-center pt-6">
            <button
              onClick={saveRecord}
              className="text-sm hover:bg-cyan-100 pl-2  pr-3 py-1 rounded-full flex items-center gap-2 border border-gray-200"
            >
              <IconRenderer
                icon="Save"
                className="w-5 h-5 rounded-full shadow bg-white p-1"
              />{' '}
              <span>Save</span>
            </button>
          </div>
        )}
      </div>
      <div
        className={classNames(
          showJSON ? 'w-full' : 'w-10',
          'text-sm max-w-screen-sm flex-shrink-0  h-full'
        )}
      >
        <button
          onClick={e => setShowJSON(!showJSON)}
          title="Show JSON"
          className={classNames(iconButtonClass)}
        >
          <IconRenderer icon={showJSON ? 'MoveRight' : 'MoveLeft'} />
        </button>
        <div className={classNames('h-full overflow-auto pb-10')}>
          {showJSON && <JSONViewer json={data} />}
        </div>
      </div>
    </div>
  );
};

export default DataGalleryView;
