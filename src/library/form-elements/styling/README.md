# Component Styling System

This document outlines the new styling system for form elements using Tailwind CSS.

## Overview

The styling system provides a consistent and intuitive way to customize the appearance of form elements and their sub-components using Tailwind CSS classes.

## Key Features

- **Consistent Structure**: A unified approach to styling all components
- **Granular Control**: Style each part of a component independently
- **Simple API**: Easy to understand and use
- **Theme Support**: Built-in themes with the ability to override specific parts
- **Style Inheritance**: Components inherit styles from their parent theme with the ability to override

## Usage

### Basic Usage

```json
{
  "type": "string",
  "title": "Username",
  "styling": {
    "container": "bg-gray-50 p-4 rounded-lg",
    "label": "text-blue-600 font-medium",
    "input": "border-blue-300 focus:ring-blue-500"
  }
}
```

### Component-Specific Styling

```json
{
  "type": "string",
  "title": "Email Address",
  "format": "email",
  "styling": {
    "container": "bg-gray-50 p-4 rounded-lg",
    "label": "text-blue-600 font-medium",
    "input": "border-blue-300 focus:ring-blue-500",
    "description": "text-gray-500 text-xs mt-1",
    "error": "text-red-500 text-xs mt-1"
  }
}
```

### Advanced Usage with Sub-Components

```json
{
  "type": "array",
  "title": "Options",
  "items": {
    "type": "object",
    "properties": {
      "label": { "type": "string" },
      "value": { "type": "string" }
    }
  },
  "styling": {
    "container": "bg-gray-50 p-4 rounded-lg",
    "label": "text-blue-600 font-medium",
    "item": {
      "container": "border-b border-gray-200 py-2",
      "label": "font-medium",
      "input": "ml-2"
    },
    "addButton": "bg-blue-500 text-white px-3 py-1 rounded-md mt-2",
    "removeButton": "text-red-500 ml-2"
  }
}
```

## Theme Support

Themes provide a consistent look and feel across all components. You can define a theme at the form level and override specific parts at the component level.

```json
{
  "type": "object",
  "theme": "primary",
  "properties": {
    "username": {
      "type": "string",
      "title": "Username",
      "styling": {
        "label": "text-lg" // Override just the label styling
      }
    }
  }
}
```

## Styling Approach

The styling system supports two levels of specificity:

1. **Group-level styling**: Apply styles to all components of a certain part type
2. **Component-specific styling**: Apply styles to a specific component type's part

### Group-level Styling

Group-level styling applies to all components that have a particular part, regardless of the component type:

```json
{
  "styling": {
    "label": "text-blue-600 font-medium", // Applies to all labels
    "input": "border-blue-300 focus:ring-blue-500" // Applies to all inputs
  }
}
```

### Component-specific Styling

Component-specific styling applies only to a specific component type's part:

```json
{
  "styling": {
    "text.input": "border-blue-300", // Only applies to text inputs
    "checkbox.input": "border-green-300" // Only applies to checkbox inputs
  }
}
```

### Combining Both Approaches

You can combine both approaches for maximum flexibility:

```json
{
  "styling": {
    "input": "border-gray-300", // Base styling for all inputs
    "text.input": "border-blue-300", // Override for text inputs
    "checkbox.input": "border-green-300" // Override for checkbox inputs
  }
}
```

## Available Style Targets

For a complete list of all component parts that can be styled, please refer to the [COMPONENT_PARTS.md](./COMPONENT_PARTS.md) file.

Here's a summary of the most common style targets:

### Common Style Targets (available for all components)

- `container`: The outer container of the component
- `label`: The label of the component
- `description`: The description/help text
- `error`: The error message

### Text Input Style Targets

- `text.input`: The input element
- `text.prefix`: Prefix content (if any)
- `text.suffix`: Suffix content (if any)

### Select Style Targets

- `select.select`: The select element
- `select.option`: The option elements
- `select.placeholder`: The placeholder text

### Checkbox/Radio Style Targets

- `checkbox.input`: The checkbox input element
- `checkbox.checkmark`: The visual checkmark
- `radio.option`: Individual radio option
- `radio.optionSelected`: Selected radio option

### Switch Style Targets

- `switch.track`: The track/background of the switch
- `switch.trackOn`: The track when switch is on
- `switch.trackOff`: The track when switch is off
- `switch.thumb`: The movable thumb/handle

### Array/Object Style Targets

- `array.item`: The container for each item
- `array.addButton`: The button to add a new item
- `array.removeButton`: The button to remove an item
