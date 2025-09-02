import React from 'react';

const SchemaDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Schema Definition</h1>
      
      <p className="lead">
        AppMint Form uses JSON Schema to define form structure, validation rules, and UI hints. 
        This powerful approach makes forms declarative, reusable, and easy to maintain.
      </p>

      <h2>Basic Schema Structure</h2>
      
      <p>Every schema starts with a root object that defines the form's properties:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "title": "My Form",
  "description": "Form description",
  "properties": {
    "fieldName": {
      "type": "string",
      "title": "Field Label"
    }
  }
}`}
        </pre>
      </div>

      <h2>Data Types</h2>
      
      <h3>String</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-4">
        <pre className="text-sm text-gray-100">
{`{
  "type": "string",
  "title": "Text Field",
  "minLength": 2,
  "maxLength": 100,
  "pattern": "^[A-Za-z]+$",
  "format": "email", // email, uri, date, time, date-time
  "default": "Default value"
}`}
        </pre>
      </div>

      <h3>Number</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-4">
        <pre className="text-sm text-gray-100">
{`{
  "type": "number",
  "title": "Age",
  "minimum": 0,
  "maximum": 120,
  "multipleOf": 1, // For integers
  "exclusiveMinimum": true,
  "exclusiveMaximum": false
}`}
        </pre>
      </div>

      <h3>Boolean</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-4">
        <pre className="text-sm text-gray-100">
{`{
  "type": "boolean",
  "title": "Accept Terms",
  "default": false
}`}
        </pre>
      </div>

      <h3>Array</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-4">
        <pre className="text-sm text-gray-100">
{`{
  "type": "array",
  "title": "Tags",
  "items": {
    "type": "string"
  },
  "minItems": 1,
  "maxItems": 5,
  "uniqueItems": true
}`}
        </pre>
      </div>

      <h3>Object</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-4">
        <pre className="text-sm text-gray-100">
{`{
  "type": "object",
  "title": "Address",
  "properties": {
    "street": { "type": "string" },
    "city": { "type": "string" },
    "zipCode": { "type": "string" }
  },
  "required": ["street", "city"]
}`}
        </pre>
      </div>

      <h2>Control Types (x-control)</h2>
      
      <p>Use the <code>x-control</code> property to specify which UI component to use:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Text inputs
{ "x-control": "text" }        // Default text input
{ "x-control": "textarea" }     // Multi-line text
{ "x-control": "richtext" }     // Rich text editor
{ "x-control": "markdown" }     // Markdown editor
{ "x-control": "code" }         // Code editor
{ "x-control": "password" }     // Password input
{ "x-control": "email" }        // Email input
{ "x-control": "phone" }        // Phone number input

// Date and time
{ "x-control": "date" }         // Date picker
{ "x-control": "time" }         // Time picker
{ "x-control": "datetime" }     // Date and time picker
{ "x-control": "daterange" }    // Date range picker

// Selection
{ "x-control": "select" }       // Dropdown
{ "x-control": "selectmany" }   // Multi-select
{ "x-control": "radio" }        // Radio buttons
{ "x-control": "checkbox" }     // Checkboxes
{ "x-control": "switch" }       // Toggle switch

// Special inputs
{ "x-control": "file" }         // File upload
{ "x-control": "color" }        // Color picker
{ "x-control": "slider" }       // Range slider
{ "x-control": "rating" }       // Star rating
{ "x-control": "map" }          // Map location picker`}
        </pre>
      </div>

      <h2>Validation Rules</h2>
      
      <p>Add validation rules directly in your schema:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "title": "Email",
      "format": "email",
      "pattern": "^[^@]+@company\\.com$",
      "errorMessage": "Must be a company email address"
    },
    "age": {
      "type": "number",
      "title": "Age",
      "minimum": 18,
      "maximum": 65,
      "errorMessage": {
        "minimum": "Must be at least 18 years old",
        "maximum": "Must be 65 or younger"
      }
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
      "errorMessage": "Must contain uppercase, lowercase, number, and special character"
    }
  },
  "required": ["email", "age", "password"]
}`}
        </pre>
      </div>

      <h2>Conditional Logic</h2>
      
      <p>Show/hide fields based on conditions:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "hasPhone": {
      "type": "boolean",
      "title": "Do you have a phone?"
    },
    "phoneNumber": {
      "type": "string",
      "title": "Phone Number",
      "x-control": "phone",
      "x-display": {
        "condition": "data.hasPhone === true"
      }
    },
    "contactMethod": {
      "type": "string",
      "title": "Preferred Contact",
      "enum": ["Email", "Phone", "SMS"],
      "default": "Email"
    },
    "phoneDetails": {
      "type": "object",
      "title": "Phone Details",
      "x-display": {
        "condition": "data.contactMethod === 'Phone' || data.contactMethod === 'SMS'"
      },
      "properties": {
        "bestTime": {
          "type": "string",
          "title": "Best time to call"
        }
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>Layout and Grouping</h2>
      
      <p>Organize your form with layout hints:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "x-layout": {
    "main": {
      "type": "tabs",
      "tabs": [
        { "id": "personal", "title": "Personal Info" },
        { "id": "contact", "title": "Contact Details" },
        { "id": "preferences", "title": "Preferences" }
      ]
    }
  },
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "x-layout-group": "personal"
    },
    "lastName": {
      "type": "string",
      "title": "Last Name",
      "x-layout-group": "personal"
    },
    "email": {
      "type": "string",
      "title": "Email",
      "x-layout-group": "contact"
    },
    "phone": {
      "type": "string",
      "title": "Phone",
      "x-layout-group": "contact"
    },
    "newsletter": {
      "type": "boolean",
      "title": "Subscribe to newsletter",
      "x-layout-group": "preferences"
    }
  }
}`}
        </pre>
      </div>

      <h2>Custom Properties</h2>
      
      <p>AppMint Form supports various custom properties for enhanced functionality:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "string",
  "title": "Field Title",
  
  // UI customization
  "x-placeholder": "Enter text here...",
  "x-helper-text": "This field is required",
  "x-tooltip": "Additional help text",
  "x-class": "custom-css-class",
  "x-style": { "width": "300px" },
  
  // Behavior
  "x-autofocus": true,
  "x-readonly": false,
  "x-disabled": false,
  "x-hidden": false,
  
  // Validation
  "x-validators": [
    {
      "type": "custom",
      "function": "validateEmail",
      "message": "Invalid email format"
    }
  ],
  
  // Data transformation
  "x-transform": "uppercase", // uppercase, lowercase, capitalize
  "x-mask": "(999) 999-9999", // Input mask
  
  // Dependencies
  "x-depends-on": ["otherField"],
  "x-clear-on-hide": true
}`}
        </pre>
      </div>

      <h2>Best Practices</h2>
      
      <div className="not-prose space-y-4">
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ DO</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use descriptive field names and titles</li>
            <li>• Provide helpful error messages</li>
            <li>• Group related fields together</li>
            <li>• Set appropriate validation rules</li>
            <li>• Use the correct data type for each field</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ DON'T</h4>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            <li>• Over-complicate schemas with unnecessary nesting</li>
            <li>• Use conflicting validation rules</li>
            <li>• Forget to handle edge cases in conditional logic</li>
            <li>• Mix presentation logic with data structure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchemaDoc;