# AppmintForm

[![npm version](https://img.shields.io/npm/v/@appmint/form.svg)](https://www.npmjs.com/package/@appmint/form)
[![npm downloads](https://img.shields.io/npm/dm/@appmint/form.svg)](https://www.npmjs.com/package/@appmint/form)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

AppmintForm is a powerful, lightweight, and flexible form builder library for React applications, designed to make it easy to create and manage complex forms with minimal code while maintaining excellent performance and aesthetics.

## 📚 Documentation

**[View the comprehensive documentation](./DOCUMENTATION.md)** for detailed information on installation, usage, API reference, examples, and more.

## ✨ Features

- **JSON Schema Configuration**: Define forms using a declarative JSON schema
- **Rich Component Library**: Support for 30+ input types and controls
- **Conditional Rendering**: Show/hide fields based on form data
- **Built-in Validation**: Comprehensive validation using Zod
- **Customizable Layouts**: Multiple layout options including tabs, accordions, and more
- **Theming Support**: Easily customize the appearance of your forms
- **Performance Optimized**: Only updates what has changed, ensuring efficient rendering
- **Extensible**: Add custom input components and layouts
- **Multiple Form Instances**: Use multiple forms on the same page without state conflicts
- **Custom Components**: Create and register custom form elements or override existing ones

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @appmint/form

# Using yarn
yarn add @appmint/form

# Using pnpm
pnpm add @appmint/form
```

### Basic Usage

```jsx
import React from 'react';
import { AppmintForm } from '@appmint/form';

const MyForm = () => {
  const schema = {
    type: 'object',
    title: 'User Information',
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        inputRequired: true
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email',
        inputRequired: true
      }
    }
  };

  const handleChange = (path, value, data) => {
    console.log('Form data:', data);
  };

  return (
    <AppmintForm 
      schema={schema} 
      onChange={handleChange}
      id="user-form"
    />
  );
};
```

## 🎨 Demo Examples

The library includes several demo examples that showcase different features and capabilities:

- **Theme Editor**: Customize the appearance of your forms with a powerful theme editor
- **Text Inputs**: Various text input types including regular fields, textarea, rich text editor
- **Number Inputs**: Different number input options including sliders and ranges
- **Selection Inputs**: Various selection controls like dropdowns, checkboxes, and radio buttons
- **Date/Time Inputs**: Date pickers, date range pickers, and cron expression editors
- **Special Inputs**: Color pickers, file uploads, map location pickers, and more
- **Layout Elements**: Different layout options including tabs, accordions, and collapsible sections
- **Advanced Elements**: Complex form elements like data views, lookups, and ratings
- **Table Demo**: Table component with sorting, filtering, and pagination

Check out the [documentation](./DOCUMENTATION.md#demo-examples) for more details on these demos.

## 🔌 Custom Components & Multiple Forms

### Multiple Form Instances

You can now use multiple form instances on the same page without state conflicts:

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

Create and register custom form components to extend the library's capabilities:

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

You can also override existing components to customize their appearance and behavior:

```jsx
// Override the built-in textarea component
registerCustomComponent('textarea', CustomTextareaComponent);
```

## 📄 License

AppmintForm is open-source software licensed under the [MIT license](https://github.com/durubata/appmint-form/blob/main/LICENSE).
