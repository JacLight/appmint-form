import React, { createContext, useContext } from 'react';
import { create, StoreApi, UseBoundStore } from 'zustand';
import * as objectPath from 'object-path';
import { produce } from 'immer';
import { deepCopy, getRandomString, isEmpty, isNotEmpty } from '../utils';
import { getTemplateValue } from '../form-view/form-validator';
import { FormStoreProps } from './store';

// Create a context for the form store
const FormStoreContext = createContext<UseBoundStore<StoreApi<FormStoreProps>> | null>(null);

// Create a factory function for form stores
const createFormStore = () => create<FormStoreProps>((set, get) => ({
    storeId: '',
    accessMode: '1',
    activePage: 0,
    error: {},
    data: {},
    files: {},
    watchedPaths: {},
    timestamp: {},
    repository: {},
    initForm: ({ data, readOnly, path, schema, rules, theme, accessMode, storeId, datatype, onChangeCallback }) => {
        set({ readOnly: false, data: {}, activePath: '', storeId: '', ref: '', rules: null, schema: null, datatype: undefined, accessMode: '', timestamp: {}, error: {}, page: 0, onChangeCallback: undefined });
        set({ readOnly, data, schema, activePath: path, rules, theme, accessMode, storeId, datatype, timestamp: {}, onChangeCallback });
    },
    clearData: () => {
        set({ data: {}, timestamp: {}, error: {}, page: 0, activePath: '' });
    },
    setStateItem: (item: { [key: string]: any }) => set((state: any) => ({ ...item })),
    getStateItem: (key: string) => get()[key],
    updateBulkError: (validation: { valid; errors; message; validationResults: { path; error; message }[] }) =>
        set(state => {
            if (validation?.valid) {
                return { error: {}, timestamp: { ...state.timestamp, ['root']: Date.now() } };
            }
            const timestamp = { ...state.timestamp };
            const error = produce(state.error, draft => {
                delete draft['root'];
                validation.validationResults.forEach(result => {
                    draft[result.path] = result.message;
                    timestamp[result.path] = Date.now();
                });
                draft['root'] = validation.message;
                timestamp['root'] = Date.now();
            });

            return { error: error, timestamp: { ...timestamp } };
        }),
    updateError: (dataPath: string, message?: string) =>
        set(state => {
            const error = produce(state.error || {}, draft => {
                delete draft['root'];
                if (!message) {
                    delete draft[dataPath];
                    return draft;
                }
                draft[dataPath] = message;
            });
            return { error: error, timestamp: { ...state.timestamp, [dataPath]: Date.now() } };
        }),
    clearError: () => set(state => ({ error: {}, timestamp: { ...state.timestamp, ['root']: Date.now() } })),
    getError: (dataPath: string = '', startsWith = false) => {
        if (!get().error) return;
        if (startsWith) {
            const keys = Object.keys(get().error).filter(key => key.startsWith(dataPath));
            return keys.map(key => get().error[key]);
        }
        if (!dataPath) return get().error;
        return get().error[dataPath];
    },
    getItemValue: dataPath => {
        if (!dataPath) return get().data;
        return objectPath.get(get().data, dataPath);
    },
    getDefaultValue: (dataPath, schema?, schemaPath?, data?) => {
        schema = schema || get().getSchemaItem(schemaPath);
        if (!schema || !schema.default) return;
        const defaultValue = schema.default;
        if (typeof defaultValue === 'object') {
            return deepCopy(defaultValue);
        } else if (typeof defaultValue === 'string' && defaultValue?.startsWith('{{') && defaultValue?.endsWith('}}')) {
            return getTemplateValue(defaultValue, '', data || get().data);
        } else {
            return defaultValue;
        }
    },
    updateWatchedPath: (watcher, paths) => {
        if (isEmpty(paths)) return;
        if (paths && typeof paths === 'string') paths = [paths];
        const watchedPaths = produce(get().watchedPaths, draft => {
            paths.forEach(path => {
                if (!draft[path]) draft[path] = [];
                const watcherSet = new Set(draft[path]);
                watcherSet.add(watcher);
                draft[path] = Array.from(watcherSet);
            });
        });
        set({ watchedPaths: watchedPaths });
    },
    setItemValue: (dataPath, value, arrayIndex?, silent = false, isFile = false) => {
        if (!dataPath) return;
        const data = produce(get().data, draft => {
            if (typeof value === 'undefined' || value === null) {
                objectPath.del(draft, dataPath);
            } else {
                objectPath.set(draft, dataPath, value);
            }
        });

        let files = get().files;
        if (isFile) {
            files = produce(files, draft => {
                if (isEmpty(value)) {
                    objectPath.del(draft, dataPath);
                } else {
                    objectPath.set(draft, dataPath, value);
                }
            });
        }

        if (silent) {
            set({ data, files });
        } else {
            set({ data, files, timestamp: { ...get().timestamp, [dataPath]: Date.now() } });
        }

        let watchedPaths = dataPath;
        if (arrayIndex !== undefined) {
            watchedPaths = dataPath.replace(`.${arrayIndex}`, '');
        }
        const hasWatchers = [...(get().watchedPaths[watchedPaths] || []), ...(get().watchedPaths[dataPath] || [])];
        if (isNotEmpty(hasWatchers)) {
            const timestamp = { ...get().timestamp };
            for (const wp of hasWatchers) {
                timestamp[wp] = Date.now();
            }
            set({ timestamp: timestamp });
        }

        if (get().onChangeCallback) {
            const callback: any = get().onChangeCallback;
            callback(dataPath, value, data, files, get().getError(dataPath));
        }
    },
    getSchemaItem: path => {
        return objectPath.get(get().schema, path);
    },
    applyRuleResult: (path?, schema?) => {
        let rulesResult = get().ruleResults;
        if (!rulesResult) return schema;
        const data = deepCopy(get().data);
        const timestamp = {};

        if (path) {
            const pathRules = rulesResult[path];
            if (!pathRules) return schema;
            pathRules.forEach(rule => {
                if (rule.operator === 'hide') {
                    schema = { ...schema, hidden: true };
                } else if (rule.operator === 'show') {
                    schema = { ...schema, hidden: false };
                } else if (rule.operator === 'set-property') {
                    const rawValue = getTemplateValue(rule.value, '', data);
                    objectPath.set(schema, rule.field, rawValue);
                }
            });
            return schema;
        } else {
            Object.keys(rulesResult).forEach(path => {
                timestamp[path] = Date.now();
                const pathRules = rulesResult[path];
                pathRules.forEach(rule => {
                    if (rule.operator === 'set-value') {
                        const rawValue = getTemplateValue(rule.value, '', data);
                        objectPath.set(data, path, rawValue);
                    }
                });
            });
            get().setStateItem({ data, timestamp });
        }
    },
    removeArrayValue: (path, index) => {
        if (isEmpty(objectPath.get(get().data, path))) return;
        const data = produce(get().data, draft => {
            const array = objectPath.get(draft, path);
            array.splice(index, 1);
        });
        set({
            data: data,
            timestamp: { ...get().timestamp, [path]: Date.now() },
        });
        if (get().onChangeCallback) {
            const callback: any = get().onChangeCallback;
            callback(path, undefined, data, undefined, get().getError(path));
        }
    },
    refreshPath: path => {
        set({ timestamp: { ...get().timestamp, [path]: Date.now() } });
    },
    updateRepository: (path, value?) => {
        const repository = produce(get().repository, draft => {
            if (!value) {
                delete draft[path];
            } else {
                draft[path] = value;
            }
        });
        set({ repository });
    },
}));

// Store instances map
const storeMap = new Map<string, UseBoundStore<StoreApi<FormStoreProps>>>();

// Get or create a store for a specific ID
export const getFormStore = (id: string) => {
    if (!storeMap.has(id)) {
        storeMap.set(id, createFormStore());
    }
    return storeMap.get(id)!;
};

// Clean up a store when it's no longer needed
export const cleanupFormStore = (id: string) => {
    if (storeMap.has(id)) {
        storeMap.delete(id);
    }
};

// Provider component that bundles a form with its store
export const FormStoreProvider: React.FC<{
    storeId: string;
    children: React.ReactNode;
}> = ({ storeId, children }) => {
    // Get or create the store for this form
    const store = getFormStore(storeId);

    return (
        <FormStoreContext.Provider value={store}>
            {children}
        </FormStoreContext.Provider>
    );
};

// Custom hook to use the form store
export const useFormStore = () => {
    const store = useContext(FormStoreContext);
    if (!store) {
        throw new Error('useFormStore must be used within a FormStoreProvider');
    }
    return store;
};
