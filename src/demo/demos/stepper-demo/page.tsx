'use client';

import { FormSlider } from '@/components/common/form-slider';
import React, { useEffect, useState } from 'react';
import { FormProvider, useFormFlow } from './context';
import IntroPage from './intro';
import OutroPage from './outro';
import gsap from 'gsap';

export default function FormPage() {
  return (
    <FormProvider>
      <FormFlowContent />
    </FormProvider>
  );
}

function FormFlowContent() {
  const { currentStep } = useFormFlow();
  const [prevStep, setPrevStep] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle transitions between pages
  useEffect(() => {
    if (prevStep && prevStep !== currentStep) {
      setIsTransitioning(true);
      
      // Short timeout to ensure DOM is updated
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }
    
    setPrevStep(currentStep);
  }, [currentStep, prevStep]);

  return (
    <div className="form-flow-container">
      {/* Each section is absolutely positioned and controlled with CSS */}
      <div className={`flow-section ${currentStep === 'intro' ? 'active' : ''}`}>
        <IntroPage />
      </div>
      
      <div className={`flow-section ${currentStep === 'slider' ? 'active' : ''}`}>
        <FormSlider />
      </div>
      
      <div className={`flow-section ${currentStep === 'outro' ? 'active' : ''}`}>
        <OutroPage />
      </div>

      <style jsx>{`
        .form-flow-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
        
        .flow-section {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease-out, visibility 0.4s ease-out;
          overflow: hidden;
        }
        
        .flow-section.active {
          z-index: 1;
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </div>
  );
}