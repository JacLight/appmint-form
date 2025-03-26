# Changelog

All notable changes to the AppmintForm library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive documentation with detailed API reference
- Improved README with badges and quick start guide

## [0.2.5] - 2025-03-26

### Added

- Capture and Signature elements for image and signature input
- PageDemo component and schema for multi-page form functionality
- Number range input component with dual thumbs
- Enhanced SliderRangeElement with dual thumbs and optional input display
- Tailwind CSS configuration with dark mode support across components
- Integration with Radix UI Select components

### Changed

- Replaced non-Lucide icons with Lucide equivalents across multiple components for standardized icon usage
- Enhanced AppmintForm and AppmintTable components with new props and event types
- Refactored form-utils for cleaner imports
- Updated DateRange schema type to array for better data handling
- Improved form element styles for consistency
- Enhanced meta type determination logic in table view
- Refactored IconPickerElement and SocialTextArea for improved styling and functionality
- Updated EmojiPicker to handle value and selection events properly
- Migrated components from headless-replacements to select-components
- Removed unnecessary wrapper divs from demo components for cleaner structure
- Streamlined form elements by removing unused styling logic

### Fixed

- Resolved ESM compatibility issue with @tailwindcss/vite package
- Updated build configuration to properly handle ESM-only dependencies
- Migrated Vite config to use .mjs extension for better ESM support
- Removed unused theme context imports and improved cleanup logic in various components
- Added missing newline at end of file in style-utils.ts

## [0.2.0] - 2025-02-26

### Added

- Shadow DOM element for isolated styling
- Data lookup combo component
- Generated element for AI-assisted content creation
- Support for multi-page forms with tab navigation
- Cron expression editor component
- Icon picker component
- Legal consent checkbox component
- Social links component
- Rating and ranking input components

### Changed

- Migrated build system from TSDX to Vite
- Upgraded to React 18
- Improved form validation using Zod
- Enhanced theming capabilities
- Optimized performance for large forms

### Fixed

- Issue with nested object validation
- Layout rendering in accordion mode
- Date picker timezone handling

## [0.1.0] - 2024-12-15

### Added

- Initial release with basic form components
- JSON schema-based form configuration
- Support for various input types (text, number, select, etc.)
- Basic validation
- Simple theming options
- Form layout options (basic, tab)
- Table view component
