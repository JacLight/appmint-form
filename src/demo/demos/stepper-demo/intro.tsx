'use client';

import React, { useEffect, useRef } from 'react';
import { useFormFlow } from './context';
import gsap from 'gsap';

export default function IntroPage() {
  const { nextStep } = useFormFlow();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to handle transition to next section
  const handleNextStep = () => {
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: nextStep
    });
  };

  // Initialize animations
  useEffect(() => {
    // Reset opacity for all elements to 0
    gsap.set([titleRef.current, descriptionRef.current, featuresRef.current, buttonRef.current], { 
      opacity: 0, 
      y: 30 
    });
    
    gsap.set(featureRefs.current, { 
      opacity: 0, 
      x: -20 
    });
    
    gsap.set(backgroundRef.current, {
      scale: 1.2,
      opacity: 0
    });

    // Create a complex timeline with staggered animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Background animation first
    tl.to(backgroundRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5
    })
    // Title animates in with text reveal and color shifting effect
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.7")
    // Description fades in 
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.5")
    // Feature container fades in
    .to(featuresRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.5")
    // Individual features stagger in
    .to(featureRefs.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.15
    }, "-=0.6")
    // Button pops in last
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.3");

    // Animate floating particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-150, 150),
        opacity: gsap.utils.random(0.3, 0.8),
        duration: gsap.utils.random(10, 20),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    // Animate gradient background
    gsap.to('.animated-bg', {
      backgroundPosition: '400% 400%',
      duration: 40,
      ease: "linear",
      repeat: -1
    });

    // Continuous button glow effect
    gsap.to('.start-button', {
      boxShadow: '0 0 25px 5px rgba(76, 201, 240, 0.6)',
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Continuous title gradient animation
    gsap.to('.intro-title', {
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
    <div ref={containerRef} className="intro-container">
      <div ref={backgroundRef} className="animated-bg"></div>
      
      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
            opacity: Math.random() * 0.3
          }}
        ></div>
      ))}
      
      <div className="intro-content">
        <h1 ref={titleRef} className="intro-title">
          <span className="text-reveal">Interactive Experience</span>
        </h1>
        
        <div ref={descriptionRef} className="intro-description-container">
          <p className="intro-description">
            Welcome to our immersive interactive slider experience. This demonstration showcases
            the power of GSAP animations combined with React to create smooth, engaging user interfaces.
          </p>
          <p className="intro-description">
            You'll experience beautiful transitions between slides with carefully crafted animations
            that respond to your interactions.
          </p>
        </div>
        
        <div ref={featuresRef} className="intro-features">
          <div ref={el => featureRefs.current[0] = el} className="feature">
            <div className="feature-icon">
              <div className="icon-circle">🚀</div>
            </div>
            <div className="feature-text">
              <h3>Smooth Animations</h3>
              <p>Powered by GSAP for butter-smooth transitions</p>
            </div>
          </div>
          <div ref={el => featureRefs.current[1] = el} className="feature">
            <div className="feature-icon">
              <div className="icon-circle">🖱️</div>
            </div>
            <div className="feature-text">
              <h3>Interactive Controls</h3>
              <p>Navigate with keyboard, buttons, or scroll</p>
            </div>
          </div>
          <div ref={el => featureRefs.current[2] = el} className="feature">
            <div className="feature-icon">
              <div className="icon-circle">📱</div>
            </div>
            <div className="feature-text">
              <h3>Responsive Design</h3>
              <p>Looks great on any device or screen size</p>
            </div>
          </div>
        </div>
        
        <button ref={buttonRef} className="start-button" onClick={handleNextStep}>
          <span className="button-text">Start Experience</span>
          <div className="button-effect"></div>
        </button>
      </div>

      <style jsx>{`
        .intro-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: white;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            -45deg, 
            #4361ee, 
            #3a0ca3, 
            #7209b7, 
            #f72585, 
            #4cc9f0
          );
          background-size: 400% 400%;
          z-index: -1;
          filter: brightness(0.9);
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          backdrop-filter: blur(5px);
          z-index: -1;
        }

        .intro-content {
          max-width: 800px;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 3rem;
          border-radius: 24px;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }

        .intro-title {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          background: linear-gradient(90deg, #f72585, #4cc9f0, #f72585);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          letter-spacing: -0.02em;
          position: relative;
        }

        .text-reveal {
          display: inline-block;
          position: relative;
        }

        .intro-description-container {
          margin-bottom: 2rem;
          position: relative;
        }

        .intro-description {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          opacity: 0.9;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .intro-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          margin: 3rem 0;
          position: relative;
        }

        .feature {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          text-align: left;
          max-width: 300px;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(5px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          flex-shrink: 0;
        }

        .icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          font-size: 2rem;
          backdrop-filter: blur(5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .feature-text h3 {
          margin: 0 0 0.7rem 0;
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(90deg, #fff, #e0e0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .feature-text p {
          margin: 0;
          opacity: 0.9;
          font-size: 1rem;
          line-height: 1.6;
        }

        .start-button {
          position: relative;
          background: linear-gradient(45deg, #4cc9f0, #4361ee);
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          font-size: 1.3rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(76, 201, 240, 0.3);
        }

        .button-text {
          position: relative;
          z-index: 2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .button-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #7209b7, #f72585);
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .start-button:hover {
          transform: translateY(-5px) scale(1.05);
        }

        .start-button:hover .button-effect {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .intro-title {
            font-size: 3rem;
          }

          .intro-content {
            padding: 2rem;
          }

          .intro-features {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .feature {
            max-width: 100%;
          }

          .icon-circle {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}