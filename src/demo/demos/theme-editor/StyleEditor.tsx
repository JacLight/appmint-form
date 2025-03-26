import React, { useState, useEffect } from 'react';
import { componentParts } from './component-definitions';
import { StyleEditorState, StyleItem, ComponentSelectionState } from './types';

interface StyleEditorProps {
    styleEditorState: StyleEditorState;
    componentSelectionState: ComponentSelectionState;
    onStyleChange: (style: StyleItem) => void;
    onToggleEditor: () => void;
    onAddStyle: () => void;
    onCancelEdit: () => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({
    styleEditorState,
    componentSelectionState,
    onStyleChange,
    onToggleEditor,
    onAddStyle,
    onCancelEdit
}) => {
    const { currentStyle, showStyleEditor } = styleEditorState;
    const { selectedComponents } = componentSelectionState;

    // Get available parts based on component type and parent part
    const getAvailableParts = () => {
        if (!currentStyle.parentPart) {
            return componentParts[currentStyle.componentType] || [];
        }

        // Filter parts that could be children of the parent part
        // This is a simple implementation - in a real app, you'd have a more sophisticated way to determine child parts
        const allParts = componentParts[currentStyle.componentType] || [];
        return allParts.filter(part =>
            part.startsWith(currentStyle.parentPart!) && part !== currentStyle.parentPart
        );
    };

    // Check if a part can have children
    const canHaveChildren = (part: string) => {
        const allParts = componentParts[currentStyle.componentType] || [];
        return allParts.some(p => p.startsWith(part) && p !== part);
    };

    // Reset parent part when component type changes
    useEffect(() => {
        if (currentStyle.parentPart) {
            onStyleChange({ ...currentStyle, parentPart: undefined });
        }
    }, [currentStyle.componentType]);

    const handleComponentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        const newPart = componentParts[newType]?.[0] || 'container';
        onStyleChange({ ...currentStyle, componentType: newType, componentPart: newPart });
    };

    const handleComponentPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onStyleChange({ ...currentStyle, componentPart: e.target.value });
    };

    const handleParentPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newParentPart = e.target.value === "" ? undefined : e.target.value;

        // If parent part changes, reset the component part
        if (newParentPart) {
            const childParts = componentParts[currentStyle.componentType]?.filter(part =>
                part.startsWith(newParentPart) && part !== newParentPart
            ) || [];

            if (childParts.length > 0) {
                onStyleChange({
                    ...currentStyle,
                    parentPart: newParentPart,
                    componentPart: childParts[0]
                });
            } else {
                onStyleChange({
                    ...currentStyle,
                    parentPart: newParentPart
                });
            }
        } else {
            onStyleChange({
                ...currentStyle,
                parentPart: undefined,
                componentPart: componentParts[currentStyle.componentType]?.[0] || 'container'
            });
        }
    };

    const handleClassesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onStyleChange({ ...currentStyle, classes: e.target.value });
    };

    // Get parts that can be parents
    const potentialParentParts = componentParts[currentStyle.componentType]?.filter(canHaveChildren) || [];

    return (
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            {/* Styling Classes Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tailwind Classes
                </label>
                <textarea
                    value={currentStyle.classes}
                    onChange={handleClassesChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={3}
                    placeholder="Enter Tailwind classes here (e.g. bg-blue-500 text-white p-4)"
                    aria-label="Enter Tailwind classes"
                />
            </div>

            {/* Add Button */}
            <div className="flex justify-between">
                <button
                    onClick={onAddStyle}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {currentStyle.id ? 'Update Style' : 'Add Style'}
                </button>

                {currentStyle.id && (
                    <button
                        onClick={onCancelEdit}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default StyleEditor;
