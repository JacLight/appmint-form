import { ThemeStyling } from '../../../library/form-elements/styling/style-utils';

// Pre-made themes for elements
export const elementThemes: Record<string, ThemeStyling> = {
    professional: {
        root: {
            container: 'max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm',
            form: 'space-y-6',
            header: 'mb-6 border-b border-gray-200 pb-4',
            footer: 'mt-8 pt-4 border-t border-gray-200 flex justify-end',
            content: 'space-y-6'
        },
        layout: {
            container: 'mb-6 border border-gray-200 rounded-lg p-4',
            tab: 'px-4 py-2 font-medium rounded-t-lg',
            tabList: 'flex border-b border-gray-200 mb-4',
            tabPanel: 'p-2',
            accordion: 'border border-gray-200 rounded-md mb-2',
            accordionHeader: 'p-4 font-medium bg-gray-50 cursor-pointer',
            accordionPanel: 'p-4 border-t border-gray-200',
            slider: 'overflow-hidden',
            sliderPanel: 'p-4'
        },
        text: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        number: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        textarea: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            textarea: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        select: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            select: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            option: 'py-1',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        checkbox: {
            container: 'mb-4 relative flex items-start',
            input: 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
            label: 'ml-2 block text-sm text-gray-700',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        radio: {
            container: 'mb-4 relative flex items-start',
            input: 'h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500',
            label: 'ml-2 block text-sm text-gray-700',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        switch: {
            container: 'mb-4 flex items-center',
            track: 'bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            thumb: 'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            label: 'ml-3 text-sm font-medium text-gray-700',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        button: {
            container: 'mb-4',
            button: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        date: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        color: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            input: 'block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        },
        file: {
            container: 'mb-4',
            label: 'block text-sm font-medium text-gray-700 mb-1',
            dropzone: 'flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md',
            button: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            description: 'mt-1 text-sm text-gray-500',
            error: 'mt-1 text-sm text-red-600'
        }
    },
    minimal: {
        root: {
            container: 'max-w-4xl mx-auto p-4',
            form: 'space-y-4',
            header: 'mb-4',
            footer: 'mt-6 flex justify-end',
            content: 'space-y-4'
        },
        layout: {
            container: 'mb-4',
            tab: 'px-3 py-1 font-medium',
            tabList: 'flex border-b border-gray-200 mb-3',
            tabPanel: 'p-1',
            accordion: 'mb-2',
            accordionHeader: 'p-3 font-medium cursor-pointer',
            accordionPanel: 'p-3',
            slider: 'overflow-hidden',
            sliderPanel: 'p-3'
        },
        text: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            input: 'block w-full border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 sm:text-sm',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        number: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            input: 'block w-full border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 sm:text-sm',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        textarea: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            textarea: 'block w-full border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 sm:text-sm',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        select: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            select: 'block w-full border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 sm:text-sm',
            option: 'py-1',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        checkbox: {
            container: 'mb-3 relative flex items-start',
            input: 'h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500',
            label: 'ml-2 block text-sm text-gray-600',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        radio: {
            container: 'mb-3 relative flex items-start',
            input: 'h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-500',
            label: 'ml-2 block text-sm text-gray-600',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        switch: {
            container: 'mb-3 flex items-center',
            track: 'bg-gray-200 relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
            thumb: 'translate-x-0 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            label: 'ml-2 text-sm font-normal text-gray-600',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        button: {
            container: 'mb-3',
            button: 'px-4 py-1 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        date: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            input: 'block w-full border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 sm:text-sm',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        color: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            input: 'block w-full h-8 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        },
        file: {
            container: 'mb-3',
            label: 'block text-sm font-normal text-gray-600 mb-1',
            dropzone: 'flex justify-center px-4 pt-3 pb-4 border border-gray-300 border-dashed rounded',
            button: 'px-4 py-1 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1',
            description: 'mt-1 text-xs text-gray-500',
            error: 'mt-1 text-xs text-red-600'
        }
    },
    bold: {
        root: {
            container: 'max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg',
            form: 'space-y-8',
            header: 'mb-8 border-b-2 border-gray-200 pb-6',
            footer: 'mt-10 pt-6 border-t-2 border-gray-200 flex justify-end',
            content: 'space-y-8'
        },
        layout: {
            container: 'mb-8 border-2 border-gray-200 rounded-xl p-6',
            tab: 'px-6 py-3 text-base font-bold rounded-t-xl',
            tabList: 'flex border-b-2 border-gray-200 mb-6',
            tabPanel: 'p-4',
            accordion: 'border-2 border-gray-200 rounded-xl mb-4',
            accordionHeader: 'p-6 text-base font-bold bg-gray-50 cursor-pointer',
            accordionPanel: 'p-6 border-t-2 border-gray-200',
            slider: 'overflow-hidden',
            sliderPanel: 'p-6'
        },
        text: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            input: 'block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 py-3 px-4',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        number: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            input: 'block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 py-3 px-4',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        textarea: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            textarea: 'block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 py-3 px-4',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        select: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            select: 'block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 py-3 px-4',
            option: 'py-2',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        checkbox: {
            container: 'mb-6 relative flex items-start',
            input: 'h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500',
            label: 'ml-3 block text-base font-bold text-gray-800',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        radio: {
            container: 'mb-6 relative flex items-start',
            input: 'h-5 w-5 border-2 border-gray-300 text-blue-600 focus:ring-blue-500',
            label: 'ml-3 block text-base font-bold text-gray-800',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        switch: {
            container: 'mb-6 flex items-center',
            track: 'bg-gray-300 relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            thumb: 'translate-x-0 pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            label: 'ml-3 text-base font-bold text-gray-800',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        button: {
            container: 'mb-6',
            button: 'px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        date: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            input: 'block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 py-3 px-4',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        color: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            input: 'block w-full h-12 rounded-lg border-2 border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        },
        file: {
            container: 'mb-6',
            label: 'block text-base font-bold text-gray-800 mb-2',
            dropzone: 'flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg shadow-sm',
            button: 'px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            description: 'mt-2 text-sm text-gray-600',
            error: 'mt-2 text-sm font-semibold text-red-600'
        }
    },
    colorful: {
        root: {
            container: 'max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm',
            form: 'space-y-6',
            header: 'mb-6 border-b border-blue-200 pb-4',
            footer: 'mt-8 pt-4 border-t border-blue-200 flex justify-end',
            content: 'space-y-6'
        },
        layout: {
            container: 'mb-6 border border-blue-200 rounded-lg p-4 bg-white',
            tab: 'px-4 py-2 font-medium rounded-t-lg',
            tabList: 'flex border-b border-blue-200 mb-4',
            tabPanel: 'p-2',
            accordion: 'border border-blue-200 rounded-md mb-2 bg-white',
            accordionHeader: 'p-4 font-medium bg-blue-50 cursor-pointer',
            accordionPanel: 'p-4 border-t border-blue-200',
            slider: 'overflow-hidden',
            sliderPanel: 'p-4'
        },
        text: {
            container: 'mb-4 bg-blue-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-blue-700 mb-1',
            input: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            description: 'mt-1 text-sm text-blue-600',
            error: 'mt-1 text-sm text-red-600'
        },
        number: {
            container: 'mb-4 bg-green-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-green-700 mb-1',
            input: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
            description: 'mt-1 text-sm text-green-600',
            error: 'mt-1 text-sm text-red-600'
        },
        textarea: {
            container: 'mb-4 bg-indigo-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-indigo-700 mb-1',
            textarea: 'block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            description: 'mt-1 text-sm text-indigo-600',
            error: 'mt-1 text-sm text-red-600'
        },
        select: {
            container: 'mb-4 bg-purple-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-purple-700 mb-1',
            select: 'block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
            option: 'py-1',
            description: 'mt-1 text-sm text-purple-600',
            error: 'mt-1 text-sm text-red-600'
        },
        checkbox: {
            container: 'mb-4 bg-yellow-50 p-4 rounded-lg relative flex items-start',
            input: 'h-4 w-4 rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500',
            label: 'ml-2 block text-sm text-yellow-700',
            description: 'mt-1 text-sm text-yellow-600',
            error: 'mt-1 text-sm text-red-600'
        },
        radio: {
            container: 'mb-4 bg-red-50 p-4 rounded-lg relative flex items-start',
            input: 'h-4 w-4 border-red-300 text-red-600 focus:ring-red-500',
            label: 'ml-2 block text-sm text-red-700',
            description: 'mt-1 text-sm text-red-600',
            error: 'mt-1 text-sm text-red-600'
        },
        switch: {
            container: 'mb-4 bg-orange-50 p-4 rounded-lg flex items-center',
            track: 'bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
            thumb: 'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            label: 'ml-3 text-sm font-medium text-orange-700',
            description: 'mt-1 text-sm text-orange-600',
            error: 'mt-1 text-sm text-red-600'
        },
        button: {
            container: 'mb-4',
            button: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500',
            description: 'mt-1 text-sm text-pink-600',
            error: 'mt-1 text-sm text-red-600'
        },
        date: {
            container: 'mb-4 bg-teal-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-teal-700 mb-1',
            input: 'block w-full rounded-md border-teal-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm',
            description: 'mt-1 text-sm text-teal-600',
            error: 'mt-1 text-sm text-red-600'
        },
        color: {
            container: 'mb-4 bg-cyan-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-cyan-700 mb-1',
            input: 'block w-full h-10 rounded-md border-cyan-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500',
            description: 'mt-1 text-sm text-cyan-600',
            error: 'mt-1 text-sm text-red-600'
        },
        file: {
            container: 'mb-4 bg-lime-50 p-4 rounded-lg',
            label: 'block text-sm font-medium text-lime-700 mb-1',
            dropzone: 'flex justify-center px-6 pt-5 pb-6 border-2 border-lime-300 border-dashed rounded-md',
            button: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500',
            description: 'mt-1 text-sm text-lime-600',
            error: 'mt-1 text-sm text-red-600'
        }
    }
};
