'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type FormStep = 'intro' | 'slider' | 'outro';

interface FormContextType {
  currentStep: FormStep;
  formData: Record<string, any>;
  goToStep: (step: FormStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Record<string, any>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<FormStep>('intro');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const stepOrder: FormStep[] = ['intro', 'slider', 'outro'];

  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  }, [currentStep, stepOrder]);

  const prevStep = useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  }, [currentStep, stepOrder]);

  const updateFormData = useCallback((data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        goToStep,
        nextStep,
        prevStep,
        updateFormData
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormFlow() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormFlow must be used within a FormProvider');
  }
  return context;
}