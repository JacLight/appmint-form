import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        date: {
            type: 'string',
            title: 'Date Picker',
            description: 'Date selection input',
            format: 'date',
            'x-control': 'date',
            default: '2025-02-26'
        },
        dateTime: {
            type: 'string',
            title: 'Date Time Picker',
            description: 'Date and time selection input',
            format: 'date-time',
            'x-control': 'date',
            default: '2025-02-26T12:30:00'
        },
        time: {
            type: 'string',
            title: 'Time Picker',
            description: 'Time selection input',
            format: 'time',
            'x-control': 'date',
            default: '12:30:00'
        },
        dateRange: {
            type: 'array',
            title: 'Date Range',
            description: 'Date range selection input',
            'x-control': 'daterange',
            properties: {
                start: {
                    type: 'string',
                    format: 'date',
                    title: 'Start Date',
                    default: '2025-02-20'
                },
                end: {
                    type: 'string',
                    format: 'date',
                    title: 'End Date',
                    default: '2025-03-05'
                }
            }
        },
        cron: {
            type: 'string',
            title: 'Cron Expression',
            description: 'Cron expression editor for scheduling',
            'x-control': 'cron',
            default: '0 0 * * *'
        }
    }
};

const DateTimeInputsDemo: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <CollectionForm
                schema={schema}
                id='date-time-inputs-demo'
                data={{}}
            />
        </div>
    );
};

export default DateTimeInputsDemo;
