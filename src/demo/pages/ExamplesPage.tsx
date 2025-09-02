import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Code, Eye, Copy, Check } from 'lucide-react';
import { demoRegistry } from '../demos';

const ExamplesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(demoRegistry.map(d => d.category)))];

  // Filter demos based on search and category
  const filteredDemos = demoRegistry.filter(demo => {
    const matchesSearch = demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          demo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || demo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group demos by category
  const demosByCategory = filteredDemos.reduce((acc, demo) => {
    if (!acc[demo.category]) {
      acc[demo.category] = [];
    }
    acc[demo.category].push(demo);
    return acc;
  }, {} as Record<string, typeof demoRegistry>);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore our collection of form examples and demos
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-14 z-30 border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search examples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {Object.entries(demosByCategory).map(([category, demos]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {demos.map(demo => (
                <div
                  key={demo.id}
                  className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Preview Area */}
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
                        <Code className="h-8 w-8" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {demo.category}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{demo.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {demo.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/examples/${demo.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Demo
                      </Link>
                      <button
                        onClick={() => copyCode(demo.code, demo.id)}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {copiedId === demo.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredDemos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No examples found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamplesPage;