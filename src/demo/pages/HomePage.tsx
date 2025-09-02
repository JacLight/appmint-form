import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Zap, 
  Layout, 
  Camera,
  Search,
  Calendar,
  FileJson,
  Layers,
  GitBranch,
  Table,
  Shield,
  Sparkles,
  Palette,
  ArrowRight,
  Github
} from 'lucide-react';
import Logo from '../components/Logo';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <FileJson className="h-6 w-6" />,
      title: 'JSON Schema Driven',
      description: 'Define your entire form structure, validation, and behavior in JSON',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Rules Engine',
      description: 'Dynamic forms with conditional logic, calculations, and smart behavior',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Tailwind CSS Based',
      description: 'Built on Tailwind CSS for easy customization and theming',
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: 'Advanced Components',
      description: 'Screen capture, data lookup, cron selectors, and 40+ more components',
    },
  ];

  const useCases = [
    {
      title: "Multi-Step Application Forms",
      description: "Complex loan applications with conditional fields, dynamic validation, and progress tracking",
      icon: <Layers className="h-8 w-8" />,
      features: ["Rules Engine", "Conditional Logic", "Progress Indicators"],
      demoLink: "/examples/complex-event-form"
    },
    {
      title: "Dynamic Survey Systems",
      description: "Intelligent surveys that adapt based on responses with branching logic",
      icon: <GitBranch className="h-8 w-8" />,
      features: ["Skip Logic", "Dynamic Questions", "Response Validation"],
      demoLink: "/examples/dynamic-survey"
    },
    {
      title: "Data Collection Workflows",
      description: "Capture screenshots, lookup data from APIs, and integrate with external systems",
      icon: <Camera className="h-8 w-8" />,
      features: ["Screen Capture", "Data Lookup", "API Integration"],
      demoLink: "/examples/screen-capture-demo"
    },
    {
      title: "Configuration Interfaces",
      description: "Complex settings with cron expressions, date ranges, and nested configurations",
      icon: <Calendar className="h-8 w-8" />,
      features: ["Cron Selector", "Date Ranges", "Nested Objects"],
      demoLink: "/examples/cron-demo"
    },
    {
      title: "Data Entry Tables",
      description: "Spreadsheet-like interfaces for bulk data entry with validation",
      icon: <Table className="h-8 w-8" />,
      features: ["Table View", "Bulk Edit", "CSV Import/Export"],
      demoLink: "/examples/table-view-demo"
    },
    {
      title: "Administrative Dashboards",
      description: "Role-based forms with permissions, audit trails, and data transformations",
      icon: <Shield className="h-8 w-8" />,
      features: ["Access Control", "Audit Logging", "Data Transforms"],
      demoLink: "/examples/admin-form"
    }
  ];

  const quickStartCode = `import { CollectionForm } from '@appmint/form';

const schema = {
  type: 'object',
  properties: {
    orderType: {
      type: 'string',
      title: 'Order Type',
      enum: ['standard', 'express'],
    },
    rushDelivery: {
      type: 'boolean',
      title: 'Rush Delivery',
      rules: [{
        operation: 'equals',
        valueA: '{{orderType}}',
        valueB: 'express',
        action: 'show'
      }]
    },
    orderId: {
      type: 'string',
      title: 'Order ID',
      readOnly: true,
      transform: ['prefix::ORD-', 'random-string::8']
    }
  }
};

<CollectionForm schema={schema} />`;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <Logo size={80} className="drop-shadow-2xl" />
            </div>
            
            <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
              <Database className="mr-2 h-4 w-4" />
              v0.5.3 - Data-Driven Form System
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Data-Driven Forms
              </span>
              <br />
              Powered by JSON Schema
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Not just another form library. AppMint Form is a complete data collection system with 
              rules engine, transforms, validations, and 40+ advanced components including screen capture, 
              data lookup, cron selectors, and table views. Built on Tailwind CSS for easy customization.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                to="/docs"
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/examples"
                className="inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                View Examples
              </Link>
              <a
                href="https://github.com/durubata/appmint-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Real-World Use Cases</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              From simple contact forms to complex enterprise workflows. See how AppMint Form 
              powers data collection across industries.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Link
                  key={index}
                  to={useCase.demoLink}
                  className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    {useCase.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">See It In Action</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              A simple example showing rules, transforms, and calculated fields
            </p>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">JSON Schema Definition</h3>
                <div className="rounded-lg bg-gray-900 dark:bg-gray-950 p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>{quickStartCode}</code>
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Result</h3>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Order Type</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2">
                        <option>standard</option>
                        <option>express</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      ↳ Selecting "express" will show the Rush Delivery option
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Order ID</label>
                      <input 
                        type="text" 
                        value="ORD-ABC123XY" 
                        readOnly 
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2"
                      />
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      ↳ Auto-generated with prefix and random string
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Data-Driven Features</h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Components Showcase */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">40+ Advanced Components</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Beyond basic inputs - powerful components for complex data collection
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Layout Components</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Tabs & Tab Groups</li>
                  <li>• Accordions & Collapsibles</li>
                  <li>• Stepper Forms</li>
                  <li>• Grid & Flex Layouts</li>
                  <li>• Cards & Sections</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Data Collection</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Screen Capture</li>
                  <li>• Data Lookup (API)</li>
                  <li>• File Upload & Preview</li>
                  <li>• Signature Pad</li>
                  <li>• QR/Barcode Scanner</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Specialized Inputs</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Cron Expression Selector</li>
                  <li>• Date/Time Range Picker</li>
                  <li>• Rich Text Editor</li>
                  <li>• JSON Editor</li>
                  <li>• Color Picker</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Table Views</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Editable Data Tables</li>
                  <li>• Sortable Columns</li>
                  <li>• Bulk Operations</li>
                  <li>• CSV Import/Export</li>
                  <li>• Inline Editing</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Smart Features</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Conditional Logic</li>
                  <li>• Calculated Fields</li>
                  <li>• Dynamic Validation</li>
                  <li>• Auto-Complete</li>
                  <li>• Smart Defaults</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-semibold mb-3">Integration</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• REST API Support</li>
                  <li>• GraphQL Integration</li>
                  <li>• Webhook Triggers</li>
                  <li>• Custom Functions</li>
                  <li>• Event Handlers</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/examples"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Explore all components with live examples
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Intelligent, Data-Driven Forms?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Stop writing form logic. Start defining data schemas. Built on Tailwind CSS for complete customization.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/docs"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-100"
              >
                Read Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/playground"
                className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Try Playground
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;