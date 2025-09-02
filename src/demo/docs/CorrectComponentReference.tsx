import React from 'react';

const CorrectComponentReference: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>AppMint Form - Correct Component Reference</h1>
      
      <div className="not-prose my-8 p-6 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
          ⚠️ Important: Based on Actual Source Code
        </h3>
        <p className="text-red-700 dark:text-red-300">
          This documentation is based on the ACTUAL source code at /src/library/form-elements/all-elements.tsx.
          Only the x-control values listed in elementToNameMap are valid!
        </p>
      </div>

      <h2>Valid x-control Values (from elementToNameMap)</h2>
      
      <p>These are the ONLY valid values for the x-control property:</p>
      
      <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">dataview</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">text</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">textarea</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">number</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">shadow</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">file</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">selectsingle</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">selectmany</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">richtext</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">paragraph</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">code</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">date</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">daterange</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">color</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">uuid</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">map</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">button</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">label</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">cron</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">phone</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">icon</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">markdown</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">preview</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">numberrange</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">address</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">rating</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">ranking</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">generated</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">sociallinks</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">legalconsent</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">lookup</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">capture</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">font</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">signature</code>
      </div>

      <div className="not-prose my-8 p-6 rounded-lg border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
          ⚠️ Note about email, password, url
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          There is NO "email", "password", or "url" x-control value! These are HTML input types handled as variants of the text control.
        </p>
      </div>

      <h2>Component Examples</h2>

      <h3>Text Input (default)</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "name": {
    "type": "string",
    "title": "Name"
  }
}`}
        </pre>
      </div>

      <h3>Textarea</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "description": {
    "type": "string",
    "title": "Description",
    "x-control": "textarea"  // OR use x-control-variant: "textarea"
  }
}`}
        </pre>
      </div>

      <h3>Email Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "email": {
    "type": "string",
    "title": "Email",
    "format": "email",  // This triggers email validation
    "x-control-variant": "email"  // This sets input type="email"
  }
}`}
        </pre>
      </div>

      <h3>Password Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "password": {
    "type": "string",
    "title": "Password",
    "x-control-variant": "password"  // This sets input type="password"
  }
}`}
        </pre>
      </div>

      <h3>Phone Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "phone": {
    "type": "string",
    "title": "Phone",
    "x-control": "phone"  // This IS a valid x-control value
  }
}`}
        </pre>
      </div>

      <h3>Select Single (Dropdown)</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "country": {
    "type": "string",
    "title": "Country",
    "x-control": "selectsingle",  // Note: lowercase, no space
    "enum": ["USA", "Canada", "UK"]
  }
}`}
        </pre>
      </div>

      <h3>Select Many with Variants</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Default (combo for arrays)
{
  "tags": {
    "type": "array",
    "x-control": "selectmany",
    "items": {
      "type": "string",
      "enum": ["Tag1", "Tag2", "Tag3"]
    }
  }
}

// Checkbox variant
{
  "features": {
    "type": "array",
    "x-control": "selectmany",
    "x-control-variant": "checkbox",  // Valid variants: select, combo, chip, radio, checkbox, switch, image
    "options": ["Feature1", "Feature2", "Feature3"]
  }
}

// Radio variant (for single selection)
{
  "size": {
    "type": "string",
    "x-control": "selectmany",
    "x-control-variant": "radio",
    "enum": ["Small", "Medium", "Large"]
  }
}`}
        </pre>
      </div>

      <h3>Date Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "birthDate": {
    "type": "string",
    "format": "date",
    "x-control": "date"
  }
}`}
        </pre>
      </div>

      <h3>Rich Text Editor</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "content": {
    "type": "string",
    "x-control": "richtext"
  }
}`}
        </pre>
      </div>

      <h3>Code Editor</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "script": {
    "type": "string",
    "x-control": "code"
  }
}`}
        </pre>
      </div>

      <h3>File Upload</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "document": {
    "type": "string",
    "x-control": "file"
  }
}`}
        </pre>
      </div>

      <h3>Advanced Components</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Screen Capture
{
  "screenshot": {
    "type": "string",
    "x-control": "capture"
  }
}

// Signature Pad
{
  "signature": {
    "type": "string",
    "x-control": "signature"
  }
}

// Cron Expression
{
  "schedule": {
    "type": "string",
    "x-control": "cron"
  }
}

// UUID Generator
{
  "id": {
    "type": "string",
    "x-control": "uuid"
  }
}

// Color Picker
{
  "color": {
    "type": "string",
    "x-control": "color"
  }
}

// Data Lookup
{
  "customer": {
    "type": "string",
    "x-control": "lookup"
  }
}

// Map Location
{
  "location": {
    "type": "object",
    "x-control": "map"
  }
}

// Rating
{
  "rating": {
    "type": "number",
    "x-control": "rating"
  }
}

// Ranking (drag and drop)
{
  "priorities": {
    "type": "array",
    "x-control": "ranking"
  }
}`}
        </pre>
      </div>

      <h2>Important Notes</h2>
      
      <ul>
        <li>The <code>cleanControlType</code> function removes "field" and converts to lowercase</li>
        <li>So <code>"x-control": "textfield"</code> becomes <code>"text"</code></li>
        <li>If x-control is not specified, it defaults based on type:
          <ul>
            <li>string → text (or textfield)</li>
            <li>number → number</li>
            <li>boolean → selectsingle</li>
            <li>array → arraycontainer</li>
            <li>object → container</li>
          </ul>
        </li>
        <li>If a control type is not found in elementToNameMap, it shows "Unknown element"</li>
      </ul>

      <div className="not-prose mt-12 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ This is the CORRECT Documentation
        </h3>
        <p className="text-green-700 dark:text-green-300">
          This documentation is based directly on the source code at /src/library/form-elements/all-elements.tsx 
          and the actual component implementations. Use this as the authoritative reference.
        </p>
      </div>
    </div>
  );
};

export default CorrectComponentReference;