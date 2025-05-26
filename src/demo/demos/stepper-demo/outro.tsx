'use client';

import React, { useEffect, useRef } from 'react';
import { useFormFlow } from './context';
import gsap from 'gsap';

export default function OutroPage() {
  const { goToStep } = useFormFlow();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const summaryRef = useRef(null);
  const buttonsRef = useRef(null);
  const summaryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const backgroundRef = useRef(null);

  // Handle navigation with animations
  const handleGoToStep = (step: 'intro' | 'slider') => {
    const tl = gsap.timeline();
    
    tl.to(contentRef.current, {
      y: step === 'intro' ? -100 : 100,
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => goToStep(step)
    });
  };

  // Initialize animations
  useEffect(() => {
    // Set initial states
    gsap.set(contentRef.current, { 
      opacity: 0,
      y: 50
    });
    
    gsap.set([iconRef.current, titleRef.current, descriptionRef.current, summaryRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    });
    
    gsap.set(summaryItemsRef.current, {
      opacity: 0,
      x: 30
    });
    
    gsap.set(backgroundRef.current, {
      opacity: 0
    });

    // Create entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 1.2
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1
    }, "-=0.8")
    .to(iconRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.5")
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6")
    .to(summaryRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6")
    .to(summaryItemsRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15
    }, "-=0.5")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.4");
    
    // Animate particles
    const particles = document.querySelectorAll('.outro-particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: gsap.utils.random(-100, 100),
        x: gsap.utils.random(-100, 100),
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(15, 30),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });
    
    // Animate the success icon
    gsap.to(iconRef.current, {
      boxShadow: '0 0 30px 5px rgba(76, 201, 240, 0.7)',
      scale: 1.05,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Animate gradient background
    gsap.to('.outro-bg', {
      backgroundPosition: '400% 400%',
      duration: 30,
      ease: "linear",
      repeat: -1
    });
    
    // Continuous title gradient animation
    gsap.to('.outro-title', {
      backgroundPosition: '200% center',
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="outro-container">
      <div ref={backgroundRef} className="outro-bg"></div>
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="outro-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 40 + 10}px`,
            height: `${Math.random() * 40 + 10}px`,
            opacity: Math.random() * 0.2 + 0.1,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        ></div>
      ))}
      
      <div ref={contentRef} className="outro-content">
        <div ref={iconRef} className="success-icon">✓</div>
        <h1 ref={titleRef} className="outro-title">Thank You!</h1>
        <p ref={descriptionRef} className="outro-description">
          You've completed the interactive slider experience. We hope you enjoyed the
          smooth animations and engaging interface design.
        </p>
        
        <div ref={summaryRef} className="outro-summary">
          <h2>Experience Summary</h2>
          <div className="summary-items">
            <div ref={el => summaryItemsRef.current[0] = el} className="summary-item">
              <div className="summary-icon">
                <span>✨</span>
              </div>
              <div className="summary-content">
                <h3>GSAP Animation</h3>
                <p>Powerful animations using the GreenSock Animation Platform provide butter-smooth transitions between slides.</p>
              </div>
            </div>
            <div ref={el => summaryItemsRef.current[1] = el} className="summary-item">
              <div className="summary-icon">
                <span>👆</span>
              </div>
              <div className="summary-content">
                <h3>Interactive Navigation</h3>
                <p>Multiple navigation methods including keyboard controls, touch swipe, and on-screen buttons.</p>
              </div>
            </div>
            <div ref={el => summaryItemsRef.current[2] = el} className="summary-item">
              <div className="summary-icon">
                <span>⚛️</span>
              </div>
              <div className="summary-content">
                <h3>React Integration</h3>
                <p>Modern React hooks and patterns for state management and component lifecycle.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={buttonsRef} className="action-buttons">
          <button className="return-button" onClick={() => handleGoToStep('intro')}>
            <span className="button-text">Return to Start</span>
          </button>
          <button className="experience-button" onClick={() => handleGoToStep('slider')}>
            <span className="button-text">Experience Again</span>
            <span className="button-shine"></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .outro-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .outro-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            -45deg, 
            #3a0ca3, 
            #4361ee, 
            #7209b7, 
            #3f37c9
          );
          background-size: 400% 400%;
          z-index: -2;
        }
        
        .outro-particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          z-index: -1;
        }

        .outro-content {
          max-width: 800px;
          text-align: center;
          padding: 3rem;
          border-radius: 24px;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(15px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }

        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #4CC9F0, #4361ee);
          color: white;
          font-size: 48px;
          border-radius: 50%;
          margin: 0 auto 2rem;
          box-shadow: 0 10px 25px rgba(76, 201, 240, 0.4);
          position: relative;
        }
        
        .success-icon::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CC9F0, transparent, #4361ee);
          opacity: 0.5;
          animation: rotate 6s linear infinite;
        }
        
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .outro-title {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          background: linear-gradient(90deg, #4cc9f0, #f72585, #4cc9f0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .outro-description {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 3rem;
          opacity: 0.95;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .outro-summary {
          margin: 3rem 0;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .outro-summary h2 {
          margin-top: 0;
          margin-bottom: 2rem;
          font-size: 2rem;
          background: linear-gradient(90deg, #fff, #e0e0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .summary-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .summary-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          text-align: left;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .summary-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .summary-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          font-size: 1.5rem;
        }

        .summary-content h3 {
          margin: 0 0 0.7rem 0;
          font-size: 1.25rem;
          color: #f72585;
        }

        .summary-content p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .action-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 2.5rem;
        }

        .return-button,
        .experience-button {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .return-button {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .experience-button {
          background: linear-gradient(45deg, #4cc9f0, #4361ee);
          color: white;
          border: none;
          box-shadow: 0 8px 25px rgba(76, 201, 240, 0.4);
        }
        
        .button-text {
          position: relative;
          z-index: 1;
        }
        
        .button-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          transition: 0.5s;
          opacity: 0;
        }

        .return-button:hover {
          border-color: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
        }

        .experience-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 35px rgba(76, 201, 240, 0.5);
        }
        
        .experience-button:hover .button-shine {
          animation: shine 1.5s infinite;
        }
        
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .outro-title {
            font-size: 2.5rem;
          }
          
          .outro-content {
            padding: 2rem;
          }

          .summary-items {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .return-button,
          .experience-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}