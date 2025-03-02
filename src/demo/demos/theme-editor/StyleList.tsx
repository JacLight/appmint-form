import React from 'react';
import { StyleItem } from './types';

interface StyleListProps {
    styleItems: StyleItem[];
    onEditStyle: (style: StyleItem) => void;
    onRemoveStyle: (id: string) => void;
    onResetStyles: () => void;
}

const StyleList: React.FC<StyleListProps> = ({
    styleItems,
    onEditStyle,
    onRemoveStyle,
    onResetStyles
}) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Current Styles</h4>
                <button
                    onClick={onResetStyles}
                    className="text-sm text-red-600 hover:text-red-800"
                >
                    Reset All
                </button>
            </div>
            {styleItems.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No styles added yet</p>
            ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {styleItems.map(item => (
                        <div key={item.id} className="p-2 bg-gray-50 rounded-md border border-gray-200 flex justify-between items-center">
                            <div>
                                <div className="font-medium text-sm">
                                    {item.parentPart
                                        ? `${item.componentType}.${item.parentPart}.${item.componentPart}`
                                        : `${item.componentType}.${item.componentPart}`}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.classes}</div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEditStyle(item)}
                                    className="text-indigo-600 hover:text-indigo-800"
                                    title="Edit"
                                    aria-label="Edit style"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => onRemoveStyle(item.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Remove"
                                    aria-label="Remove style"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StyleList;
