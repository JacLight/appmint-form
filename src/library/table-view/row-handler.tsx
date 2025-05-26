import React from 'react';
import { IconRenderer } from '../common/icons/icon-renderer';
import { classNames } from '../utils';
import { JSONViewer } from '../common/json-viewer';
import BusyIcon from '../common/icons/svg';


const DataJSONView = (props) => {
    return (
        <div className=' dark:bg-[#1f2937]   bg-white text-black  rounded-lg shadow-lg dark:text-gray-100 transform-[translate(-50%,-50%)] fixed top-1/2 left-1/2 p-4 z-10 dark:shadow-[]'
        >
           <JSONViewer json={props.data} />
            <button
                onClick={props.onClose}
                className='dark:bg-[#374151] bg-[#f3f4f6] text-black dark:text-white p-2 rounded-md'
            >
                Close
            </button>
        </div >
    );
};


const iconSize = 12;
export const RowHandler: React.FC<any> = (props: { rowActions?, options?; row; onRowEvent: (event, id, row) => boolean; datatype; onRowDataEvent }) => {
    const { row, onRowEvent, rowActions } = props;
    const [showJSON, setShowJSON] = React.useState<any>(false);
    const [isLoading, setIsLoading] = React.useState<any>(false);
    const [deleteActive, setDeleteActive] = React.useState<any>(false);

    const deleteHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!deleteActive) {
            setDeleteActive(true);
            setTimeout(() => {
                setDeleteActive(false);
            }, 3000);
            return;
        }
        if (onRowEvent) {
            const rt = await onRowEvent('delete', row.id, row);
            if (rt === true) {
                return;
            }
        }
        if (props.datatype) {
        }
    };

    const rowEditHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (onRowEvent) {
            const rt = await onRowEvent('edit', row.id, row);
            if (rt === true) {
                return;
            }
        }
        console.log('rowEditHandler', row);
    };

    const rowRestoreHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (onRowEvent) {
            const rt = await onRowEvent('restore', row.id, row);
            if (rt === true) {
                return;
            }
        }
        console.log('rowEditHandler', row);
    };

    const rowJSONViewHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (onRowEvent) {
            const rt = await onRowEvent('view', row.id, row);
            if (rt === true) {
                return;
            }
        }
        setShowJSON(!showJSON);
        console.log('rowJSONViewHandler', row);
    };

    const rowCloneHandler = async e => {
        e.preventDefault();``
        e.stopPropagation();

        if (onRowEvent) {
            const rt = await onRowEvent('clone', row.id, row);
            if (rt === true) {
                return;
            }
        }
        console.log('rowCloneHandler', row);
    };

    const canEdit = Array.isArray(rowActions) ? rowActions?.includes('edit') : props.options?.rowEdit !== false && props.options?.readOnly !== true;
    const canDelete = Array.isArray(rowActions) ? rowActions?.includes('delete') : props.options?.rowDelete !== false && props.options?.readOnly !== true;
    const canClone = Array.isArray(rowActions) ? rowActions?.includes('clone') : props.options?.rowClone !== false && props.options?.readOnly !== true;
    const canRestore = rowActions?.includes('restore')

    const buttonClass = "p-1 bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 rounded-full shadow hover:scale-125 block transition-all duration-200";

    return (
        <div className="flex gap-0 mr-2 items-center">
            <div className="">
                <BusyIcon isLoading={isLoading} />
            </div>
            {canEdit && (
                <button
                    onClick={rowEditHandler}
                    title="Edit"
                    className={buttonClass}
                >
                    <IconRenderer icon="Edit" size={iconSize} className=' stroke-sky-500' />
                </button>
            )}
            {canRestore && (
                <button
                    onClick={rowRestoreHandler}
                    title="Restore"
                    className={buttonClass}
                >
                    <IconRenderer icon="Undo" size={iconSize} className=' stroke-sky-500' />
                </button>
            )}
            <button
                title="View JSON"
                onClick={rowJSONViewHandler}
                className={buttonClass}
            >
                <IconRenderer icon="Eye" size={iconSize} className=' stroke-sky-500' />
            </button>
            {canClone && (
                <button
                    title="Clone"
                    onClick={rowCloneHandler}
                    className={buttonClass}
                >
                    <IconRenderer icon="Copy" size={iconSize} className=' stroke-sky-500' />
                </button>
            )}
            {canDelete &&
                <button
                    onClick={deleteHandler}
                    title="Delete"
                    className={buttonClass}
                >
                    <IconRenderer icon={deleteActive ? 'Check' : "Trash"} size={iconSize} className={classNames(deleteActive ? 'stroke-red-600' : ' stroke-sky-500')} color={deleteActive ? 'red' : undefined} />
                </button>
            }

            {showJSON && <DataJSONView key={row.id} datatype={row.original.datatype} uid={row.original.id} data={row.original} onClose={e => setShowJSON(false)} />}
        </div>
    );
};
