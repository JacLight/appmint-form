import React from 'react';

const AccurateComponentGuide: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>AppMint Form - Complete Accurate Component Guide</h1>
      
      <div className="not-prose my-8 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Based on Actual Source Code Analysis
        </h3>
        <p className="text-green-700 dark:text-green-300">
          This documentation is created by analyzing the actual source code files. Every x-control and x-control-variant listed here exists in the code.
        </p>
      </div>

      <h2>Valid x-control Values</h2>
      <p>From /src/library/form-elements/all-elements.tsx elementToNameMap:</p>
      
      <table className="not-prose min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">x-control</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Component</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
          <tr><td className="px-4 py-2 font-mono text-sm">dataview</td><td className="px-4 py-2 text-sm">DataViewElement</td><td className="px-4 py-2 text-sm">Data tables/lists</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">text</td><td className="px-4 py-2 text-sm">TextElement</td><td className="px-4 py-2 text-sm">Text input (default for string)</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">textarea</td><td className="px-4 py-2 text-sm">TextElement</td><td className="px-4 py-2 text-sm">Maps to TextElement</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">number</td><td className="px-4 py-2 text-sm">NumberElement</td><td className="px-4 py-2 text-sm">Number input</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">shadow</td><td className="px-4 py-2 text-sm">ShadowElement</td><td className="px-4 py-2 text-sm">Shadow effects</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">file</td><td className="px-4 py-2 text-sm">FileElement</td><td className="px-4 py-2 text-sm">File upload</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">selectsingle</td><td className="px-4 py-2 text-sm">SelectSingleElement</td><td className="px-4 py-2 text-sm">Single selection</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">selectmany</td><td className="px-4 py-2 text-sm">SelectManyElement</td><td className="px-4 py-2 text-sm">Multiple selection</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">richtext</td><td className="px-4 py-2 text-sm">RichtextElement</td><td className="px-4 py-2 text-sm">Rich text editor</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">paragraph</td><td className="px-4 py-2 text-sm">ParagraphElement</td><td className="px-4 py-2 text-sm">Static text display</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">code</td><td className="px-4 py-2 text-sm">CodeElement</td><td className="px-4 py-2 text-sm">Code editor</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">date</td><td className="px-4 py-2 text-sm">DateElement</td><td className="px-4 py-2 text-sm">Date/time picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">daterange</td><td className="px-4 py-2 text-sm">DateRangeElement</td><td className="px-4 py-2 text-sm">Date range picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">color</td><td className="px-4 py-2 text-sm">ColorElement</td><td className="px-4 py-2 text-sm">Color picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">uuid</td><td className="px-4 py-2 text-sm">UuidElement</td><td className="px-4 py-2 text-sm">UUID generator</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">map</td><td className="px-4 py-2 text-sm">MapElementNew</td><td className="px-4 py-2 text-sm">Map location picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">button</td><td className="px-4 py-2 text-sm">ButtonElement</td><td className="px-4 py-2 text-sm">Button</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">label</td><td className="px-4 py-2 text-sm">LabelElement</td><td className="px-4 py-2 text-sm">Label display</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">cron</td><td className="px-4 py-2 text-sm">CronElement</td><td className="px-4 py-2 text-sm">Cron expression editor</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">phone</td><td className="px-4 py-2 text-sm">PhoneElement</td><td className="px-4 py-2 text-sm">Phone number input</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">icon</td><td className="px-4 py-2 text-sm">IconPickerElement</td><td className="px-4 py-2 text-sm">Icon picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">markdown</td><td className="px-4 py-2 text-sm">MarkdownElement</td><td className="px-4 py-2 text-sm">Markdown editor</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">preview</td><td className="px-4 py-2 text-sm">PreviewElement</td><td className="px-4 py-2 text-sm">Preview display</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">numberrange</td><td className="px-4 py-2 text-sm">NumberRangeElement</td><td className="px-4 py-2 text-sm">Number range input</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">address</td><td className="px-4 py-2 text-sm">NumberRangeElement</td><td className="px-4 py-2 text-sm">Maps to NumberRangeElement</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">rating</td><td className="px-4 py-2 text-sm">RatingInput</td><td className="px-4 py-2 text-sm">Star rating</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">ranking</td><td className="px-4 py-2 text-sm">RankingInput</td><td className="px-4 py-2 text-sm">Drag-drop ranking</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">generated</td><td className="px-4 py-2 text-sm">GeneratedElement</td><td className="px-4 py-2 text-sm">Generated values</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">sociallinks</td><td className="px-4 py-2 text-sm">SocialLinksElement</td><td className="px-4 py-2 text-sm">Social media links</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">legalconsent</td><td className="px-4 py-2 text-sm">LegalConsentElement</td><td className="px-4 py-2 text-sm">Legal consent checkbox</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">lookup</td><td className="px-4 py-2 text-sm">DataLookupCombo</td><td className="px-4 py-2 text-sm">Data lookup</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">capture</td><td className="px-4 py-2 text-sm">CaptureElement</td><td className="px-4 py-2 text-sm">Screen/camera capture</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">font</td><td className="px-4 py-2 text-sm">FontPickerElement</td><td className="px-4 py-2 text-sm">Font picker</td></tr>
          <tr><td className="px-4 py-2 font-mono text-sm">signature</td><td className="px-4 py-2 text-sm">SignatureElement</td><td className="px-4 py-2 text-sm">Signature pad</td></tr>
        </tbody>
      </table>

      <h2 className="mt-8">Component Variants (x-control-variant)</h2>

      <h3>Text Element Variants</h3>
      <p>From /src/library/form-elements/text-element.tsx:</p>
      <ul>
        <li><code>textarea</code> - Renders as textarea</li>
        <li><code>email</code> - Sets input type="email"</li>
        <li><code>password</code> - Sets input type="password"</li>
        <li><code>url</code> - Sets input type="url"</li>
        <li><code>tel</code> - Sets input type="tel"</li>
        <li><code>text</code> (default) - Sets input type="text"</li>
      </ul>

      <h3>Number Element Variants</h3>
      <p>From /src/library/form-elements/number-element.tsx:</p>
      <ul>
        <li><code>vertical</code> - Renders as vertical slider</li>
        <li><code>horizontal</code> - Renders as horizontal slider</li>
        <li><code>slider</code> - Renders as slider</li>
        <li><code>number</code> (default) - Standard number input</li>
      </ul>

      <h3>Number Range Element Variants</h3>
      <p>From /src/library/form-elements/number-range-element.tsx:</p>
      <ul>
        <li><code>vertical</code> - Renders as vertical range slider</li>
        <li><code>horizontal</code> - Renders as horizontal range slider</li>
        <li><code>number</code> (default) - Two number inputs</li>
      </ul>

      <h3>Select Single Element Variants</h3>
      <p>From /src/library/form-elements/select-single-element.tsx:</p>
      <ul>
        <li><code>checkbox</code> - Renders as checkbox</li>
        <li><code>radio</code> - Renders as radio button</li>
        <li><code>text</code> (default) - Renders as switch</li>
      </ul>

      <h3>Select Many Element Variants</h3>
      <p>From /src/library/form-elements/select-many-element.tsx:</p>
      <ul>
        <li><code>select</code> - Multi-select list</li>
        <li><code>combo</code> - Combobox with tags</li>
        <li><code>chip</code> - Chip selector (uses combo)</li>
        <li><code>radio</code> - Radio buttons</li>
        <li><code>checkbox</code> - Checkboxes</li>
        <li><code>switch</code> - Switch toggles (uses checkbox)</li>
        <li><code>image</code> - Image selector (uses checkbox)</li>
      </ul>

      <h2 className="mt-8">Working Examples</h2>

      <h3>Text Input Variations</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Basic text (default - no x-control needed)
{
  "name": {
    "type": "string",
    "title": "Name"
  }
}

// Textarea
{
  "description": {
    "type": "string",
    "title": "Description",
    "x-control": "textarea"  // Can use x-control: "textarea"
  }
}
// OR
{
  "description": {
    "type": "string",
    "title": "Description",
    "x-control-variant": "textarea"  // Or use variant on text
  }
}

// Email input
{
  "email": {
    "type": "string",
    "title": "Email",
    "format": "email",  // For validation
    "x-control-variant": "email"  // Sets input type="email"
  }
}

// Password input
{
  "password": {
    "type": "string",
    "title": "Password",
    "x-control-variant": "password"  // Sets input type="password"
  }
}

// URL input
{
  "website": {
    "type": "string",
    "title": "Website",
    "format": "uri",  // For validation
    "x-control-variant": "url"  // Sets input type="url"
  }
}`}
        </pre>
      </div>

      <h3>Number Input Variations</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Basic number
{
  "age": {
    "type": "number",
    "title": "Age",
    "minimum": 0,
    "maximum": 120
  }
}

// Number as slider
{
  "volume": {
    "type": "number",
    "title": "Volume",
    "x-control-variant": "slider",  // or "horizontal" or "vertical"
    "minimum": 0,
    "maximum": 100
  }
}

// Number range
{
  "priceRange": {
    "type": "object",
    "title": "Price Range",
    "x-control": "numberrange"
  }
}

// Number range as slider
{
  "budgetRange": {
    "type": "object",
    "title": "Budget Range",
    "x-control": "numberrange",
    "x-control-variant": "horizontal"  // or "vertical"
  }
}`}
        </pre>
      </div>

      <h3>Selection Variations</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Boolean as checkbox (selectsingle)
{
  "agree": {
    "type": "boolean",
    "title": "I agree",
    "x-control": "selectsingle",
    "x-control-variant": "checkbox"
  }
}

// Single select dropdown
{
  "country": {
    "type": "string",
    "x-control": "selectsingle",
    "enum": ["USA", "Canada", "UK"]
  }
}

// Multi-select with checkboxes
{
  "features": {
    "type": "array",
    "x-control": "selectmany",
    "x-control-variant": "checkbox",
    "items": {
      "type": "string",
      "enum": ["Feature1", "Feature2", "Feature3"]
    }
  }
}

// Multi-select with combo
{
  "tags": {
    "type": "array",
    "x-control": "selectmany",
    "x-control-variant": "combo",  // Tag-style selection
    "options": ["Tag1", "Tag2", "Tag3"]
  }
}

// Radio buttons (single choice)
{
  "size": {
    "type": "string",
    "x-control": "selectmany",
    "x-control-variant": "radio",
    "enum": ["S", "M", "L", "XL"]
  }
}`}
        </pre>
      </div>

      <h3>Advanced Components</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Rich text editor
{
  "content": {
    "type": "string",
    "x-control": "richtext"
  }
}

// Code editor
{
  "script": {
    "type": "string",
    "x-control": "code"
  }
}

// Date picker
{
  "birthDate": {
    "type": "string",
    "format": "date",
    "x-control": "date"
  }
}

// Phone number
{
  "phone": {
    "type": "string",
    "x-control": "phone"  // This IS a valid x-control
  }
}

// File upload
{
  "document": {
    "type": "string",
    "x-control": "file"
  }
}

// Signature pad
{
  "signature": {
    "type": "string",
    "x-control": "signature"
  }
}

// Screen capture
{
  "screenshot": {
    "type": "string",
    "x-control": "capture"
  }
}

// Cron expression
{
  "schedule": {
    "type": "string",
    "x-control": "cron"
  }
}

// Color picker
{
  "color": {
    "type": "string",
    "x-control": "color"
  }
}

// Rating stars
{
  "rating": {
    "type": "number",
    "x-control": "rating"
  }
}

// Drag-drop ranking
{
  "priorities": {
    "type": "array",
    "x-control": "ranking",
    "items": {
      "type": "string"
    }
  }
}`}
        </pre>
      </div>

      <h2>Important Notes</h2>
      
      <div className="not-prose my-6 p-4 rounded-lg border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
        <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
          <li>❗ <strong>email, password, url are NOT x-control values</strong> - they are x-control-variant values for text</li>
          <li>❗ The <code>cleanControlType</code> function removes "field" and converts to lowercase</li>
          <li>❗ <code>"x-control": "textfield"</code> becomes <code>"text"</code> after cleaning</li>
          <li>❗ If x-control value is not in elementToNameMap, it shows "Unknown element"</li>
          <li>❗ Default control types when x-control is not specified:
            <ul className="ml-4 mt-1">
              <li>type: "string" → text</li>
              <li>type: "number" → number</li>
              <li>type: "boolean" → selectsingle</li>
              <li>type: "array" → arraycontainer</li>
              <li>type: "object" → container</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="not-prose mt-12 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Verified Against Source Code
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Every x-control and x-control-variant value in this documentation has been verified against the actual source code.
          This is the authoritative reference for AppMint Form components.
        </p>
      </div>
    </div>
  );
};

export default AccurateComponentGuide;