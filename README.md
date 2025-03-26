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

## 📄 License

AppmintForm is open-source software licensed under the [MIT license](https://github.com/durubata/appmint-form/blob/main/LICENSE).
