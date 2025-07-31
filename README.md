# Lite Form - Angular Form Components Library

## Overview
Lite Form is a modern Angular library that provides lightweight, customizable form components with built-in validation, styling, and animations. It includes input, textarea, select, and multi-select components designed for Angular 17+ with standalone component support.

## Features
- ✅ **Modern Angular 17+** - Built with standalone components and signals
- ✅ **TypeScript Support** - Fully typed with generic support
- ✅ **Reactive Forms** - Integrated with Angular Reactive Forms
- ✅ **Built-in Validation** - Form validation with error messages
- ✅ **Customizable Styling** - SCSS-based styling system
- ✅ **Accessibility** - ARIA-compliant form controls
- ✅ **Animations** - Smooth transitions and interactions

## Components

### 🎯 LiteInput
Basic text input component with floating labels and validation.

### 📝 LiteTextarea  
Multi-line text input with auto-resize capabilities.

### 📋 LiteSelect
Single-selection dropdown with search and filtering.

### ☑️ LiteMultiSelect
Multi-selection dropdown with inline selected items display and dynamic height adjustment.

### 🔘 LiteRadio
Radio button group component for single selection from multiple options.

### ✅ LiteCheckbox
Checkbox component for boolean input with validation support.

### 📅 LiteDate
Advanced date picker component with single date and date range selection, custom formatting, and intelligent calendar positioning.

---

## Installation

```bash
npm install lite-form
```

## Quick Start

### 1. Import the Module

```typescript
import { LiteFormModule } from 'lite-form';

@Component({
  standalone: true,
  imports: [LiteFormModule],
  // ...
})
export class YourComponent {
  // ...
}
```

### 2. Create Form Controls

```typescript
import { FormControl } from '@angular/forms';
import { FieldDto, SelectFieldDto, MultiSelectFieldDto, RadioFieldDto, DateRangeFieldDto } from 'lite-form';

export class YourComponent {
  // Basic input
  nameField = new FieldDto('Full Name', new FormControl(''));
  
  // Number input
  ageField = new FieldDto('Age', new FormControl(0), 2, 'number');
  
  // Textarea
  descriptionField = new FieldDto('Description', new FormControl(''), 4);
  
  // Checkbox (using basic FieldDto for boolean)
  agreeField = new FieldDto('I agree to terms', new FormControl<boolean>(false, { nonNullable: true }));
  
  // Select dropdown
  countryField = new SelectFieldDto(
    'Country',
    new FormControl(''),
    ['USA', 'Canada', 'Mexico'],
    (option) => option
  );
  
  // Multi-select
  skillsField = new MultiSelectFieldDto(
    'Skills',
    new FormControl<string[]>([]),
    ['JavaScript', 'TypeScript', 'Angular', 'React'],
    (option) => option
  );
  
  // Radio group
  planField = new RadioFieldDto(
    'Choose Plan',
    new FormControl(''),
    ['Basic', 'Premium', 'Enterprise'],
    (option) => option
  );
  
  // Single date
  birthdateField: FieldDto = {
    label: 'Birth Date',
    formControl: new FormControl<string>('', { nonNullable: true })
  };
  
  // Date range
  eventDateField: DateRangeFieldDto = {
    label: 'Event Date Range',
    formControl: new FormControl<string[]>(['', ''], { nonNullable: true })
  };
}
```

### 3. Use in Templates

```html
<form>
  <lite-input [control]="nameField"></lite-input>
  <lite-textarea [control]="descriptionField"></lite-textarea>
  <lite-checkbox [control]="agreeField"></lite-checkbox>
  <lite-select [control]="countryField"></lite-select>
  <lite-multi-select [control]="skillsField"></lite-multi-select>
  <lite-radio [control]="planField"></lite-radio>
  <lite-date [control]="birthdateField"></lite-date>
  <lite-date [control]="eventDateField" [range]="true" [format]="'dd/MM/yyyy'"></lite-date>
</form>
```
---

## Component Documentation

### LiteInput Component

**Selector:** `lite-input`

**Inputs:**
- `control: FieldDto` - Field configuration and form control
- `inEdit: boolean` - Whether the field is in edit mode (default: true)

**Example:**
```typescript
// Component
nameField = new FieldDto('Full Name', new FormControl('', [Validators.required]));

// Template
<lite-input [control]="nameField"></lite-input>
```

### LiteTextarea Component

**Selector:** `lite-textarea`

**Inputs:**
- `control: FieldDto` - Field configuration and form control (supports `rows` property)
- `inEdit: boolean` - Whether the field is in edit mode (default: true)

**Example:**
```typescript
// Component
// With validation
descriptionField = new FieldDto('Description', new FormControl(''), 4);

// Template
<lite-textarea [control]="descriptionField"></lite-textarea>
```

### LiteSelect Component

**Selector:** `lite-select`

**Inputs:**
- `control: SelectFieldDto<T>` - Select field configuration with options
- `inEdit: boolean` - Whether the field is in edit mode (default: true)

**Example:**
```typescript
// Component
statusField = new SelectFieldDto(
  'Status',
  new FormControl(''),
  [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' }
  ],
  (option) => option.name
);

// Template
<lite-select [control]="statusField"></lite-select>
```

### LiteMultiSelect Component

**Selector:** `lite-multi-select`

**Inputs:**
- `control: MultiSelectFieldDto<T>` - Multi-select field configuration
- `inEdit: boolean` - Whether the field is in edit mode (default: true)

**Features:**
- Inline selected items display
- Dynamic height adjustment
- Filtering/search functionality
- Individual item removal

**Example:**
```typescript
// Component
tagsField = new MultiSelectFieldDto(
  'Tags',
  new FormControl<string[]>([]),
  ['Frontend', 'Backend', 'DevOps', 'Testing'],
  (option) => option
);

// Template
<lite-multi-select [control]="tagsField"></lite-multi-select>
```

### LiteDate Component

**Selector:** `lite-date`

**Inputs:**
- `control: FieldDto | DateRangeFieldDto` - Date field configuration
- `inEdit: boolean` - Whether the field is in edit mode (default: true)
- `format: string` - Date display format (default: 'dd/MM/yyyy')
- `range: boolean` - Enable date range selection (default: false)

**Features:**
- Single date and date range selection
- Custom date formatting (dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd)
- Intelligent calendar positioning (auto-adjusts based on screen space)
- Dual calendar display for range selection
- Visual range highlighting with different styles for start, end, and in-between dates
- Manual input parsing with format validation
- Timezone-safe date handling
- Today's date highlighting with distinctive styling
- Auto-close calendar after range selection

**Single Date Example:**
```typescript
// Component
birthdateField: FieldDto = {
  label: 'Birth Date',
  formControl: new FormControl<string>('', { 
    nonNullable: true, 
    validators: [Validators.required] 
  })
};

// Template
<lite-date [control]="birthdateField" [format]="'dd/MM/yyyy'"></lite-date>
```

**Date Range Example:**
```typescript
// Component
import { DateRangeFieldDto } from 'lite-form';

eventDateField: DateRangeFieldDto = {
  label: 'Event Date Range',
  formControl: new FormControl<string[]>(['', ''], { nonNullable: true })
};

// Template
<lite-date [control]="eventDateField" [range]="true" [format]="'dd/MM/yyyy'"></lite-date>
```

**Range Selection Behavior:**
- First click: Sets start date, clears any existing range
- Second click: Sets end date, completes range selection
- Clicking same date twice: Resets to single start date
- Auto-orders dates (earlier date becomes start, later becomes end)
- Calendar auto-closes 1 second after completing range selection

---

## Data Transfer Objects (DTOs)

### FieldDto
Basic field configuration for input and textarea components.

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number; // For textarea only
}
```

### BaseSelectFieldDto<T>
Abstract base class for select components.

```typescript
abstract class BaseSelectFieldDto<T> {
  label: string;
  options: T[];
  displayWith: (option: T) => string;
}
```

### SelectFieldDto<T>
Single-selection dropdown configuration.

```typescript
class SelectFieldDto<T> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T>;
}
```

### MultiSelectFieldDto<T>
Multi-selection dropdown configuration.

```typescript
class MultiSelectFieldDto<T> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T[]>;
}
```

### DateRangeFieldDto
Date range selection configuration.

```typescript
interface DateRangeFieldDto extends Omit<FieldDto, 'formControl'> {
  formControl: FormControl<string[]>;
}
```

---

## Validation

All components support Angular Reactive Forms validation:

```typescript
import { Validators } from '@angular/forms';

// Required field
emailField = new FieldDto(
  'Email',
  new FormControl('', [Validators.required, Validators.email])
);

// Custom validation
passwordField = new FieldDto(
  'Password',
  new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.customPasswordValidator
  ])
);
```

Error messages are automatically displayed below invalid fields.

---

## Styling and Customization

### Default Styling
The library includes pre-built SCSS styles that provide:
- Floating label animations
- Focus states and transitions
- Error styling
- Responsive design

### Custom Styling
Override the default styles by importing and customizing the SCSS:

```scss
@import 'lite-form/src/lib/lite-styles.scss';

// Override variables
.lite-input.in-edit {
  input:focus {
    border-color: #your-brand-color;
    box-shadow: 0 0 5px rgba(your-brand-color, 0.5);
  }
}
```

---

## Development

### Project Structure

```
projects/lite-form/            # Library source
├── src/lib/
│   ├── lite-input/           # Input component
│   ├── lite-textarea/        # Textarea component  
│   ├── lite-select/          # Select component
│   ├── lite-multi-select/    # Multi-select component
│   ├── lite-radio/           # Radio button component
│   ├── lite-checkbox/        # Checkbox component
│   ├── lite-date/            # Date picker component
│   ├── field-dto.ts          # Data transfer objects
│   ├── form-utils.ts         # Utility functions
│   ├── lite-styles.scss      # Shared styles
│   └── lite-form.module.ts   # Module definition
└── public-api.ts            # Public exports

projects/ui-sandbox/          # Demo application
├── src/app/
│   ├── app.html             # Component demos
│   ├── app.ts               # Demo logic
│   └── app.scss             # Demo styles
```

### Building the Library

```bash
# Build the library
ng build lite-form

# Build with watch mode
ng build lite-form --watch

# Run the demo application
ng serve ui-sandbox
```

### Running Tests

```bash
# Unit tests
ng test lite-form

# E2E tests  
ng e2e ui-sandbox
```

---

## API Reference

### FormUtils
Utility class providing helper methods for form validation:

```typescript
class FormUtils {
  static isRequired(control: FormControl): boolean
  static hasErrors(control: FormControl): boolean  
  static getErrorMessages(control: FormControl, fieldLabel: string): string[]
}
```

### Component Methods

#### LiteMultiSelect
- `hasSelection(): boolean` - Check if any items are selected
- `getSelectedCount(): number` - Get number of selected items
- `getSelectedItems(): T[]` - Get array of selected items
- `removeSelectedItem(item: T): void` - Remove specific selected item

---

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Changelog

### v1.0.0
- Initial release with input, textarea, select, and multi-select components
- TypeScript support with generic DTOs
- Built-in validation and error handling
- Responsive SCSS styling
- Angular 17+ standalone component support

## SCSS Style Guide
See [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) for conventions on writing compact, maintainable SCSS.
