import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        paragraph: {
            type: 'null',
            title: 'Paragraph',
            description: 'Static paragraph text element',
            'x-control': 'paragraph',
            'x-content': 'This is a static paragraph element that displays text without any input controls.'
        },
        label: {
            type: 'null',
            title: 'Label',
            description: 'Static label element',
            'x-control': 'label',
            'x-content': 'This is a static label element'
        },
        notice: {
            type: 'null',
            title: 'Notice',
            description: 'Notification or alert element',
            'x-control': 'notice',
            'x-content': 'This is an important notice that stands out to the user.',
            'x-notice-type': 'info' // Can be info, warning, error, success
        },
        button: {
            type: 'null',
            title: 'Button',
            description: 'Clickable button element',
            'x-control': 'button',
            'x-button-text': 'Click Me',
            'x-button-action': 'console.log("Button clicked")'
        },
        collapsible: {
            type: 'object',
            title: 'Collapsible Section',
            description: 'Expandable/collapsible section',
            collapsible: true,
            properties: {
                collapsibleContent: {
                    type: 'string',
                    title: 'Content inside collapsible',
                    default: 'This content is inside a collapsible section'
                }
            }
        },
        color: {
            type: 'string',
            'x-control': 'color',
            layoutGroup: 'x-layout.tabs.items.0'
        },
        textArea: {
            type: 'string',
            'x-control': 'richtext',
            layoutGroup: 'x-layout.tabs.items.1'
        },
        code: {
            type: 'string',
            'x-control': 'code',
            'x-control-variant': 'css',
            layoutGroup: 'x-layout.tabs.items.2'
        },
        color1: {
            type: 'string',
            'x-control': 'color',
            layoutGroup: 'x-layout.accordion.items.0'
        },
        textArea1: {
            type: 'string',
            'x-control': 'richtext',
            layoutGroup: 'x-layout.accordion.items.1'
        },
        code1: {
            type: 'string',
            'x-control': 'code',
            'x-control-variant': 'css',
            layoutGroup: 'x-layout.accordion.items.2'
        },
        color2: {
            type: 'string',
            'x-control': 'color',
            layoutGroup: 'x-layout.slides.items.0'
        },
        textArea2: {
            type: 'string',
            'x-control': 'richtext',
            layoutGroup: 'x-layout.slides.items.1'
        },
        code2: {
            type: 'string',
            'x-control': 'code',
            'x-control-variant': 'css',
            layoutGroup: 'x-layout.slides.items.2'
        },
    },
    'x-layout': {
        tabs: {
            type: 'tab',
            title: 'Tabs',
            items: [
                {
                    title: 'Tab 1 Name',
                },
                {
                    title: 'Tab 2',
                },
                {
                    title: 'Tab 3',
                }
            ]
        },
        accordion: {
            type: 'accordion',
            title: 'Accordion',
            items: [
                {
                    title: 'Tab 1 Name',
                },
                {
                    title: 'Tab 2',
                },
                {
                    title: 'Tab 3',
                }
            ]
        },
        slides: {
            type: 'slide',
            title: 'Slides',
            items: [
                {
                    title: 'Tab 1 Name',
                },
                {
                    title: 'Tab 2',
                },
                {
                    title: 'Tab 3',
                }
            ]
        }
    }

};

const LayoutElementsDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='layout-elements-demo'
            data={{}}
        />
    );
};

export default LayoutElementsDemo;
