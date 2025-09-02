import React from 'react';

const ValidationDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Validation System</h1>
      
      <p className="lead">
        AppMint Form provides a comprehensive validation system that combines JSON Schema validation 
        with custom rules and real-time feedback. Ensure data quality with built-in and custom validators.
      </p>

      <h2>Overview</h2>
      <p>
        The validation system offers multiple layers of data validation:
      </p>
      <ul>
        <li>JSON Schema validation (type, format, constraints)</li>
        <li>Custom validation functions</li>
        <li>Cross-field validation</li>
        <li>Async validation (API calls)</li>
        <li>Real-time validation feedback</li>
        <li>Custom error messages</li>
      </ul>

      <h2>Built-in Validators</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Validator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usage</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">required</td>
              <td className="px-6 py-4 text-sm">Field must have a value</td>
              <td className="px-6 py-4 text-sm font-mono">"required": true</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">minLength</td>
              <td className="px-6 py-4 text-sm">Minimum string length</td>
              <td className="px-6 py-4 text-sm font-mono">"minLength": 3</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">maxLength</td>
              <td className="px-6 py-4 text-sm">Maximum string length</td>
              <td className="px-6 py-4 text-sm font-mono">"maxLength": 100</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">minimum</td>
              <td className="px-6 py-4 text-sm">Minimum numeric value</td>
              <td className="px-6 py-4 text-sm font-mono">"minimum": 0</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">maximum</td>
              <td className="px-6 py-4 text-sm">Maximum numeric value</td>
              <td className="px-6 py-4 text-sm font-mono">"maximum": 100</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">pattern</td>
              <td className="px-6 py-4 text-sm">Regex pattern match</td>
              <td className="px-6 py-4 text-sm font-mono">"pattern": "^[A-Z][0-9]+$"</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">format</td>
              <td className="px-6 py-4 text-sm">Data format validation</td>
              <td className="px-6 py-4 text-sm font-mono">"format": "email"</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">enum</td>
              <td className="px-6 py-4 text-sm">Value must be in list</td>
              <td className="px-6 py-4 text-sm font-mono">"enum": ["yes", "no"]</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">uniqueItems</td>
              <td className="px-6 py-4 text-sm">Array items must be unique</td>
              <td className="px-6 py-4 text-sm font-mono">"uniqueItems": true</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Format Validators</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Validates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Example</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">email</td>
              <td className="px-6 py-4 text-sm">Email addresses</td>
              <td className="px-6 py-4 text-sm">user@example.com</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">uri</td>
              <td className="px-6 py-4 text-sm">URIs and URLs</td>
              <td className="px-6 py-4 text-sm">https://example.com</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">date</td>
              <td className="px-6 py-4 text-sm">Date strings</td>
              <td className="px-6 py-4 text-sm">2024-12-25</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">time</td>
              <td className="px-6 py-4 text-sm">Time strings</td>
              <td className="px-6 py-4 text-sm">14:30:00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">date-time</td>
              <td className="px-6 py-4 text-sm">ISO 8601 datetime</td>
              <td className="px-6 py-4 text-sm">2024-12-25T14:30:00Z</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">ipv4</td>
              <td className="px-6 py-4 text-sm">IPv4 addresses</td>
              <td className="px-6 py-4 text-sm">192.168.1.1</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">ipv6</td>
              <td className="px-6 py-4 text-sm">IPv6 addresses</td>
              <td className="px-6 py-4 text-sm">2001:db8::1</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">uuid</td>
              <td className="px-6 py-4 text-sm">UUIDs</td>
              <td className="px-6 py-4 text-sm">123e4567-e89b-12d3-a456-426614174000</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">phone</td>
              <td className="px-6 py-4 text-sm">Phone numbers</td>
              <td className="px-6 py-4 text-sm">+1-555-123-4567</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">creditcard</td>
              <td className="px-6 py-4 text-sm">Credit card numbers</td>
              <td className="px-6 py-4 text-sm">4111 1111 1111 1111</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Examples</h2>

      <h3>1. Basic Validation</h3>
      <p>Simple field validation with required fields and constraints:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": {
      "type": "string",
      "title": "Full Name",
      "minLength": 2,
      "maxLength": 50,
      "pattern": "^[a-zA-Z ]+$",
      "errorMessage": "Name must contain only letters and spaces"
    },
    "email": {
      "type": "string",
      "title": "Email Address",
      "format": "email",
      "errorMessage": "Please enter a valid email address"
    },
    "age": {
      "type": "number",
      "title": "Age",
      "minimum": 18,
      "maximum": 120,
      "errorMessage": "Age must be between 18 and 120"
    }
  }
}`}
        </pre>
      </div>

      <h3>2. Password Validation with Confirmation</h3>
      <p>Password field with strength requirements and confirmation match:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "password": {
    "type": "string",
    "title": "Password",
    "format": "password",
    "minLength": 8,
    "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
    "errorMessage": "Password must contain uppercase, lowercase, number, and special character"
  },
  "confirmPassword": {
    "type": "string",
    "title": "Confirm Password",
    "format": "password",
    "validation": {
      "match": "password",
      "errorMessage": "Passwords do not match"
    }
  }
}`}
        </pre>
      </div>

      <h3>3. Conditional Validation</h3>
      <p>Validation rules that depend on other field values:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "accountType": {
    "type": "string",
    "title": "Account Type",
    "enum": ["personal", "business"]
  },
  "companyName": {
    "type": "string",
    "title": "Company Name",
    "validation": {
      "required": "{{accountType === 'business'}}",
      "minLength": 2,
      "errorMessage": "Company name is required for business accounts"
    }
  },
  "taxId": {
    "type": "string",
    "title": "Tax ID",
    "validation": {
      "required": "{{accountType === 'business'}}",
      "pattern": "^[0-9]{2}-[0-9]{7}$",
      "errorMessage": "Tax ID must be in format XX-XXXXXXX"
    }
  }
}`}
        </pre>
      </div>

      <h3>4. Custom Validation Functions</h3>
      <p>Use JavaScript functions for complex validation logic:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "startDate": {
    "type": "string",
    "format": "date",
    "title": "Start Date"
  },
  "endDate": {
    "type": "string",
    "format": "date",
    "title": "End Date",
    "validation": {
      "custom": "return new Date(value) > new Date(data.startDate)",
      "errorMessage": "End date must be after start date"
    }
  },
  "creditCard": {
    "type": "string",
    "title": "Credit Card",
    "validation": {
      "custom": "const cleaned = value.replace(/\\s/g, ''); return /^[0-9]{16}$/.test(cleaned) && luhnCheck(cleaned)",
      "errorMessage": "Invalid credit card number"
    }
  }
}`}
        </pre>
      </div>

      <h3>5. Array and Object Validation</h3>
      <p>Validate complex data structures:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "emails": {
    "type": "array",
    "title": "Email Addresses",
    "minItems": 1,
    "maxItems": 5,
    "uniqueItems": true,
    "items": {
      "type": "string",
      "format": "email"
    },
    "errorMessage": "Please provide 1-5 unique email addresses"
  },
  "address": {
    "type": "object",
    "title": "Address",
    "required": ["street", "city", "zip"],
    "properties": {
      "street": {
        "type": "string",
        "minLength": 5
      },
      "city": {
        "type": "string",
        "minLength": 2
      },
      "zip": {
        "type": "string",
        "pattern": "^[0-9]{5}(-[0-9]{4})?$"
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>6. Async Validation</h3>
      <p>Validate data against external sources:</p>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "username": {
    "type": "string",
    "title": "Username",
    "minLength": 3,
    "validation": {
      "async": {
        "url": "/api/check-username",
        "method": "POST",
        "debounce": 500,
        "errorMessage": "Username is already taken"
      }
    }
  },
  "email": {
    "type": "string",
    "title": "Email",
    "format": "email",
    "validation": {
      "async": {
        "url": "/api/verify-email",
        "method": "POST",
        "debounce": 1000,
        "successMessage": "Email is available",
        "errorMessage": "Email is already registered"
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>Validation Messages</h2>

      <p>Customize error messages for better user experience:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "phone": {
    "type": "string",
    "title": "Phone Number",
    "pattern": "^\\+?[1-9]\\d{1,14}$",
    "errorMessage": {
      "pattern": "Please enter a valid international phone number",
      "required": "Phone number is required for account verification",
      "minLength": "Phone number is too short",
      "maxLength": "Phone number is too long"
    }
  }
}`}
        </pre>
      </div>

      <h2>Validation Modes</h2>
      
      <div className="not-prose space-y-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">onChange</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Validates as the user types. Best for immediate feedback.
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">onBlur</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Validates when field loses focus. Less intrusive than onChange.
          </p>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h4 className="font-semibold mb-2">onSubmit</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Validates only on form submission. Least intrusive option.
          </p>
        </div>
      </div>

      <h2>Best Practices</h2>
      
      <div className="not-prose space-y-4 mt-8">
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ DO</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Provide clear, actionable error messages</li>
            <li>• Validate on the appropriate event (onChange, onBlur, onSubmit)</li>
            <li>• Use format validators for standard data types</li>
            <li>• Combine multiple validation rules when needed</li>
            <li>• Show success states for complex validations</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ AVOID</h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Over-validating (too many rules can frustrate users)</li>
            <li>• Generic error messages like "Invalid input"</li>
            <li>• Validating too early (before user finishes typing)</li>
            <li>• Blocking form submission without clear feedback</li>
            <li>• Complex regex patterns without explanation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ValidationDoc;