import { twMerge } from 'tailwind-merge';
import { Transition } from '../common/select-components';
import { getElementTheme } from '../context/store';
import { classNames } from '../utils';
import { localStorageUtils } from '../utils/localstorage';
import React, { useEffect, useState } from 'react';
import { IconRenderer } from '../common/icons/icon-renderer';

export const FormCollapsible = (props: { id?; icon?; title?; children; theme?; defaultState?; className?, ui?, arrayControl?}) => {
  const [isOpen, setOpen] = useState(props.defaultState === 'open' ? true : false);

  useEffect(() => {
    if (props.id) {
      const _isOpen = localStorageUtils.get('collapsible-' + props.id);
      if (typeof _isOpen === 'boolean') {
        setOpen(_isOpen);
      }
    }
  }, []);

  const toggle = () => {
    const newState = !isOpen;
    setOpen(newState);
    if (props.id) {
      localStorageUtils.set('collapsible-' + props.id, JSON.stringify(newState));
    }
  };

  let openClassName = isOpen ? ' w-full  ' : ' w-full shadow pt-1 p-2 lg:p-4 ';
  const { classes, style } = (props.ui || {})['collapsible'] || {};
  const controlTheme = getElementTheme('collapsible', props.theme);
  return (
    <div className={twMerge(classNames('cb-collapsible', props.className, controlTheme.className, classes?.join(' ')))}>
      <div onClick={toggle} className="p-2 flex justify-between items-center cursor-pointer  border-b-1 border-gray-300 gap-2 bg-gray-50 ">
        <div className='flex gap-2 items-center'>
          {typeof props.icon === 'string' ? <IconRenderer icon={props.icon as any} /> : props.icon}
          {typeof props.arrayControl?.index === 'number' && props.arrayControl.index}
          {props.title && <span>{props.title}</span>}
        </div>
        <div className='flex gap-2 items-center'>
          {props.arrayControl?.delete && props.arrayControl.delete}
          <div className="flex items-center gap-2 ">{isOpen ? <IconRenderer icon={'ChevronDown'} aria-hidden="true" className="" size={10} /> : <IconRenderer icon={'ChevronRight'} aria-hidden="true" className="" size={10} />}</div>
        </div>
      </div>
      {isOpen && (
        <div className=" p-2 ">
          <Transition show={isOpen} enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0" >
            <div className="mt-1">{props.children}</div>
          </Transition>
        </div>
      )}
    </div>
  );
};
