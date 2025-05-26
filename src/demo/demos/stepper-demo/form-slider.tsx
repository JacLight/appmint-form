'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { AppmintForm, getFormStore } from '../../..';
import { useShallow } from 'zustand/shallow';
import { useFormFlow } from './context';
import { employee } from './employee';
import gsap from 'gsap';

const FormSlider: React.FC = () => {
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
      <FormStepperSlider formData={formData} />
    </>
  );
};

const FormStepperSlider: React.FC<any> = ({ formData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { nextStep: goToOutro } = useFormFlow();
  
  const formStore = getFormStore('demo');
  console.log('formData', formData);
  
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const elementContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const headerRef = useRef(null);
  const buttonsRef = useRef(null);
  const backgroundRef = useRef(null);

  const { renderedElements } = formStore(
    useShallow(state => ({
      renderedElements: state.renderedElements || [],
    }))
  );

  const totalItems = renderedElements.filter(_ => _.render).length;
  const currentElement = renderedElements[currentIndex];
  const progress = totalItems > 0 ? ((currentIndex + 1) / totalItems) * 100 : 0;

  // GSAP transition function
  const animateToStep = useCallback((newIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (isTransitioning || newIndex === currentIndex) return;
    
    setIsTransitioning(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      }
    });

    // Exit animation
    tl.to(elementContainerRef.current, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.inOut"
    })
    // Enter animation  
    .fromTo(elementContainerRef.current, 
      { 
        x: direction === 'next' ? 100 : -100,
        opacity: 0,
        scale: 0.95
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out"
      },
      "-=0.1"
    )
    // Progress bar animation
    .to(progressBarRef.current, {
      width: `${((newIndex + 1) / totalItems) * 100}%`,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

  }, [currentIndex, isTransitioning, totalItems]);

  // Navigation functions with GSAP animations
  const goto = {
    start: () => animateToStep(0, 'prev'),
    end: () => {
      if (currentIndex === totalItems - 1) {
        // Animate to outro
        const tl = gsap.timeline();
        tl.to(containerRef.current, {
          opacity: 0,
          y: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: goToOutro
        });
      } else {
        animateToStep(Math.max(0, totalItems - 1), 'next');
      }
    },
    prev: () => animateToStep(Math.max(0, currentIndex - 1), 'prev'),
    next: () => {
      if (currentIndex === totalItems - 1) {
        goto.end();
      } else {
        animateToStep(Math.min(totalItems - 1, currentIndex + 1), 'next');
      }
    },
  };

  // Initialize entrance animations
  useEffect(() => {
    if (totalItems === 0) return;

    // Set initial states
    gsap.set([headerRef.current, elementContainerRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    });
    
    gsap.set(backgroundRef.current, {
      opacity: 0
    });

    // Create entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 1
    })
    .to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.5")
    .to(elementContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6");

    // Floating animation for background particles
    const particles = document.querySelectorAll('.slider-particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: gsap.utils.random(-100, 100),
        x: gsap.utils.random(-100, 100),
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(20, 40),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    // Animate gradient background
    gsap.to('.slider-bg', {
      backgroundPosition: '400% 400%',
      duration: 30,
      ease: "linear",
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, [totalItems]);

  if (totalItems === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading form elements...</div>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="form-slider-container">
      <div ref={backgroundRef} className="slider-bg"></div>
      
      {/* Animated particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="slider-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            opacity: Math.random() * 0.3 + 0.1
          }}
        ></div>
      ))}

      <div className="form-slider-content">
        {/* Header */}
        <div ref={headerRef} className="slider-header">
          <h1 className="slider-title">Interactive Form Experience</h1>
          <div className="step-indicator">
            Step {currentIndex + 1} of {totalItems}
          </div>
          
          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-track">
              <div 
                ref={progressBarRef}
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">{Math.round(progress)}% Complete</div>
          </div>
        </div>

        {/* Current form element */}
        <div ref={elementContainerRef} className="element-container">
          <div className="element-wrapper">
            {currentElement?.render ? (
              <div className="form-element">{currentElement.render}</div>
            ) : (
              <div className="no-element">No element to display</div>
            )}
          </div>
        </div>

        {/* Navigation controls */}
        <div ref={buttonsRef} className="navigation-controls">
          <button
            onClick={goto.prev}
            disabled={currentIndex === 0 || isTransitioning}
            className="nav-button nav-button-secondary"
          >
            <span className="button-icon">←</span>
            <span className="button-text">Previous</span>
          </button>

          <div className="nav-center">
            <button
              onClick={goto.start}
              disabled={currentIndex === 0 || isTransitioning}
              className="nav-button nav-button-outline"
            >
              Start
            </button>
            <div className="step-dots">
              {Array.from({ length: Math.min(totalItems, 5) }, (_, i) => {
                const step = Math.floor((i / 4) * (totalItems - 1));
                return (
                  <button
                    key={i}
                    onClick={() => animateToStep(step)}
                    disabled={isTransitioning}
                    className={`step-dot ${step === currentIndex ? 'active' : ''}`}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={goto.next}
            disabled={isTransitioning}
            className="nav-button nav-button-primary"
          >
            <span className="button-text">
              {currentIndex === totalItems - 1 ? 'Complete' : 'Next'}
            </span>
            <span className="button-icon">→</span>
          </button>
        </div>

        {/* Debug info */}
        <div className="debug-info">
          <div className="debug-item">Elements: {totalItems}</div>
          <div className="debug-item">Current: {currentIndex + 1}</div>
          <div className="debug-item">Progress: {Math.round(progress)}%</div>
        </div>
      </div>

      <style>{`
        .form-slider-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .slider-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            -45deg, 
            #667eea, 
            #764ba2, 
            #f093fb, 
            #f5576c,
            #4facfe
          );
          background-size: 400% 400%;
          z-index: -2;
        }

        .slider-particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          backdrop-filter: blur(5px);
          z-index: -1;
        }

        .form-slider-content {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .slider-header {
          text-align: center;
          margin-bottom: 3rem;
          color: white;
        }

        .slider-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #fff, #f0f0ff, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .step-indicator {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .progress-container {
          margin-bottom: 1rem;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4facfe, #00f2fe);
          border-radius: 50px;
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
          transition: width 0.6s ease;
        }

        .progress-text {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .element-container {
          margin-bottom: 3rem;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .element-wrapper {
          width: 100%;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .element-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4facfe, #00f2fe);
          border-radius: 24px 24px 0 0;
        }

        .form-element {
          width: 100%;
          color: #334155;
        }

        .no-element {
          text-align: center;
          color: #94a3b8;
          font-size: 1.1rem;
        }

        .navigation-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          color: white;
        }

        .nav-center {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          border: none;
          backdrop-filter: blur(10px);
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .nav-button-primary {
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          color: white;
          box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
        }

        .nav-button-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .nav-button-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.4);
          padding: 0.8rem 1.2rem;
          font-size: 0.9rem;
        }

        .nav-button:not(:disabled):hover {
          transform: translateY(-3px) scale(1.05);
        }

        .nav-button-primary:not(:disabled):hover {
          box-shadow: 0 15px 35px rgba(79, 172, 254, 0.6);
        }

        .button-icon {
          font-size: 1.2rem;
        }

        .step-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .step-dot.active {
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          box-shadow: 0 0 15px rgba(79, 172, 254, 0.6);
          transform: scale(1.3);
        }

        .step-dot:not(.active):hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .debug-info {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 1rem;
          opacity: 0.7;
          font-size: 0.8rem;
          color: white;
        }

        .debug-item {
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .form-slider-container {
            padding: 1rem;
          }

          .slider-title {
            font-size: 2rem;
          }

          .element-wrapper {
            padding: 1.5rem;
          }

          .navigation-controls {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-center {
            order: -1;
            justify-content: center;
          }

          .debug-info {
            position: relative;
            bottom: auto;
            right: auto;
            justify-content: center;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FormSlider;