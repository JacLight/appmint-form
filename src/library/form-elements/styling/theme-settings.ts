/**
 * Interface for component styling
 */
export interface ComponentStyling {
    [key: string]: string | ComponentStyling;
}

/**
 * Interface for theme styling
 */
export interface ThemeStyling {
    [componentType: string]: ComponentStyling;
}

/**
 * Base theme - the single source of truth for all styling
 * Every component must get its styling from this theme
 * 
 * Note: Styles from element-style-class.ts have been migrated here
 */
export const baseTheme: ThemeStyling = {
    // Common styling for all components
    common: {
        container: 'relative my-2',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        'label-inner': 'text-sm font-medium text-gray-700',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        helpContainer: 'ml-8',
        icon: 'h-5 w-5 text-gray-400',
        iconContainer: 'flex items-center justify-center',
        'input-container': 'w-full my-1', // Added 'my-1' from element-style-class.ts
    },
    // Icon and image components
    'control-icon': {
        icon: 'h-5 w-5 text-gray-400',
    },
    'control-image': {
        image: 'w-10 h-10 object-cover rounded',
    },
    // Layout components
    layout: {
        container: 'w-full mx-auto my-2',
        'container-array': 'w-full mx-auto my-0',
        section: 'mb-4',
        row: 'flex flex-wrap -mx-2',
        column: 'px-2',
        divider: 'border-t border-gray-200 my-4',
        'control-input': 'w-full',
    },
    // Form components
    form: {
        container: 'space-y-4',
        section: 'bg-white shadow rounded-lg p-4',
        header: 'text-lg font-medium text-gray-900 mb-4',
        footer: 'mt-4 flex justify-end space-x-3',
        group: 'gap-3',
    },
    'form-array': {
        'array-item': 'relative mb-0 even:bg-cyan-50 flex gap-2 items-center',
        'array-item-horizontal': 'bg-white shadow rounded-lg p-4',
    },
    'social-textarea': {
        container: 'relative my-2 w-full',
        'container-array': 'relative my-0 w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        textarea: 'block w-full p-2',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        icon: 'h-5 w-5 text-gray-400',
        iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-3',
        prefix: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
        suffix: 'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
    },

    // Text input styling
    text: {
        container: 'relative my-2 w-full',
        'container-array': 'relative my-0 w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        input: 'block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 px-2 py-1 focus:ring-indigo-500 sm:text-sm',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        icon: 'h-5 w-5 text-gray-400',
        iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-3',
        prefix: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
        suffix: 'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
    },
    // Number input styling
    number: {
        container: 'relative my-2 w-full',
        'container-array': 'relative my-0 w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        input: 'block w-full rounded-md border-gray-300 shadow-sm border py-1 px-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        prefix: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
        suffix: 'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
        stepper: 'absolute inset-y-0 right-0 flex flex-col',
        stepperUp: 'flex-1 px-2 cursor-pointer hover:bg-gray-100',
        stepperDown: 'flex-1 px-2 cursor-pointer hover:bg-gray-100',
    },
    'number-range': {
        container: 'relative my-2  w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        maxInput: 'block w-full rounded-md border-gray-300 shadow-sm border py-1 px-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        minInput: 'block w-full rounded-md border-gray-300 shadow-sm border py-1 px-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
        prefix: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
        suffix: 'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
        stepper: 'absolute inset-y-0 right-0 flex flex-col',
        stepperUp: 'flex-1 px-2 cursor-pointer hover:bg-gray-100',
        stepperDown: 'flex-1 px-2 cursor-pointer hover:bg-gray-100',
    },
    // Textarea styling
    textarea: {
        container: 'relative my-2  w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        textarea: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Date range styling
    'date-range': {
        container: 'relative my-2  w-full',
        input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        prefix: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm',
        suffix: 'flex select-none items-center pr-3 text-gray-500 sm:text-sm',
        calendar: 'bg-white shadow-lg rounded-md p-2 mt-1',
        calendarHeader: 'flex justify-between items-center mb-2',
        calendarDay: 'w-8 h-8 flex items-center justify-center rounded-full',
        calendarDaySelected: 'bg-indigo-600 text-white',
        calendarDayInRange: 'bg-indigo-100',
        calendarDayDisabled: 'text-gray-300',
        calendarNavButton: 'p-1 rounded-full hover:bg-gray-100',
    },
    // Select styling
    select: {
        container: 'relative my-2  w-full',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        dropdown: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-gray-100',
        placeholder: 'text-gray-400',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Select single styling (from element-style-class.ts)
    selectsingle: {
        container: 'items-center justify-center ',
    },
    // Select many styling
    selectmany: {
        container: 'items-center justify-center  w-full',
    },
    // Listbox styling
    listbox: {
        container: 'relative w-full',
        button: 'relative w-full cursor-default rounded bg-white pl-2 py-1 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm',
        options: 'mt-1 max-h-80 min-w-48 overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
        option: 'relative cursor-default select-none py-2 pl-3 pr-9',
        optionActive: 'bg-indigo-600 text-white',
        optionInactive: 'text-gray-900',
        icon: 'h-5 w-5 flex-shrink-0 rounded-full',
        selectedIcon: 'h-5 w-5',
        selectedIconActive: 'text-white',
        selectedIconInactive: 'text-indigo-600',
        label: 'ml-3 block truncate',
        labelSelected: 'font-semibold',
        labelUnselected: 'font-normal',
        placeholder: 'block truncate text-gray-400',
        chevron: 'h-5 w-5 text-gray-400',
    },
    // Checkbox styling
    checkbox: {
        container: 'relative flex items-start my-2',
        input: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
        label: 'ml-3 block text-sm font-medium text-gray-700',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Radio styling
    radio: {
        container: 'relative my-2',
        group: 'space-y-2',
        option: 'relative flex cursor-pointer rounded-lg border p-4 focus:outline-none',
        optionSelected: 'bg-indigo-50 border-indigo-200',
        optionUnselected: 'border-gray-200',
        input: 'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500',
        label: 'ml-3 block text-sm font-medium text-gray-700',
        labelSelected: 'text-indigo-900 font-semibold',
        labelUnselected: 'text-gray-900',
        icon: 'h-5 w-5 flex-shrink-0 rounded-full',
        checkmark: 'h-5 w-5 text-indigo-600',
        description: 'mt-1 text-xs text-gray-500 ml-7',
        error: 'mt-1 text-xs text-red-500',
    },
    // Switch styling
    switch: {
        container: 'relative flex items-center my-2',
        track: 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
        trackOn: 'bg-indigo-600',
        trackOff: 'bg-gray-200',
        thumb: 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        thumbOn: 'translate-x-5',
        thumbOff: 'translate-x-0',
        icon: 'h-3 w-3',
        iconOn: 'text-indigo-600',
        iconOff: 'text-gray-400',
        label: 'ml-3 text-sm font-medium text-gray-700',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Array styling
    array: {
        container: 'relative my-2 space-y-2',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        item: 'relative border border-gray-200 rounded-md p-3',
        addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        removeButton: 'absolute top-2 right-2 text-gray-400 hover:text-gray-500',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Color picker styling
    color: {
        container: 'relative my-2',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        preview: 'w-8 h-8 rounded-md border border-gray-300 overflow-hidden',
        palette: 'grid grid-cols-8 gap-1 p-2',
        paletteItem: 'w-6 h-6 rounded-md cursor-pointer',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Button styling (added flex from element-style-class.ts)
    button: {
        container: 'relative my-2 flex',
        button: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        description: 'mt-1 text-xs text-gray-500',
        error: 'mt-1 text-xs text-red-500',
    },
    // Map styling (from element-style-class.ts)
    map: {
        container: 'h-96 w-full',
    },
};

/**
 * Primary theme with blue accents
 */
export const primaryTheme: ThemeStyling = {
    common: {
        container: 'relative my-2',
        label: 'block text-sm font-medium text-blue-700 mb-1',
        description: 'mt-1 text-xs text-blue-500',
        error: 'mt-1 text-xs text-red-500',
    },
    text: {
        input: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
    },
    select: {
        select: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-blue-50',
    },
    selectsingle: {
        dropdown: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-blue-50',
    },
    selectmany: {
        dropdown: 'block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-blue-50',
    },
    checkbox: {
        input: 'h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500',
    },
    radio: {
        optionSelected: 'bg-blue-50 border-blue-200',
        input: 'h-4 w-4 border-blue-300 text-blue-600 focus:ring-blue-500',
    },
    switch: {
        trackOn: 'bg-blue-600',
        trackOff: 'bg-gray-200',
    },
    array: {
        addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    },
};

/**
 * Secondary theme with green accents
 */
export const secondaryTheme: ThemeStyling = {
    common: {
        container: 'relative my-2',
        label: 'block text-sm font-medium text-green-700 mb-1',
        description: 'mt-1 text-xs text-green-500',
        error: 'mt-1 text-xs text-red-500',
    },
    text: {
        input: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
    },
    select: {
        select: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-green-50',
    },
    selectsingle: {
        dropdown: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-green-50',
    },
    selectmany: {
        dropdown: 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
        option: 'py-2 px-3 cursor-pointer hover:bg-green-50',
    },
    checkbox: {
        input: 'h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-500',
    },
    radio: {
        optionSelected: 'bg-green-50 border-green-200',
        input: 'h-4 w-4 border-green-300 text-green-600 focus:ring-green-500',
    },
    switch: {
        trackOn: 'bg-green-600',
        trackOff: 'bg-gray-200',
    },
    array: {
        addButton: 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    },
};

/**
 * Minimal theme with subtle styling
 */
export const minimalTheme: ThemeStyling = {
    common: {
        container: 'relative my-1',
        label: 'block text-xs font-medium text-gray-500 mb-1',
        description: 'mt-1 text-xs text-gray-400',
        error: 'mt-1 text-xs text-red-400',
    },
    text: {
        container: 'w-full',
        input: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
    },
    select: {
        container: 'w-full',
        select: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
        option: 'py-1 px-2 cursor-pointer hover:bg-gray-50 text-sm',
    },
    selectsingle: {
        dropdown: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
        option: 'py-1 px-2 cursor-pointer hover:bg-gray-50 text-sm',
    },
    selectmany: {
        dropdown: 'block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm',
        option: 'py-1 px-2 cursor-pointer hover:bg-gray-50 text-sm',
    },
    checkbox: {
        container: 'relative flex items-start my-1',
        input: 'h-3 w-3 rounded border-gray-300 text-gray-500 focus:ring-gray-400',
        label: 'ml-2 block text-xs font-medium text-gray-500',
    },
    radio: {
        container: 'relative my-1',
        group: 'space-y-1',
        option: 'relative flex cursor-pointer rounded-lg border p-2 focus:outline-none',
        optionSelected: 'bg-gray-50 border-gray-200',
        optionUnselected: 'border-gray-100',
        input: 'h-3 w-3 border-gray-300 text-gray-500 focus:ring-gray-400',
        label: 'ml-2 block text-xs font-medium text-gray-500',
    },
    switch: {
        container: 'relative flex items-center my-1',
        track: 'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1',
        trackOn: 'bg-gray-500',
        trackOff: 'bg-gray-200',
        thumb: 'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        thumbOn: 'translate-x-4',
        thumbOff: 'translate-x-0',
        label: 'ml-2 text-xs font-medium text-gray-500',
    },
    array: {
        container: 'relative my-1 space-y-1',
        item: 'relative border border-gray-100 rounded-md p-2',
        addButton: 'mt-1 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400',
        removeButton: 'absolute top-1 right-1 text-gray-300 hover:text-gray-400',
    },
};
