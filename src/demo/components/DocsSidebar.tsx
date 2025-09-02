import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Book, Layers, Package, FileText, Database, Table, Sparkles, Calendar } from 'lucide-react';

interface SidebarSection {
  title: string;
  icon?: React.ReactNode;
  items: {
    title: string;
    href: string;
    badge?: string;
  }[];
}

const DocsSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['getting-started', 'tables', 'data-driven-features']);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link to the same page
    if (href.includes('#') && href.startsWith(location.pathname.split('#')[0])) {
      e.preventDefault();
      const hash = href.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without triggering navigation
        window.history.pushState(null, '', href);
      }
    }
  };

  const sections: SidebarSection[] = [
    {
      title: 'Getting Started',
      icon: <Book className="h-4 w-4" />,
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Quick Start', href: '/docs/quick-start' },
      ],
    },
    {
      title: 'Tables',
      icon: <Table className="h-4 w-4" />,
      items: [
        { title: 'Table Documentation', href: '/docs/table-view' },
        { title: 'Table Examples', href: '/examples/table-demo' },
      ],
    },
    {
      title: 'Data-Driven Features',
      icon: <Database className="h-4 w-4" />,
      items: [
        { title: 'JSON Schema', href: '/docs/schema' },
        { title: 'Rules Engine', href: '/docs/rules-engine', badge: 'New' },
        { title: 'Data Transforms', href: '/docs/transforms', badge: 'New' },
        { title: 'Validation System', href: '/docs/validation', badge: 'New' },
      ],
    },
    {
      title: 'Basic Components',
      icon: <Package className="h-4 w-4" />,
      items: [
        { title: 'Text Input', href: '/docs/components/all#text-input' },
        { title: 'Textarea', href: '/docs/components/all#textarea' },
        { title: 'Number Input', href: '/docs/components/all#number-input' },
        { title: 'Email Input', href: '/docs/components/all#email' },
        { title: 'Password Input', href: '/docs/components/all#password' },
        { title: 'Phone Input', href: '/docs/components/all#phone' },
        { title: 'URL Input', href: '/docs/components/all#url' },
        { title: 'Select/Dropdown', href: '/docs/components/all#select' },
        { title: 'Multi-Select', href: '/docs/components/all#multi-select' },
        { title: 'Checkbox', href: '/docs/components/all#checkbox' },
        { title: 'Radio Button', href: '/docs/components/all#radio' },
        { title: 'Switch/Toggle', href: '/docs/components/all#switch' },
        { title: 'Slider', href: '/docs/components/all#slider' },
        { title: 'Range Slider', href: '/docs/components/all#range' },
      ],
    },
    {
      title: 'Date & Time',
      icon: <Calendar className="h-4 w-4" />,
      items: [
        { title: 'Date Picker', href: '/docs/components/all#date-picker' },
        { title: 'Time Picker', href: '/docs/components/all#time-picker' },
        { title: 'DateTime Picker', href: '/docs/components/all#datetime-picker' },
        { title: 'Date Range', href: '/docs/components/all#date-range' },
        { title: 'Cron Selector', href: '/docs/components/cron-selector', badge: 'Advanced' },
      ],
    },
    {
      title: 'Advanced Components',
      icon: <Sparkles className="h-4 w-4" />,
      items: [
        { title: 'Screen Capture', href: '/docs/components/screen-capture', badge: 'Unique' },
        { title: 'Data Lookup', href: '/docs/components/all#data-lookup', badge: 'API' },
        { title: 'File Upload', href: '/docs/components/all#file-upload' },
        { title: 'Signature Pad', href: '/docs/components/all#signature' },
        { title: 'Rich Text Editor', href: '/docs/components/all#richtext' },
        { title: 'Code Editor', href: '/docs/components/all#code-editor' },
        { title: 'Color Picker', href: '/docs/components/all#color-picker' },
        { title: 'Shadow Picker', href: '/docs/components/all#shadow' },
        { title: 'Icon Picker', href: '/docs/components/all#icon-picker' },
        { title: 'Map Location', href: '/docs/components/all#map' },
        { title: 'UUID Generator', href: '/docs/components/all#uuid' },
        { title: 'Social Links', href: '/docs/components/all#sociallinks' },
        { title: 'Legal Consent', href: '/docs/components/all#legalconsent' },
        { title: 'Rating Stars', href: '/docs/components/all#rating' },
        { title: 'Ranking', href: '/docs/components/all#ranking' },
      ],
    },
    {
      title: 'Layout Components',
      icon: <Layers className="h-4 w-4" />,
      items: [
        { title: 'Tabs', href: '/docs/components/all#tabs' },
        { title: 'Accordion', href: '/docs/components/all#accordion' },
        { title: 'Collapsible', href: '/docs/components/all#collapsible' },
        { title: 'Slide', href: '/docs/components/all#slide' },
        { title: 'Container', href: '/docs/components/all#container' },
        { title: 'Paragraph', href: '/docs/components/all#paragraph' },
        { title: 'Data View', href: '/docs/components/all#dataview' },
      ],
    },
    {
      title: 'Advanced Topics',
      icon: <FileText className="h-4 w-4" />,
      items: [
        { title: 'Conditional Logic', href: '/docs/schema#conditional-logic' },
        { title: 'Custom Properties', href: '/docs/schema#custom-properties' },
        { title: 'Multi-Page Forms', href: '/docs#multi-page-forms' },
        { title: 'Form Arrays', href: '/docs/schema#array' },
        { title: 'Nested Styling', href: '/docs#styling-system' },
      ],
    },
    {
      title: 'Examples',
      icon: <FileText className="h-4 w-4" />,
      items: [
        { title: 'All Examples', href: '/examples' },
        { title: 'Table Examples', href: '/examples/table-demo' },
        { title: 'Text Inputs', href: '/examples/text-inputs' },
        { title: 'Form Demo', href: '/examples/form-demo' },
        { title: 'Theme Editor', href: '/examples/theme-editor' },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-full overflow-y-auto border-r bg-gray-50/40 dark:bg-gray-900/40">
      <div className="py-6 pr-6 pl-8">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <button
                onClick={() => toggleSection(section.title.toLowerCase().replace(/\s+/g, '-'))}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    expandedSections.includes(section.title.toLowerCase().replace(/\s+/g, '-'))
                      ? 'rotate-90'
                      : ''
                  }`}
                />
              </button>
              {expandedSections.includes(section.title.toLowerCase().replace(/\s+/g, '-')) && (
                <div className="ml-2 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;