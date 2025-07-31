# Contributing to LiteForm

Thank you for your interest in contributing to LiteForm! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Component Development](#component-development)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (v17 or higher)
- Git

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/lite-form.git
   cd lite-form
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Development Setup

### Project Structure

```
lite-form/
├── projects/
│   ├── lite-form/                 # Main library
│   │   ├── src/
│   │   │   ├── lib/              # Component implementations
│   │   │   └── public-api.ts     # Public exports
│   │   └── package.json
│   └── ui-sandbox/               # Testing application
│       └── src/
│           └── app/              # Demo components
├── docs/                         # Documentation
├── scripts/                      # Build and utility scripts
└── package.json                  # Root configuration
```

### Build Commands

- `npm start` - Start development server with ui-sandbox
- `npm run build` - Build the library
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run linting
- `npm run build:lib` - Build library only

## Contributing Guidelines

### Issue Reporting

Before creating an issue, please:

1. Search existing issues to avoid duplicates
2. Use the appropriate issue template
3. Provide clear reproduction steps
4. Include environment information (Angular version, browser, etc.)

### Feature Requests

When requesting features:

1. Explain the use case and problem being solved
2. Provide examples of desired API/usage
3. Consider backwards compatibility
4. Discuss implementation approach if possible

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes following our coding standards
3. Add tests for new functionality
4. Update documentation as needed
5. Ensure all tests pass
6. Submit a pull request with clear description

## Component Development

### Creating New Components

When adding new components, follow these guidelines:

#### 1. Component Structure

```typescript
@Component({
  selector: 'lite-{component-name}',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './{component-name}.html',
  styleUrls: ['./{component-name}.scss', '../lite-styles.scss']
})
export class Lite{ComponentName}Component {
  @Input() control!: FieldDto | SelectFieldDto | DateRangeFieldDto;
  @Input() inEdit: boolean = true;
  
  // Component implementation
}
```

#### 2. DTO Integration

Ensure your component works with appropriate DTOs:

```typescript
// For simple inputs
FieldDto

// For selections
SelectFieldDto

// For multiple selections  
MultiSelectFieldDto

// For date ranges
DateRangeFieldDto
```

#### 3. Accessibility Requirements

All components must include:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

#### 4. Styling Guidelines

Follow our SCSS structure:

```scss
.lite-{component} {
  &.in-edit {
    // Edit mode styles
    
    .label {
      // Label styles
    }
    
    input, select, textarea {
      // Input styles
    }
    
    &.error {
      // Error state styles
    }
  }
  
  &.display {
    // Display mode styles
  }
}
```

### Styling Standards

- Use space-saving format (properties on same line when short)
- Follow existing color scheme and spacing
- Ensure responsive design
- Test across different browsers
- Use CSS custom properties for theming

### Performance Considerations

- Use computed signals for expensive calculations
- Implement OnPush change detection when appropriate
- Minimize DOM manipulations
- Use trackBy functions for ngFor loops
- Consider lazy loading for heavy components

## Testing

### Unit Tests

All components require comprehensive unit tests:

```typescript
describe('Lite{Component}Component', () => {
  let component: Lite{Component}Component;
  let fixture: ComponentFixture<Lite{Component}Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Lite{Component}Component]
    });
    fixture = TestBed.createComponent(Lite{Component}Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form control updates', () => {
    // Test FormControl integration
  });

  it('should validate accessibility', () => {
    // Test ARIA attributes, keyboard navigation
  });
});
```

### Test Coverage Requirements

- Minimum 90% code coverage
- Test all user interactions
- Test error conditions
- Test accessibility features
- Test integration with FormControl

### Integration Tests

Test components within the ui-sandbox application to ensure real-world functionality.

## Documentation

### Code Documentation

- Use JSDoc for public APIs
- Include examples in component documentation
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes

### API Documentation

Update the following files when adding features:

- `docs/API.md` - Component APIs and interfaces
- `docs/EXAMPLES.md` - Usage examples
- `docs/README.md` - Overview and quick start
- `docs/MIGRATION.md` - Breaking changes and migration paths

### Example Format

```typescript
/**
 * A date picker component supporting single dates and date ranges
 * 
 * @example
 * ```typescript
 * // Single date
 * dateField = new FieldDto('Event Date', new FormControl(''));
 * ```
 * 
 * @example  
 * ```html
 * <lite-date [control]="dateField" format="dd/MM/yyyy"></lite-date>
 * ```
 */
@Component({...})
export class LiteDateComponent {
  /**
   * The field configuration and FormControl
   */
  @Input() control!: FieldDto | DateRangeFieldDto;
  
  /**
   * Date format for display (dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd)
   * @default 'dd/MM/yyyy'
   */
  @Input() format: string = 'dd/MM/yyyy';
}
```

## Submitting Changes

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
- `feat(date): add range selection support`
- `fix(select): resolve keyboard navigation issue`
- `docs(api): update component documentation`

### Pull Request Process

1. Update documentation for any public API changes
2. Add tests for new functionality
3. Ensure all existing tests pass
4. Update CHANGELOG.md with your changes
5. Request review from maintainers
6. Address review feedback promptly

### Release Process

1. Update version numbers in package.json files
2. Update CHANGELOG.md with release notes
3. Create release tag
4. Publish to npm registry
5. Update GitHub releases

## Getting Help

- Check existing documentation in the `docs/` folder
- Review existing components for patterns and examples
- Ask questions in GitHub Discussions
- Join our community chat (if available)
- Contact maintainers for guidance on complex contributions

## Recognition

Contributors will be recognized in:
- CHANGELOG.md for significant contributions
- README.md contributors section
- GitHub contributors graph
- Release notes for major contributions

Thank you for contributing to LiteForm!
