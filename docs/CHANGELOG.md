# Changelog

All notable changes to the LiteForm project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
