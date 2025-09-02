import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import DocsSidebar from './components/DocsSidebar';
import HomePage from './pages/HomePage';
import ExamplesPage from './pages/ExamplesPage';
import DocsPage from './pages/DocsPage';
import PlaygroundPage from './pages/PlaygroundPage';
import DemoPage from './pages/DemoPage';
import ExampleDemoPage from './pages/ExampleDemoPage';
import { demoRegistry } from './demos';
import { AppmintFormStoreProvider } from '..';

const AppNew: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isDocsPage = location.pathname.startsWith('/docs');
  const isExamplesPage = location.pathname.startsWith('/examples');
  const showSidebar = isDocsPage;

  return (
    <AppmintFormStoreProvider storeId="demo">
      <Helmet>
        <title>AppMint Form - Modern React Form Library</title>
        <meta name="description" content="A comprehensive React form component library with 40+ input types, advanced layouts, theming, and TypeScript support." />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex">
          {showSidebar && (
            <div className="hidden md:block w-64 lg:w-72">
              <DocsSidebar />
            </div>
          )}
          
          {/* Mobile sidebar overlay */}
          {sidebarOpen && showSidebar && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="fixed left-0 top-14 bottom-0 w-72 bg-white dark:bg-gray-900">
                <DocsSidebar />
              </div>
            </div>
          )}
          
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/examples/:demoId" element={<ExampleDemoPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/*" element={<DocsPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              
              {/* Legacy routes for backward compatibility */}
              {demoRegistry.map(demo => (
                <Route 
                  key={demo.id} 
                  path={`/${demo.id}`} 
                  element={<ExampleDemoPage />} 
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </AppmintFormStoreProvider>
  );
};

export default AppNew;