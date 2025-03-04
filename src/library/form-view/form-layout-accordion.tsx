import { shallow, useShallow } from 'zustand/shallow';
import { classNames } from '../utils';
import { FormLayoutRender } from './form-layout-render';
import { useFormStore } from '../context/store';
import React from 'react';
import { StyledComponent } from '../form-elements/styling';

export const FormLayoutAccordion = ({ storeId, layoutPath, path, dataPath }) => {
  const { getSchemaItem } = useFormStore(useShallow(state => ({ getSchemaItem: state.getSchemaItem })));
  const [accordionState, setAccordionState] = React.useState([]);

  const toggleAccordion = itemPath => {
    if (accordionState.includes(itemPath)) {
      setAccordionState(accordionState.filter(path => path !== itemPath));
    } else {
      setAccordionState([...accordionState, itemPath]);
    }
  };

  const layout = getSchemaItem(layoutPath);
  return (
    <StyledComponent
      componentType="accordion"
      part="container"
      schema={layout}
      className="w-full"
    >
      {layout?.items?.map((item, idx) => {
        const itemPath = layoutPath + '.items.' + idx;
        const itemLayout = getSchemaItem(itemPath);
        return (
          <div className="mb-px">
            <div
              key={item.id}
              className={classNames('px-4 py-2 mb-px items-center border border-gray-100  flex justify-between bg-white gap-4 text-xs shadow cursor-pointer hover:bg-cyan-50', accordionState.includes(itemPath) ? 'bg-cyan-100' : '')}
              onClick={e => toggleAccordion(itemPath)}
            >
              {item.title}
            </div>
            {accordionState.includes(itemPath) && (
              <>{itemLayout ? <FormLayoutRender path={path} layoutPath={itemPath} dataPath={dataPath} storeId={storeId} /> : <div className="text-xs w-full text-center text-red-400">empty layout</div>}</>
            )}
          </div>
        );
      })}
    </StyledComponent>
  );
};
