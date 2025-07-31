# Changelog

All notable changes to the LiteForm project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-XX

### Added
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

## [1.0.0] - 2023-XX-XX

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
