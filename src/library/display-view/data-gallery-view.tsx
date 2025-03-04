import React, { useEffect } from 'react';
import { BaseModelDTO, classNames, getRandomString, getResponseErrorMessage } from '../utils';
import { useShallow } from 'zustand/shallow';
import { useFormStore } from '../context/store';
import { LoadingIndicator } from '../common/loading-indicator';
import { IconRenderer } from '../common/icons/icon-renderer';
import CollectionTable from '../table-viewx';
import { iconButtonClass } from '../common/constants';
import { JSONViewer } from '../common/json-viewer';
import CollectionForm from '../form-view';
import { FloatBox } from '../common/float-box';
import { CollectionHelper } from '../form-view/form-utils';


const style = { left: 'calc(30% / 2)', top: 'calc(30% / 4)', width: '70%', height: '70%' };

export const DataGalleryView = (props: { datatype; data, filter }) => {
  const { dataViewProps } = useFormStore(useShallow(state => ({ dataViewProps: state.dataViewProps })));
  const [activeTab, setActiveTab] = React.useState('list');
  const [activeRecord, setActiveRecord] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dataDTO, setDataDTO] = React.useState<BaseModelDTO<any>>(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [datatype, setDatatype] = React.useState(props.datatype || dataViewProps?.datatype);

  useEffect(() => {
    if (dataViewProps?.viewType === 'gallery') {
      changeDatatype(dataViewProps.datatype);
    }

    return () => {
      setDatatype(null);
      setActiveRecord(null);
      setCurrentIndex(0);
      setDataDTO(null);
      setError(null);
    }
  }, [dataViewProps]);

  const changeDatatype = datatype => {
    setDatatype(datatype);
    setError(null);
    setActiveRecord(null);
    setCurrentIndex(0);
    setDataDTO(null);
    setIsLoading(false);
  };

  const closeHandler = () => {
    useFormStore.getState().setStateItem({ dataViewProps: null });
  };

  const nextRecord = () => {
    setError(null);
    const currentIndex = dataDTO?.data.findIndex(item => item.sk === activeRecord?.sk);
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
    const currentIndex = dataDTO?.data.findIndex(item => item.sk === activeRecord?.sk);
    if (currentIndex > 0) {
      setActiveRecord(dataDTO?.data[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openRecord = record => {
    const currentIndex = dataDTO?.data.findIndex(item => item.sk === record.sk);
    setActiveRecord(record);
    setCurrentIndex(currentIndex);
    setActiveTab('detail');
  };

  const collection: any = datatype ? CollectionHelper.getInstance().getCollection(datatype) : "";
  if (dataViewProps?.viewType !== 'gallery') return null;

  return (
    <FloatBox style={style} key="data-gallery-view" name="data-gallery-view" title="Data Gallery View" close={closeHandler}>
      <div className="h-full w-full relative">
        <div className="flex gap-1 w-full bg-gray-100 px-3">
          <button onClick={e => setActiveTab('list')} className={classNames(activeTab === 'list' ? 'bg-cyan-100' : 'bg-gray-50', 'text-sm px-6 py-2')}>
            List
          </button>
          <button onClick={e => setActiveTab('detail')} className={classNames(activeTab === 'detail' ? 'bg-cyan-100' : 'bg-gray-50', 'text-sm px-6 py-2')}>
            Data View
          </button>
        </div>
        {error && <div className=" max-w-screen-md mx-auto bg-red-100 p-2 text-sm text-center">{error}</div>}
        {(!collection || isLoading) ? <LoadingIndicator /> :
          (
            <>
              <div className="text-sm flex items-center w-fit gap-5 absolute top-0 right-0 h-9 px-4">
                <div className='bg-purple-700 h-full text-white px-2 py-1'>{collection?.data?.name}</div>
                <div>{activeRecord?.sk}</div>
                {dataDTO?.total && (<div>
                  {currentIndex + 1} of {dataDTO?.total}
                </div>
                )}
              </div>
              <div className="h-[calc(100%-100px)] w-full mt-4">
                <ItemList isActive={activeTab === 'list'} setDataDTO={setDataDTO} schema={collection?.data?.schema} datatype={collection?.data?.name} data={dataDTO?.data} openRecord={openRecord} changeDatatype={changeDatatype} dataViewProps={dataViewProps} />
                <ItemDetail isActive={activeTab === 'detail'} setActiveTab={setActiveTab} schema={collection?.data?.schema} datatype={collection?.data?.name} data={activeRecord} dataViewProps={dataViewProps} />
              </div>
              <div className="flex items-center gap-4 justify-between absolute bottom-1 w-full px-5 bg-white py-2">
                <button onClick={prevRecord} className="text-sm hover:bg-cyan-100 pl-2  pr-3 py-1 rounded-full flex items-center gap-2 border border-gray-200">
                  <IconRenderer icon="ArrowLeft" className="w-5 h-5 rounded-full shadow bg-white p-1" /> <span>Previous</span>
                </button>

                <button onClick={nextRecord} className="text-sm hover:bg-cyan-100 pl-3  pr-2 py-1 rounded-full flex items-center gap-2 border border-gray-200">
                  <span>Next</span>
                  <IconRenderer icon="ArrowRight" className="w-5 h-5 rounded-full shadow bg-white p-1" />
                </button>
              </div>
            </>)}
      </div>
    </FloatBox>
  );
};

const ItemList = ({ schema, datatype, data, openRecord, setDataDTO, isActive, changeDatatype, dataViewProps }) => {

  const onTableEvent = async (eventName, option, selected, ...others) => {
    if (dataViewProps.onTableEvent) {
      const rt = await dataViewProps.onTableEvent(eventName, option, selected, ...others);
      if (rt === true) return;
    }
    if (eventName === 'datatype') {
      changeDatatype(option);
    }
    if (eventName === 'data-loaded') {
      setDataDTO({ data: option, total: option?.length });
    }
  };

  const onRowEvent = async (eventName, rowId, row, ...others) => {
    if (dataViewProps.onRowEvent) {
      const rt = await dataViewProps.onRowEvent(eventName, rowId, row, ...others);
      if (rt === true) return true;
    }

    if (eventName === 'open' || eventName === 'edit') {
      openRecord(row.original);
      return true;
    }

    return false;
  };

  return <div className={classNames(isActive ? 'flex' : 'hidden', 'h-full')}>
    <CollectionTable datatype={datatype} schema={schema} data={data} filters={dataViewProps.filter} onTableEvent={onTableEvent} onRowEvent={onRowEvent} />
  </div>
};

const ItemDetail = ({ schema, datatype, data, isActive, setActiveTab, dataViewProps }) => {
  const [showJSON, setShowJSON] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const onChange = async (path, value, update) => {
    setUpdatedData({ ...updatedData, data: update });
  }

  const saveRecord = async () => {
    setIsLoading(true);
    // await requestQueueInstance.saveData(updatedData).then(res => {
    //   setUpdatedData(res);
    // }).catch(e => {
    //   console.error(e);
    //   setError(getResponseErrorMessage(e));
    // }).finally(() => {
    //   setIsLoading(false);
    // })
  }


  if (!data || !schema) return (
    <div className={classNames(isActive ? 'flex items-center justify-center' : 'hidden', 'h-full')}>
      <div className="text-center text-sm text-gray-400 p-4">No data selected</div>
      <button onClick={e => setActiveTab('list')} title="Show JSON" className={classNames(iconButtonClass)}>
        View List
      </button>
    </div>
  );

  if (isLoading || !updatedData) return <LoadingIndicator />;
  return (
    <div className={classNames(isActive ? 'flex' : 'hidden', " gap-5 h-full")}>
      {error && <div className="text-sm text-red-700 bg-red-50 p-4 max-w-2xl mx-auto text-center">{error}</div>}
      <div className="px-4 h-full overflow-auto w-full pb-10">
        <CollectionForm datatype={datatype} schema={schema} data={updatedData?.data} path="" id={updatedData?.sk} onChange={onChange} hash={updatedData?.create_hash || updatedData?.version || getRandomString(6)} />
        {datatype && (
          <div className='flex items-center justify-center pt-6'>
            <button onClick={saveRecord} className="text-sm hover:bg-cyan-100 pl-2  pr-3 py-1 rounded-full flex items-center gap-2 border border-gray-200">
              <IconRenderer icon="Save" className="w-5 h-5 rounded-full shadow bg-white p-1" /> <span>Save</span>
            </button>
          </div>
        )}
      </div>
      <div className={classNames(showJSON ? 'w-full' : 'w-10', 'text-sm max-w-screen-sm flex-shrink-0  h-full')}>
        <button onClick={e => setShowJSON(!showJSON)} title="Show JSON" className={classNames(iconButtonClass)}>
          <IconRenderer icon={showJSON ? 'MoveRight' : 'MoveLeft'} />
        </button>
        <div className={classNames('h-full overflow-auto pb-10')}>{showJSON && <JSONViewer json={data} />}</div>
      </div>
    </div>
  );
};


export default DataGalleryView;