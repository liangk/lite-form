# Changelog

All notable changes to the LiteForm project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2025-10-08

### Fixed
- **LiteDateTime Selection State**: Resolved visual bug where previous selected date remained highlighted
  - Added `selectionChangeSignal` to trigger calendar re-computation on selection changes
  - Calendar days computed signal now properly reacts to selection updates
  - Cleaned up `setDateTimeSelected()` to remove manual DOM manipulation
  - Previous selection now correctly clears when new date is selected
  - Ensures only one date appears selected at a time in the calendar

## [1.4.0] - 2025-10-08

### Fixed
- **LiteSelect Option Click Handler**: Resolved race condition preventing option selection
  - Changed from `(click)` to `(mousedown)` event to fire before input blur
  - Fixed tracking expression from `track option.title` to `track $index`
  - Removed input `(blur)` handler in favor of document click detection
  - Extracted `handleInputValidation()` method for reusable validation logic
  - Ensures reliable option selection when clicking from filtered results

### Changed
- **LiteSelect Input Clearing**: Enhanced reset behavior
  - Clearing input text now resets form control value to `null`
  - Provides consistent initial state when user deletes all text
  - Improves form validation flow for required select fields

### Improved
- **Package Metadata**: Updated description and keywords for better discoverability
  - Description now highlights "15+ standalone components" with comprehensive feature list
  - Expanded keywords from 9 to 32 terms covering Angular 20+, reactive forms, UI components
  - Added search-optimized terms: `dropdown`, `drag-drop`, `data-table`, `modal`, `dialog`, `spinner`, `toast`
  - Better npm search visibility for Angular developers

## [1.3.9] - 2025-10-06

### Added
- **LitePanel Smart Action Disabling**: Automatic form validation-based button disabling
  - Panel actions automatically disable when embedded component form is invalid
  - Explicit `formGroup` input for ng-template forms (required for proper validation)
  - Detects `isValid()` method on dynamic component instances
  - Falls back to scanning component properties for `FormGroup` instances
  - Submit-style actions (value='submit' or primary variant) respect form validity
  - No hard-coded property names—uses Angular `FormGroup` type checking
  - Enables seamless UX for form panels without manual disabled state management

### Changed
- **LitePanel Action Disabled Logic**: Enhanced `isActionDisabled()` method
  - Now checks embedded component validity before enabling submit actions
  - **Priority order**: Explicit formGroup input → isValid() method → FormGroup scanning
  - Supports both explicit `disabled` property and dynamic form validation
  - Automatically finds and validates any `FormGroup` in component instance
  - Improved error handling with console warnings for failed validity checks
- **LitePanel Validation Check**: Fixed `shouldRespectComponentValidity()` method
  - Now correctly checks for explicit `formGroup()` input alongside component instances
  - Ensures ng-template forms with `[formGroup]` input are properly validated

### Enhanced
- **LitePanel Styling**: Improved disabled button states
  - Added opacity and background color for disabled primary actions
  - Hover states now respect disabled attribute with `:not(:disabled)` selector
  - Better visual feedback for non-interactive buttons
- **UI Sandbox**: Added template form panel example
  - Demonstrates form validation with invite user form
  - Shows proper usage with `[formGroup]` input for ng-template forms
  - Submit button correctly disabled when required fields are empty

## [1.3.8] - 2025-10-06

### Added
- Initial implementation of LitePanel smart action disabling (had validation detection issues)

### Note
- Version 1.3.8 had a bug where ng-template form validation didn't work correctly
- Fixed in 1.3.9 by ensuring `shouldRespectComponentValidity()` checks explicit formGroup input

## [1.3.6] - 2025-10-03

### Added
- **LiteTable Menu Dropdown**: Smart positioning for row action menus
  - Dropdown automatically opens upward when button is near bottom of viewport
  - Calculates available space and adjusts position dynamically
  - New `.menu-dropdown--upward` CSS modifier for upward positioning

### Changed
- **LitePanel Input Handling**: Improved support for Angular input signals
  - Changed from direct property assignment to `ComponentRef.setInput()` method
  - Now properly supports both `@Input()` decorators and modern `input()` signals
  - Fixes compatibility issues with dynamically created components using signals
- **LiteTable Menu Icon**: Replaced text-based tri-dots with SVG icon
  - Larger, more visible 20x20px SVG with 3px diameter circles
  - Uses `currentColor` for consistent theming
  - Improved accessibility and visual clarity
- **LiteTable Styling Refinements**
  - Increased data cell min-height from 36px to 40px for better touch targets
  - Removed font-size override from menu items for consistency
  - Added `lite-table` element styling for flex layout and scrolling

## [1.3.5] - 2025-10-03

### Added
- **LitePanel Component Data Extraction**: Automatic form data retrieval from dynamic components
  - Panel now checks for `getData()` method on component instances
  - Returns `{ action, data }` structure when component has data to pass
  - Enables seamless form submission from panel components

### Changed
- **LiteTable Styling**: Enhanced table layout for better scrolling and height management
  - Added flexbox layout with `height: 100%` and `flex-direction: column`
  - Table body now scrollable with `flex: 1` and `overflow-y: auto`
  - Empty state row fills available height
- **Form Label Positioning**: Adjusted floating label top position from `2px` to `0` for better alignment across all form components

## [1.3.4] - 2025-10-02

### Added
- LitePanel enhancements: support dynamic component content and input binding
  - New `contentInputs` input to pass data to dynamically loaded components
  - Expanded examples for string, template, and component content

### Changed
- Documentation cleanup and standardization
  - Removed emojis from README and docs
  - Added comprehensive LitePanel docs in `README.md` and `docs/API.md`

### Fixed
- Addressed lint warnings across library and sandbox (unused imports/vars, selector prefix)

## [1.3.3] - 2025-10-01

### Added
- **LiteLoading Component**: New loading indicator component with flexible display modes
  - View toggle between spinner (loading wheel) and progress bar
  - Spinner mode with three size variants: small, medium, large
  - Progress bar mode with defined percentage (0-100%) or indeterminate animation
  - Optional message display below the loading indicator
  - Visibility control for conditional rendering
  - Smooth CSS animations for spinner rotation and indeterminate progress
  - Accessible with ARIA attributes (role, aria-valuenow, aria-valuemin, aria-valuemax)
  - Exported via `projects/lite-form/src/public-api.ts`

### Enhanced
- **Documentation**: Updated README and API documentation with LiteLoading component
  - Complete usage examples with TypeScript and HTML
  - Configuration options for all input properties
  - Examples for spinner sizes, defined/indeterminate progress, and visibility control
- **UI Sandbox**: Added comprehensive demos in `projects/ui-sandbox/src/app/`
  - Spinner with size variants and toggle functionality
  - Defined progress bar with auto-incrementing simulation
  - Indeterminate progress bar for unknown duration operations
  - Interactive controls for testing all component features

## [1.3.2] - 2025-09-26

### Added
- LiteTable single-action button rendering for menu columns with exactly one `menuItems` entry
  - Compact inline button instead of kebab dropdown when only one action is available
  - Neutral default styling with optional `danger` variant for red (destructive) actions

### Changed
- Updated default styling for single-action buttons to be neutral (grey border/text) instead of always red
- Danger variant applies red styling when specified (`variant: 'danger'`)

## [1.3.1] - 2025-09-26

### Added
- LiteTable row actions menu (kebab/tri-dot) via `TableColumn.type = 'menu'` and `menuItems` configuration
  - New `menuAction` output on `lite-table` emitting `{ action: string; row: T }`
  - Shared SCSS for compact menu button and dropdown styling

### Changed
- Updated README (root and library) and docs/API.md to document the row menu feature and `TableColumn` updates
- Sandbox demos (`projects/ui-sandbox/src/app/app.ts`, `app.html`) wired to show per-row Edit/Delete actions
- Minor table style adjustments to reduce borders in header and cells

## [1.3.0] - 2025-09-25

### Added
- LitePanel component with configurable templates and action buttons exported via `projects/lite-form/src/public-api.ts`.
- UI sandbox demos showcasing LitePanel confirmation and information flows in `projects/ui-sandbox/src/app/app.html`.
- SCSS style guide enforcement for sandbox and library styles based on `docs/STYLEGUIDE.md`.

### Changed
- Updated TypeScript path mapping (`tsconfig.json`) so the sandbox consumes the library source during development.
- Consolidated documentation to live under `docs/`, removing duplicate root `CONTRIBUTING.md` and `CHANGELOG.md` files.

## [1.2.3] - 2025-09-23

### Added
- **LiteTable Component**: Flexible data table with custom columns and pagination
  - Flexbox-based responsive layout for modern table design
  - Custom column definitions with labels, flex sizing, and cell templates
  - Support for nested object property access (dot notation)
  - Integrated pagination with lite-paginator component
  - Custom cell templates for advanced formatting (images, status indicators, dates)
  - Automatic handling of special data formats (name objects, nested properties)
  - Empty state display when no data is available
  - Sorting indicators (visual styling support)

- **LitePaginator Component**: Standalone pagination component with full navigation
  - Previous/Next navigation buttons with disabled states
  - Numbered page buttons with active state highlighting
  - Items per page dropdown selection
  - Total items display with customizable formatting
  - Keyboard navigation support (arrow keys)
  - Responsive design that adapts to different screen sizes
  - Accessibility features with ARIA labels and screen reader support
  - Configurable page range display and navigation controls

- **TableFieldDto & PaginatorFieldDto**: New data transfer objects
  - TableFieldDto for configuring table columns, data, and pagination settings
  - PaginatorFieldDto for pagination state management (current page, total items, items per page)
  - Automatic default paginator configuration when pagination is enabled
  - Flexible column configuration with TableColumn interface (key, label, flex, sortable, cellTemplate)

### Enhanced
- **Documentation**: Comprehensive API documentation for lite-table and lite-paginator
  - Complete usage examples with TypeScript and HTML
  - Advanced cell template examples (images, dates, status indicators)
  - Styling customization guides with CSS class references
  - Configuration options and feature explanations

- **UI Sandbox**: Updated demo application with real API integration
  - Random User API integration for realistic demo data
  - Table demos showcasing basic and paginated table usage
  - Profile images, formatted dates, and nested property access examples
  - Proper error handling and change detection for async data loading

### Features
- **Flexbox Table Layout**: Modern CSS flexbox approach instead of traditional table elements
- **Real API Integration**: Demo using Random User API (randomuser.me) for authentic data
- **Custom Cell Rendering**: HTML template functions for advanced cell formatting
- **Nested Data Access**: Dot notation support for complex object structures
- **Responsive Pagination**: Adapts to container width and content
- **TypeScript Support**: Full type safety with generic table data types

## [1.1.0] - 2025-08-01

### Added
- **LitePassword Component**: Advanced password input with security features
  - Password visibility toggle with eye/eye-off icons
  - Real-time password strength indicator with visual feedback
  - Advanced validation error messages using FormUtils.getPasswordErrorMessages()
  - Pattern analysis to detect missing requirements from regex patterns
  - Password strength analysis with FormUtils.analyzePasswordStrength()
  - Accessibility features with ARIA labels for screen readers
  - Configurable toggle button and strength indicator display
  - Support for complex password validation patterns

- **LiteDate Component**: Advanced date picker with single date and date range selection
  - Single date selection with custom formatting (dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd)
  - Date range selection with dual calendar layout
  - Min/max date constraints support
  - Intelligent calendar positioning (auto-adjusts when no space below)
  - Timezone-safe date handling
  - Enhanced TODAY styling with distinctive orange theme
  - Calendar popup with click-outside-to-close functionality
  - Real-time date validation and formatting
  - Comprehensive keyboard navigation support

- **LiteRadio Component**: Accessible radio button groups
  - Fieldset/legend structure for screen reader accessibility
  - Automatic horizontal layout with proper spacing
  - Integration with SelectFieldDto for consistent API
  - Custom styling with focus indicators
  - Keyboard navigation support (arrow keys, tab, space)

- **DateRangeFieldDto**: New DTO specifically for date ranges
  - FormControl<string[]> type support for range selections
  - Consistent API with other field DTOs
  - Built-in validation support for date ranges

- **Enhanced FormUtils**: Advanced password validation and analysis
  - FormUtils.getPasswordErrorMessages() for detailed password error feedback
  - FormUtils.analyzePasswordStrength() for real-time password strength analysis
  - Pattern analysis to provide specific feedback based on regex requirements
  - Support for custom password complexity validators
  - Password strength scoring (0-8) with categorical levels (Very Weak to Strong)

### Changed
- **BREAKING**: `CheckboxFieldDto` merged into base `FieldDto`
  - Simplified checkbox usage with unified DTO structure
  - Reduced API surface area and improved consistency
  - All existing checkbox functionality preserved

- **BREAKING**: `FieldDto` type property now only supports `'text'` and `'number'`
  - Removed unused input types for better type safety
  - Cleaner API with focused functionality
  - Better TypeScript integration

- **Enhanced**: All components now properly handle `[inEdit]="true"` as default
  - Simplified template usage (no need to explicitly set inEdit)
  - Backwards compatible with explicit inEdit settings
  - Improved developer experience

### Fixed
- Calendar date selection timezone conversion issues
- Range selection clearing behavior when selecting new start date
- FormControl reactivity with computed signals
- Calendar positioning calculations for viewport boundaries
- Date formatting consistency across different locales

### Performance
- Implemented computed signals for calendar day calculations
- Optimized reactive updates with timestamp-based change detection
- Reduced unnecessary re-renders in calendar component
- Improved memory usage in date range selections

## [1.0.0] - 2025-XX-XX

### Added
- **LiteInput Component**: Text and number input fields with floating labels
- **LiteTextarea Component**: Multi-line text input with auto-resize
- **LiteSelect Component**: Dropdown selection with search and keyboard navigation
- **LiteMultiSelect Component**: Multiple selection with inline/block display modes
- **LiteCheckbox Component**: Styled checkbox with label integration

### Features
- Reactive Forms integration with FormControl support
- Floating label animations
- Built-in validation display
- Customizable styling with SCSS variables
- Keyboard navigation support
- Accessibility features (ARIA labels, screen reader support)
- TypeScript support with comprehensive type definitions

### DTOs
- `FieldDto`: Base field configuration
- `SelectFieldDto`: Single selection configuration  
- `MultiSelectFieldDto`: Multiple selection configuration
- `CheckboxFieldDto`: Checkbox configuration

### Documentation
- Comprehensive API documentation
- Usage examples and best practices
- Migration guides from other libraries
- Styling customization guide
- Accessibility guidelines

## [Unreleased]

### Planned Features
- Date range picker enhancements (preset ranges, custom date formats)
- File upload component
- Rich text editor component
- Form builder with drag-and-drop interface
- Advanced validation library integration
- Internationalization (i18n) support
- Theme presets (Material Design, Bootstrap, etc.)
- Component library expansion (sliders, switches, rating components)

---

### Legend
- **Added**: New features
- **Changed**: Changes in existing functionality  
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
- **Performance**: Performance improvements
