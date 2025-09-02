import React from 'react';
import { Link } from 'react-router-dom';

const ComponentsOverview: React.FC = () => {
  const components = [
    {
      category: 'Text Inputs',
      items: [
        { name: 'Text Field', control: 'text', description: 'Single-line text input' },
        { name: 'Textarea', control: 'textarea', description: 'Multi-line text input' },
        { name: 'Rich Text', control: 'richtext', description: 'WYSIWYG editor' },
        { name: 'Markdown', control: 'markdown', description: 'Markdown editor' },
        { name: 'Code Editor', control: 'code', description: 'Syntax-highlighted code' },
        { name: 'Password', control: 'password', description: 'Masked password input' },
      ]
    },
    {
      category: 'Number Inputs',
      items: [
        { name: 'Number', control: 'number', description: 'Numeric input field' },
        { name: 'Slider', control: 'slider', description: 'Range slider control' },
        { name: 'Rating', control: 'rating', description: 'Star rating selector' },
        { name: 'Counter', control: 'counter', description: 'Increment/decrement control' },
      ]
    },
    {
      category: 'Selection',
      items: [
        { name: 'Select', control: 'select', description: 'Dropdown menu' },
        { name: 'Multi-Select', control: 'selectmany', description: 'Multiple selection' },
        { name: 'Radio', control: 'radio', description: 'Radio button group' },
        { name: 'Checkbox', control: 'checkbox', description: 'Checkbox group' },
        { name: 'Switch', control: 'switch', description: 'Toggle switch' },
        { name: 'Button Group', control: 'buttongroup', description: 'Button selection' },
      ]
    },
    {
      category: 'Date & Time',
      items: [
        { name: 'Date Picker', control: 'date', description: 'Calendar date selector' },
        { name: 'Time Picker', control: 'time', description: 'Time selector' },
        { name: 'DateTime', control: 'datetime', description: 'Combined date and time' },
        { name: 'Date Range', control: 'daterange', description: 'Start and end dates' },
        { name: 'Month Picker', control: 'month', description: 'Month/year selector' },
      ]
    },
    {
      category: 'Special Inputs',
      items: [
        { name: 'File Upload', control: 'file', description: 'File/image uploader' },
        { name: 'Color Picker', control: 'color', description: 'Color selection tool' },
        { name: 'Phone', control: 'phone', description: 'International phone input' },
        { name: 'Email', control: 'email', description: 'Email with validation' },
        { name: 'URL', control: 'url', description: 'URL with validation' },
        { name: 'Map', control: 'map', description: 'Location picker' },
      ]
    },
    {
      category: 'Layout',
      items: [
        { name: 'Section', control: 'section', description: 'Group related fields' },
        { name: 'Tabs', control: 'tabs', description: 'Tabbed interface' },
        { name: 'Accordion', control: 'accordion', description: 'Collapsible sections' },
        { name: 'Grid', control: 'grid', description: 'Grid layout' },
        { name: 'Divider', control: 'divider', description: 'Visual separator' },
      ]
    }
  ];

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Components Overview</h1>
      
      <p className="lead">
        AppMint Form provides over 40 pre-built components to handle any form requirement. 
        Each component is fully customizable, accessible, and works seamlessly with our schema system.
      </p>

      <div className="not-prose">
        {components.map((category) => (
          <div key={category.category} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((component) => (
                <Link
                  key={component.control}
                  to={`/docs/components/${component.control}`}
                  className="group relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-lg transition-all hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {component.name}
                    </h3>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {component.control}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Component Features</h2>
      
      <div className="not-prose grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-3">🎨 Fully Themeable</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every component can be styled to match your design system using our theming API or custom CSS.
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-3">♿ Accessible</h3>
          <p className="text-gray-600 dark:text-gray-400">
            All components follow WCAG 2.1 guidelines with proper ARIA labels, keyboard navigation, and screen reader support.
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Built-in Validation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Components include validation logic with customizable error messages and real-time feedback.
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-3">📱 Responsive</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every component is mobile-first and adapts perfectly to any screen size.
          </p>
        </div>
      </div>

      <h2>Using Components</h2>
      
      <p>Components are specified in your schema using the <code>x-control</code> property:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "bio": {
      "type": "string",
      "title": "Biography",
      "x-control": "textarea",
      "x-rows": 5
    },
    "birthDate": {
      "type": "string",
      "title": "Date of Birth",
      "format": "date",
      "x-control": "date",
      "x-min-date": "1900-01-01",
      "x-max-date": "2010-12-31"
    },
    "rating": {
      "type": "number",
      "title": "Rate your experience",
      "x-control": "rating",
      "x-max": 5,
      "x-allow-half": true
    }
  }
}`}
        </pre>
      </div>

      <h2>Component Variants</h2>
      
      <p>Many components support variants for different styles and behaviors:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Button variants
{ "x-control": "button", "x-variant": "primary" }
{ "x-control": "button", "x-variant": "secondary" }
{ "x-control": "button", "x-variant": "outline" }
{ "x-control": "button", "x-variant": "ghost" }

// Input sizes
{ "x-control": "text", "x-size": "sm" }
{ "x-control": "text", "x-size": "md" }
{ "x-control": "text", "x-size": "lg" }

// Select styles
{ "x-control": "select", "x-variant": "filled" }
{ "x-control": "select", "x-variant": "outlined" }
{ "x-control": "select", "x-variant": "underlined" }`}
        </pre>
      </div>

      <div className="not-prose mt-8">
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6">
          <h3 className="text-lg font-semibold mb-3">Need a Custom Component?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AppMint Form makes it easy to create and register your own custom components. 
            Check out our guide on building custom components.
          </p>
          <Link
            to="/docs/custom-components"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn how to create custom components →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComponentsOverview;