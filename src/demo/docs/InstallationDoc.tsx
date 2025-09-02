import React from 'react';
import { Terminal, Package, CheckCircle } from 'lucide-react';

const InstallationDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Installation</h1>
      
      <p className="lead">
        Get started with AppMint Form in your React project. Installation takes less than a minute.
      </p>

      <h2>Prerequisites</h2>
      
      <div className="not-prose rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 mb-6">
        <p className="flex items-start gap-2 text-sm">
          <span className="text-amber-600 dark:text-amber-400">⚠️</span>
          <span>
            AppMint Form requires React 18 or higher and TypeScript 4.5 or higher for optimal experience.
          </span>
        </p>
      </div>

      <h2>Package Manager</h2>
      
      <p>Install AppMint Form using your preferred package manager:</p>

      <div className="not-prose space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4" />
            <span className="font-semibold">npm</span>
          </div>
          <div className="rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
            <code className="text-sm text-gray-100">npm install @appmint/form</code>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4" />
            <span className="font-semibold">yarn</span>
          </div>
          <div className="rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
            <code className="text-sm text-gray-100">yarn add @appmint/form</code>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4" />
            <span className="font-semibold">pnpm</span>
          </div>
          <div className="rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
            <code className="text-sm text-gray-100">pnpm add @appmint/form</code>
          </div>
        </div>
      </div>

      <h2>Peer Dependencies</h2>
      
      <p>AppMint Form has minimal peer dependencies. Make sure you have React installed:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
        <pre className="text-sm text-gray-100">
{`{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}`}
        </pre>
      </div>

      <h2>CSS Setup</h2>
      
      <p>Import the AppMint Form styles in your application's entry point:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
        <pre className="text-sm text-gray-100">
{`// In your main App.tsx or index.tsx
import '@appmint/form/dist/styles.css';`}
        </pre>
      </div>

      <h2>TypeScript Configuration</h2>
      
      <p>For the best TypeScript experience, ensure your <code>tsconfig.json</code> includes:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
        <pre className="text-sm text-gray-100">
{`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  }
}`}
        </pre>
      </div>

      <h2>Verify Installation</h2>
      
      <p>Create a simple form to verify everything is working:</p>

      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4">
        <pre className="text-sm text-gray-100">
{`import React from 'react';
import { CollectionForm } from '@appmint/form';

const App = () => {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Your Name'
      }
    }
  };

  return <CollectionForm schema={schema} />;
};

export default App;`}
        </pre>
      </div>

      <div className="not-prose rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 mt-6">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-100">Installation Complete!</p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              You're ready to start building forms. Check out the <a href="/docs/quick-start" className="underline">Quick Start guide</a> to learn more.
            </p>
          </div>
        </div>
      </div>

      <h2>Next Steps</h2>
      
      <div className="not-prose grid gap-4 mt-6 sm:grid-cols-2">
        <a href="/docs/quick-start" className="block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold mb-2">Quick Start →</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Learn the basics and create your first form</p>
        </a>
        <a href="/docs/schema" className="block rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold mb-2">Schema Guide →</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Understand how to define form schemas</p>
        </a>
      </div>
    </div>
  );
};

export default InstallationDoc;