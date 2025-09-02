import React from 'react';

const QuickStartDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Quick Start</h1>
      
      <p className="lead">
        Build your first form with AppMint Form in 5 minutes. This guide covers the essentials to get you started.
      </p>

      <h2>Step 1: Basic Form</h2>
      
      <p>Let's start with a simple contact form:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`import React from 'react';
import { CollectionForm } from '@appmint/form';

function ContactForm() {
  const schema = {
    type: 'object',
    title: 'Contact Form',
    properties: {
      name: {
        type: 'string',
        title: 'Full Name',
        minLength: 2
      },
      email: {
        type: 'string',
        title: 'Email Address',
        format: 'email'
      },
      message: {
        type: 'string',
        title: 'Message',
        'x-control': 'textarea'
      }
    },
    required: ['name', 'email', 'message']
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <CollectionForm 
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}`}
        </pre>
      </div>

      <h2>Step 2: Add Validation</h2>
      
      <p>AppMint Form provides built-in validation based on your schema:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`const schema = {
  type: 'object',
  properties: {
    age: {
      type: 'number',
      title: 'Age',
      minimum: 18,
      maximum: 120,
      errorMessage: 'Must be between 18 and 120'
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
      pattern: '^[^@]+@[^@]+\\.[^@]+$',
      errorMessage: 'Please enter a valid email'
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
      errorMessage: 'Must contain uppercase, lowercase, and number'
    }
  }
};`}
        </pre>
      </div>

      <h2>Step 3: Use Different Input Types</h2>
      
      <p>AppMint Form supports 40+ input types. Here are some common ones:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`const schema = {
  type: 'object',
  properties: {
    // Text area
    bio: {
      type: 'string',
      title: 'Bio',
      'x-control': 'textarea'
    },
    
    // Rich text editor
    description: {
      type: 'string',
      title: 'Description',
      'x-control': 'richtext'
    },
    
    // Date picker
    birthDate: {
      type: 'string',
      title: 'Birth Date',
      format: 'date',
      'x-control': 'date'
    },
    
    // Select dropdown
    country: {
      type: 'string',
      title: 'Country',
      enum: ['USA', 'Canada', 'UK', 'Australia'],
      enumNames: ['United States', 'Canada', 'United Kingdom', 'Australia']
    },
    
    // Multi-select
    interests: {
      type: 'array',
      title: 'Interests',
      items: {
        type: 'string',
        enum: ['Sports', 'Music', 'Reading', 'Travel', 'Cooking']
      },
      'x-control': 'selectmany'
    },
    
    // Checkbox
    subscribe: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
      default: false
    },
    
    // Slider
    rating: {
      type: 'number',
      title: 'Rating',
      minimum: 0,
      maximum: 10,
      'x-control-variant': 'slider'
    },
    
    // File upload
    avatar: {
      type: 'string',
      title: 'Profile Picture',
      'x-control': 'file'
    }
  }
};`}
        </pre>
      </div>

      <h2>Step 4: Handle Form State</h2>
      
      <p>Manage form data and handle changes:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`function MyForm() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com'
  });

  const handleChange = (data) => {
    setFormData(data);
    console.log('Form updated:', data);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <CollectionForm
      schema={schema}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}`}
        </pre>
      </div>

      <h2>Step 5: Apply Theming</h2>
      
      <p>Customize the appearance of your forms:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`import { CollectionForm, ThemeProvider } from '@appmint/form';

const customTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    error: '#ef4444',
    success: '#10b981'
  },
  inputs: {
    borderRadius: '8px',
    borderColor: '#e5e7eb',
    focusBorderColor: '#3b82f6',
    fontSize: '14px'
  },
  buttons: {
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600'
  }
};

function ThemedForm() {
  return (
    <ThemeProvider theme={customTheme}>
      <CollectionForm schema={schema} />
    </ThemeProvider>
  );
}`}
        </pre>
      </div>

      <h2>Complete Example</h2>
      
      <p>Here's a complete example putting it all together:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`import React, { useState } from 'react';
import { CollectionForm } from '@appmint/form';

function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = {
    type: 'object',
    title: 'User Registration',
    properties: {
      personalInfo: {
        type: 'object',
        title: 'Personal Information',
        properties: {
          firstName: {
            type: 'string',
            title: 'First Name',
            minLength: 2
          },
          lastName: {
            type: 'string',
            title: 'Last Name',
            minLength: 2
          },
          email: {
            type: 'string',
            title: 'Email',
            format: 'email'
          },
          phone: {
            type: 'string',
            title: 'Phone',
            'x-control': 'phone'
          }
        },
        required: ['firstName', 'lastName', 'email']
      },
      account: {
        type: 'object',
        title: 'Account Details',
        properties: {
          username: {
            type: 'string',
            title: 'Username',
            minLength: 4,
            maxLength: 20
          },
          password: {
            type: 'string',
            title: 'Password',
            'x-control': 'password',
            minLength: 8
          },
          confirmPassword: {
            type: 'string',
            title: 'Confirm Password',
            'x-control': 'password'
          }
        },
        required: ['username', 'password', 'confirmPassword']
      },
      preferences: {
        type: 'object',
        title: 'Preferences',
        properties: {
          newsletter: {
            type: 'boolean',
            title: 'Subscribe to newsletter',
            default: true
          },
          notifications: {
            type: 'array',
            title: 'Notification Preferences',
            items: {
              type: 'string',
              enum: ['Email', 'SMS', 'Push']
            },
            default: ['Email']
          }
        }
      }
    }
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Validate passwords match
    if (data.account.password !== data.account.confirmPassword) {
      alert('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to your API
      console.log('Submitting:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <CollectionForm
        schema={schema}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}

export default RegistrationForm;`}
        </pre>
      </div>

      <h2>What's Next?</h2>
      
      <div className="not-prose grid gap-4 mt-6 sm:grid-cols-3">
        <a href="/docs/components" className="block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold mb-2">Components →</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Explore all 40+ components</p>
        </a>
        <a href="/docs/validation" className="block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold mb-2">Validation →</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Advanced validation techniques</p>
        </a>
        <a href="/examples" className="block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold mb-2">Examples →</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">See real-world examples</p>
        </a>
      </div>
    </div>
  );
};

export default QuickStartDoc;