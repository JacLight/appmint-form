import React from 'react';

const TextInputDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Text Input Component</h1>
      
      <p className="lead">
        The Text Input component is the most fundamental form element, providing a single-line text field 
        with support for validation, formatting, and various UI enhancements.
      </p>

      <h2>Basic Usage</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Username",
  "description": "Choose a unique username"
}`}
        </pre>
      </div>

      <h2>Properties</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">type</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Must be "string" for text inputs</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">title</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Label displayed above the input</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">description</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Helper text displayed below the input</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">default</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Default value</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">minLength</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">number</td>
              <td className="px-6 py-4 text-sm">Minimum character length</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">maxLength</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">number</td>
              <td className="px-6 py-4 text-sm">Maximum character length</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">pattern</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Regular expression for validation</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">format</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Predefined format (email, uri, etc.)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Extended Properties (x-*)</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-placeholder</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Placeholder text</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-autofocus</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Auto-focus on mount</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-autocomplete</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Browser autocomplete hint</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-prefix</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Text/icon before input</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-suffix</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Text/icon after input</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-transform</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Text transformation (uppercase, lowercase, capitalize)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-mask</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Input mask pattern</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">x-size</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">string</td>
              <td className="px-6 py-4 text-sm">Input size (sm, md, lg)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Examples</h2>
      
      <h3>Basic Text Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Full Name",
  "x-placeholder": "Enter your full name"
}`}
        </pre>
      </div>

      <h3>With Validation</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Username",
  "minLength": 3,
  "maxLength": 20,
  "pattern": "^[a-zA-Z0-9_]+$",
  "errorMessage": "Username must be 3-20 characters, alphanumeric and underscore only"
}`}
        </pre>
      </div>

      <h3>Email Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Email Address",
  "format": "email",
  "x-control": "email",
  "x-autocomplete": "email",
  "errorMessage": "Please enter a valid email address"
}`}
        </pre>
      </div>

      <h3>With Prefix and Suffix</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Price",
  "x-prefix": "$",
  "x-suffix": ".00",
  "pattern": "^[0-9]+$"
}`}
        </pre>
      </div>

      <h3>With Input Mask</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Phone Number",
  "x-mask": "(999) 999-9999",
  "x-placeholder": "(555) 123-4567"
}`}
        </pre>
      </div>

      <h3>With Text Transform</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Country Code",
  "x-transform": "uppercase",
  "maxLength": 2,
  "pattern": "^[A-Z]{2}$"
}`}
        </pre>
      </div>

      <h2>Validation</h2>
      
      <p>Text inputs support multiple validation methods:</p>

      <div className="not-prose space-y-4 mb-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">Length Validation</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Use <code>minLength</code> and <code>maxLength</code> to restrict character count.
          </p>
          <div className="rounded bg-gray-100 dark:bg-gray-900 p-2">
            <code className="text-xs">"minLength": 5, "maxLength": 50</code>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">Pattern Validation</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Use regular expressions for complex validation rules.
          </p>
          <div className="rounded bg-gray-100 dark:bg-gray-900 p-2">
            <code className="text-xs">{`"pattern": "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$"`}</code>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">Format Validation</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Use predefined formats for common patterns.
          </p>
          <div className="rounded bg-gray-100 dark:bg-gray-900 p-2">
            <code className="text-xs">"format": "email" // or "uri", "uuid", etc.</code>
          </div>
        </div>
      </div>

      <h2>Accessibility</h2>
      
      <p>The Text Input component includes:</p>
      
      <ul>
        <li>Proper ARIA labels and descriptions</li>
        <li>Keyboard navigation support</li>
        <li>Error announcements for screen readers</li>
        <li>Focus management</li>
        <li>High contrast mode support</li>
      </ul>

      <h2>Styling</h2>
      
      <p>Customize the appearance using theme variables or CSS classes:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100">
{`// Using theme
{
  "x-theme": {
    "borderColor": "#e5e7eb",
    "focusBorderColor": "#3b82f6",
    "fontSize": "14px",
    "padding": "8px 12px"
  }
}

// Using CSS class
{
  "x-class": "custom-input-class"
}`}
        </pre>
      </div>

      <h2>Best Practices</h2>
      
      <div className="not-prose space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span className="text-sm">Always provide a clear, descriptive label</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span className="text-sm">Use placeholder text for examples, not instructions</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span className="text-sm">Provide helpful error messages</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span className="text-sm">Use appropriate input types and autocomplete values</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500">✓</span>
          <span className="text-sm">Consider mobile keyboard types</span>
        </div>
      </div>
    </div>
  );
};

export default TextInputDoc;