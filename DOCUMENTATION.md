# AppmintForm Documentation

AppmintForm is a powerful, lightweight, and flexible form builder library for React applications. It allows developers to create complex forms with minimal code while maintaining excellent performance and aesthetics.

[![npm version](https://img.shields.io/npm/v/@appmint/form.svg)](https://www.npmjs.com/package/@appmint/form)
[![npm downloads](https://img.shields.io/npm/dm/@appmint/form.svg)](https://www.npmjs.com/package/@appmint/form)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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
- **Custom Components Registry**: Create and register custom form elements or override existing ones

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Form Schema Structure](#form-schema-structure)
- [Form Elements](#form-elements)
- [Layout Options](#layout-options)
- [Validation](#validation)
- [Theming](#theming)
- [API Reference](#api-reference)
- [Advanced Tips and Tricks](#advanced-tips-and-tricks)
- [Common Threads](#common-threads)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Introduction

AppmintForm simplifies form creation and management in React applications. It provides a highly customizable and easy-to-use solution that can handle complex form structures, dynamic rendering, and validation with minimal effort from developers, all while being lightweight and performance-oriented.

### Key Features

- **JSON Schema Configuration**: Define forms using a declarative JSON schema
- **Rich Component Library**: Support for 30+ input types and controls
- **Conditional Rendering**: Show/hide fields based on form data
- **Built-in Validation**: Comprehensive validation using Zod
- **Customizable Layouts**: Multiple layout options including tabs, accordions, and more
- **Theming Support**: Easily customize the appearance of your forms
- **Performance Optimized**: Only updates what has changed, ensuring efficient rendering
- **Extensible**: Add custom input components and layouts
- **Multiple Form Instances**: Use multiple forms on the same page without state conflicts
- **Custom Components Registry**: Create and register custom form elements or override existing ones

## Installation

To install AppmintForm, run one of the following commands in your project's root directory:

```bash
# Using npm
npm install @appmint/form

# Using yarn
yarn add @appmint/form

# Using pnpm
pnpm add @appmint/form
```

### Requirements

- React 18 or higher
- Node.js 18 or higher

## Basic Usage

Here's a simple example of how to use AppmintForm in your React application:

```jsx
import React from 'react';
import { AppmintForm } from '@appmint/form';

const MyForm = () => {
  // Define your form schema
  const schema = {
    type: 'object',
    title: 'User Information',
    properties: {
      firstName: {
        type: 'string',
        title: 'First Name',
        description: 'Enter your first name',
        inputRequired: true
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        description: 'Enter your last name',
        inputRequired: true
      },
      email: {
        type: 'string',
        title: 'Email',
        description: 'Enter your email address',
        format: 'email',
        inputRequired: true
      }
    }
  };

  // Initial form data (optional)
  const initialData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  // Handle form changes
  const handleChange = (path, value, data, files, error) => {
    console.log('Form data changed:', data);
  };

  return (
    <AppmintForm 
      schema={schema} 
      initData={initialData} 
      onChange={handleChange}
      id="user-form"
    />
  );
};

export default MyForm;
```

## Form Schema Structure

AppmintForm uses a JSON schema to define the structure and behavior of your forms. The schema follows a structure similar to JSON Schema but with additional properties specific to AppmintForm.

### Basic Schema Structure

```json
{
  "type": "object",
  "title": "Form Title",
  "description": "Form description",
  "properties": {
    "fieldName": {
      "type": "string",
      "title": "Field Label",
      "description": "Field description",
      "inputRequired": true,
      "x-control": "text"
    }
  },
  "x-layout": {
    // Layout configuration
  }
}
```

### Schema Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | The data type of the form (usually "object") |
| `title` | string | The title of the form |
| `description` | string | The description of the form |
| `properties` | object | An object containing field definitions |
| `x-layout` | object | Layout configuration for the form |
| `pages` | array | For multi-page forms, an array of page objects |
| `theme` | object | Theme configuration for the form |
| `collapsible` | boolean | Whether the form can be collapsed |

### Field Properties

Each field in the `properties` object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | The data type of the field (string, number, boolean, array, object, null) |
| `title` | string | The label for the field |
| `description` | string | The description or help text for the field |
| `inputRequired` | boolean | Whether the field is required |
| `default` | any | The default value for the field |
| `x-control` | string | The type of control to use for the field |
| `x-control-variant` | string | A variant of the control |
| `placeholder` | string | Placeholder text for input fields |
| `enum` | array | For selection fields, an array of possible values |
| `minimum` | number | For number fields, the minimum allowed value |
| `maximum` | number | For number fields, the maximum allowed value |
| `minLength` | number | For string fields, the minimum allowed length |
| `maxLength` | number | For string fields, the maximum allowed length |
| `pattern` | string | For string fields, a regex pattern for validation |
| `format` | string | For string fields, a predefined format (e.g., "email", "date") |
| `validations` | array | Custom validation rules |
| `prefix` | string | Text to display before the input |
| `suffix` | string | Text to display after the input |
| `disabled` | boolean | Whether the field is disabled |
| `readOnly` | boolean | Whether the field is read-only |
| `hidden` | boolean | Whether the field is hidden |
| `layoutGroup` | string | The layout group the field belongs to |

## Form Elements

AppmintForm provides a wide range of form elements to handle different types of data and user interactions.

### Text Inputs

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `text` | Basic text input | `{ "type": "string" }` |
| `textarea` | Multi-line text input | `{ "type": "string", "x-control-variant": "textarea" }` |
| `email` | Email input with validation | `{ "type": "string", "format": "email", "x-control": "email" }` |
| `richtext` | Rich text editor with formatting | `{ "type": "string", "x-control": "richtext" }` |
| `markdown` | Markdown editor | `{ "type": "string", "x-control": "markdown" }` |
| `code` | Code editor | `{ "type": "string", "x-control": "code" }` |

### Number Inputs

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `number` | Basic number input | `{ "type": "number" }` |
| `slider` | Slider for selecting a number | `{ "type": "number", "x-control-variant": "slider" }` |
| `numberrange` | Range of numbers | `{ "type": "object", "x-control": "numberrange" }` |

### Selection Inputs

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `selectsingle` | Single selection dropdown | `{ "type": "string", "enum": ["Option 1", "Option 2"] }` |
| `selectmany` | Multiple selection control | `{ "type": "array", "items": { "type": "string", "enum": ["Option A", "Option B"] }, "x-control": "selectmany" }` |
| `rating` | Star rating input | `{ "type": "number", "x-control": "rating" }` |
| `ranking` | Drag-and-drop ranking | `{ "type": "array", "x-control": "ranking" }` |

### Date and Time Inputs

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `date` | Date picker | `{ "type": "string", "format": "date", "x-control": "date" }` |
| `daterange` | Date range picker | `{ "type": "object", "x-control": "daterange" }` |
| `cron` | Cron expression editor | `{ "type": "string", "x-control": "cron" }` |

### Special Inputs

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `color` | Color picker | `{ "type": "string", "x-control": "color" }` |
| `file` | File upload | `{ "type": "string", "x-control": "file" }` |
| `map` | Map location picker | `{ "type": "object", "x-control": "map" }` |
| `phone` | Phone number input | `{ "type": "string", "x-control": "phone" }` |
| `icon` | Icon picker | `{ "type": "string", "x-control": "icon" }` |
| `uuid` | UUID generator | `{ "type": "string", "x-control": "uuid" }` |
| `sociallinks` | Social media links | `{ "type": "object", "x-control": "sociallinks" }` |
| `legalconsent` | Legal consent checkbox | `{ "type": "boolean", "x-control": "legalconsent" }` |

### Layout Elements

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `paragraph` | Static text display | `{ "type": "null", "x-control": "paragraph", "x-content": "Text content" }` |
| `label` | Label element | `{ "type": "null", "x-control": "label" }` |
| `button` | Button element | `{ "type": "null", "x-control": "button" }` |
| `preview` | Preview of other content | `{ "type": "null", "x-control": "preview" }` |
| `shadow` | Shadow DOM element | `{ "type": "null", "x-control": "shadow" }` |

### Advanced Elements

| Element | Description | Schema Configuration |
|---------|-------------|---------------------|
| `dataview` | Data view component | `{ "type": "array", "x-control": "dataview" }` |
| `lookup` | Data lookup combo | `{ "type": "string", "x-control": "lookup" }` |
| `generated` | AI-generated content | `{ "type": "string", "x-control": "generated" }` |

## Layout Options

AppmintForm provides several layout options to organize your form fields.

### Basic Layout

By default, form fields are displayed in a vertical stack. You can customize this using the `x-layout` property in your schema.

### Tab Layout

```json
{
  "x-layout": {
    "main": {
      "type": "tab",
      "id": "main",
      "items": [
        { "id": "personal-info", "title": "Personal Information" },
        { "id": "contact-info", "title": "Contact Information" }
      ]
    }
  },
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "layoutGroup": "x-layout.main.items.0"
    },
    "email": {
      "type": "string",
      "title": "Email",
      "layoutGroup": "x-layout.main.items.1"
    }
  }
}
```

### Accordion Layout

```json
{
  "x-layout": {
    "main": {
      "type": "accordion",
      "id": "main",
      "items": [
        { "id": "personal-info", "title": "Personal Information" },
        { "id": "contact-info", "title": "Contact Information" }
      ]
    }
  }
}
```

### Slider Layout

```json
{
  "x-layout": {
    "main": {
      "type": "slider",
      "id": "main",
      "items": [
        { "id": "step1", "title": "Step 1" },
        { "id": "step2", "title": "Step 2" }
      ]
    }
  }
}
```

### Multi-Page Forms

For multi-page forms, use the `pages` property:

```json
{
  "type": "object",
  "title": "Multi-Page Form",
  "pages": [
    {
      "title": "Page 1",
      "properties": {
        "field1": {
          "type": "string",
          "title": "Field 1"
        }
      }
    },
    {
      "title": "Page 2",
      "properties": {
        "field2": {
          "type": "string",
          "title": "Field 2"
        }
      }
    }
  ],
  "theme": {
    "paging": "tab" // or "default" for next/back buttons
  }
}
```

## Validation

AppmintForm provides built-in validation using Zod. You can define validation rules in your schema using standard JSON Schema validation properties or custom validation rules.

### Standard Validation

```json
{
  "type": "string",
  "title": "Username",
  "minLength": 3,
  "maxLength": 20,
  "pattern": "^[a-zA-Z0-9_]+$",
  "inputRequired": true
}
```

### Custom Validation

```json
{
  "type": "string",
  "title": "Password",
  "validations": [
    {
      "validation": "regex",
      "arg": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
      "message": "Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
    }
  ]
}
```

### Available Validation Types

- `required`: Field is required
- `min`: Minimum value (for numbers) or length (for strings)
- `max`: Maximum value (for numbers) or length (for strings)
- `regex`: Regular expression pattern
- `email`: Valid email format
- `url`: Valid URL format
- `equals`: Value equals the argument
- `notEquals`: Value does not equal the argument
- `contains`: Value contains the argument
- `notContains`: Value does not contain the argument
- `startsWith`: Value starts with the argument
- `endsWith`: Value ends with the argument

## Theming

AppmintForm supports theming to customize the appearance of your forms.

### Basic Theming

```jsx
const theme = {
  // Component-specific styling
  text: {
    container: 'bg-gray-50 p-4 rounded-lg shadow-sm',
    label: 'text-sm font-medium text-gray-700 mb-1',
    input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
    description: 'mt-1 text-xs text-gray-500',
    error: 'mt-1 text-xs text-red-500'
  },
  number: {
    container: 'bg-gray-50 p-4 rounded-lg shadow-sm',
    label: 'text-sm font-medium text-gray-700 mb-1',
    input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
    description: 'mt-1 text-xs text-gray-500',
    error: 'mt-1 text-xs text-red-500'
  }
};

<AppmintForm schema={schema} theme={theme} />
```

### Element-Specific Theming

```jsx
const theme = {
  text: {
    input: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
  },
  number: {
    input: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
  },
  selectsingle: {
    dropdown: 'block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
    option: 'py-2 px-3 cursor-pointer hover:bg-purple-50'
  }
};
```

## API Reference

### Custom Components Registry

AppmintForm v0.3.4 introduces a powerful custom components registry system that allows you to extend the library with your own custom form elements or override existing ones.

```jsx
import { registerCustomComponent, registerCustomComponents, clearCustomComponents } from '@appmint/form';

// Register a single custom component
registerCustomComponent('custom-text', CustomTextComponent);

// Register multiple custom components at once
registerCustomComponents({
  'custom-date': CustomDateComponent,
  'custom-select': CustomSelectComponent
});

// Clear all custom component registrations
clearCustomComponents();
```

#### Creating Custom Components

Custom components receive a set of props that allow them to integrate with the form's state management and validation system:

```jsx
const CustomTextInput = (props) => {
  const { 
    value,          // Current field value
    change,         // Function to update the value
    blur,           // Function to call on blur
    focus,          // Function to call on focus
    name,           // Field name
    schema,         // Field schema
    error,          // Validation error (if any)
    disabled,       // Whether the field is disabled
    readOnly        // Whether the field is read-only
  } = props;
  
  return (
    <div className="custom-input-container">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => change(e.target.value)}
        onBlur={(e) => blur(e.target.value)}
        onFocus={focus}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={schema.placeholder}
        className={error ? 'custom-input-error' : 'custom-input'}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// Register the custom component
registerCustomComponent('custom-text', CustomTextInput);
```

#### Using Custom Components in Schema

Once registered, you can use your custom components in your form schema:

```json
{
  "type": "object",
  "properties": {
    "customField": {
      "type": "string",
      "title": "Custom Field",
      "x-control": "custom-text",
      "placeholder": "Enter text here"
    }
  }
}
```

#### Overriding Built-in Components

You can override any of the built-in components with your own implementation:

```jsx
// Create a custom implementation of the built-in textarea component
const CustomTextarea = (props) => {
  // Implementation details...
};

// Override the built-in textarea component
registerCustomComponent('textarea', CustomTextarea);
```

### Multiple Form Instances

AppmintForm v0.3.4 supports multiple form instances on the same page without state conflicts. Each form maintains its own independent state, allowing for complex multi-form layouts and workflows.

```jsx
import React from 'react';
import { AppmintForm } from '@appmint/form';

const MultipleFormsExample = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Each form has its own independent state */}
      <AppmintForm 
        schema={schema1} 
        id="form-1"
        initData={data1}
        onChange={handleForm1Change}
      />
      
      <AppmintForm 
        schema={schema2} 
        id="form-2"
        initData={data2}
        onChange={handleForm2Change}
      />
    </div>
  );
};
```

#### Form Interaction

Forms can interact with each other through your application's state management:

```jsx
import React, { useState } from 'react';
import { AppmintForm } from '@appmint/form';

const InteractingFormsExample = () => {
  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  
  const handleForm1Change = (path, value, data) => {
    setForm1Data(data);
    
    // Update form2 based on form1 data
    if (data.selectedOption === 'option1') {
      setForm2Data({
        ...form2Data,
        conditionalField: 'Value based on form1'
      });
    }
  };
  
  const handleForm2Change = (path, value, data) => {
    setForm2Data(data);
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <AppmintForm 
        schema={schema1} 
        id="form-1"
        initData={form1Data}
        onChange={handleForm1Change}
      />
      
      <AppmintForm 
        schema={schema2} 
        id="form-2"
        initData={form2Data}
        onChange={handleForm2Change}
      />
    </div>
  );
};
```

### AppmintForm Component

```jsx
<AppmintForm
  initData={object}       // Initial form data
  rules={object}          // Form rules for conditional logic
  schema={object}         // Form schema
  theme={object}          // Theme configuration
  datatype={string}       // Data type identifier
  id={string}             // Unique identifier for the form
  onChange={function}     // Callback function for form changes
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `initData` | object | Initial form data |
| `rules` | object | Form rules for conditional logic |
| `schema` | object | Form schema definition |
| `theme` | object | Theme configuration |
| `datatype` | string | Data type identifier |
| `id` | string | Unique identifier for the form |
| `onChange` | function | Callback function for form changes: `(path, value, data, files, error) => void` |
| `readOnly` | boolean | Whether the form is read-only |
| `collapsible` | boolean | Whether the form can be collapsed |
| `icon` | string | Icon for the form (when collapsible) |

### AppmintTable Component

```jsx
<AppmintTable
  title={string}          // Table title
  rules={object}          // Table rules
  schema={object}         // Table schema
  datatype={string}       // Data type identifier
  description={string}    // Table description
  id={string}             // Unique identifier for the table
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Table title |
| `rules` | object | Table rules |
| `schema` | object | Table schema definition |
| `datatype` | string | Data type identifier |
| `description` | string | Table description |
| `id` | string | Unique identifier for the table |
| `data` | array | Table data |
| `columns` | array | Table columns |
| `filterPreset` | object | Preset filters |
| `filters` | object | Active filters |
| `accessMode` | string | Access mode |
| `inlineEdit` | boolean | Whether inline editing is enabled |
| `isDemo` | boolean | Whether the table is in demo mode |
| `onRowEvent` | function | Callback function for row events: `(event, rowId, row) => void` |
| `onTableEvent` | function | Callback function for table events: `(event, option, selected) => void` |
| `isLoading` | boolean | Whether the table is loading |
| `cellRenderers` | object | Custom cell renderers |
| `itemRenderer` | function | Custom item renderer |
| `options` | object | Table options |

## Advanced Tips and Tricks

This section covers advanced usage patterns, hidden features, common pitfalls, and optimization techniques for AppmintForm.

### Hidden Features and Power User Tips

#### 1. Dynamic Field Properties

You can dynamically change field properties based on other field values using the rules system:

```jsx
const rules = [
  {
    when: 'userType',
    is: 'business',
    then: {
      companyName: {
        inputRequired: true,
        hidden: false
      }
    },
    else: {
      companyName: {
        inputRequired: false,
        hidden: true
      }
    }
  }
];
```

#### 2. Computed Default Values

You can use functions for default values to compute them dynamically:

```jsx
{
  "createdAt": {
    "type": "string",
    "format": "date-time",
    "default": () => new Date().toISOString()
  }
}
```

#### 3. Custom Formatters and Parsers

For specialized input formats, you can provide custom formatters and parsers:

```jsx
{
  "currencyField": {
    "type": "number",
    "x-control": "number",
    "x-formatter": (value) => `$${value.toFixed(2)}`,
    "x-parser": (displayValue) => parseFloat(displayValue.replace('$', ''))
  }
}
```

#### 4. Nested Layouts

You can nest layouts for complex form structures:

```json
{
  "x-layout": {
    "main": {
      "type": "tab",
      "id": "main",
      "items": [
        { "id": "tab1", "title": "Tab 1" },
        { "id": "tab2", "title": "Tab 2" }
      ]
    },
    "nestedAccordion": {
      "type": "accordion",
      "id": "nestedAccordion",
      "items": [
        { "id": "section1", "title": "Section 1" },
        { "id": "section2", "title": "Section 2" }
      ]
    }
  },
  "properties": {
    "field1": {
      "layoutGroup": "x-layout.main.items.0"
    },
    "field2": {
      "layoutGroup": "x-layout.main.items.0.x-layout.nestedAccordion.items.0"
    }
  }
}
```

#### 5. Conditional Validation

Apply different validation rules based on other field values:

```jsx
const rules = [
  {
    when: 'paymentMethod',
    is: 'creditCard',
    then: {
      cardNumber: {
        validations: [
          {
            validation: 'regex',
            arg: '^[0-9]{16}$',
            message: 'Card number must be 16 digits'
          }
        ]
      }
    }
  }
];
```

#### 6. Custom Button Actions

Define custom actions for button elements:

```json
{
  "submitButton": {
    "type": "null",
    "x-control": "button",
    "title": "Submit",
    "x-button-action": "submit",
    "x-button-style": "primary",
    "x-button-handler": "customSubmitFunction"
  }
}
```

#### 7. Field Dependencies

Create dependencies between fields for complex validation scenarios:

```json
{
  "password": {
    "type": "string",
    "x-control-variant": "password"
  },
  "confirmPassword": {
    "type": "string",
    "x-control-variant": "password",
    "x-depends-on": "password",
    "validations": [
      {
        "validation": "equals",
        "arg": "{{password}}",
        "message": "Passwords must match"
      }
    ]
  }
}
```

#### 8. Control Variants

Many controls support variants that change their appearance or behavior:

```json
{
  "selectManyCheckbox": {
    "type": "array",
    "title": "Select Many (Checkboxes)",
    "x-control": "selectmany",
    "x-control-variant": "checkbox",
    "options": ["Option A", "Option B", "Option C"]
  },
  "selectManyRadio": {
    "type": "string",
    "title": "Select Single (Radio)",
    "x-control": "selectmany",
    "x-control-variant": "radio",
    "options": ["Option A", "Option B", "Option C"]
  },
  "selectManyCombo": {
    "type": "array",
    "title": "Select Many (Combo)",
    "x-control": "selectmany",
    "x-control-variant": "combo",
    "options": ["Option A", "Option B", "Option C"]
  }
}
```

#### 9. Data Sources for Selection Controls

You can provide data for selection controls in multiple ways:

```json
{
  "selectWithEnum": {
    "type": "string",
    "title": "Select with Enum",
    "enum": ["Option 1", "Option 2", "Option 3"]
  },
  "selectWithOptions": {
    "type": "string",
    "title": "Select with Options",
    "options": ["Option A", "Option B", "Option C"]
  },
  "selectWithLabelValueOptions": {
    "type": "string",
    "title": "Select with Label-Value Options",
    "options": [
      { "label": "Option One", "value": "option1" },
      { "label": "Option Two", "value": "option2" },
      { "label": "Option Three", "value": "option3" }
    ]
  },
  "selectWithDataSource": {
    "type": "string",
    "title": "Select with Data Source",
    "dataSource": {
      "source": "json",
      "value": ["Option X", "Option Y", "Option Z"]
    }
  }
}
```

#### 10. Prefixes and Suffixes

Add prefixes and suffixes to input fields:

```json
{
  "price": {
    "type": "number",
    "title": "Price",
    "prefix": "$",
    "suffix": "USD"
  }
}
```

### Common Pitfalls and How to
