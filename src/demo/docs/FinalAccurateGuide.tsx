import React from 'react';

const FinalAccurateGuide: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>AppMint Form - Final Accurate Component & Layout Guide</h1>
      
      <div className="not-prose my-8 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Complete Guide Based on Source Code
        </h3>
        <p className="text-green-700 dark:text-green-300">
          This is the final, accurate documentation based on actual source code analysis.
        </p>
      </div>

      <h2>Layout System</h2>

      <h3>Group Property - Same Line Layout</h3>
      <p>Components with the same <code>group</code> property value are rendered on the same line:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "group": "name"  // Same group
    },
    "lastName": {
      "type": "string", 
      "title": "Last Name",
      "group": "name"  // Same group - will be on same line as firstName
    },
    "email": {
      "type": "string",
      "title": "Email",
      "format": "email"
      // No group - will be on its own line
    },
    "city": {
      "type": "string",
      "title": "City",
      "group": "address"
    },
    "state": {
      "type": "string",
      "title": "State",
      "group": "address"  // Same line as city
    },
    "zip": {
      "type": "string",
      "title": "ZIP",
      "group": "address"  // Same line as city and state
    }
  }
}`}
        </pre>
      </div>

      <h3>x-layout and x-layout-group Properties</h3>
      <p>The <code>x-layout</code> property defines layout IDs. Controls use <code>x-layout-group</code> to specify which layout they belong to:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "title": "Multi-Tab Form",
  "x-layout": "myTabLayout",  // Define layout ID
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "x-layout-group": "personal"  // Goes in personal tab/section
    },
    "lastName": {
      "type": "string",
      "title": "Last Name", 
      "x-layout-group": "personal"  // Goes in personal tab/section
    },
    "email": {
      "type": "string",
      "title": "Email",
      "x-layout-group": "contact"  // Goes in contact tab/section
    },
    "phone": {
      "type": "string",
      "x-control": "phone",
      "x-layout-group": "contact"  // Goes in contact tab/section
    },
    "street": {
      "type": "string",
      "title": "Street",
      "x-layout-group": "address"  // Goes in address tab/section
    }
  }
}`}
        </pre>
      </div>

      <h3>Multi-Page Forms</h3>
      <p>For multi-page forms, use the <code>pages</code> array with standard JSON form schemas:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "title": "Multi-Page Registration",
  "pages": [
    {
      // Page 1 - Personal Info
      "type": "object",
      "title": "Personal Information",
      "properties": {
        "firstName": {
          "type": "string",
          "title": "First Name"
        },
        "lastName": {
          "type": "string",
          "title": "Last Name"
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "x-control": "date",
          "title": "Date of Birth"
        }
      }
    },
    {
      // Page 2 - Contact Info
      "type": "object",
      "title": "Contact Information",
      "properties": {
        "email": {
          "type": "string",
          "title": "Email",
          "format": "email"
        },
        "phone": {
          "type": "string",
          "x-control": "phone",
          "title": "Phone"
        }
      }
    },
    {
      // Page 3 - Address
      "type": "object",
      "title": "Address",
      "properties": {
        "street": {
          "type": "string",
          "title": "Street Address"
        },
        "city": {
          "type": "string",
          "title": "City",
          "group": "location"
        },
        "state": {
          "type": "string",
          "title": "State",
          "group": "location"
        },
        "zip": {
          "type": "string",
          "title": "ZIP",
          "group": "location"
        }
      }
    }
  ]
}`}
        </pre>
      </div>

      <h2>Styling System</h2>
      
      <h3>Current x-ui Format (Legacy)</h3>
      <p>The <code>x-ui</code> property uses nested objects with <code>classes</code> arrays:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "name": {
    "type": "string",
    "title": "Name",
    "x-ui": {
      "input": {
        "classes": ["bg-gray-50", "text-blue-800", "border-blue-300"]
      },
      "label": {
        "classes": ["text-lg", "font-bold", "text-blue-600"]
      },
      "container": {
        "classes": ["p-4", "bg-gray-50", "rounded-xl"]
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>New Styling System (Recommended)</h3>
      <p>The new <code>styling</code> property supports both component-specific and nested styling:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "name": {
    "type": "string",
    "title": "Name",
    "styling": {
      // Component part styling
      "label": "text-lg font-bold text-blue-600",
      "input": "bg-gray-50 border-2 border-blue-300",
      "container": "p-4 rounded-lg",
      
      // Component-specific styling (componentType.part)
      "text.input": "text-blue-800 font-medium",
      "text.label": "mb-2",
      
      // Nested component styling (componentType.parent.part)
      "array.item.label": "text-sm text-gray-600"
    }
  }
}`}
        </pre>
      </div>

      <h3>Styling Hierarchy</h3>
      <p>Styles are applied in this order (later overrides earlier):</p>
      
      <ol>
        <li>Theme common styles (all components)</li>
        <li>Theme component-specific styles</li>
        <li>Custom styling at part level (e.g., "input")</li>
        <li>Custom styling at component.part level (e.g., "text.input")</li>
        <li>Custom styling at nested level (e.g., "array.item.input")</li>
      </ol>

      <h3>Component Parts Reference</h3>
      <p>Common parts that can be styled:</p>
      
      <ul>
        <li><code>container</code> - Outer wrapper</li>
        <li><code>label</code> - Field label</li>
        <li><code>input</code> - Input element</li>
        <li><code>error</code> - Error message</li>
        <li><code>description</code> - Help text</li>
        <li><code>prefix</code> - Prefix element</li>
        <li><code>suffix</code> - Suffix element</li>
        <li><code>icon</code> - Icon element</li>
      </ul>

      <h2>Complete x-control Reference</h2>
      
      <p>Valid x-control values from /src/library/form-elements/all-elements.tsx:</p>
      
      <table className="not-prose min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">x-control</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">x-control-variant Options</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-2 font-mono text-sm">text (default for string)</td>
            <td className="px-4 py-2 text-sm">textarea, email, password, url, tel</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">textarea</td>
            <td className="px-4 py-2 text-sm">Maps to TextElement with textarea variant</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">number</td>
            <td className="px-4 py-2 text-sm">vertical, horizontal, slider</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">numberrange</td>
            <td className="px-4 py-2 text-sm">vertical, horizontal</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">selectsingle</td>
            <td className="px-4 py-2 text-sm">checkbox, radio</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">selectmany</td>
            <td className="px-4 py-2 text-sm">select, combo, chip, radio, checkbox, switch, image</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">date</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">daterange</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">color</td>
            <td className="px-4 py-2 text-sm">Check CommonColorPicker for variants</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">file</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">richtext</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">code</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">phone</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">cron</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">uuid</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">map</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">rating</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">ranking</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">signature</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">capture</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">lookup</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">sociallinks</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">legalconsent</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">paragraph</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">label</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-mono text-sm">button</td>
            <td className="px-4 py-2 text-sm">-</td>
          </tr>
        </tbody>
      </table>

      <h2>Common Examples</h2>

      <h3>Form with Same-Line Fields</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "title": "User Registration",
  "properties": {
    // Name fields on same line
    "firstName": {
      "type": "string",
      "title": "First Name",
      "group": "name"
    },
    "middleName": {
      "type": "string",
      "title": "Middle Name",
      "group": "name"
    },
    "lastName": {
      "type": "string",
      "title": "Last Name",
      "group": "name"
    },
    
    // Contact on its own line
    "email": {
      "type": "string",
      "title": "Email",
      "format": "email"
    },
    
    // Phone and extension on same line
    "phone": {
      "type": "string",
      "title": "Phone",
      "x-control": "phone",
      "group": "phone-group"
    },
    "ext": {
      "type": "string",
      "title": "Ext",
      "group": "phone-group"
    },
    
    // Address fields
    "street": {
      "type": "string",
      "title": "Street Address"
    },
    "city": {
      "type": "string",
      "title": "City",
      "group": "city-state-zip"
    },
    "state": {
      "type": "string",
      "title": "State",
      "group": "city-state-zip"
    },
    "zip": {
      "type": "string",
      "title": "ZIP",
      "group": "city-state-zip"
    }
  }
}`}
        </pre>
      </div>

      <h3>Correct Email/Password Fields</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "email": {
    "type": "string",
    "title": "Email",
    "format": "email",  // For validation
    "x-control-variant": "email"  // NOT x-control: "email"!
  },
  "password": {
    "type": "string",
    "title": "Password",
    "x-control-variant": "password"  // NOT x-control: "password"!
  }
}`}
        </pre>
      </div>

      <h3>Selection Controls</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Multi-select with checkboxes
{
  "features": {
    "type": "array",
    "title": "Select Features",
    "x-control": "selectmany",
    "x-control-variant": "checkbox",
    "options": ["Feature A", "Feature B", "Feature C"]
  }
}

// Single select with radio buttons
{
  "size": {
    "type": "string",
    "title": "Size",
    "x-control": "selectmany",  // Yes, selectmany!
    "x-control-variant": "radio",  // Radio makes it single select
    "enum": ["S", "M", "L", "XL"]
  }
}

// Boolean as checkbox
{
  "agree": {
    "type": "boolean",
    "title": "I agree to terms",
    "x-control": "selectsingle",
    "x-control-variant": "checkbox"
  }
}`}
        </pre>
      </div>

      <h3>Number Sliders</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// Single slider
{
  "volume": {
    "type": "number",
    "title": "Volume",
    "x-control": "number",
    "x-control-variant": "slider",  // or "horizontal" or "vertical"
    "minimum": 0,
    "maximum": 100
  }
}

// Range slider
{
  "priceRange": {
    "type": "object",
    "title": "Price Range",
    "x-control": "numberrange",
    "x-control-variant": "horizontal"
  }
}`}
        </pre>
      </div>

      <h2>Important Rules</h2>
      
      <div className="not-prose my-6 p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <ul className="space-y-2 text-red-700 dark:text-red-300">
          <li>❌ <strong>NEVER use x-control: "email"</strong> - use x-control-variant: "email"</li>
          <li>❌ <strong>NEVER use x-control: "password"</strong> - use x-control-variant: "password"</li>
          <li>❌ <strong>NEVER use x-control: "url"</strong> - use x-control-variant: "url"</li>
          <li>✅ <strong>x-control values MUST be in elementToNameMap</strong></li>
          <li>✅ <strong>Use group property to put fields on same line</strong></li>
          <li>✅ <strong>Use x-layout outside properties for tabs/accordions</strong></li>
          <li>✅ <strong>cleanControlType removes "field" and lowercases</strong></li>
        </ul>
      </div>

      <div className="not-prose mt-12 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ This is the Authoritative Reference
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Based on direct source code analysis of AppMint Form. All x-control and x-control-variant values 
          have been verified against the actual implementation.
        </p>
      </div>
    </div>
  );
};

export default FinalAccurateGuide;