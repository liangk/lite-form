# LiteForm Angular Library

A modern, lightweight Angular form components library with TypeScript support, built-in validation, and responsive design.

## Features

- 🎯 **Input Component** - Text input with floating labels
- 📝 **Textarea Component** - Multi-line text input  
- 📋 **Select Component** - Single-selection dropdown with filtering
- ☑️ **Multi-Select Component** - Multi-selection with inline display
- 🔧 **TypeScript Support** - Fully typed with generics
- ✅ **Form Validation** - Integrated Angular Reactive Forms validation
- 🎨 **Customizable Styling** - SCSS-based theming system
- 📱 **Responsive Design** - Mobile-friendly components

## Installation

```bash
npm install lite-form
```

## Quick Usage

```typescript
import { LiteFormModule } from 'lite-form';
import { FormControl } from '@angular/forms';
import { FieldDto, SelectFieldDto, MultiSelectFieldDto } from 'lite-form';

@Component({
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <lite-input [control]="nameField"></lite-input>
    <lite-select [control]="statusField"></lite-select>
    <lite-multi-select [control]="skillsField"></lite-multi-select>
  `
})
export class MyFormComponent {
  nameField = new FieldDto('Name', new FormControl(''));
  
  statusField = new SelectFieldDto(
    'Status',
    new FormControl(''),
    ['Active', 'Inactive'],
    (option) => option
  );
  
  skillsField = new MultiSelectFieldDto(
    'Skills',
    new FormControl<string[]>([]),
    ['JavaScript', 'TypeScript', 'Angular'],
    (option) => option
  );
}
```

## Components

### LiteInput
Basic text input with floating label animation and validation display.

### LiteTextarea
Multi-line text input that supports configurable rows.

### LiteSelect
Single-selection dropdown with:
- Search/filtering functionality
- Custom display formatting
- Keyboard navigation

### LiteMultiSelect
Multi-selection dropdown with:
- Inline selected items display
- Dynamic height adjustment
- Individual item removal
- Filtering capabilities

## Data Transfer Objects

### FieldDto
```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number; // For textarea
}
```

### SelectFieldDto<T>
```typescript
class SelectFieldDto<T> {
  label: string;
  formControl: FormControl<T>;
  options: T[];
  displayWith: (option: T) => string;
}
```

### MultiSelectFieldDto<T>
```typescript
class MultiSelectFieldDto<T> {
  label: string;
  formControl: FormControl<T[]>;
  options: T[];
  displayWith: (option: T) => string;
}
```

## Validation

All components support Angular Reactive Forms validators:

```typescript
import { Validators } from '@angular/forms';

const emailField = new FieldDto(
  'Email',
  new FormControl('', [Validators.required, Validators.email])
);
```

Error messages are automatically displayed below invalid fields.

## Styling

The library includes comprehensive SCSS styling. To customize:

```scss
// Override default styles
.lite-input.in-edit input:focus {
  border-color: #your-brand-color;
  box-shadow: 0 0 5px rgba(your-brand-color, 0.5);
}
```

## Development

### Building the Library
```bash
ng build lite-form
```

### Publishing
```bash
cd dist/lite-form
npm publish
```

### Running Tests
```bash
ng test lite-form
```

## Browser Support
- Angular 17+
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License
MIT License

---

For complete documentation and examples, visit the [main repository](https://github.com/liangk/lite-form).

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
