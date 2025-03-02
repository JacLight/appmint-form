import React from 'react';
import CollectionForm from '../../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        basicRichText: {
            type: 'string',
            title: 'Basic Rich Text Editor',
            description: 'Standard rich text editor with default toolbar',
            'x-control': 'richtext',
            default: '<p>This is a <strong>rich text</strong> editor with <em>formatting</em> options.</p>'
        },
        minimalRichText: {
            type: 'string',
            title: 'Minimal Rich Text Editor',
            description: 'Rich text editor with minimal toolbar options',
            'x-control': 'richtext',
            'x-toolbar': 'minimal',
            default: '<p>This is a minimal editor with only basic formatting options.</p>'
        },
        fullRichText: {
            type: 'string',
            title: 'Full-Featured Rich Text Editor',
            description: 'Rich text editor with expanded toolbar and capabilities',
            'x-control': 'richtext',
            'x-toolbar': 'full',
            default: '<h2>Full-Featured Editor</h2><p>This editor includes <strong>all available</strong> formatting options.</p><ul><li>Lists</li><li>Tables</li><li>Images</li><li>And more...</li></ul>'
        },
        customRichText: {
            type: 'string',
            title: 'Custom Rich Text Editor',
            description: 'Rich text editor with custom toolbar configuration',
            'x-control': 'richtext',
            'x-toolbar-buttons': ['bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList'],
            default: '<p>This editor has a <strong>custom toolbar</strong> with specific options.</p>'
        },
        heightRichText: {
            type: 'string',
            title: 'Rich Text Editor with Custom Height',
            description: 'Rich text editor with specified height',
            'x-control': 'richtext',
            'x-height': 300,
            default: '<p>This editor has a specific height of 300px.</p><p>It provides more space for content editing.</p><p>Additional lines will appear within the scrollable area.</p><p>This makes it suitable for longer content.</p>'
        },
        readOnlyRichText: {
            type: 'string',
            title: 'Read-only Rich Text Editor',
            description: 'Rich text content that cannot be edited',
            'x-control': 'richtext',
            readOnly: true,
            default: '<p>This is <strong>read-only</strong> rich text content.</p><p><em>You cannot edit this content.</em></p>'
        }
    }
};

const RichtextDemo = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <CollectionForm
                schema={schema}
                id='richtext-demo'
                data={{}}
            />
        </div>
    );
};

export default RichtextDemo;
