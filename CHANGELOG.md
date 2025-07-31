# Changelog

All notable changes to the LiteForm project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite
- API reference documentation
- Migration guide from other form libraries
- Examples and usage patterns
- TypeScript support improvements

## [1.0.0] - 2025-01-31

### Added
- **LiteInput Component** - Text input with floating labels and validation
- **LiteTextarea Component** - Multi-line text input with configurable rows
- **LiteSelect Component** - Single-selection dropdown with filtering
- **LiteMultiSelect Component** - Multi-selection dropdown with advanced features:
  - Inline selected items display as chips
  - Dynamic height adjustment based on content
  - Individual item removal with × buttons
  - Real-time filtering/search functionality
  - Smooth animations and transitions
- **Type-Safe DTOs**:
  - `FieldDto` for basic input/textarea fields
  - `BaseSelectFieldDto` abstract base class
  - `SelectFieldDto<T>` for single selection with generics
  - `MultiSelectFieldDto<T>` for multi-selection with generics
- **FormUtils Utility Class**:
  - `isRequired()` - Check if field has required validator
  - `hasErrors()` - Check for validation errors
  - `getErrorMessages()` - Generate user-friendly error messages
- **Comprehensive SCSS Styling**:
  - Floating label animations
  - Focus states and transitions
  - Error styling with visual feedback
  - Responsive design
  - Customizable theme variables
- **Built-in Validation Support**:
  - Integration with Angular Reactive Forms
  - Automatic error message generation
  - Support for all standard validators
  - Custom validator support
- **Accessibility Features**:
  - ARIA labels and descriptions
  - Keyboard navigation support
  - Screen reader compatibility
- **Modern Angular Support**:
  - Angular 17+ standalone components
  - Signal-based inputs
  - OnPush change detection strategy
  - Tree-shakeable for optimal bundle size

### Technical Features
- **Zero Dependencies** - No external dependencies except Angular
- **Small Bundle Size** - ~50KB minified
- **TypeScript First** - Full type safety with generics
- **Performance Optimized** - Efficient change detection and DOM updates
- **Memory Safe** - No memory leaks in event handling

### Components Architecture

#### LiteInput
- Floating label animation
- Built-in validation display
- Focus/blur state management
- Error state styling

#### LiteTextarea
- Configurable row height
- Auto-resize capabilities
- Same validation features as LiteInput

#### LiteSelect
- Dropdown with search/filter functionality
- Keyboard navigation (Arrow keys, Enter, Escape)
- Custom display formatting with `displayWith` function
- Click outside to close
- Loading state support

#### LiteMultiSelect (Advanced Features)
- **Inline Selected Items**: Selected options displayed as removable chips within the input area
- **Dynamic Height Calculation**: Container automatically adjusts height based on selected items using DOM measurement
- **Real-time Filtering**: Type to filter available options while maintaining selection
- **Individual Removal**: Remove selected items with × button without opening dropdown
- **Performance Optimized**: Cached height calculations with change detection optimization
- **Accessibility**: Full keyboard support and screen reader compatibility

### Styling System
- **SCSS-based**: Modular, customizable styling
- **CSS Variables**: Easy theming and customization
- **Responsive**: Mobile-first design approach
- **Animation**: Smooth transitions and micro-interactions
- **Theme Support**: Easy to override with custom brand colors

### Developer Experience
- **IntelliSense Support**: Full TypeScript autocompletion
- **Clear Error Messages**: Helpful validation feedback
- **Consistent API**: Uniform interface across all components
- **Documentation**: Comprehensive docs with examples
- **Migration Tools**: Helpers for migrating from other libraries

## [0.1.1] - 2024-12-15

### Added
- Initial project setup
- Basic component structure
- LiteInput and LiteTextarea components
- Basic SCSS styling
- Angular CLI configuration

### Fixed
- Build configuration issues
- Module export structure

## [0.1.0] - 2024-12-01

### Added
- Initial project creation
- Angular workspace setup
- Basic documentation structure
- MIT License

---

## Migration Notes

### From v0.x to v1.0.0

This is a major release with breaking changes. Please see the [Migration Guide](./docs/MIGRATION.md) for detailed upgrade instructions.

**Key Breaking Changes:**
- Component input names changed from `[field]` to `[control]`
- DTO class names updated (e.g., `InputFieldDto` → `FieldDto`)
- Module imports consolidated into single `LiteFormModule`
- Property names changed from `editMode` to `inEdit`

**Benefits of Upgrading:**
- Much smaller bundle size
- Better TypeScript support
- Improved performance
- New multi-select component
- Enhanced validation system

### From Angular Material

LiteForm provides similar functionality to Angular Material Form Fields but with:
- 90% smaller bundle size
- No dependency on Angular CDK
- Custom styling system (not Material Design)
- Simpler API with DTO-based approach
- Better performance with OnPush change detection

See [Migration Guide](./docs/MIGRATION.md) for step-by-step migration instructions.

---

## Security

### Reporting Security Issues

Please report security vulnerabilities to [security@lite-form.dev](mailto:security@lite-form.dev).

### Security Considerations

- **XSS Prevention**: All user inputs are properly sanitized
- **Content Security Policy**: Compatible with strict CSP
- **No External Dependencies**: Reduces security surface area
- **Type Safety**: TypeScript prevents many runtime errors

---

## Performance

### Bundle Size Analysis

| Component | Size (gzipped) |
|-----------|----------------|
| LiteInput | ~8KB |
| LiteTextarea | ~8KB |
| LiteSelect | ~15KB |
| LiteMultiSelect | ~20KB |
| **Total Library** | **~50KB** |

### Runtime Performance

- **Change Detection**: OnPush strategy for optimal performance
- **DOM Updates**: Minimal reflows and repaints
- **Memory Usage**: No memory leaks, proper cleanup
- **Rendering**: Efficient virtual scrolling for large option lists

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Angular Version Compatibility

| Angular Version | LiteForm Version |
|----------------|------------------|
| 17.x | 1.0.0+ |
| 18.x | 1.0.0+ |
| 19.x | 1.0.0+ |
| 20.x | 1.0.0+ |

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone repository
git clone https://github.com/liangk/lite-form.git
cd lite-form

# Install dependencies
npm install

# Start development server
ng serve ui-sandbox

# Build library
ng build lite-form

# Run tests
ng test lite-form
```

### Contributor Guidelines

- Follow Angular style guide
- Write unit tests for new features
- Update documentation for API changes
- Follow semantic versioning for releases
- Use conventional commits for commit messages

---

## Acknowledgments

- Angular team for the excellent framework
- Community contributors and feedback
- Beta testers who helped refine the API
- Open source projects that inspired LiteForm's design

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Links

- **Documentation**: [GitHub Pages](https://liangk.github.io/lite-form)
- **NPM Package**: [lite-form](https://www.npmjs.com/package/lite-form)
- **GitHub Repository**: [liangk/lite-form](https://github.com/liangk/lite-form)
- **Issues**: [GitHub Issues](https://github.com/liangk/lite-form/issues)
- **Discussions**: [GitHub Discussions](https://github.com/liangk/lite-form/discussions)
