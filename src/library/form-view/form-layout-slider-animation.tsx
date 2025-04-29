import { classNames } from '../utils';
import React, { useEffect, useRef, useState } from 'react';

/**
 * FormLayoutSliderAnimation component
 * Displays form items one at a time with smooth slide animations
 * 
 * @param {Object} props - Component props
 * @param {string} props.direction - Direction of sliding ('horizontal' or 'vertical')
 * @param {number} props.slideIndex - Current slide index
 * @param {Array} props.items - Array of items to display
 * @param {Function} props.getView - Function to render each item
 */
export const FormLayoutSliderAnimation = ({
  direction = 'horizontal',
  slideIndex,
  items,
  getView
}) => {
  // State for tracking current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Refs for DOM elements
  const slideContainer = useRef(null);
  const scrollContainerRef = useRef(null);

  // State for container dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState({});

  // Update current index when slideIndex prop changes
  useEffect(() => {
    if (slideIndex !== currentIndex) {
      setCurrentIndex(slideIndex);
    }
  }, [slideIndex]);

  // Measure container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (slideContainer.current) {
        const { width, height } = slideContainer.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial measurement
    updateDimensions();

    // Re-measure on window resize
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Update position when currentIndex or dimensions change
  useEffect(() => {
    if (items && items.length > 0) {
      updatePosition(currentIndex);
    }
  }, [currentIndex, dimensions, items]);

  /**
   * Updates the position of the slides
   * @param {number} index - Target slide index
   */
  const updatePosition = (index) => {
    // Check if items exist
    if (!items || items.length === 0) return;

    // Prevent scrolling beyond the first and last items
    const newIndex = Math.max(0, Math.min(index, items.length - 1));

    // Set animation state
    setIsAnimating(true);

    // Calculate transform values based on direction
    const translateX = direction === 'horizontal' ? -newIndex * dimensions.width : 0;
    const translateY = direction === 'vertical' ? -newIndex * dimensions.height : 0;

    // Apply transform with transition
    setTransitionStyle({
      transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
      transition: 'transform 0.4s ease-out'
    });

    // Clear animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  /**
   * Navigate to previous slide
   */
  const prevHandler = () => {
    if (!items || items.length === 0) return;
    if (!isAnimating && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   * Navigate to next slide
   */
  const nextHandler = () => {
    if (!items || items.length === 0) return;
    if (!isAnimating && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevHandler();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextHandler();
      }
    };

    if (items && items.length > 0) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentIndex, isAnimating, items]);

  // If no items, show a placeholder
  if (!items || items.length === 0) {
    return (
      <div
        id="slide-container"
        ref={slideContainer}
        className="relative flex w-full h-full overflow-hidden items-center justify-center min-h-[24rem]"
      >
        <div className="text-gray-400 text-center p-4">
          No slides available
        </div>
      </div>
    );
  }

  return (
    <div
      id="slide-container"
      ref={slideContainer}
      className="relative flex w-full h-full overflow-hidden items-center justify-center min-h-[24rem]"
    >
      <div
        ref={scrollContainerRef}
        className={classNames(
          direction === 'horizontal' && 'flex',
          'w-full h-full items-center'
        )}
        style={transitionStyle}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames(
              "w-full h-full shrink-0 flex flex-col justify-center items-center",
              index !== currentIndex ? "pointer-events-none" : "pointer-events-auto"
            )}
            data-active={index === currentIndex}
            tabIndex={index === currentIndex ? 0 : -1}
          >
            {getView(index)}
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {items.map((_, index) => (
            <div
              key={index}
              className={classNames(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-gray-300 scale-100"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormLayoutSliderAnimation;
