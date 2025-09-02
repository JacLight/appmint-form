import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Package, Calendar, Layers, Sparkles, Table, FileText, Shield, Zap } from 'lucide-react';

const AllComponentsDoc: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle initial hash on page load
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Complete Component Reference</h1>
      
      <p className="lead">
        AppMint Form provides 40+ components for every data collection need. From basic inputs to advanced 
        features like screen capture and cron selectors, all components are JSON Schema driven and fully customizable.
      </p>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">JSON Schema Driven</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Every component is configured through JSON Schema, making forms maintainable and reusable
          </p>
        </div>
        <div className="rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Tailwind CSS Based</h3>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Built on Tailwind CSS for easy customization and theming
          </p>
        </div>
      </div>

      <h2 className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        Basic Input Components
      </h2>

      <h3 id="text-input">Text Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "name": {
    "type": "string",
    "title": "Full Name",
    "placeholder": "Enter your name",
    "minLength": 2,
    "maxLength": 50,
    "pattern": "^[a-zA-Z ]+$",
    "default": "John Doe"
  }
}`}
        </pre>
      </div>

      <h3 id="textarea">Textarea</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "description": {
    "type": "string",
    "title": "Description",
    "x-control-variant": "textarea",
    "rows": 4,
    "maxLength": 500,
    "default": "Enter your description here..."
  }
}`}
        </pre>
      </div>

      <h3 id="number-input">Number Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "quantity": {
    "type": "number",
    "title": "Quantity",
    "minimum": 1,
    "maximum": 100,
    "multipleOf": 1,
    "default": 1
  },
  "price": {
    "type": "number",
    "title": "Price",
    "x-control": "number",
    "minimum": 0,
    "default": 99.99
  }
}`}
        </pre>
      </div>

      <h3 id="email">Email Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "email": {
    "type": "string",
    "title": "Email Address",
    "x-control-variant": "email",
    "format": "email",
    "required": true,
    "default": "user@example.com"
  }
}`}
        </pre>
      </div>

      <h3 id="password">Password Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "password": {
    "type": "string",
    "title": "Password",
    "x-control-variant": "password",
    "minLength": 8,
    "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
  }
}`}
        </pre>
      </div>

      <h3 id="phone">Phone Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "phone": {
    "type": "string",
    "title": "Phone Number",
    "description": "International phone number with country code",
    "x-control": "phone",
    "default": "+1 (555) 123-4567"
  }
}`}
        </pre>
      </div>

      <h3 id="url">URL Input</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "website": {
    "type": "string",
    "title": "Website",
    "x-control-variant": "url",
    "format": "uri",
    "placeholder": "https://example.com",
    "default": "https://www.example.com"
  }
}`}
        </pre>
      </div>

      <h3 id="select">Select Single (Dropdown)</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "country": {
    "type": "string",
    "title": "Country",
    "x-control": "selectSingle",
    "enum": ["USA", "Canada", "UK", "Australia"],
    "default": "USA"
  },
  // With custom labels
  "plan": {
    "type": "string",
    "title": "Select Plan",
    "x-control": "selectSingle",
    "options": [
      { "label": "Basic ($9/mo)", "value": "basic" },
      { "label": "Pro ($29/mo)", "value": "pro" },
      { "label": "Enterprise ($99/mo)", "value": "enterprise" }
    ],
    "default": "basic"
  }
}`}
        </pre>
      </div>

      <h3 id="multi-select">Select Many (Multi-Select)</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "skills": {
    "type": "array",
    "title": "Skills",
    "x-control": "selectmany",
    "items": {
      "type": "string",
      "enum": ["JavaScript", "TypeScript", "React", "Vue", "Angular"]
    },
    "default": ["JavaScript", "React"]
  },
  // With combo variant
  "interests": {
    "type": "array",
    "title": "Interests",
    "x-control": "selectmany",
    "x-control-variant": "combo",
    "options": ["Sports", "Music", "Art", "Technology", "Travel"],
    "default": ["Music", "Technology"]
  }
}`}
        </pre>
      </div>

      <h3 id="checkbox">Checkbox</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "terms": {
    "type": "boolean",
    "title": "I agree to the terms and conditions",
    "x-control-variant": "checkbox",
    "required": true
  },
  // Multiple checkboxes
  "features": {
    "type": "array",
    "title": "Select Features",
    "x-control": "selectmany",
    "x-control-variant": "checkbox",
    "options": ["Email notifications", "SMS alerts", "Weekly reports"],
    "default": ["Email notifications"]
  }
}`}
        </pre>
      </div>

      <h3 id="radio">Radio Buttons</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "size": {
    "type": "string",
    "title": "Select Size",
    "x-control": "selectmany",
    "x-control-variant": "radio",
    "options": ["Small", "Medium", "Large", "X-Large"],
    "default": "Medium"
  }
}`}
        </pre>
      </div>

      <h3 id="switch">Switch/Toggle</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "notifications": {
    "type": "string",
    "title": "Enable Notifications",
    "x-control": "selectmany",
    "x-control-variant": "switch",
    "options": ["On", "Off"],
    "default": "On",
    "description": "Receive email updates"
  }
}`}
        </pre>
      </div>

      <h3 id="slider">Slider</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "volume": {
    "type": "number",
    "title": "Volume",
    "x-control-variant": "slider",
    "minimum": 0,
    "maximum": 100,
    "multipleOf": 5,
    "default": 50
  }
}`}
        </pre>
      </div>

      <h3 id="range">Number Range</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "priceRange": {
    "type": "object",
    "title": "Price Range",
    "x-control": "numberrange",
    "default": [100, 500]
  },
  // With slider variant
  "budgetRange": {
    "type": "array",
    "title": "Budget Range",
    "x-control": "numberrange",
    "x-control-variant": "horizontal",
    "x-show-input": false,
    "min": 0,
    "max": 1000,
    "showInput": true
  }
}`}
        </pre>
      </div>

      <h2 className="flex items-center gap-2">
        <Calendar className="h-6 w-6" />
        Date & Time Components
      </h2>

      <h3 id="date-picker">Date Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "birthDate": {
    "type": "string",
    "title": "Date of Birth",
    "format": "date",
    "x-control": "date",
    "default": "2000-01-01"
  }
}`}
        </pre>
      </div>

      <h3 id="time-picker">Time Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "appointmentTime": {
    "type": "string",
    "title": "Appointment Time",
    "format": "time",
    "x-control": "date",
    "default": "14:30:00"
  }
}`}
        </pre>
      </div>

      <h3 id="datetime-picker">DateTime Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "meetingTime": {
    "type": "string",
    "title": "Meeting Date & Time",
    "format": "date-time",
    "x-control": "date",
    "default": "2025-02-26T12:30:00"
  }
}`}
        </pre>
      </div>

      <h3 id="date-range">Date Range</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "vacation": {
    "type": "array",
    "title": "Vacation Dates",
    "x-control": "daterange",
    "properties": {
      "start": {
        "type": "string",
        "format": "date",
        "title": "Start Date",
        "default": "2025-02-20"
      },
      "end": {
        "type": "string",
        "format": "date",
        "title": "End Date",
        "default": "2025-03-05"
      }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="cron">Cron Expression</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "schedule": {
    "type": "string",
    "title": "Schedule",
    "description": "Cron expression for scheduling",
    "x-control": "cron",
    "default": "0 0 * * *"
  }
}`}
        </pre>
      </div>

      <h2 className="flex items-center gap-2">
        <Sparkles className="h-6 w-6" />
        Advanced Components
      </h2>

      <h3 id="file-upload">File Upload</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "documents": {
    "type": "string",
    "title": "Upload Documents",
    "description": "File upload input",
    "x-control": "file"
  }
}`}
        </pre>
      </div>

      <h3 id="signature">Signature Pad</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "signature": {
    "type": "string",
    "title": "Signature",
    "description": "Signature input",
    "x-control": "signature",
    "required": true
  }
}`}
        </pre>
      </div>

      <h3 id="capture">Screen Capture</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "screenshot": {
    "type": "string",
    "title": "Capture",
    "description": "Capture input - screenshot, camera, or media",
    "x-control": "capture"
  }
}`}
        </pre>
      </div>

      <h3 id="richtext">Rich Text Editor</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "content": {
    "type": "string",
    "title": "Article Content",
    "x-control": "richtext",
    "minLength": 100,
    "maxLength": 10000
  }
}`}
        </pre>
      </div>

      <h3 id="code-editor">Code Editor</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "code": {
    "type": "string",
    "title": "Code Snippet",
    "x-control": "code",
    "x-language": "javascript",
    "default": "// Enter your code here\\nconsole.log('Hello, World!');"
  }
}`}
        </pre>
      </div>

      <h3 id="color-picker">Color Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "themeColor": {
    "type": "string",
    "title": "Theme Color",
    "description": "Color selection input",
    "x-control": "color",
    "default": "#3b82f6"
  }
}`}
        </pre>
      </div>

      <h3 id="shadow">Shadow Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "shadow": {
    "type": "string",
    "title": "Shadow",
    "description": "Shadow color picker",
    "x-control": "shadow"
  }
}`}
        </pre>
      </div>

      <h3 id="icon-picker">Icon Picker</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "icon": {
    "type": "string",
    "title": "Select Icon",
    "description": "Icon selection input",
    "x-control": "icon",
    "default": "home"
  }
}`}
        </pre>
      </div>

      <h3 id="map">Map Location</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "location": {
    "type": "object",
    "title": "Map Location",
    "description": "Map location picker",
    "x-control": "map",
    "properties": {
      "lat": {
        "type": "number",
        "title": "Latitude",
        "default": 40.7128
      },
      "lng": {
        "type": "number",
        "title": "Longitude",
        "default": -74.0060
      }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="uuid">UUID Generator</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "id": {
    "type": "string",
    "title": "UUID",
    "description": "Auto-generated UUID field",
    "x-control": "uuid"
  }
}`}
        </pre>
      </div>

      <h3 id="sociallinks">Social Links</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "socialProfiles": {
    "type": "object",
    "title": "Social Links",
    "description": "Social media links input",
    "x-control": "sociallinks",
    "properties": {
      "facebook": {
        "type": "string",
        "title": "Facebook",
        "default": "https://facebook.com/example"
      },
      "twitter": {
        "type": "string",
        "title": "Twitter",
        "default": "https://twitter.com/example"
      },
      "linkedin": {
        "type": "string",
        "title": "LinkedIn",
        "default": "https://linkedin.com/in/example"
      }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="legalconsent">Legal Consent</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "consent": {
    "type": "object",
    "title": "Legal Consent",
    "description": "Legal consent input",
    "x-control": "legalconsent",
    "properties": {
      "terms": {
        "type": "boolean",
        "title": "Terms & Conditions",
        "default": false
      },
      "privacy": {
        "type": "boolean",
        "title": "Privacy Policy",
        "default": false
      }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="rating">Rating Stars</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "rating": {
    "type": "number",
    "title": "Rate your experience",
    "description": "Star rating input",
    "x-control": "rating",
    "minimum": 0,
    "maximum": 5,
    "default": 3
  }
}`}
        </pre>
      </div>

      <h3 id="ranking">Ranking</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "priorities": {
    "type": "array",
    "title": "Ranking",
    "description": "Drag and drop ranking of items",
    "x-control": "ranking",
    "items": {
      "type": "string"
    },
    "default": ["First Item", "Second Item", "Third Item", "Fourth Item"]
  }
}`}
        </pre>
      </div>

      <h3 id="data-lookup">Data Lookup</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "customer": {
    "type": "string",
    "title": "Customer Lookup",
    "x-control": "lookup",
    "x-lookup-url": "/api/customers",
    "x-lookup-display": "name",
    "x-lookup-value": "id"
  }
}`}
        </pre>
      </div>

      <h2 className="flex items-center gap-2">
        <Layers className="h-6 w-6" />
        Layout Components
      </h2>

      <h3 id="tabs">Tabs</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "x-control": "tab",
  "x-layout": {
    "tabs": [
      {
        "title": "Personal Info",
        "properties": ["firstName", "lastName", "email"]
      },
      {
        "title": "Address",
        "properties": ["street", "city", "zip"]
      }
    ]
  },
  "properties": {
    "firstName": { "type": "string", "title": "First Name" },
    "lastName": { "type": "string", "title": "Last Name" },
    "email": { "type": "string", "x-control": "email" },
    "street": { "type": "string", "title": "Street" },
    "city": { "type": "string", "title": "City" },
    "zip": { "type": "string", "title": "ZIP" }
  }
}`}
        </pre>
      </div>

      <h3 id="accordion">Accordion</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "x-control": "accordion",
  "x-layout": {
    "sections": [
      {
        "title": "Basic Information",
        "expanded": true,
        "properties": ["name", "email"]
      },
      {
        "title": "Additional Details",
        "expanded": false,
        "properties": ["phone", "address"]
      }
    ]
  }
}`}
        </pre>
      </div>

      <h3 id="collapsible">Collapsible</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "advancedSettings": {
    "type": "object",
    "title": "Advanced Settings",
    "x-control": "collapsible",
    "x-collapsed": true,
    "properties": {
      "debug": { "type": "boolean" },
      "verbose": { "type": "boolean" },
      "logLevel": { "type": "string" }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="slide">Slide</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "type": "object",
  "x-control": "slide",
  "x-layout": {
    "slides": [
      {
        "title": "Step 1",
        "properties": ["email", "password"]
      },
      {
        "title": "Step 2",
        "properties": ["firstName", "lastName"]
      }
    ]
  }
}`}
        </pre>
      </div>

      <h3 id="container">Container</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "userInfo": {
    "type": "object",
    "x-control": "container",
    "x-ui": {
      "border": true,
      "padding": "4",
      "backgroundColor": "gray-50"
    },
    "properties": {
      "name": { "type": "string" },
      "email": { "type": "string", "x-control": "email" }
    }
  }
}`}
        </pre>
      </div>

      <h3 id="paragraph">Paragraph/Text Display</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "instructions": {
    "type": "string",
    "x-control": "paragraph",
    "default": "Please fill out the form below with accurate information."
  }
}`}
        </pre>
      </div>

      <h2 className="flex items-center gap-2">
        <Table className="h-6 w-6" />
        Data Display Components
      </h2>

      <h3 id="dataview">Data View/Table</h3>
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "employees": {
    "type": "array",
    "title": "Employee List",
    "x-control": "dataview",
    "x-view-type": "table",
    "items": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "department": { "type": "string" },
        "role": { "type": "string" },
        "salary": { "type": "number" }
      }
    },
    "x-columns": [
      { "field": "name", "header": "Name", "sortable": true },
      { "field": "department", "header": "Department", "filterable": true },
      { "field": "role", "header": "Role" },
      { "field": "salary", "header": "Salary", "format": "currency" }
    ]
  }
}`}
        </pre>
      </div>

      <h2>Component Properties Reference</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">type</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Data type: string, number, boolean, object, array</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">title</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Field label</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">description</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Help text shown below field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">x-control</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Specifies the control type to use</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">x-control-variant</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Control variation (e.g., checkbox, radio, slider)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">x-layout</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">Layout configuration for containers</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">x-ui</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">UI styling configuration</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">required</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Makes field mandatory</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">default</td>
              <td className="px-6 py-4 text-sm">any</td>
              <td className="px-6 py-4 text-sm">Default value</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">placeholder</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Placeholder text</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">readOnly</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Makes field read-only</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">disabled</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Disables field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">hidden</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Hides field</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">format</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">JSON Schema format (email, date, uri, etc.)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">enum</td>
              <td className="px-6 py-4 text-sm">array</td>
              <td className="px-6 py-4 text-sm">Allowed values for selection</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">options</td>
              <td className="px-6 py-4 text-sm">array</td>
              <td className="px-6 py-4 text-sm">Options for select/checkbox/radio controls</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">minimum/maximum</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Min/max values for numbers</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">minLength/maxLength</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Min/max length for strings</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">pattern</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Regex pattern for validation</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">multipleOf</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Step value for numbers</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">rules</td>
              <td className="px-6 py-4 text-sm">array</td>
              <td className="px-6 py-4 text-sm">Conditional logic rules</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">transform</td>
              <td className="px-6 py-4 text-sm">string/array</td>
              <td className="px-6 py-4 text-sm">Data transformations</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">validation</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">Custom validation rules</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">dataSource</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">External data source configuration</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">group</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Field grouping identifier</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Valid Control Types</h2>
      
      <p>
        The following control types can be used with the <code>x-control</code> property:
      </p>

      <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">paragraph</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">container</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">richtext</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">textfield</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">textarea</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">number</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">selectSingle</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">selectmany</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">date</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">file</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">lookup</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">cron</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">phone</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">email</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">password</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">url</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">color</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">code</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">tab</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">accordion</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">slide</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">collapsible</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">numberrange</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">daterange</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">dataview</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">capture</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">signature</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">shadow</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">map</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">icon</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">uuid</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">sociallinks</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">legalconsent</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">rating</code>
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">ranking</code>
      </div>

      <h2>Tailwind CSS Customization</h2>
      
      <p>
        All components are built with Tailwind CSS, making customization straightforward. 
        You can override styles using the <code>x-ui</code> property or customize the theme globally.
      </p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "field": {
    "type": "string",
    "title": "Custom Styled Field",
    "x-ui": {
      "containerClass": "mb-6",
      "labelClass": "text-lg font-bold text-blue-600",
      "inputClass": "border-2 border-blue-500 focus:border-blue-700",
      "errorClass": "text-red-600 text-sm mt-1"
    }
  }
}`}
        </pre>
      </div>

      <div className="not-prose mt-12 p-6 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Complete Documentation
        </h3>
        <p className="text-green-700 dark:text-green-300">
          This reference covers all 40+ components available in AppMint Form. Each component is 
          JSON Schema driven, supports the Rules Engine for conditional logic, can use Transforms 
          for data manipulation, and includes comprehensive Validation options. All components are 
          built on Tailwind CSS for easy customization.
        </p>
      </div>
    </div>
  );
};

export default AllComponentsDoc;