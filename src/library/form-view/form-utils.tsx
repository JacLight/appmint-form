import * as objectPath from 'object-path';

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
