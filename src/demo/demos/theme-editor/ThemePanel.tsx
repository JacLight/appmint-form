import React from 'react';
import StyleEditor from './StyleEditor';
import StyleList from './StyleList';
import { componentParts } from './component-definitions';
import { StyleEditorState, StyleItem, ComponentSelectionState } from './types';

interface ThemePanelProps {
    styleItems: StyleItem[];
    styleEditorState: StyleEditorState;
    componentSelectionState: ComponentSelectionState;
    onStyleChange: (style: StyleItem) => void;
    onToggleEditor: () => void;
    onAddStyle: () => void;
    onCancelEdit: () => void;
    onEditStyle: (style: StyleItem) => void;
    onRemoveStyle: (id: string) => void;
    onResetStyles: () => void;
}

const ThemePanel: React.FC<ThemePanelProps> = ({
    styleItems,
    styleEditorState,
    componentSelectionState,
    onStyleChange,
    onToggleEditor,
    onAddStyle,
    onCancelEdit,
    onEditStyle,
    onRemoveStyle,
    onResetStyles
}) => {
    return (
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6 overflow-auto max-h-[calc(100vh-300px)]">
            <h3 className="text-md font-semibold mb-4">Theme Settings</h3>

            {/* Component Type and Element Part Selection on the same line */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Component Type
                    </label>
                    <select
                        value={styleEditorState.currentStyle.componentType}
                        onChange={(e) => onStyleChange({
                            ...styleEditorState.currentStyle,
                            componentType: e.target.value,
                            componentPart: 'container',
                            parentPart: undefined
                        })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        aria-label="Select component type"
                    >
                        <optgroup label="Form Elements">
                            {Object.entries(componentSelectionState.selectedComponents)
                                .filter(([componentType, isSelected]) =>
                                    isSelected &&
                                    ['text', 'number', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'button', 'date', 'color', 'file'].includes(componentType)
                                )
                                .map(([componentType]) => (
                                    <option key={componentType} value={componentType}>
                                        {componentType.charAt(0).toUpperCase() + componentType.slice(1).replace(/-/g, ' ')}
                                    </option>
                                ))}
                        </optgroup>
                        <optgroup label="Layout">
                            {Object.entries(componentSelectionState.selectedComponents)
                                .filter(([componentType, isSelected]) =>
                                    isSelected &&
                                    ['root', 'layout', 'accordion', 'tab', 'slider-layout', 'collapsible', 'form'].includes(componentType)
                                )
                                .map(([componentType]) => (
                                    <option key={componentType} value={componentType}>
                                        {componentType === 'root'
                                            ? 'Root (Form)'
                                            : componentType.charAt(0).toUpperCase() + componentType.slice(1).replace(/-/g, ' ')}
                                    </option>
                                ))}
                        </optgroup>
                        <optgroup label="Special Elements">
                            {Object.entries(componentSelectionState.selectedComponents)
                                .filter(([componentType, isSelected]) =>
                                    isSelected &&
                                    !['text', 'number', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'button', 'date', 'color', 'file', 'root', 'layout', 'accordion', 'tab', 'slider-layout', 'collapsible', 'form'].includes(componentType)
                                )
                                .map(([componentType]) => (
                                    <option key={componentType} value={componentType}>
                                        {componentType.charAt(0).toUpperCase() + componentType.slice(1).replace(/-/g, ' ')}
                                    </option>
                                ))}
                        </optgroup>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Element Part to Style
                    </label>
                    <select
                        value={`${styleEditorState.currentStyle.parentPart ? `${styleEditorState.currentStyle.parentPart}.` : ''}${styleEditorState.currentStyle.componentPart}`}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.includes('.')) {
                                // This is a nested part
                                const [parent, part] = value.split('.');
                                onStyleChange({
                                    ...styleEditorState.currentStyle,
                                    parentPart: parent,
                                    componentPart: part
                                });
                            } else {
                                // This is a direct part
                                onStyleChange({
                                    ...styleEditorState.currentStyle,
                                    parentPart: undefined,
                                    componentPart: value
                                });
                            }
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        aria-label="Select element part to style"
                    >
                        {/* Direct parts */}
                        <optgroup label="Basic Elements">
                            {componentParts[styleEditorState.currentStyle.componentType]?.filter(part =>
                                !componentParts[styleEditorState.currentStyle.componentType]?.some(p =>
                                    p !== part && part.startsWith(p + '.')
                                )
                            ).map((part) => (
                                <option key={part} value={part}>
                                    {part}
                                </option>
                            ))}
                        </optgroup>

                        {/* Nested parts */}
                        {componentParts[styleEditorState.currentStyle.componentType]?.filter(part =>
                            componentParts[styleEditorState.currentStyle.componentType]?.some(p =>
                                p !== part && part.startsWith(p + '.')
                            )
                        ).length > 0 && (
                                <optgroup label="Nested Elements">
                                    {componentParts[styleEditorState.currentStyle.componentType]
                                        ?.filter(parent =>
                                            componentParts[styleEditorState.currentStyle.componentType]?.some(p =>
                                                p !== parent && p.startsWith(parent + '.')
                                            )
                                        )
                                        .flatMap(parent =>
                                            componentParts[styleEditorState.currentStyle.componentType]
                                                ?.filter(part => part.startsWith(parent + '.') && part !== parent)
                                                .map(part => {
                                                    const childPart = part.substring(parent.length + 1);
                                                    return (
                                                        <option key={`${parent}.${childPart}`} value={`${parent}.${childPart}`}>
                                                            {parent} → {childPart}
                                                        </option>
                                                    );
                                                })
                                        )}
                                </optgroup>
                            )}
                    </select>
                </div>
            </div>

            {/* Tailwind Classes Input and Add Button */}
            <div className="mb-4">
                <StyleEditor
                    styleEditorState={styleEditorState}
                    componentSelectionState={componentSelectionState}
                    onStyleChange={onStyleChange}
                    onToggleEditor={onToggleEditor}
                    onAddStyle={onAddStyle}
                    onCancelEdit={onCancelEdit}
                />
            </div>

            <StyleList
                styleItems={styleItems}
                onEditStyle={onEditStyle}
                onRemoveStyle={onRemoveStyle}
                onResetStyles={onResetStyles}
            />
        </div>
    );
};

export default ThemePanel;
