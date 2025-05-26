import React, { useState } from 'react';
import { employee } from './employee';
import { AppmintForm, getFormStore } from '../../..';
import { useShallow } from 'zustand/shallow';

const StepperDemo: React.FC = () => {
  return (
    <>
      <div className='hidden'><AppmintForm schema={employee} id="demo" data={{}} /></div>
      <StepperElementsDemo id={'demo'} />
    </>
  );
};

const StepperElementsDemo: React.FC<any> = ({id}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const formStore = getFormStore('demo');

  const { renderedElements } = formStore(
    useShallow(state => ({
      renderedElements: state.renderedElements || [],
    }))
  );
  console.log('renderedElements', renderedElements);

  const totalItems = renderedElements.filter(_ => _.render).length;

  // Navigation functions
  const goto = {
    start: () => setCurrentIndex(0),
    end: () => setCurrentIndex(Math.max(0, totalItems - 1)),
    prev: () => setCurrentIndex(prev => Math.max(0, prev - 1)),
    next: () => setCurrentIndex(prev => Math.min(totalItems - 1, prev + 1))
  };

  // Get current element
  const currentElement = renderedElements[currentIndex];

  if (totalItems === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Loading form elements...
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Form Stepper Demo
        </h2>
        <p className="text-gray-600">
          Navigate through form elements one at a time using the rendered elements array.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-4 text-sm text-gray-600 text-center">
        Step {currentIndex + 1} of {totalItems}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
        />
      </div>

      {/* Current form element */}
      <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[200px] flex items-center justify-center">
        {currentElement?.render ? (
          <div className="w-full">
            {currentElement.render}
          </div>
        ) : (
          <div className="text-gray-400">
            No element to display
          </div>
        )}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={goto.prev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={goto.start}
            disabled={currentIndex === 0}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={goto.end}
            disabled={currentIndex === totalItems - 1}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            End
          </button>
        </div>

        <button
          onClick={goto.next}
          disabled={currentIndex === totalItems - 1}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentIndex === totalItems - 1 ? 'Finish' : 'Next'}
        </button>
      </div>

      {/* Debug info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Info</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Total Elements: {totalItems}</div>
          <div>Current Index: {currentIndex}</div>
          <div>Elements Available: {renderedElements.length > 0 ? 'Yes' : 'No'}</div>
        </div>
      </div>
    </div>
  );
};

export default StepperDemo;
