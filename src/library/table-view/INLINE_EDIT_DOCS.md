# Inline Editing in TreeTableView

The TreeTableView component now supports inline editing capabilities that can be schema-aware. This allows for dynamic form elements based on the data type of each column.

## Basic Usage

To enable inline editing in your table, simply set the `inlineEdit` prop to `true`:

```jsx
<TreeTableView
  data={myData}
  schema={mySchema}
  inlineEdit={true}
  onRowEvent={handleRowEvent}
/>
```

## Schema Integration

When a schema is provided, the inline editor will automatically use the appropriate form element based on the field type:

- String fields will use text inputs
- Number fields will use number inputs
- Boolean fields will use select dropdowns with true/false options
- Date fields will use date pickers
- Enum fields will use select dropdowns with the enum values as options
- Array fields will use multi-select components

## Example with Schema

```jsx
// Sample schema with different field types
const schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    age: {
      type: "number"
    },
    isActive: {
      type: "boolean"
    },
    role: {
      type: "string",
      enum: ["admin", "user", "guest"]
    },
    joinDate: {
      type: "string",
      format: "date"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};

// Sample data
const data = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    isActive: true,
    role: "admin",
    joinDate: "2023-01-15",
    tags: ["developer", "team-lead"]
  },
  // More data...
];

// Using the TreeTableView with inline editing
const MyTable = () => {
  const handleRowEvent = (event, rowId, row) => {
    if (event === 'edit') {
      console.log('Row edited:', row);
      // Update your data source or make API call
    }
  };

  return (
    <TreeTableView
      data={data}
      schema={schema}
      inlineEdit={true}
      onRowEvent={handleRowEvent}
    />
  );
};
```

## Handling Edit Events

When a cell is edited, the `onRowEvent` callback is triggered with the event type 'edit', the row ID, and the updated row data. You can use this to update your data source or make API calls to persist the changes.

## Custom Cell Renderers

If you have custom cell renderers, they will be used for displaying the cell content, but when editing, the appropriate form element will be used based on the schema.

```jsx
const cellRenderers = {
  'role': (value) => <span className={`role-${value}`}>{value}</span>
};

<TreeTableView
  data={data}
  schema={schema}
  inlineEdit={true}
  cellRenderers={cellRenderers}
  onRowEvent={handleRowEvent}
/>
```

## Styling

The inline edit cells use Tailwind CSS classes for styling and should adapt to your application's theme. The edit mode includes:

- A visible edit button on hover
- Save and cancel buttons when editing
- Appropriate form elements based on the field type
- Focus handling for better user experience

## Notes

- Clicking outside an editing cell will cancel the edit
- Pressing Enter will save the edit
- Pressing Escape will cancel the edit
- The first column with tree controls cannot be edited inline
