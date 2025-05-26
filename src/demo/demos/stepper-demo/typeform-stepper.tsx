'use client';

import React, { useCallback, useState, useRef } from 'react';
import { AppmintForm, getFormStore } from '../../..';
import { useShallow } from 'zustand/shallow';
import { employee } from './employee';
import { stepperConfig } from './config';
import gsap from 'gsap';

const TypeformStepper: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    path: '',
    value: undefined,
    data: {},
    error: undefined,
    files: undefined,
  });

  const handleChange = useCallback(
    (path: string, value: any, data: any, files?: any, error?: any) => {
      setFormData({ path, value, data, error, files });
    },
    []
  );

  return (
    <>
      <div className="hidden">
        <AppmintForm
          schema={employee}
          id="demo"
          data={{}}
          onChange={handleChange}
        />
      </div>
      <StepperFormFlow formData={formData} />
    </>
  );
};

const StepperFormFlow: React.FC<{ formData: any }> = ({ formData }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // Start with -1 for welcome screen
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const formStore = getFormStore('demo');
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const progressRef = useRef(null);

  const { renderedElements } = formStore(
    useShallow(state => ({
      renderedElements: state.renderedElements || [],
    }))
  );

  const totalItems = renderedElements.filter(_ => _.render).length;
  const currentElement = currentIndex >= 0 ? renderedElements[currentIndex] : null;
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / totalItems) * 100 : 0;

  // Fast, snappy transitions like TypeForm
  const animateToStep = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Just a quick fade - fast and clean
    gsap.fromTo(elementRef.current, 
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.15,
        ease: "power1.out",
        onComplete: () => setIsTransitioning(false)
      }
    );

    // Fast progress bar update
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((newIndex + 1) / totalItems) * 100}%`,
        duration: 0.2,
        ease: "power1.out"
      });
    }
  }, [isTransitioning, totalItems]);

  const nextStep = () => {
    if (currentIndex < totalItems - 1) {
      animateToStep(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentIndex > -1) {
      animateToStep(currentIndex - 1);
    }
  };

  const startForm = () => {
    if (totalItems > 0) {
      animateToStep(0);
    }
  };

  // Welcome screen
  if (currentIndex === -1) {
    return (
      <div className="typeform-container">
        <div className="typeform-content">
          <div className="welcome-screen">
            <div className="welcome-content">
              <h1 className="welcome-title">{stepperConfig.title}</h1>
              <p className="welcome-description">{stepperConfig.description}</p>
              <button onClick={startForm} className="start-button">
                Get Started
                <span className="button-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .typeform-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, ${stepperConfig.backgroundColor}, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }
          
          .typeform-content {
            width: 100%;
            max-width: 600px;
            padding: 2rem;
          }
          
          .welcome-screen {
            text-align: center;
          }
          
          .welcome-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            line-height: 1.2;
          }
          
          .welcome-description {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            opacity: 0.9;
            line-height: 1.6;
          }
          
          .start-button {
            background: ${stepperConfig.brandColor};
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
          }
          
          .start-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          
          .button-arrow {
            transition: transform 0.2s ease;
          }
          
          .start-button:hover .button-arrow {
            transform: translateX(4px);
          }
          
          @media (max-width: 768px) {
            .welcome-title {
              font-size: 2rem;
            }
            .typeform-content {
              padding: 1rem;
            }
          }
        `}</style>
      </div>
    );
  }

  // Thank you screen
  if (isCompleted) {
    return (
      <div className="typeform-container">
        <div className="typeform-content">
          <div className="thank-you-screen">
            <div className="thank-you-content">
              <div className="check-icon">✓</div>
              <h1 className="thank-you-title">All Done!</h1>
              <p className="thank-you-message">{stepperConfig.thankYouMessage}</p>
              <button onClick={() => {setCurrentIndex(-1); setIsCompleted(false);}} className="restart-button">
                Start Over
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .thank-you-screen {
            text-align: center;
          }
          
          .check-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #10b981;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 2rem;
          }
          
          .thank-you-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          
          .thank-you-message {
            font-size: 1.25rem;
            margin-bottom: 3rem;
            opacity: 0.9;
          }
          
          .restart-button {
            background: transparent;
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .restart-button:hover {
            border-color: white;
            background: rgba(255,255,255,0.1);
          }
        `}</style>
      </div>
    );
  }

  // Main form view
  if (totalItems === 0) {
    return (
      <div className="typeform-container">
        <div className="typeform-content">
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
        <style>{`
          .loading-screen {
            text-align: center;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="typeform-container">
      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-track">
          <div ref={progressRef} className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">{currentIndex + 1} of {totalItems}</div>
      </div>

      {/* Form content */}
      <div className="typeform-content">
        <div ref={elementRef} className="form-step">
          {currentElement?.render && (
            <div className="form-element">
              {currentElement.render}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        {currentIndex > 0 && (
          <button onClick={prevStep} className="nav-button prev-button" disabled={isTransitioning}>
            ← Previous
          </button>
        )}
        <button onClick={nextStep} className="nav-button next-button" disabled={isTransitioning}>
          {currentIndex === totalItems - 1 ? 'Submit' : 'Next'} →
        </button>
      </div>

      <style>{`
        .typeform-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, ${stepperConfig.backgroundColor}, #764ba2);
          display: flex;
          flex-direction: column;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          overflow: hidden;
        }
        
        .progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem;
        }
        
        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: white;
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        
        .progress-text {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .typeform-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 4rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
        
        .form-step {
          width: 100%;
        }
        .navigation {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          gap: 1rem;
          z-index: 100;
        }
        
        .nav-button {
          background: ${stepperConfig.brandColor};
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .prev-button {
          background: transparent;
          border: 2px solid rgba(255,255,255,0.3);
        }
        
        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        @media (max-width: 768px) {
          .typeform-content {
            padding: 5rem 1rem 3rem;
          }
          
          .navigation {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            justify-content: space-between;
          }
          
          .form-element input,
          .form-element textarea {
            font-size: 1.25rem !important;
          }
          
          .form-element label {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TypeformStepper;