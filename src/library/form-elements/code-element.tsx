import React from 'react';
import { MonacoCodeEditor } from '../common/monaco-editor';
import { StyledComponent } from './styling';
import { extractStylingFromSchema, getComponentPartStyling } from './styling/style-utils';
import { twMerge } from 'tailwind-merge';

interface CodeElementProps {
  readOnly?: boolean;
  change?: (value: string) => void;
  focus?: () => void;
  blur?: (value: string) => void;
  mode?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  schema?: any;
  path?: string;
  name?: string;
  data?: any;
  theme?: any;
  className?: string;
}

export const CodeElement: React.FC<CodeElementProps> = (props) => {

  const saveChanges = (name: string, data: string) => {
    if (props.blur) {
      props.blur(data);
    }
  };

  const onChange = (update: string) => {
    if (props.change) {
      props.change(update);
    }
  };

  // Get variant from schema if available
  const variant = props.schema?.['x-control-variant'];

  // Determine editor mode
  const editorMode = props.mode || 'javascript';

  // Determine editor height
  const editorHeight = props.height || 300;

  // Determine if editor is read-only
  const isReadOnly = props.readOnly || false;

  return (
    <StyledComponent
      componentType="code-element"
      part="container"
      schema={props.schema}
      theme={props.theme}
      className={twMerge("code-element-container", props.className)}
    >
      <MonacoCodeEditor
        value={props.value || ''}
        mode={editorMode}
        onChange={onChange}
        save={saveChanges}
        name={props.name || ''}
        width={props.width || '100%'}
        height={editorHeight}
        showAppBar={true}
        expandable={true}
      />
    </StyledComponent>
  );
};
