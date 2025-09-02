import React from 'react';
import { Camera, Monitor, Download, Shield } from 'lucide-react';

const ScreenCaptureDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="flex items-center gap-3">
        <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        Screen Capture Component
      </h1>
      
      <p className="lead">
        A unique and powerful component that allows users to capture screenshots directly within your form. 
        Perfect for bug reports, visual feedback, documentation, and support tickets.
      </p>

      <div className="not-prose my-8 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
        <div className="flex items-start gap-3">
          <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Unique Feature</h3>
            <p className="text-blue-700 dark:text-blue-300">
              AppMint Form is one of the few form libraries that provides built-in screen capture functionality. 
              Users can capture their entire screen, specific windows, or selected regions without external tools.
            </p>
          </div>
        </div>
      </div>

      <h2>Features</h2>
      <ul>
        <li>Capture entire screen, specific window, or selected region</li>
        <li>Built-in image editor for annotations</li>
        <li>Draw, highlight, blur sensitive information</li>
        <li>Add text annotations and arrows</li>
        <li>Automatic image compression and optimization</li>
        <li>Multiple output formats (PNG, JPEG, WebP)</li>
        <li>Base64 encoding for easy storage</li>
        <li>Clipboard integration</li>
      </ul>

      <h2>Basic Usage</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "screenshot": {
    "type": "string",
    "format": "screen-capture",
    "title": "Screenshot",
    "description": "Capture a screenshot to illustrate the issue"
  }
}`}
        </pre>
      </div>

      <h2>Advanced Configuration</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "bugReport": {
    "type": "object",
    "properties": {
      "description": {
        "type": "string",
        "title": "Issue Description"
      },
      "screenshot": {
        "type": "string",
        "format": "screen-capture",
        "title": "Screenshot",
        "screenCaptureOptions": {
          "allowEdit": true,
          "allowRegionSelect": true,
          "allowWindowSelect": true,
          "allowFullscreen": true,
          "outputFormat": "png",
          "quality": 0.9,
          "maxWidth": 1920,
          "maxHeight": 1080,
          "tools": [
            "draw",
            "text",
            "arrow",
            "rectangle",
            "circle",
            "blur",
            "highlight"
          ],
          "colors": [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#000000"
          ]
        }
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>Capture Modes</h2>
      
      <div className="not-prose grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold mb-2">Full Screen</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Captures the entire screen including all monitors
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold mb-2">Window</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select a specific application window to capture
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold mb-2">Region</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Draw a rectangle to capture a specific area
          </p>
        </div>
      </div>

      <h2>Use Cases</h2>

      <h3>1. Bug Reporting System</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "bugReport": {
    "type": "object",
    "required": ["title", "screenshot"],
    "properties": {
      "title": {
        "type": "string",
        "title": "Bug Title"
      },
      "screenshot": {
        "type": "string",
        "format": "screen-capture",
        "title": "Screenshot of the Issue",
        "screenCaptureOptions": {
          "allowEdit": true,
          "tools": ["arrow", "rectangle", "blur", "text"],
          "placeholder": "Click to capture screenshot"
        }
      },
      "annotations": {
        "type": "string",
        "title": "Additional Notes",
        "format": "textarea"
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>2. Visual Feedback Form</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "feedback": {
    "type": "object",
    "properties": {
      "pageScreenshot": {
        "type": "string",
        "format": "screen-capture",
        "title": "Page Screenshot",
        "screenCaptureOptions": {
          "autoCapture": true,
          "captureOnLoad": true,
          "allowEdit": true,
          "tools": ["highlight", "text"]
        }
      },
      "suggestions": {
        "type": "array",
        "title": "Design Suggestions",
        "items": {
          "type": "object",
          "properties": {
            "element": {
              "type": "string",
              "title": "UI Element"
            },
            "suggestion": {
              "type": "string",
              "title": "Suggestion"
            }
          }
        }
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>3. Documentation Generator</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "documentation": {
    "type": "object",
    "properties": {
      "stepTitle": {
        "type": "string",
        "title": "Step Title"
      },
      "stepScreenshot": {
        "type": "string",
        "format": "screen-capture",
        "title": "Step Screenshot",
        "screenCaptureOptions": {
          "allowEdit": true,
          "tools": ["arrow", "rectangle", "text", "highlight"],
          "outputFormat": "png",
          "quality": 1.0
        }
      },
      "stepDescription": {
        "type": "string",
        "title": "Step Description",
        "format": "textarea"
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>Privacy & Security</h2>
      
      <div className="not-prose my-8 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">Security Considerations</h3>
            <ul className="text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Users must explicitly grant permission for screen capture</li>
              <li>• Blur tool available to hide sensitive information</li>
              <li>• Images can be processed client-side only</li>
              <li>• Option to disable clipboard access</li>
              <li>• Automatic EXIF data removal</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>API Reference</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">allowEdit</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Enable image editor after capture</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">outputFormat</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Output format: png, jpeg, webp</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">quality</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Compression quality (0-1)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">maxWidth</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Maximum width in pixels</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">maxHeight</td>
              <td className="px-6 py-4 text-sm">number</td>
              <td className="px-6 py-4 text-sm">Maximum height in pixels</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">tools</td>
              <td className="px-6 py-4 text-sm">array</td>
              <td className="px-6 py-4 text-sm">Available editing tools</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">autoCapture</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Capture automatically on load</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">onCapture</td>
              <td className="px-6 py-4 text-sm">function</td>
              <td className="px-6 py-4 text-sm">Callback after capture</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Browser Compatibility</h2>
      
      <div className="not-prose overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Browser</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Support</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm">Chrome/Edge</td>
              <td className="px-6 py-4 text-sm text-green-600">✓ Full Support</td>
              <td className="px-6 py-4 text-sm">All features available</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm">Firefox</td>
              <td className="px-6 py-4 text-sm text-green-600">✓ Full Support</td>
              <td className="px-6 py-4 text-sm">All features available</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm">Safari</td>
              <td className="px-6 py-4 text-sm text-yellow-600">⚠ Partial</td>
              <td className="px-6 py-4 text-sm">Limited to tab capture</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm">Mobile Browsers</td>
              <td className="px-6 py-4 text-sm text-red-600">✗ Not Supported</td>
              <td className="px-6 py-4 text-sm">Falls back to file upload</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScreenCaptureDoc;