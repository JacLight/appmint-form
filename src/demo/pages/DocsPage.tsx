import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FileText, Book, Package, Code, Zap, Database, Shield, Table } from 'lucide-react';
import InstallationDoc from '../docs/InstallationDoc';
import QuickStartDoc from '../docs/QuickStartDoc';
import SchemaDoc from '../docs/SchemaDoc';
import ComponentsOverview from '../docs/ComponentsOverview';
import TextInputDoc from '../docs/components/TextInputDoc';
import RulesEngineDoc from '../docs/RulesEngineDoc';
import TransformsDoc from '../docs/TransformsDoc';
import ValidationDoc from '../docs/ValidationDoc';
import TableViewDoc from '../docs/TableViewDoc';
import ScreenCaptureDoc from '../docs/components/ScreenCaptureDoc';
import CronSelectorDoc from '../docs/components/CronSelectorDoc';
import AllComponentsDoc from '../docs/AllComponentsDoc';

const DocsIntroduction: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>AppMint Form Documentation</h1>
      
      <p className="lead">
        AppMint Form is a powerful data-driven form system for React. Build intelligent forms with JSON Schema,
        rules engine, transforms, and 40+ advanced components including screen capture, data lookup, and table views.
        Built on Tailwind CSS for complete customization.
      </p>

      <h2>Core Features</h2>
      
      <div className="grid gap-6 not-prose my-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">JSON Schema Driven</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Define your entire form structure, validation, and behavior in JSON. No more coding form logic.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Rules Engine</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create dynamic forms with conditional logic, calculated fields, and smart behavior.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Transforms & Validation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time data transformation and comprehensive validation system with custom rules.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <Table className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Table Views</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Display and edit data in spreadsheet-like tables with sorting, filtering, and bulk operations.
          </p>
        </div>
      </div>

      <h2>Why AppMint Form?</h2>
      
      <h3>Data-Driven Architecture</h3>
      <p>
        Unlike traditional form libraries, AppMint Form is completely data-driven. Define your forms in JSON Schema
        and let the system handle rendering, validation, and data flow. This approach makes forms maintainable,
        testable, and reusable across projects.
      </p>

      <h3>Advanced Components</h3>
      <p>
        Beyond basic inputs, AppMint Form includes powerful components like screen capture, data lookup,
        cron selectors, signature pads, and more. Handle complex data collection scenarios with ease.
      </p>

      <h3>Built on Tailwind CSS</h3>
      <p>
        AppMint Form uses Tailwind CSS at its core, making customization and theming straightforward.
        Easily match your design system by adjusting Tailwind classes and configuration.
      </p>

      <h2>Getting Started</h2>
      
      <p>
        Ready to start building amazing forms? Check out our <a href="/docs/installation">installation guide</a> to
        get AppMint Form set up in your project, then follow the <a href="/docs/quick-start">quick start tutorial</a> to
        create your first form.
      </p>

      <div className="mt-8 flex gap-4">
        <a href="/docs/installation" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          Get Started →
        </a>
        <a href="/examples" className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
          View Examples
        </a>
      </div>
    </div>
  );
};

const DocsPage: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl">
        <Routes>
          <Route path="/" element={<DocsIntroduction />} />
          <Route path="/installation" element={<InstallationDoc />} />
          <Route path="/quick-start" element={<QuickStartDoc />} />
          <Route path="/schema" element={<SchemaDoc />} />
          <Route path="/rules-engine" element={<RulesEngineDoc />} />
          <Route path="/transforms" element={<TransformsDoc />} />
          <Route path="/validation" element={<ValidationDoc />} />
          <Route path="/table-view" element={<TableViewDoc />} />
          <Route path="/components" element={<ComponentsOverview />} />
          <Route path="/components/text-input" element={<TextInputDoc />} />
          <Route path="/components/screen-capture" element={<ScreenCaptureDoc />} />
          <Route path="/components/cron-selector" element={<CronSelectorDoc />} />
          <Route path="/components/all" element={<AllComponentsDoc />} />
        </Routes>
      </div>
    </div>
  );
};

export default DocsPage;