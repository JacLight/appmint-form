import React from 'react';

const TransformsDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Data Transforms</h1>
      
      <p className="lead">
        Transform user input in real-time with AppMint Form's powerful transform system. 
        Apply formatting, validation, calculations, and data manipulation automatically as users type.
      </p>

      <h2>Overview</h2>
      <p>
        Transforms are functions that modify field values before they're stored. They enable:
      </p>
      <ul>
        <li>Automatic formatting (phone numbers, dates, currency)</li>
        <li>Text manipulation (uppercase, lowercase, title case)</li>
        <li>Data enrichment (prefixes, suffixes, random IDs)</li>
        <li>Complex calculations and derivations</li>
        <li>API calls for data lookup and validation</li>
        <li>Custom JavaScript transformations</li>
      </ul>

      <h2>Available Transforms</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Transform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Example</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">uppercase</td>
              <td className="px-6 py-4 text-sm">Converts text to uppercase</td>
              <td className="px-6 py-4 text-sm font-mono">hello → HELLO</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">lowercase</td>
              <td className="px-6 py-4 text-sm">Converts text to lowercase</td>
              <td className="px-6 py-4 text-sm font-mono">HELLO → hello</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">titlecase</td>
              <td className="px-6 py-4 text-sm">Capitalizes first letter of each word</td>
              <td className="px-6 py-4 text-sm font-mono">john doe → John Doe</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">prefix::VALUE</td>
              <td className="px-6 py-4 text-sm">Adds prefix if not present</td>
              <td className="px-6 py-4 text-sm font-mono">prefix::$ → 100 → $100</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">suffix::VALUE</td>
              <td className="px-6 py-4 text-sm">Adds suffix if not present</td>
              <td className="px-6 py-4 text-sm font-mono">suffix::% → 50 → 50%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">random-string::LENGTH</td>
              <td className="px-6 py-4 text-sm">Generates random string</td>
              <td className="px-6 py-4 text-sm font-mono">random-string::8 → ABC12XYZ</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">date-now</td>
              <td className="px-6 py-4 text-sm">Sets current date</td>
              <td className="px-6 py-4 text-sm font-mono">→ 12/25/2024</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">time-now</td>
              <td className="px-6 py-4 text-sm">Sets current time</td>
              <td className="px-6 py-4 text-sm font-mono">→ 3:45 PM</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">uri</td>
              <td className="px-6 py-4 text-sm">Formats as URL-safe string</td>
              <td className="px-6 py-4 text-sm font-mono">My Page → my-page</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">script</td>
              <td className="px-6 py-4 text-sm">Custom JavaScript function</td>
              <td className="px-6 py-4 text-sm font-mono">Custom logic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Examples</h2>

      <h3>1. Automatic Formatting</h3>
      <p>Format user input automatically as they type:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "username": {
    "type": "string",
    "title": "Username",
    "transform": "lowercase",
    "description": "Will be converted to lowercase"
  },
  "email": {
    "type": "string",
    "title": "Email",
    "format": "email",
    "transform": ["lowercase", "trim"]
  },
  "company": {
    "type": "string",
    "title": "Company Name",
    "transform": "titlecase"
  },
  "slug": {
    "type": "string",
    "title": "URL Slug",
    "transform": "uri"
  }
}`}
        </pre>
      </div>

      <h3>2. Adding Prefixes and Suffixes</h3>
      <p>Automatically add prefixes or suffixes to values:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "price": {
    "type": "string",
    "title": "Price",
    "transform": "prefix::$"
  },
  "discount": {
    "type": "string",
    "title": "Discount",
    "transform": "suffix::%"
  },
  "sku": {
    "type": "string",
    "title": "Product SKU",
    "transform": ["uppercase", "prefix::SKU-"]
  },
  "website": {
    "type": "string",
    "title": "Website",
    "transform": "prefix::https://"
  }
}`}
        </pre>
      </div>

      <h3>3. Auto-Generated Values</h3>
      <p>Generate values automatically:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "orderId": {
    "type": "string",
    "title": "Order ID",
    "readOnly": true,
    "transform": ["prefix::ORD-", "random-string::8"]
  },
  "timestamp": {
    "type": "string",
    "title": "Created At",
    "readOnly": true,
    "transform": "date-now"
  },
  "trackingCode": {
    "type": "string",
    "title": "Tracking Code",
    "transform": ["uppercase", "random-string::12"]
  }
}`}
        </pre>
      </div>

      <h3>4. Custom Script Transforms</h3>
      <p>Use JavaScript functions for complex transformations:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "phone": {
    "type": "string",
    "title": "Phone Number",
    "transform": {
      "script": "return value.replace(/\\D/g, '').replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3')"
    }
  },
  "creditCard": {
    "type": "string",
    "title": "Credit Card",
    "transform": {
      "script": "return value.replace(/\\s/g, '').replace(/(\\d{4})/g, '$1 ').trim()"
    }
  },
  "fullName": {
    "type": "string",
    "title": "Full Name",
    "dependencies": ["firstName", "lastName"],
    "transform": {
      "script": "return (data.firstName + ' ' + data.lastName).trim()"
    }
  }
}`}
        </pre>
      </div>

      <h3>5. Multiple Transforms</h3>
      <p>Chain multiple transforms together:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "productCode": {
    "type": "string",
    "title": "Product Code",
    "transform": [
      "uppercase",
      "prefix::PROD-",
      "suffix::-2024"
    ]
  },
  "apiKey": {
    "type": "string",
    "title": "API Key",
    "readOnly": true,
    "transform": [
      "prefix::sk_live_",
      "random-string::32"
    ]
  }
}`}
        </pre>
      </div>

      <h2>Advanced Transform Functions</h2>

      <p>Create custom transform functions with access to:</p>
      <ul>
        <li><code>value</code> - The current field value</li>
        <li><code>rowData</code> - Data from the current row (for array fields)</li>
        <li><code>data</code> - All form data</li>
      </ul>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "total": {
    "type": "number",
    "title": "Total",
    "readOnly": true,
    "transform": {
      "script": "return (data.price || 0) * (data.quantity || 0)"
    }
  },
  "tax": {
    "type": "number",
    "title": "Tax",
    "readOnly": true,
    "transform": {
      "script": "const subtotal = (data.price || 0) * (data.quantity || 0); return subtotal * 0.08"
    }
  },
  "grandTotal": {
    "type": "number",
    "title": "Grand Total",
    "readOnly": true,
    "transform": {
      "script": "const subtotal = (data.price || 0) * (data.quantity || 0); const tax = subtotal * 0.08; return subtotal + tax"
    }
  }
}`}
        </pre>
      </div>

      <h2>Best Practices</h2>
      
      <div className="not-prose space-y-4">
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ DO</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use transforms for consistent data formatting</li>
            <li>• Chain transforms for complex operations</li>
            <li>• Validate transformed data with validation rules</li>
            <li>• Use script transforms for complex logic</li>
            <li>• Consider performance with heavy transforms</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ AVOID</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Transforms that make API calls on every keystroke</li>
            <li>• Overly complex transform chains</li>
            <li>• Transforms that modify other fields directly</li>
            <li>• Blocking operations in script transforms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransformsDoc;