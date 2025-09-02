import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {title && (
        <div className="bg-gray-800 dark:bg-gray-900 text-gray-200 px-4 py-2 text-sm font-semibold rounded-t-lg border-b border-gray-700">
          {title}
        </div>
      )}
      <div className={`relative bg-gray-900 dark:bg-gray-950 ${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <pre className="p-4 overflow-x-auto">
          <code className={`language-${language} text-sm text-gray-100`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;