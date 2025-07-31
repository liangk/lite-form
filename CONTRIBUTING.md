# Contributing to LiteForm

Thank you for your interest in contributing to LiteForm! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- Git
- Code editor (VS Code recommended)

### First-time Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/lite-form.git
   cd lite-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify setup**
   ```bash
   # Build the library
   ng build lite-form
   
   # Run the demo app
   ng serve ui-sandbox
   
   # Run tests
   ng test lite-form
   ```

## Development Setup

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "angular.ng-template",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Configuration

Create a `.env` file in the root directory:

```bash
# Development settings
NODE_ENV=development
ANGULAR_CLI_ANALYTICS=false
```

## Project Structure

```
lite-form/
├── projects/
│   ├── lite-form/                 # Main library
│   │   ├── src/lib/
│   │   │   ├── lite-input/        # Input component
│   │   │   ├── lite-textarea/     # Textarea component
│   │   │   ├── lite-select/       # Select component
│   │   │   ├── lite-multi-select/ # Multi-select component
│   │   │   ├── field-dto.ts       # Data transfer objects
│   │   │   ├── form-utils.ts      # Utility functions
│   │   │   └── lite-styles.scss   # Shared styles
│   │   └── public-api.ts          # Public exports
│   └── ui-sandbox/                # Demo application
│       └── src/app/
├── docs/                          # Documentation
├── scripts/                       # Build scripts
└── dist/                          # Build output
```

### Key Files

- **Component Files**: Each component has `.ts`, `.html`, and imports from `lite-styles.scss`
- **DTOs**: Type-safe data transfer objects in `field-dto.ts`
- **Utils**: Helper functions in `form-utils.ts`
- **Styles**: Shared SCSS in `lite-styles.scss`
- **Module**: Main module definition in `lite-form.module.ts`

## Development Workflow

### Branch Strategy

We use a simplified Git Flow:

- `main` - Production ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Feature development
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Starting New Work

1. **Create a feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our standards
   - Add/update tests
   - Update documentation

3. **Test your changes**
   ```bash
   # Run unit tests
   ng test lite-form
   
   # Build library
   ng build lite-form
   
   # Test in sandbox
   ng serve ui-sandbox
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new multi-select feature"
   ```

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(multi-select): add inline selected items display
fix(input): resolve floating label animation issue
docs: update API documentation for SelectFieldDto
style(scss): improve button hover animations
refactor(utils): simplify error message generation
test(select): add keyboard navigation tests
chore: update dependencies to latest versions
```

## Coding Standards

### TypeScript Guidelines

1. **Use strict type checking**
   ```typescript
   // Good
   interface User {
     id: number;
     name: string;
   }
   
   const users: User[] = [];
   
   // Avoid
   const users: any[] = [];
   ```

2. **Prefer interfaces over types for object shapes**
   ```typescript
   // Good
   interface SelectOption {
     value: string;
     label: string;
   }
   
   // Use type for unions/primitives
   type Status = 'loading' | 'success' | 'error';
   ```

3. **Use generics for reusable components**
   ```typescript
   class SelectFieldDto<T> {
     constructor(
       public label: string,
       public formControl: FormControl<T>,
       public options: T[],
       public displayWith: (option: T) => string
     ) {}
   }
   ```

### Angular Guidelines

1. **Use OnPush change detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Prefer standalone components**
   ```typescript
   @Component({
     standalone: true,
     imports: [CommonModule, ReactiveFormsModule]
   })
   ```

3. **Use signal inputs when possible**
   ```typescript
   export class MyComponent {
     control = input.required<FieldDto>();
     inEdit = input<boolean>(true);
   }
   ```

### SCSS Guidelines

1. **Use the established naming convention**
   ```scss
   .lite-component {
     &.in-edit {
       .element {
         &:hover {
           // styles
         }
       }
     }
   }
   ```

2. **Keep styles scoped and modular**
   ```scss
   // Component-specific styles only
   .lite-input {
     // All input-related styles here
   }
   ```

3. **Use variables for common values**
   ```scss
   $primary-color: #007bff;
   $border-radius: 4px;
   $transition-duration: 0.2s;
   ```

## Testing

### Unit Testing

We use Jasmine and Karma for unit testing:

```typescript
describe('LiteInput', () => {
  let component: LiteInput;
  let fixture: ComponentFixture<LiteInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LiteInput],
    });
    fixture = TestBed.createComponent(LiteInput);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when invalid', () => {
    // Test implementation
  });
});
```

### Test Guidelines

1. **Test behavior, not implementation**
2. **Use descriptive test names**
3. **Test edge cases and error conditions**
4. **Mock external dependencies**
5. **Maintain good test coverage (>80%)**

### Running Tests

```bash
# Run all tests
ng test lite-form

# Run tests with coverage
ng test lite-form --code-coverage

# Run tests in watch mode
ng test lite-form --watch

# Run specific test file
ng test lite-form --include="**/lite-input.spec.ts"
```

## Documentation

### Code Documentation

1. **Use JSDoc for public APIs**
   ```typescript
   /**
    * Creates a new field DTO for form controls
    * @param label Display label for the field
    * @param formControl Angular FormControl instance
    * @param rows Number of rows for textarea (optional)
    */
   constructor(label: string, formControl: FormControl, rows?: number) {
     // implementation
   }
   ```

2. **Add comments for complex logic**
   ```typescript
   // Calculate dynamic height based on selected items
   // Uses DOM measurement for accurate sizing
   private updateContainerHeight(): void {
     // implementation
   }
   ```

### Updating Documentation

When making changes, update relevant documentation:

- **API changes**: Update `docs/API.md`
- **New features**: Add examples to `docs/EXAMPLES.md`
- **Breaking changes**: Update `docs/MIGRATION.md`
- **README**: Update if adding new components

## Pull Request Process

### Before Creating a PR

1. **Ensure tests pass**
   ```bash
   ng test lite-form --watch=false
   ```

2. **Build successfully**
   ```bash
   ng build lite-form
   ```

3. **Update documentation**
4. **Follow commit message conventions**

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Use descriptive title
   - Fill out PR template
   - Link related issues
   - Add screenshots for UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing completed
   - [ ] No console errors

   ## Screenshots
   (if applicable)

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] Tests added/updated
   ```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Manual testing** for UI changes
4. **Documentation review**
5. **Final approval** and merge

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features (backward compatible)
- **PATCH** (1.1.1): Bug fixes (backward compatible)

### Release Steps

1. **Update version numbers**
   ```bash
   # Update package.json versions
   npm version minor
   ```

2. **Update CHANGELOG.md**
   - Add new version section
   - List all changes
   - Update links

3. **Create release branch**
   ```bash
   git checkout -b release/v1.1.0
   ```

4. **Final testing**
   ```bash
   ng build lite-form
   ng test lite-form --watch=false
   ```

5. **Merge to main**
   ```bash
   git checkout main
   git merge release/v1.1.0
   git tag v1.1.0
   git push origin main --tags
   ```

6. **Publish to npm**
   ```bash
   cd dist/lite-form
   npm publish
   ```

## Common Development Tasks

### Adding a New Component

1. **Generate component**
   ```bash
   ng generate component lite-new-component --project=lite-form
   ```

2. **Update public API**
   ```typescript
   // projects/lite-form/src/public-api.ts
   export * from './lib/lite-new-component/lite-new-component';
   ```

3. **Add to module**
   ```typescript
   // lite-form.module.ts
   import { LiteNewComponent } from './lite-new-component/lite-new-component';
   
   @NgModule({
     exports: [
       // existing components...
       LiteNewComponent
     ]
   })
   ```

4. **Add to sandbox**
   ```typescript
   // ui-sandbox/src/app/app.ts
   import { LiteNewComponent } from 'lite-form';
   ```

### Debugging Tips

1. **Use Angular DevTools** browser extension
2. **Check console** for errors and warnings
3. **Use debugger** statements for complex logic
4. **Test in isolation** with sandbox app
5. **Verify types** with TypeScript compiler

### Performance Optimization

1. **Use OnPush change detection**
2. **Implement trackBy functions** for ngFor
3. **Avoid creating objects in templates**
4. **Use async pipe** for observables
5. **Monitor bundle size** with webpack-bundle-analyzer

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community discussion
- **Email**: [maintainers@lite-form.dev](mailto:maintainers@lite-form.dev)

### Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Testing Angular](https://angular.io/guide/testing)

## Recognition

Contributors will be recognized in:

- **CONTRIBUTORS.md** file
- **GitHub contributors** section
- **Release notes** for significant contributions
- **Documentation** for major features

Thank you for contributing to LiteForm! 🎉
