import * as objectPath from 'object-path';
import { validateValue } from './form-validator';
import { isJsonString, isNotEmpty, toSentenceCase } from '../utils';

export const getSelectOptions = async (dataSource, data, arrayIndex?) => {
  if (!dataSource) return;

  let options;

  if (dataSource.source === 'self') {
    const key = resolveExpression(dataSource.value, arrayIndex);
    options = objectPath.get(data, key);
  }  else if (dataSource.source === 'json') {
    options = dataSource.json || dataSource.value;
  }

  if (isJsonString(options)) {
    options = JSON.parse(options);
  }

  if (isNotEmpty(options) && typeof options[0] === 'string') {
    options = options.map(o => ({ value: o, label: toSentenceCase(o) }));
  }

  if (dataSource.filter && dataSource?.value?.toLowerCase() !== 'country-regions') {
    let filterValue = typeof dataSource.filter === 'string' ? dataSource.filter : dataSource.filter?.value;
    if (filterValue?.startsWith('{{') && filterValue?.endsWith('}}')) {
      const filterKey = resolveExpression(filterValue, arrayIndex);
      filterValue = objectPath.get(data, filterKey);
    }
    const filterProperty = typeof dataSource.filter?.property === 'string' ? dataSource.filter?.property : 'value';
    const filterOperation = typeof dataSource.filter?.property === 'string' ? dataSource.filter?.operation : 'equal';

    if (filterValue) {
      options = options.filter(option => {
        const response = validateValue(filterOperation, filterValue, option[filterProperty], '');
        return response?.valid;
      });
    }
  }
  return options;
};


const resolveExpression = (rawValue, arrayIndex) => {
  if (!rawValue) return rawValue;
  let parsedValue = rawValue;
  if (parsedValue.startsWith('{{') && parsedValue.endsWith('}}')) {
    let valueKey: string = parsedValue.replace('{{', '').replace('}}', '');
    if (arrayIndex && valueKey.includes('[]')) {
      valueKey = valueKey.replace('[]', arrayIndex);
    }
    parsedValue = valueKey;
  }
  return parsedValue;
};

const getTemplateValue = (template, data, arrayIndex) => {
  if (!template || !template.startsWith('{{') || !template.endsWith('}}')) return template;
  const valueKey = resolveExpression(template, arrayIndex);
  const value = objectPath.get(data, valueKey);
  return value;
};

export const getWatchedPaths = (schema, parentPath, arrayIndex?) => {
  if (!schema) return;
  let watchedPaths = schema?.watchedPaths || [];
  if (schema?.title?.startsWith('{{') && schema?.title?.endsWith('}}')) {
    watchedPaths.push(schema.title?.slice(2, -2));
  }
  if (typeof schema?.default === 'string' && schema?.default?.startsWith('{{') && schema?.default?.endsWith('}}')) {
    watchedPaths.push(schema.title?.slice(2, -2));
  }
  if (schema?.rules) {
    schema.rules.forEach(rule => {
      if (typeof rule.valueA === 'string' && rule.valueA.startsWith('{{') && rule.valueA.endsWith('}}')) {
        watchedPaths.push(rule.valueA.slice(2, -2));
      }
      if (typeof rule.valueB === 'string' && rule.valueB.startsWith('{{') && rule.valueB.endsWith('}}')) {
        watchedPaths.push(rule.valueB.slice(2, -2));
      }
    });
  }
  if (schema?.dataSource) {
    if (schema.dataSource.source === 'self') {
      watchedPaths.push(schema.dataSource.value);
    }
    if (schema.dataSource.filter?.value?.startsWith('{{') && schema.dataSource.filter?.value?.endsWith('}}')) {
      watchedPaths.push(resolveExpression(schema.dataSource.filter?.value, arrayIndex));
    }
  }
  if (parentPath) {
    watchedPaths = watchedPaths.map(path => `${parentPath}.${path}`);
  }
  return watchedPaths;
};
