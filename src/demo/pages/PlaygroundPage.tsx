import React, { useState } from 'react';
import { Play, Copy, Check, Download, Upload, RotateCcw } from 'lucide-react';
import CollectionForm from '../../library/form-view';

const defaultSchema = {
  type: 'object',
  title: 'Sample Form',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
          minLength: 2,
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
          minLength: 2,
        },
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
        },
        age: {
          type: 'number',
          title: 'Age',
          minimum: 18,
          maximum: 120,
        },
      },
    },
    preferences: {
      type: 'object',
      title: 'Preferences',
      properties: {
        newsletter: {
          type: 'boolean',
          title: 'Subscribe to newsletter',
          default: false,
        },
        theme: {
          type: 'string',
          title: 'Preferred Theme',
          enum: ['Light', 'Dark', 'Auto'],
          default: 'Auto',
        },
        notifications: {
          type: 'array',
          title: 'Notification Preferences',
          items: {
            type: 'string',
            enum: ['Email', 'SMS', 'Push'],
          },
          default: ['Email'],
        },
      },
    },
  },
};

const PlaygroundPage: React.FC = () => {
  const [schema, setSchema] = useState(JSON.stringify(defaultSchema, null, 2));
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'schema' | 'data'>('schema');

  const handleSchemaChange = (value: string) => {
    setSchema(value);
    setError(null);
  };

  const parseSchema = () => {
    try {
      return JSON.parse(schema);
    } catch (e) {
      setError('Invalid JSON schema');
      return null;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSchema = () => {
    const blob = new Blob([schema], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSchema = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSchema(content);
      };
      reader.readAsText(file);
    }
  };

  const resetSchema = () => {
    setSchema(JSON.stringify(defaultSchema, null, 2));
    setFormData({});
    setError(null);
  };

  const parsedSchema = parseSchema();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Form Playground</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Experiment with form schemas and see live results
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetSchema}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </button>
              <label className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Load
                <input
                  type="file"
                  accept=".json"
                  onChange={loadSchema}
                  className="hidden"
                />
              </label>
              <button
                onClick={downloadSchema}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="border-b border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('schema')}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        activeTab === 'schema'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      Schema
                    </button>
                    <button
                      onClick={() => setActiveTab('data')}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        activeTab === 'data'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      Form Data
                    </button>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4">
                {activeTab === 'schema' ? (
                  <textarea
                    value={schema}
                    onChange={(e) => handleSchemaChange(e.target.value)}
                    className="w-full h-[600px] rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none"
                    spellCheck={false}
                  />
                ) : (
                  <pre className="w-full h-[600px] overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 p-4 font-mono text-sm">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                )}
                {error && (
                  <div className="mt-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="border-b border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Live Preview</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Play className="h-4 w-4" />
                    <span>Auto-updating</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {parsedSchema ? (
                  <CollectionForm
                    schema={parsedSchema}
                    data={formData}
                    onChange={setFormData}
                    id="playground-form"
                  />
                ) : (
                  <div className="flex h-[500px] items-center justify-center text-gray-500 dark:text-gray-400">
                    <p>Invalid schema. Please fix the errors in the editor.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;