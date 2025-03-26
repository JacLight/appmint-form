import React from 'react';
import CollectionForm, { registerCustomComponent } from '../../library/form-view';

// Example custom component
const CustomTextInput = (props) => {
    const {
        value,
        change,
        blur,
        focus,
        name,
        schema,
        readOnly,
        className
    } = props;

    return (
        <div className="custom-text-input">
            <input
                type="text"
                id={name}
                name={name}
                value={value || ''}
                onChange={(e) => change(e.target.value)}
                onBlur={(e) => blur(e.target.value)}
                onFocus={focus}
                readOnly={readOnly}
                placeholder={schema.placeholder}
                className={`border-2 border-purple-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-300 ${className}`}
            />
            <div className="text-xs text-purple-500 mt-1">
                This is a custom text input component
            </div>
        </div>
    );
};

// Example custom component with more advanced features
const CustomNumberInput = (props) => {
    const {
        value,
        change,
        blur,
        focus,
        name,
        schema,
        readOnly,
        className
    } = props;

    const handleChange = (e) => {
        const newValue = e.target.value === '' ? '' : Number(e.target.value);
        change(newValue);
    };

    return (
        <div className="custom-number-input">
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() => change(Number(value || 0) - 1)}
                    disabled={readOnly}
                    className="bg-blue-500 text-white px-3 py-2 rounded-l-md hover:bg-blue-600"
                >
                    -
                </button>
                <input
                    type="number"
                    id={name}
                    name={name}
                    value={value === undefined || value === null ? '' : value}
                    onChange={handleChange}
                    onBlur={(e) => blur(e.target.value === '' ? '' : Number(e.target.value))}
                    onFocus={focus}
                    readOnly={readOnly}
                    placeholder={schema.placeholder}
                    className={`border-y-2 border-blue-500 px-3 py-2 w-full focus:outline-none ${className}`}
                />
                <button
                    type="button"
                    onClick={() => change(Number(value || 0) + 1)}
                    disabled={readOnly}
                    className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600"
                >
                    +
                </button>
            </div>
            <div className="text-xs text-blue-500 mt-1">
                This is a custom number input component
            </div>
        </div>
    );
};

// Example of overriding an existing component
const CustomTextareaInput = (props) => {
    const {
        value,
        change,
        blur,
        focus,
        name,
        schema,
        readOnly,
        className
    } = props;

    return (
        <div className="custom-textarea-input">
            <textarea
                id={name}
                name={name}
                value={value || ''}
                onChange={(e) => change(e.target.value)}
                onBlur={(e) => blur(e.target.value)}
                onFocus={focus}
                readOnly={readOnly}
                placeholder={schema.placeholder}
                rows={5}
                className={`border-2 border-green-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300 ${className}`}
            />
            <div className="text-xs text-green-500 mt-1">
                This is a custom textarea component that overrides the built-in textarea
            </div>
        </div>
    );
};

// Register custom components before rendering the form
registerCustomComponent('custom-text', CustomTextInput);
registerCustomComponent('custom-number', CustomNumberInput);
registerCustomComponent('textarea', CustomTextareaInput); // Override the built-in textarea component

// Form schema using custom components
const formSchema = {
    type: 'object',
    title: 'Custom Components Demo',
    properties: {
        standardText: {
            type: 'string',
            title: 'Standard Text Input',
            description: 'This is a standard text input from the library'
        },
        customText: {
            type: 'string',
            title: 'Custom Text Input',
            description: 'This is a custom text input component',
            'x-control': 'custom-text'
        },
        standardNumber: {
            type: 'number',
            title: 'Standard Number Input',
            description: 'This is a standard number input from the library'
        },
        customNumber: {
            type: 'number',
            title: 'Custom Number Input',
            description: 'This is a custom number input component',
            'x-control': 'custom-number'
        },
        // Using the overridden textarea component
        overriddenTextarea: {
            type: 'string',
            title: 'Overridden Textarea',
            description: 'This uses the custom textarea component that overrides the built-in one',
            'x-control': 'textarea',
            default: 'This textarea is using our custom implementation that replaced the built-in one.\n\nNotice the green styling and custom message below.'
        },
        // Original textarea for comparison (but this will also use our override)
        originalTextarea: {
            type: 'string',
            title: 'Original Textarea (Now Overridden)',
            description: 'This would normally use the built-in textarea, but our override affects all textarea fields',
            'x-control': 'textarea',
            default: 'Even though this field is using the standard textarea control type, it still uses our custom implementation because we overrode the built-in component.'
        }
    }
};

const CustomComponentsDemo: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Custom Components Demo</h1>
            <p className="mb-6 text-center">
                This demo shows how to register and use custom form components.
            </p>

            <div className="border p-4 rounded-lg">
                <CollectionForm
                    schema={formSchema}
                    id="custom-components-demo"
                    data={{
                        standardText: 'Default text',
                        customText: 'Custom component text',
                        standardNumber: 42,
                        customNumber: 100
                    }}
                />
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">How to Use Custom Components</h2>
                <h3 className="text-lg font-medium mt-4 mb-2">Adding New Custom Components</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Import the registration functions: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">import {'{ registerCustomComponent }'} from 'appmint-form'</code></li>
                    <li>Create your custom component that accepts the standard form element props</li>
                    <li>Register your component with a unique type name: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">registerCustomComponent('custom-type', YourComponent)</code></li>
                    <li>Use your custom component in schemas with the <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">'x-control': 'custom-type'</code> property</li>
                </ol>

                <h3 className="text-lg font-medium mt-6 mb-2">Overriding Existing Components</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Create your custom component implementation with the same props interface as the original</li>
                    <li>Register your component using the same key as the built-in component: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">registerCustomComponent('textarea', CustomTextareaComponent)</code></li>
                    <li>All form fields using that component type will now use your custom implementation</li>
                    <li>This allows you to customize the appearance and behavior of built-in components while maintaining compatibility</li>
                </ol>

                <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded-md mt-6">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Note</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        When overriding existing components, your custom implementation will be used for <strong>all</strong> instances of that component type throughout the application. Make sure your implementation supports all the features and props of the original component.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomComponentsDemo;
