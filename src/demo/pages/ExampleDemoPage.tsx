import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code, Eye, Copy, Check, ChevronDown } from 'lucide-react';
import { demoRegistry } from '../demos';
import CollectionForm from '../../library/form-view';

const ExampleDemoPage: React.FC = () => {
  const { demoId } = useParams<{ demoId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'schema'>('preview');
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentIndex = demoRegistry.findIndex(d => d.id === demoId);
  const demo = demoRegistry[currentIndex];
  
  const previousDemo = currentIndex > 0 ? demoRegistry[currentIndex - 1] : null;
  const nextDemo = currentIndex < demoRegistry.length - 1 ? demoRegistry[currentIndex + 1] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && previousDemo) {
        navigate(`/examples/${previousDemo.id}`);
      } else if (e.key === 'ArrowRight' && nextDemo) {
        navigate(`/examples/${nextDemo.id}`);
      } else if (e.key === 'Escape' && showDropdown) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [previousDemo, nextDemo, navigate, showDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown && !(e.target as Element).closest('.example-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  if (!demo) {
    return <Navigate to="/examples" replace />;
  }

  const DemoComponent = demo.component;
  
  // Group demos by category for the dropdown
  const demosByCategory = demoRegistry.reduce((acc, d) => {
    if (!acc[d.category]) {
      acc[d.category] = [];
    }
    acc[d.category].push(d);
    return acc;
  }, {} as Record<string, typeof demoRegistry>);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract schema from demo code if possible
  const getSchemaFromCode = () => {
    const schemaMatch = demo.code.match(/const schema = ({[\s\S]*?});/);
    if (schemaMatch) {
      try {
        // Clean up the schema string for display
        return schemaMatch[1];
      } catch (e) {
        return '// Schema not available';
      }
    }
    return '// Schema not available';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => previousDemo && navigate(`/examples/${previousDemo.id}`)}
                disabled={!previousDemo}
                title={previousDemo ? `Previous: ${previousDemo.title} (← arrow key)` : 'No previous example'}
                className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  previousDemo
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              {/* Example Selector Dropdown */}
              <div className="relative example-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="max-w-[200px] truncate">{demo.title}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div className="absolute left-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                    <div className="max-h-96 overflow-y-auto p-2">
                      {Object.entries(demosByCategory).map(([category, demos]) => (
                        <div key={category}>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                            {category}
                          </div>
                          {demos.map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                navigate(`/examples/${d.id}`);
                                setShowDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                                d.id === demo.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                              }`}
                            >
                              {d.title}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => nextDemo && navigate(`/examples/${nextDemo.id}`)}
                disabled={!nextDemo}
                title={nextDemo ? `Next: ${nextDemo.title} (→ arrow key)` : 'No next example'}
                className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  nextDemo
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="ml-4 h-6 w-px bg-gray-300 dark:bg-gray-700" />
              
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {demoRegistry.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/examples"
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                View All Examples
              </Link>
              <button
                onClick={() => copyToClipboard(demo.code)}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{demo.title}</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{demo.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${demo.id === 'table-demo' ? 'max-w-7xl' : 'container'} mx-auto px-4 py-8 sm:px-6 lg:px-8`}>
        <div className={demo.id === 'table-demo' ? '' : 'grid gap-8 lg:grid-cols-5'}>
          {/* Main Content */}
          <div className={demo.id === 'table-demo' ? 'w-full' : 'lg:col-span-3'}>
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
              <nav className="-mb-px flex gap-6">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'preview'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Eye className="inline-block mr-2 h-4 w-4" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'code'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Code className="inline-block mr-2 h-4 w-4" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('schema')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'schema'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Schema
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
              {activeTab === 'preview' && (
                <div className="p-6">
                  <DemoComponent />
                </div>
              )}
              
              {activeTab === 'code' && (
                <div className="overflow-x-auto">
                  <pre className="p-6 text-sm">
                    <code className="language-typescript">{demo.code}</code>
                  </pre>
                </div>
              )}
              
              {activeTab === 'schema' && (
                <div className="overflow-x-auto">
                  <pre className="p-6 text-sm">
                    <code className="language-json">{getSchemaFromCode()}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - hide for table demo */}
          {demo.id !== 'table-demo' && (
          <div className="lg:col-span-2">
            <div className="sticky top-20 space-y-6">
              {/* Info Card */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="text-lg font-semibold mb-4">Example Details</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{demo.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Component ID</dt>
                    <dd className="mt-1 text-sm font-mono text-gray-900 dark:text-gray-100">{demo.id}</dd>
                  </div>
                </dl>
              </div>

              {/* Related Examples */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="text-lg font-semibold mb-4">Related Examples</h3>
                <div className="space-y-2">
                  {demoRegistry
                    .filter(d => d.category === demo.category && d.id !== demo.id)
                    .slice(0, 5)
                    .map(relatedDemo => (
                      <Link
                        key={relatedDemo.id}
                        to={`/examples/${relatedDemo.id}`}
                        className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {relatedDemo.title}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/playground"
                    className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-500"
                  >
                    Open in Playground
                  </Link>
                  <Link
                    to="/docs"
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleDemoPage;