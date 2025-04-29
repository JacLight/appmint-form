import { FormLayoutRender } from './form-layout-render';
import { classNames } from '../utils';
import { isNotEmpty } from '../utils';
import { validateFormValue } from './form-validator';
import React, { useEffect, useRef, useState } from 'react';
import FormLayoutSliderAnimation from './form-layout-slider-animation';
import { useShallow } from 'zustand/shallow';
import { IconRenderer } from '../common/icons/icon-renderer';
import { StyledComponent } from '../form-elements/styling';
import { useFormStore } from '../context/form-store-context';

/**
 * FormLayoutSlider component
 * A TypeForm-like form player that displays form items one at a time with slide animations
 * 
 * @param {Object} props - Component props
 * @param {string} props.storeId - Form store ID
 * @param {string} props.layoutPath - Path to the layout in the schema
 * @param {string} props.path - Path to the form data
 * @param {string} props.dataPath - Path to the form data
 * @param {Object} props.schema - Form schema
 */
export const FormLayoutSlider = ({ storeId, layoutPath, path, dataPath, schema }) => {
  const { getSchemaItem, getError, getItemValue, updateError, timestamp } = useFormStore()(useShallow(state => ({
    getSchemaItem: state.getSchemaItem,
    getError: state.getError,
    getItemValue: state.getItemValue,
    updateError: state.updateError,
    timestamp: state.timestamp
  })));

  // Component state
  const [slideIndex, setSlideIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isAutoProgressEnabled, setIsAutoProgressEnabled] = useState(!!schema.autoProgress);
  const [autoProgressDelay, setAutoProgressDelay] = useState(schema.autoProgressDelay || 1500);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const autoProgressTimerRef = useRef(null);

  // Get layout from schema
  console.log('Schema in FormLayoutSlider:', schema);
  console.log('Schema x-layout:', schema['x-layout']);
  console.log('LayoutPath:', layoutPath);

  // Try to get the layout directly from the schema
  const layoutFromSchema = schema['x-layout']?.main;
  console.log('Layout from schema:', layoutFromSchema);

  // Get layout from schema using getSchemaItem
  const layout = getSchemaItem(layoutPath);
  console.log('Layout from getSchemaItem:', layout);

  const totalSlides = layout?.items?.length || 0;
  const hasItems = layout?.items && layout.items.length > 0;
  console.log('Has items:', hasItems, 'Total slides:', totalSlides);

  // If layout is not found, try to use the layout from schema
  const effectiveLayout = layout || layoutFromSchema;
  const effectiveTotalSlides = effectiveLayout?.items?.length || 0;
  const effectiveHasItems = effectiveLayout?.items && effectiveLayout.items.length > 0;
  console.log('Effective layout:', effectiveLayout);
  console.log('Effective has items:', effectiveHasItems, 'Effective total slides:', effectiveTotalSlides);

  // Handle layout timestamp changes
  const layoutTimestamp = timestamp[layoutPath];
  useEffect(() => {
    // Clear any existing errors
    setError(null);

    // Check if auto-progress is enabled and there are no errors
    if (isAutoProgressEnabled && !hasError(false)) {
      // Clear any existing timer
      if (autoProgressTimerRef.current) {
        clearTimeout(autoProgressTimerRef.current);
      }

      // Set a new timer for auto-progression
      autoProgressTimerRef.current = setTimeout(() => {
        doAutoProgress();
      }, autoProgressDelay);
    }

    // Cleanup timer on unmount
    return () => {
      if (autoProgressTimerRef.current) {
        clearTimeout(autoProgressTimerRef.current);
      }
    };
  }, [layoutTimestamp, isAutoProgressEnabled, autoProgressDelay]);

  /**
   * Auto-progress to the next slide if there are no errors
   */
  const doAutoProgress = () => {
    // Don't progress if there are errors
    if (hasError() || isTransitioning) return;

    // Calculate the next slide index
    let newIndex = slideIndex + 1;

    // If we've reached the end, loop back to the beginning if configured
    if (newIndex >= effectiveTotalSlides) {
      if (schema.loop) {
        newIndex = 0;
      } else {
        return; // Don't progress past the end if looping is disabled
      }
    }

    // Set the new slide index
    setSlideIndex(newIndex);
  };

  /**
   * Navigate to a specific slide
   * @param {Event} e - Click event
   * @param {number} idx - Target slide index
   */
  const makeActiveSlide = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();

    // Don't navigate if there are errors or we're already transitioning
    if (hasError() || isTransitioning) return;

    // Set the new slide index
    setSlideIndex(idx);

    // Mark as transitioning
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  /**
   * Navigate to the previous slide
   * @param {Event} e - Click event
   */
  const skipPrev = e => {
    e.stopPropagation();
    e.preventDefault();

    // Don't navigate if we're already transitioning
    if (isTransitioning) return;

    // Calculate the previous slide index
    let newIndex = slideIndex - 1;
    if (newIndex < 0) {
      if (schema.loop) {
        newIndex = effectiveTotalSlides - 1;
      } else {
        newIndex = 0;
      }
    }

    // Set the new slide index
    setSlideIndex(newIndex);

    // Mark as transitioning
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  /**
   * Navigate to the next slide
   * @param {Event} e - Click event
   */
  const skipNext = e => {
    e.stopPropagation();
    e.preventDefault();

    // Don't navigate if there are errors or we're already transitioning
    if (hasError() || isTransitioning) return;

    // Calculate the next slide index
    let newIndex = slideIndex + 1;
    if (newIndex >= effectiveTotalSlides) {
      if (schema.loop) {
        newIndex = 0;
      } else {
        newIndex = effectiveTotalSlides - 1;
      }
    }

    // Set the new slide index
    setSlideIndex(newIndex);

    // Mark as transitioning
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  /**
   * Toggle auto-progression
   */
  const toggleAutoProgress = () => {
    setIsAutoProgressEnabled(!isAutoProgressEnabled);
  };

  /**
   * Check if the current slide has validation errors
   * @param {boolean} saveError - Whether to save the error state
   * @returns {boolean} - Whether there are errors
   */
  const hasError = (saveError = true) => {
    // Get the current slide's path
    const itemPath = layoutPath + '.items.' + slideIndex;
    const properties = getSchemaItem(path);

    // Check each field in the current slide for errors
    let errors = Object.keys(properties).map(fieldName => {
      const fieldPath = path + '.' + fieldName;
      const { layoutGroup } = properties[fieldName] || {};

      // Skip fields that aren't in the current slide
      if (layoutGroup !== itemPath) return null;

      // Get the field schema and value
      const fieldSchema = getSchemaItem(fieldPath);
      const valuePath = dataPath ? dataPath + '.' + fieldName : fieldName;
      const value = getItemValue(valuePath);
      const data = dataPath ? getItemValue('') : {};

      // Validate the field
      const validationResult = validateFormValue(dataPath, value, fieldSchema, data);

      // Handle validation result
      if (isNotEmpty(validationResult.errors)) {
        if (saveError) updateError(valuePath, validationResult.message);
        return validationResult.message;
      } else {
        if (saveError) updateError(valuePath, null);
        return null;
      }
    });

    // Filter out null errors
    errors = errors.filter(isNotEmpty);

    // Update error state
    if (errors.length > 0) {
      if (saveError) setError(errors.join(', '));
      return true;
    } else {
      if (saveError) setError(null);
      return false;
    }
  };

  /**
   * Render a slide
   * @param {number} viewIndex - Slide index
   * @returns {JSX.Element} - Rendered slide
   */
  const getView = viewIndex => {
    // Handle special case for slide mode
    if (viewIndex < 0) {
      return <div className="text-center p-10">Slider Mode</div>;
    }

    // Get the slide layout
    const itemPath = layoutPath + '.items.' + viewIndex;
    const itemLayout = getSchemaItem(itemPath);
    console.log('getView', JSON.stringify({ viewIndex, itemPath, itemLayout, path, dataPath, storeId }, null, 2));

    // Set up watched paths for auto-progression
    if (isAutoProgressEnabled) {
      const properties = getSchemaItem(path);
      const allPaths = Object.keys(properties).map(fieldName => dataPath + '.' + fieldName);
      useFormStore().getState().updateWatchedPath(layoutPath, allPaths);
    }

    // Render the slide
    return (
      <div className={classNames(
        error && 'animate__animated animate__headShake',
        'gap-1 items-center justify-center w-full'
      )}>
        {itemLayout ? (
          <FormLayoutRender
            path={path}
            layoutPath={itemPath}
            dataPath={dataPath}
            storeId={storeId}
          />
        ) : (
          <div className="text-xs w-full text-center text-red-400">
            Empty layout: {itemPath}
          </div>
        )}
      </div>
    );
  };

  // Calculate progress percentage
  const progressPercentage = effectiveTotalSlides > 0 ? ((slideIndex + 1) / effectiveTotalSlides) * 100 : 0;

  // If no items, show a placeholder
  if (!effectiveHasItems) {
    return (
      <div className="w-full">
        <div className="text-gray-400 text-center p-10 border rounded-lg">
          No slides available. Please add items to the layout.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error message */}
      {error && (
        <div className="text-xs w-full text-center text-red-400 mb-2 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
        <div
          className="h-1 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Slide container */}
      <StyledComponent
        componentType="slider"
        part="container"
        schema={effectiveLayout}
      >
        <FormLayoutSliderAnimation
          direction="horizontal"
          items={effectiveLayout?.items}
          getView={getView}
          slideIndex={slideIndex}
        />
      </StyledComponent>

      {/* Navigation controls */}
      <div className="flex justify-between items-center w-full mt-4 px-2">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <StyledComponent
            componentType="slider"
            part="button"
            schema={effectiveLayout}
          >
            <button
              title="Previous"
              onClick={skipPrev}
              disabled={slideIndex === 0 && !schema.loop}
              className={classNames(
                "p-2 rounded-full",
                slideIndex === 0 && !schema.loop ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
              )}
            >
              <IconRenderer icon="SkipBack" />
            </button>
          </StyledComponent>

          <StyledComponent
            componentType="slider"
            part="button"
            schema={effectiveLayout}
          >
            <button
              title="Next"
              onClick={skipNext}
              disabled={slideIndex === effectiveTotalSlides - 1 && !schema.loop}
              className={classNames(
                "p-2 rounded-full",
                slideIndex === effectiveTotalSlides - 1 && !schema.loop ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
              )}
            >
              <IconRenderer icon="SkipForward" />
            </button>
          </StyledComponent>
        </div>

        {/* Center - slide indicators */}
        <div className="flex items-center gap-1">
          {effectiveLayout?.items?.map((_, idx) => (
            <StyledComponent
              key={idx}
              componentType="slider"
              part={slideIndex === idx ? "buttonActive" : "button"}
              schema={effectiveLayout}
            >
              <button
                title={`Slide ${idx + 1}`}
                onClick={e => makeActiveSlide(e, idx)}
                className={classNames(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px]",
                  slideIndex === idx ? "bg-primary text-white" : "hover:bg-gray-100"
                )}
              >
                {idx + 1}
              </button>
            </StyledComponent>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <StyledComponent
            componentType="slider"
            part={isAutoProgressEnabled ? "buttonActive" : "button"}
            schema={effectiveLayout}
          >
            <button
              title={isAutoProgressEnabled ? "Disable Auto Progress" : "Enable Auto Progress"}
              onClick={toggleAutoProgress}
              className={classNames(
                "p-2 rounded-full",
                isAutoProgressEnabled ? "bg-primary text-white" : "hover:bg-gray-100"
              )}
            >
              <IconRenderer icon={isAutoProgressEnabled ? "Pause" : "Play"} />
            </button>
          </StyledComponent>
        </div>
      </div>

      {/* Slide counter */}
      <div className="text-xs text-center mt-2 text-gray-500">
        Slide {slideIndex + 1} of {effectiveTotalSlides}
      </div>
    </div>
  );
};

export default FormLayoutSlider;
