# Form Element Component Parts

This document identifies all the components that make up each form control and establishes a naming convention for styling them.

## Naming Convention

We'll use a two-level naming convention:

1. **Group Names**: For components that share common styling across different control types
   - Example: `input` for all input elements

2. **Specific Names**: For components that are specific to a particular control type
   - Example: `text.input` for text input fields specifically

## Common Component Parts

These parts are common across most form elements:

| Part Name | Description | Used In |
|-----------|-------------|---------|
| `container` | The outer container of the control | All controls |
| `label` | The label of the control | All controls |
| `description` | Help text or description | All controls |
| `error` | Error message | All controls |
| `icon` | Icon element | Many controls |
| `iconContainer` | Container for the icon | Many controls |

## Control-Specific Component Parts

### Text Input (`text`)

| Part Name | Description |
|-----------|-------------|
| `input` | The input element |
| `prefix` | Prefix content (if any) |
| `suffix` | Suffix content (if any) |

### Textarea (`textarea`)

| Part Name | Description |
|-----------|-------------|
| `textarea` | The textarea element |

### Number Input (`number`)

| Part Name | Description |
|-----------|-------------|
| `input` | The input element |
| `prefix` | Prefix content (if any) |
| `suffix` | Suffix content (if any) |
| `stepper` | The up/down stepper controls |
| `stepperUp` | The up stepper button |
| `stepperDown` | The down stepper button |

### Select Single (`selectsingle`)

| Part Name | Description |
|-----------|-------------|
| `select` | The select element |
| `option` | Individual option |
| `selectedOption` | The selected option |
| `placeholder` | Placeholder text |

### Checkbox (`checkbox`)

| Part Name | Description |
|-----------|-------------|
| `input` | The checkbox input |
| `checkmark` | The visual checkmark |

### Radio (`radio`)

| Part Name | Description |
|-----------|-------------|
| `group` | Container for radio options |
| `option` | Individual radio option |
| `optionSelected` | Selected radio option |
| `optionUnselected` | Unselected radio option |
| `input` | The radio input element |
| `checkmark` | The visual radio button indicator |

### Switch (`switch`)

| Part Name | Description |
|-----------|-------------|
| `track` | The track/background of the switch |
| `trackOn` | The track when switch is on |
| `trackOff` | The track when switch is off |
| `thumb` | The movable thumb/handle |
| `thumbOn` | The thumb when switch is on |
| `thumbOff` | The thumb when switch is off |

### Select Many (`selectmany`)

| Part Name | Description |
|-----------|-------------|
| `group` | Container for options |
| `option` | Individual option |
| `selectedOption` | Selected option |
| `unselectedOption` | Unselected option |
| `optionLabel` | Label for an option |
| `optionDescription` | Description for an option |

### Combo Box (`combo`)

| Part Name | Description |
|-----------|-------------|
| `input` | The input element |
| `button` | The dropdown button |
| `dropdown` | The dropdown container |
| `option` | Individual option in dropdown |
| `selectedOption` | Selected option |
| `selectedTag` | Tag for selected item(s) |
| `clearButton` | Button to clear selection |
| `addButton` | Button to add new item |

### Date Picker (`date`)

| Part Name | Description |
|-----------|-------------|
| `input` | The date input field |
| `calendar` | The calendar popup |
| `calendarHeader` | Header of the calendar |
| `calendarDay` | Individual day in calendar |
| `calendarDaySelected` | Selected day in calendar |
| `calendarDayDisabled` | Disabled day in calendar |
| `calendarNavButton` | Navigation button in calendar |

### File Upload (`file`)

| Part Name | Description |
|-----------|-------------|
| `dropzone` | The file drop zone |
| `input` | The file input element |
| `button` | The browse button |
| `preview` | File preview container |
| `previewItem` | Individual file preview |
| `removeButton` | Button to remove file |

### Color Picker (`color`)

| Part Name | Description |
|-----------|-------------|
| `input` | The color input |
| `preview` | Color preview swatch |
| `palette` | Color palette popup |
| `paletteItem` | Individual color in palette |

### Button (`button`)

| Part Name | Description |
|-----------|-------------|
| `button` | The button element |
| `buttonPrimary` | Primary button style |
| `buttonSecondary` | Secondary button style |
| `buttonIcon` | Button with icon |

### Array/List (`array`)

| Part Name | Description |
|-----------|-------------|
| `container` | Container for the array items |
| `item` | Individual array item |
| `itemHeader` | Header for an array item |
| `addButton` | Button to add new item |
| `removeButton` | Button to remove item |
| `moveUpButton` | Button to move item up |
| `moveDownButton` | Button to move item down |

## Wrapper Components

These components wrap other components and provide additional structure:

### Element Wrapper Control

| Part Name | Description |
|-----------|-------------|
| `control` | The main control wrapper |
| `control-inner` | Inner container for the control |
| `control-label` | Label container |
| `control-label-inner` | Inner container for the label |
| `control-input` | Input container |
| `control-help` | Help/description container |
| `control-error` | Error message container |

### Element Wrapper Layout

| Part Name | Description |
|-----------|-------------|
| `layout` | The main layout wrapper |
| `input` | Container for the input elements |
| `control-label` | Label container |
| `control-help` | Help/description container |
| `control-error` | Error message container |

## Styling Hierarchy

When applying styles, the following hierarchy should be used:

1. **Theme defaults**: Base styles for all components
2. **Component type styles**: Styles specific to a component type (e.g., all text inputs)
3. **Specific component styles**: Styles for a specific instance of a component

## Example Usage

```json
{
  "type": "string",
  "title": "Username",
  "styling": {
    // Common parts
    "container": "bg-gray-50 p-4 rounded-lg",
    "label": "text-blue-600 font-medium",
    "description": "text-gray-500 text-xs mt-1",
    "error": "text-red-500 text-xs mt-1",
    
    // Text input specific parts
    "input": "border-blue-300 focus:ring-blue-500",
    "prefix": "text-gray-400",
    "suffix": "text-gray-400"
  }
}
```

## Group-to-Specific Mapping

This table shows how group names map to specific component names:

| Group Name | Specific Component Names |
|------------|--------------------------|
| `input` | `text.input`, `number.input`, `date.input`, etc. |
| `label` | `text.label`, `checkbox.label`, `radio.label`, etc. |
| `container` | `text.container`, `select.container`, `switch.container`, etc. |
| `description` | `text.description`, `select.description`, `switch.description`, etc. |
| `error` | `text.error`, `select.error`, `switch.error`, etc. |

## Implementation Notes

When implementing the styling system:

1. Apply group styles first, then override with specific styles
2. Use the `twMerge` function to properly merge Tailwind classes
3. Allow for both group-level and specific-level styling in the schema
4. Provide sensible defaults for all component parts in the theme system
