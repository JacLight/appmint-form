# Form Elements Styling System

This directory contains the new styling system for form elements. The system provides a flexible and consistent way to style form elements using a component-based approach.

## Overview

The new styling system replaces the legacy `x-ui` approach with a more structured and maintainable solution. It offers several key improvements:

1. **Component-Based**: Each form element is composed of multiple parts that can be styled independently.
2. **Hierarchical**: Styles are applied in a clear hierarchy (common → component → custom).
3. **Tailwind Integration**: Seamless integration with Tailwind CSS for consistent styling.
4. **Backward Compatible**: Support for the legacy `x-ui` format with automatic conversion.
5. **Accessibility**: Improved accessibility with proper ARIA attributes and focus states.

## Key Files

- **`index.ts`**: Exports the main styling components and utilities.
- **`StyledComponent.tsx`**: The core component that handles styling application.
- **`style-utils.ts`**: Utility functions for extracting and applying styles.
- **`theme.ts`**: Default theme definitions for all components.
- **`COMPONENT_PARTS.md`**: Documentation of all component parts that can be styled.
- **`MIGRATION_STATUS.md`**: Status of component migration to the new styling system.

## How to Use

### Basic Usage

To style a component, use the `styling` property in your schema:

```javascript
{
  "type": "string",
  "title": "First Name",
  "styling": {
    "text": {
      "container": {
        "classes": ["bg-gray-50", "rounded-lg"],
        "style": { "borderColor": "#3b82f6" }
      },
      "input": {
        "classes": ["text-lg", "font-medium"],
        "style": { "color": "#1f2937" }
      }
    }
  }
}
```

### Component Parts

Each component is divided into parts that can be styled independently. For example, a text input has the following parts:

- `container`: The outer container
- `label`: The label of the input
- `input`: The input field itself
- `description`: Help text or description
- `error`: Error message

For a complete list of all component parts, see [COMPONENT_PARTS.md](./COMPONENT_PARTS.md).

### Styling Options

Each part can be styled using the following options:

- `classes`: An array of Tailwind CSS classes to apply.
- `style`: A JavaScript object with CSS properties (camelCase).

### Styling Hierarchy

Styles are applied in the following order:

1. **Base Styles**: Default styles defined in the theme.
2. **Component Styles**: Styles specific to the component type.
3. **Custom Styles**: Styles provided in the schema.

This hierarchy allows for consistent styling while still providing flexibility for customization.

## Migration from Legacy `x-ui`

The new styling system is designed to be backward compatible with the legacy `x-ui` approach. The system automatically converts `x-ui` properties to the new format.

For example, the following legacy format:

```javascript
{
  "x-ui": {
    "input": {
      "classes": ["bg-gray-50", "rounded-lg"]
    }
  }
}
```

Is equivalent to:

```javascript
{
  "styling": {
    "text": {
      "input": {
        "classes": ["bg-gray-50", "rounded-lg"]
      }
    }
  }
}
```

For a complete list of migrated components, see [MIGRATION_STATUS.md](./MIGRATION_STATUS.md).

## Examples

### Custom Text Input

```javascript
{
  "type": "string",
  "title": "Email Address",
  "styling": {
    "text": {
      "container": {
        "classes": ["bg-blue-50", "rounded-lg", "p-2"]
      },
      "label": {
        "classes": ["text-blue-700", "font-semibold"]
      },
      "input": {
        "classes": ["border-blue-300", "focus:ring-blue-500", "focus:border-blue-500"]
      },
      "description": {
        "classes": ["text-blue-600", "text-xs", "mt-1"]
      }
    }
  }
}
```

### Custom Radio Group

```javascript
{
  "type": "string",
  "title": "Subscription Plan",
  "enum": ["basic", "premium", "enterprise"],
  "enumNames": ["Basic", "Premium", "Enterprise"],
  "styling": {
    "select-many-radio": {
      "group": {
        "classes": ["space-y-3", "mt-2"]
      },
      "option": {
        "classes": ["flex", "items-center", "p-2", "border", "rounded-md"]
      },
      "optionSelected": {
        "classes": ["border-indigo-500", "bg-indigo-50"]
      },
      "optionUnselected": {
        "classes": ["border-gray-300", "hover:bg-gray-50"]
      },
      "label": {
        "classes": ["ml-3", "font-medium"]
      }
    }
  }
}
```

## Best Practices

1. **Use Tailwind Classes**: Prefer using Tailwind classes for styling when possible, as they provide a consistent design system.

2. **Avoid Inline Styles**: Use inline styles only when necessary, such as for dynamic values or when a specific style cannot be achieved with Tailwind.

3. **Maintain Accessibility**: Ensure that your styling maintains accessibility, such as proper contrast ratios and focus states.

4. **Be Consistent**: Use consistent styling across your forms to provide a cohesive user experience.

5. **Test Responsiveness**: Test your styling on different screen sizes to ensure it works well on all devices.

## Contributing

When adding new components or modifying existing ones, please follow these guidelines:

1. Use the `StyledComponent` for all component parts.
2. Extract styling from the schema using `extractStylingFromSchema`.
3. Apply styling using `getComponentPartStyling`.
4. Update the component parts documentation in `COMPONENT_PARTS.md`.
5. Update the migration status in `MIGRATION_STATUS.md`.

## Future Improvements

1. **Theme Customization**: Allow for global theme customization.
2. **Style Presets**: Provide pre-defined style presets for common use cases.
3. **Style Editor**: Create a visual style editor for easier customization.
4. **Style Validation**: Validate styles to ensure they meet accessibility standards.
5. **Style Export/Import**: Allow for exporting and importing styles between forms.
