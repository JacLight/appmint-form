# AppmintForm v0.3.0 Release Notes

We're excited to announce the release of AppmintForm v0.3.0, which introduces two major new features that significantly enhance the library's flexibility and extensibility.

## Multiple Form Instances

You can now use multiple form instances on the same page without state conflicts. Each form maintains its own independent state, allowing for complex multi-form layouts and workflows.

**Key Benefits:**

- Use any number of forms on a single page
- Each form maintains its own state and validation
- Forms can interact with each other without state conflicts
- Perfect for multi-step workflows, comparison forms, and complex layouts

## Custom Components Registry

The new custom components system allows you to extend the library with your own custom form elements or override existing ones to match your application's design system.

**Key Features:**

- Register custom components with a simple API
- Override built-in components to customize their appearance and behavior
- Full access to form state and validation
- Maintain the form library's validation and state management while customizing the UI

## API Additions

```jsx
// Register a single custom component
registerCustomComponent('custom-type', YourComponent);

// Register multiple custom components at once
registerCustomComponents({
  'custom-type-1': Component1,
  'custom-type-2': Component2
});

// Clear all custom component registrations
clearCustomComponents();
```

## Usage Examples

### Multiple Form Instances

```jsx
import React from 'react';
import { CollectionForm } from '@appmint/form';

const MultipleFormsExample = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each form has its own independent state */}
      <CollectionForm 
        schema={schema1} 
        id="form-1"
        data={data1}
      />
      
      <CollectionForm 
        schema={schema2} 
        id="form-2"
        data={data2}
      />
    </div>
  );
};
```

### Custom Components

```jsx
import React from 'react';
import { CollectionForm, registerCustomComponent } from '@appmint/form';

// Create a custom component
const CustomTextInput = (props) => {
  const { value, change, blur, focus, name, schema } = props;
  
  return (
    <div className="custom-input">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => change(e.target.value)}
        onBlur={(e) => blur(e.target.value)}
        onFocus={focus}
        placeholder={schema.placeholder}
        className="custom-styled-input"
      />
      <div className="helper-text">Custom input component</div>
    </div>
  );
};

// Register your custom component
registerCustomComponent('custom-text', CustomTextInput);

// Use it in your form schema
const schema = {
  type: 'object',
  properties: {
    customField: {
      type: 'string',
      title: 'Custom Field',
      'x-control': 'custom-text'
    }
  }
};
```

### Overriding Existing Components

```jsx
// Create a custom textarea implementation
const CustomTextareaInput = (props) => {
  // Implementation details...
};

// Override the built-in textarea component
registerCustomComponent('textarea', CustomTextareaInput);
```

## Upgrading

This release is fully backward compatible with previous versions. To upgrade, simply install the latest version:

```bash
npm install @appmint/form@latest
# or
yarn add @appmint/form@latest
# or
pnpm add @appmint/form@latest
```

## Documentation

For more detailed information, please refer to the [documentation](./DOCUMENTATION.md).
