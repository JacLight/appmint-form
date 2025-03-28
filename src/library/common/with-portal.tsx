import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const withPortal = WrappedComponent => {
  return ({ usePortal, id, triggerRef, ...props }) => {
    const [container, setContainer] = useState(null);
    const portalRef = useRef(null);

    // Check if we're in an iframe
    useEffect(() => {
      if (!usePortal) return;

      // Determine target document (iframe or main window)
      const targetDocument = document;

      // Check if container already exists
      let portalContainer = targetDocument.getElementById(id + '-portal');

      // Create container if it doesn't exist
      if (!portalContainer) {
        portalContainer = targetDocument.createElement('div');
        portalContainer.id = id + '-portal';
        portalContainer.style.position = 'absolute';
        portalContainer.style.zIndex = '9999';
        targetDocument.body.appendChild(portalContainer);
      }

      setContainer(portalContainer);
      portalRef.current = portalContainer;

      // Position the portal initially
      if (triggerRef?.current) {
        updatePosition();
      }

      // Add event listeners for repositioning
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      // Add click outside handler to close the portal
      const handleClickOutside = (e) => {
        if (
          portalContainer &&
          triggerRef?.current &&
          !triggerRef.current.contains(e.target) &&
          !portalContainer.contains(e.target)
        ) {
          // Click was outside both the trigger and the portal
          targetDocument.body.removeChild(portalContainer);
          setContainer(null);
        }
      };

      targetDocument.addEventListener('mousedown', handleClickOutside);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
        targetDocument.removeEventListener('mousedown', handleClickOutside);

        let portalContainer = targetDocument.getElementById(id + '-portal');
        if (portalContainer && portalContainer.parentNode) {
          try {
            portalContainer.parentNode.removeChild(portalContainer);
          } catch (e) {
            console.error('Error removing portal container:', e);
          }
        }
      };
    }, [usePortal, id, triggerRef?.current]);

    // Function to update the position of the portal
    const updatePosition = () => {
      if (!triggerRef?.current || !portalRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const portalElement = portalRef.current;

      // Position below the trigger
      portalElement.style.top = `${triggerRect.bottom + window.scrollY}px`;
      portalElement.style.left = `${triggerRect.left + window.scrollX}px`;
      portalElement.style.minWidth = `${triggerRect.width}px`;

      // After rendering, check if we need to adjust position to stay in viewport
      setTimeout(() => {
        const portalRect = portalElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // If dropdown extends beyond bottom of viewport, position above trigger
        if (portalRect.bottom > viewportHeight) {
          portalElement.style.top = `${triggerRect.top + window.scrollY - portalRect.height}px`;
        }

        // If dropdown extends beyond right edge of viewport, align with right edge of trigger
        if (portalRect.right > viewportWidth) {
          const rightOffset = triggerRect.right - portalRect.width;
          portalElement.style.left = `${rightOffset > 0 ? rightOffset + window.scrollX : 0}px`;
        }
      }, 0);
    };

    // Render the wrapped component
    if (!container) return null
    return ReactDOM.createPortal(<WrappedComponent {...props} />, container);

  };
};

export default withPortal;
