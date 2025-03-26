import React from 'react';
import CollectionForm from '../../../library/form-view';
import { FormSchema, FormData } from './types';
import { ThemeStyling } from '../../../library/form-elements/styling/style-utils';

interface FormPreviewProps {
    schema: FormSchema;
    formData: FormData;
    theme: ThemeStyling;
    formKey: number;
    backgroundColor: string;
    onFormDataChange: (data: FormData) => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({
    schema,
    formData,
    theme,
    formKey,
    backgroundColor,
    onFormDataChange
}) => {
    return (
        <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6" style={{ backgroundColor }}>
                <h3 className="text-md font-semibold mb-4">Form Preview</h3>
                <CollectionForm
                    key={formKey}
                    schema={schema}
                    id="theme-editor-demo"
                    data={formData}
                    onChange={onFormDataChange}
                    theme={theme}
                />
            </div>
        </div>
    );
};

export default FormPreview;
