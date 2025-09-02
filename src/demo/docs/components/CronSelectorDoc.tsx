import React from 'react';
import { Calendar, Clock, Repeat, Settings } from 'lucide-react';

const CronSelectorDoc: React.FC = () => {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="flex items-center gap-3">
        <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
        Cron Selector Component
      </h1>
      
      <p className="lead">
        A sophisticated component for creating and editing cron expressions with an intuitive UI. 
        Perfect for scheduling tasks, automated jobs, and recurring events without requiring 
        users to understand cron syntax.
      </p>

      <div className="not-prose my-8 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-6">
        <div className="flex items-start gap-3">
          <Repeat className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Advanced Scheduling Made Simple</h3>
            <p className="text-green-700 dark:text-green-300">
              Transform complex cron expressions into user-friendly interfaces. Users can schedule 
              tasks with simple selections like "Every Monday at 9:00 AM" or "First Friday of every month" 
              without learning cron syntax.
            </p>
          </div>
        </div>
      </div>

      <h2>Features</h2>
      <ul>
        <li>Visual cron expression builder</li>
        <li>Natural language descriptions</li>
        <li>Quick presets for common schedules</li>
        <li>Real-time expression preview</li>
        <li>Next run time calculation</li>
        <li>Support for seconds (6-field) and standard (5-field) cron</li>
        <li>Timezone support</li>
        <li>Expression validation</li>
        <li>Import/export capabilities</li>
      </ul>

      <h2>Basic Usage</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "schedule": {
    "type": "string",
    "title": "Schedule",
    "format": "cron",
    "default": "0 9 * * MON-FRI",
    "description": "When should this task run?"
  }
}`}
        </pre>
      </div>

      <h2>Advanced Configuration</h2>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "automatedReport": {
    "type": "object",
    "properties": {
      "reportName": {
        "type": "string",
        "title": "Report Name"
      },
      "schedule": {
        "type": "string",
        "title": "Delivery Schedule",
        "format": "cron",
        "cronOptions": {
          "mode": "advanced",
          "includeSeconds": false,
          "timezone": "America/New_York",
          "presets": [
            { "label": "Every Hour", "value": "0 * * * *" },
            { "label": "Daily at 9 AM", "value": "0 9 * * *" },
            { "label": "Weekly on Monday", "value": "0 9 * * 1" },
            { "label": "Monthly on 1st", "value": "0 9 1 * *" },
            { "label": "Quarterly", "value": "0 9 1 */3 *" }
          ],
          "quickSettings": {
            "frequency": ["minute", "hourly", "daily", "weekly", "monthly", "yearly"],
            "allowMultiple": true,
            "showAdvanced": true
          },
          "validation": {
            "minInterval": 3600,
            "maxInterval": 31536000,
            "blackoutPeriods": [
              { "start": "00:00", "end": "06:00", "reason": "Maintenance window" }
            ]
          },
          "preview": {
            "showNext": 5,
            "showDescription": true,
            "locale": "en-US"
          }
        }
      },
      "timezone": {
        "type": "string",
        "title": "Timezone",
        "enum": ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London"],
        "default": "UTC"
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>UI Modes</h2>

      <div className="not-prose grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold mb-2">Simple Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            User-friendly interface with dropdowns for common scheduling patterns
          </p>
          <div className="space-y-2 text-sm">
            <div>Frequency: <span className="font-mono">Daily</span></div>
            <div>Time: <span className="font-mono">09:00 AM</span></div>
            <div>Result: <span className="font-mono">0 9 * * *</span></div>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold mb-2">Advanced Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Full control over each cron field with validation
          </p>
          <div className="space-y-2 text-sm">
            <div>Minutes: <span className="font-mono">*/15</span></div>
            <div>Hours: <span className="font-mono">9-17</span></div>
            <div>Result: <span className="font-mono">*/15 9-17 * * *</span></div>
          </div>
        </div>
      </div>

      <h2>Use Cases</h2>

      <h3>1. Backup Scheduler</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "backupConfig": {
    "type": "object",
    "properties": {
      "backupType": {
        "type": "string",
        "title": "Backup Type",
        "enum": ["full", "incremental", "differential"]
      },
      "schedule": {
        "type": "string",
        "title": "Backup Schedule",
        "format": "cron",
        "cronOptions": {
          "mode": "simple",
          "presets": [
            { "label": "Nightly at 2 AM", "value": "0 2 * * *" },
            { "label": "Every 6 hours", "value": "0 */6 * * *" },
            { "label": "Weekly Sunday 3 AM", "value": "0 3 * * 0" }
          ],
          "validation": {
            "message": "Backups should run during off-peak hours",
            "allowedHours": [0, 1, 2, 3, 4, 5, 22, 23]
          }
        }
      },
      "retention": {
        "type": "number",
        "title": "Retention Days",
        "default": 30
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>2. Email Campaign Scheduler</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "emailCampaign": {
    "type": "object",
    "properties": {
      "campaignName": {
        "type": "string",
        "title": "Campaign Name"
      },
      "sendSchedule": {
        "type": "string",
        "title": "Send Schedule",
        "format": "cron",
        "cronOptions": {
          "mode": "wizard",
          "steps": [
            {
              "title": "Frequency",
              "options": ["once", "daily", "weekly", "monthly"]
            },
            {
              "title": "Days",
              "options": ["weekdays", "weekends", "specific"],
              "visible": "frequency !== 'once'"
            },
            {
              "title": "Time",
              "type": "time",
              "default": "09:00"
            }
          ],
          "businessHours": {
            "enabled": true,
            "start": "09:00",
            "end": "17:00",
            "timezone": "recipient"
          },
          "preview": {
            "showNext": 10,
            "format": "calendar"
          }
        }
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>3. System Maintenance Window</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "maintenanceWindow": {
    "type": "object",
    "properties": {
      "taskName": {
        "type": "string",
        "title": "Maintenance Task"
      },
      "schedule": {
        "type": "string",
        "title": "Maintenance Schedule",
        "format": "cron",
        "cronOptions": {
          "mode": "advanced",
          "fields": {
            "minute": { "enabled": true },
            "hour": { "enabled": true },
            "dayOfMonth": { "enabled": true },
            "month": { "enabled": true },
            "dayOfWeek": { "enabled": true, "useNames": true }
          },
          "helpers": {
            "lastDayOfMonth": true,
            "nearestWeekday": true,
            "nthOccurrence": true
          },
          "examples": [
            "0 2 L * * - Last day of month at 2 AM",
            "0 3 15W * * - Nearest weekday to 15th at 3 AM",
            "0 4 * * 1#1 - First Monday at 4 AM"
          ]
        }
      },
      "duration": {
        "type": "number",
        "title": "Duration (minutes)",
        "default": 60
      },
      "notifications": {
        "type": "boolean",
        "title": "Send notifications",
        "default": true
      }
    }
  }
}`}
        </pre>
      </div>

      <h3>4. Data Sync Configuration</h3>
      
      <div className="not-prose rounded-lg bg-gray-900 dark:bg-gray-950 p-4 mb-6">
        <pre className="text-sm text-gray-100 overflow-x-auto">
{`{
  "dataSync": {
    "type": "object",
    "properties": {
      "syncName": {
        "type": "string",
        "title": "Sync Job Name"
      },
      "frequency": {
        "type": "string",
        "title": "Sync Frequency",
        "format": "cron",
        "cronOptions": {
          "mode": "hybrid",
          "commonPatterns": [
            { 
              "label": "Real-time", 
              "value": "* * * * *",
              "warning": "High resource usage"
            },
            { 
              "label": "Every 5 minutes", 
              "value": "*/5 * * * *" 
            },
            { 
              "label": "Hourly", 
              "value": "0 * * * *" 
            },
            { 
              "label": "Business hours only", 
              "value": "0 9-17 * * MON-FRI" 
            }
          ],
          "rateLimit": {
            "maxFrequency": 60,
            "unit": "seconds",
            "message": "Minimum interval is 1 minute"
          },
          "cost": {
            "calculate": true,
            "display": "Estimated cost: ${{cost}}/month"
          }
        }
      }
    }
  }
}`}
        </pre>
      </div>

      <h2>Cron Expression Reference</h2>
      
      <div className="not-prose overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Field</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Allowed Values</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Special Characters</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="px-6 py-4 text-sm font-mono">Minute</td>
              <td className="px-6 py-4 text-sm">0-59</td>
              <td className="px-6 py-4 text-sm font-mono">* , - /</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">Hour</td>
              <td className="px-6 py-4 text-sm">0-23</td>
              <td className="px-6 py-4 text-sm font-mono">* , - /</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">Day of Month</td>
              <td className="px-6 py-4 text-sm">1-31</td>
              <td className="px-6 py-4 text-sm font-mono">* , - / ? L W</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">Month</td>
              <td className="px-6 py-4 text-sm">1-12 or JAN-DEC</td>
              <td className="px-6 py-4 text-sm font-mono">* , - /</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">Day of Week</td>
              <td className="px-6 py-4 text-sm">0-7 or SUN-SAT</td>
              <td className="px-6 py-4 text-sm font-mono">* , - / ? L #</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Common Patterns</h2>
      
      <div className="not-prose grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">0 * * * *</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Every hour</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">*/15 * * * *</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Every 15 minutes</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">0 9-17 * * MON-FRI</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Every hour, 9 AM to 5 PM, weekdays</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">0 0 1 * *</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">First day of every month at midnight</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">0 2 * * SUN</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Every Sunday at 2 AM</p>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <h4 className="font-mono text-sm mb-2">0 0 L * *</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last day of month at midnight</p>
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
              <td className="px-6 py-4 text-sm font-mono">mode</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">UI mode: simple, advanced, wizard, hybrid</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">includeSeconds</td>
              <td className="px-6 py-4 text-sm">boolean</td>
              <td className="px-6 py-4 text-sm">Support 6-field cron with seconds</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">timezone</td>
              <td className="px-6 py-4 text-sm">string</td>
              <td className="px-6 py-4 text-sm">Timezone for schedule execution</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">presets</td>
              <td className="px-6 py-4 text-sm">array</td>
              <td className="px-6 py-4 text-sm">Quick selection presets</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">validation</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">Validation rules and constraints</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">preview</td>
              <td className="px-6 py-4 text-sm">object</td>
              <td className="px-6 py-4 text-sm">Preview configuration</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-mono">onChange</td>
              <td className="px-6 py-4 text-sm">function</td>
              <td className="px-6 py-4 text-sm">Callback when expression changes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CronSelectorDoc;