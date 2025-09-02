import React from 'react';

const RulesEngineDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Rules Engine</h1>
      
      <p className="lead">
        AppMint Form's powerful rules engine allows you to create dynamic, intelligent forms that respond to user input in real-time.
        Control visibility, validation, properties, and behavior based on complex conditional logic.
      </p>

      <h2>Overview</h2>
      <p>
        The rules engine evaluates conditions and executes actions based on form data. This enables:
      </p>
      <ul>
        <li>Conditional field visibility (show/hide)</li>
        <li>Dynamic field properties (disabled, readonly)</li>
        <li>Calculated values and dependencies</li>
        <li>Cross-field validation</li>
        <li>Dynamic schema modifications</li>
      </ul>

      <h2>Rule Structure</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "rules": [
    {
      "operation": "equals",      // Condition operator
      "valueA": "{{age}}",        // First value (can be template)
      "valueB": 18,               // Second value
      "action": "show",           // Action to take if true
      "property": [...]           // Optional properties to set
    }
  ]
}`}
        </pre>
      </div>

      <h2>Available Operations</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Operation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Example</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">equals</td>
              <td className="px-6 py-4 text-sm">Checks if values are equal</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{status}}", "valueB": "active"`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">not-equals</td>
              <td className="px-6 py-4 text-sm">Checks if values are not equal</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{role}}", "valueB": "admin"`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">greater-than</td>
              <td className="px-6 py-4 text-sm">Checks if A &gt; B</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{age}}", "valueB": 18`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">less-than</td>
              <td className="px-6 py-4 text-sm">Checks if A &lt; B</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{score}}", "valueB": 50`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">contains</td>
              <td className="px-6 py-4 text-sm">Checks if A contains B</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{tags}}", "valueB": "important"`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">empty</td>
              <td className="px-6 py-4 text-sm">Checks if value is empty</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{phone}}"`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">not-empty</td>
              <td className="px-6 py-4 text-sm">Checks if value is not empty</td>
              <td className="px-6 py-4 text-sm font-mono">{`"valueA": "{{email}}"`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Available Actions</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Effect</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">show</td>
              <td className="px-6 py-4 text-sm">Shows the field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">hide</td>
              <td className="px-6 py-4 text-sm">Hides the field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">disabled</td>
              <td className="px-6 py-4 text-sm">Disables the field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">readOnly</td>
              <td className="px-6 py-4 text-sm">Makes field read-only</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">set-property</td>
              <td className="px-6 py-4 text-sm">Sets custom properties</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Examples</h2>

      <h3>1. Conditional Visibility</h3>
      <p>Show additional fields based on user selection:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "hasLicense": {
      "type": "boolean",
      "title": "Do you have a driver's license?"
    },
    "licenseNumber": {
      "type": "string",
      "title": "License Number",
      "rules": [
        {
          "operation": "equals",
          "valueA": "{{hasLicense}}",
          "valueB": true,
          "action": "show"
        }
      ]
    },
    "licenseExpiry": {
      "type": "string",
      "format": "date",
      "title": "License Expiry Date",
      "rules": [
        {
          "operation": "equals",
          "valueA": "{{hasLicense}}",
          "valueB": true,
          "action": "show"
        }
      ]
    }
  }
}`}
        </pre>
      </div>

      <h3>2. Dynamic Validation</h3>
      <p>Require fields based on other field values:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "employmentStatus": {
    "type": "string",
    "title": "Employment Status",
    "enum": ["Employed", "Self-Employed", "Unemployed", "Student"]
  },
  "companyName": {
    "type": "string",
    "title": "Company Name",
    "rules": [
      {
        "operation": "equals",
        "valueA": "{{employmentStatus}}",
        "valueB": "Employed",
        "action": "show"
      }
    ]
  },
  "businessName": {
    "type": "string",
    "title": "Business Name",
    "rules": [
      {
        "operation": "equals",
        "valueA": "{{employmentStatus}}",
        "valueB": "Self-Employed",
        "action": "show"
      }
    ]
  },
  "schoolName": {
    "type": "string",
    "title": "School/University",
    "rules": [
      {
        "operation": "equals",
        "valueA": "{{employmentStatus}}",
        "valueB": "Student",
        "action": "show"
      }
    ]
  }
}`}
        </pre>
      </div>

      <h3>3. Progressive Disclosure</h3>
      <p>Show fields progressively as user fills the form:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "personalInfo": {
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First Name"
      },
      "lastName": {
        "type": "string",
        "title": "Last Name",
        "rules": [
          {
            "operation": "not-empty",
            "valueA": "{{personalInfo.firstName}}",
            "action": "show"
          }
        ]
      },
      "email": {
        "type": "string",
        "title": "Email",
        "format": "email",
        "rules": [
          {
            "operation": "not-empty",
            "valueA": "{{personalInfo.lastName}}",
            "action": "show"
          }
        ]
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>4. Calculated Fields</h3>
      <p>Set field values based on other fields:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "price": {
    "type": "number",
    "title": "Price"
  },
  "quantity": {
    "type": "number",
    "title": "Quantity"
  },
  "total": {
    "type": "number",
    "title": "Total",
    "readOnly": true,
    "rules": [
      {
        "operation": "not-empty",
        "valueA": "{{price}}",
        "action": "set-property",
        "property": [
          {
            "key": "default",
            "value": "{{price * quantity}}"
          }
        ]
      }
    ]
  }
}`}
        </pre>
      </div>

      <h3>5. Complex Conditions</h3>
      <p>Combine multiple conditions:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "age": {
    "type": "number",
    "title": "Age"
  },
  "hasConsent": {
    "type": "boolean",
    "title": "Parental Consent"
  },
  "canProceed": {
    "type": "boolean",
    "title": "Can Proceed",
    "readOnly": true,
    "rules": [
      {
        "operation": "greater-than",
        "valueA": "{{age}}",
        "valueB": 18,
        "action": "set-property",
        "property": [
          { "key": "default", "value": true }
        ]
      },
      {
        "operation": "equals",
        "valueA": "{{hasConsent}}",
        "valueB": true,
        "action": "set-property",
        "property": [
          { "key": "default", "value": true }
        ]
      }
    ]
  }
}`}
        </pre>
      </div>

      <h2>Template Variables</h2>
      
      <p>Use template variables to reference other fields:</p>
      
      <ul>
        <li><code>{`{{fieldName}}`}</code> - Reference a field value</li>
        <li><code>{`{{parent.child}}`}</code> - Reference nested field</li>
        <li><code>{`{{array[0].property}}`}</code> - Reference array items</li>
        <li><code>{`{{field1 + field2}}`}</code> - Basic calculations</li>
      </ul>

      <h2>Best Practices</h2>
      
      <div className="not-prose space-y-4">
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ DO</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use rules for progressive disclosure</li>
            <li>• Keep conditions simple and readable</li>
            <li>• Test all rule combinations</li>
            <li>• Provide default values for calculated fields</li>
            <li>• Use meaningful field names in templates</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ CONSIDER</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Performance impact of many rules</li>
            <li>• User experience with dynamic forms</li>
            <li>• Accessibility of conditional fields</li>
            <li>• Mobile experience with show/hide</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesEngineDoc;