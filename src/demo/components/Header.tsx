import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme/theme-toggle';
import { Search, Github, Menu } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onMenuClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchQuery, onSearchChange }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/examples', label: 'Examples' },
    { path: '/docs', label: 'Documentation' },
    { path: '/playground', label: 'Playground' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Logo size={32} />
            <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AppMint Form
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-foreground/80 ${
                  isActive(item.path, item.exact)
                    ? 'text-foreground font-semibold'
                    : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center md:hidden">
          <Link to="/" className="mr-3">
            <Logo size={28} />
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Search documentation..."
                className="h-9 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-8 py-1 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
              <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <a
              href="https://github.com/durubata/appmint-form"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;