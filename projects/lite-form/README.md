# LiteForm Angular Library

A modern, lightweight Angular form components library with TypeScript support, built-in validation, and responsive design.

## Features

- 🎯 **Input Component** - Text input with floating labels
- 📝 **Textarea Component** - Multi-line text input
- 📋 **Select Component** - Single-selection dropdown with filtering
- ☑️ **Multi-Select Component** - Multi-selection with inline display
- 🔘 **Radio Component** - Radio button groups for single selection
- ✅ **Checkbox Component** - Boolean input with validation support
- 📅 **Date Picker Component** - Advanced date selection with custom formatting
- 📎 **File Upload Component** - Drag & drop, camera capture, file management
- 🕒 **DateTime Picker Component** - Combined date & time selection
- 🔧 **TypeScript Support** - Fully typed with generics
- ✅ **Form Validation** - Integrated Angular Reactive Forms validation
- 🎨 **Customizable Styling** - SCSS-based theming system
- 📱 **Responsive Design** - Mobile-friendly components
- 🏗️ **Standalone Components** - Modern Angular architecture

## Installation

```bash
npm install ngx-lite-form
```

## Quick Usage

```typescript
import { LiteInput, LiteSelect, LiteCheckbox } from 'ngx-lite-form';
import { FormControl, Validators } from '@angular/forms';

import { FieldDto, SelectFieldDto } from 'ngx-lite-form';

@Component({
  standalone: true,
  imports: [LiteInput, LiteSelect, LiteCheckbox],
  template: `
  <lite-input [control]="nameField"></lite-input>
  <lite-select [control]="statusField"></lite-select>
  <lite-checkbox [control]="agreeField"></lite-checkbox>
  `
})
export class MyFormComponent {
  nameField = new FieldDto('Name', new FormControl('', [Validators.required]));
  agreeField = new FieldDto('I agree to terms', new FormControl<boolean>(false, { nonNullable: true }));

  statusField = new SelectFieldDto(
    'Status',
    new FormControl(''),
    ['Active', 'Inactive'],
    (option) => option
  );
}
```

## Components

### LiteInput
Basic text input with floating label animation and validation display.

```typescript
import { LiteInput, FieldDto } from 'ngx-lite-form';

nameField = new FieldDto('Full Name', new FormControl('', [Validators.required]));
```

### LiteTextarea
Multi-line text input that supports configurable rows.

```typescript
import { LiteTextarea, FieldDto } from 'ngx-lite-form';

descriptionField = new FieldDto('Description', new FormControl(''), 4);
```

### LitePassword
Password input with strength indicator, toggle visibility, and advanced validation.

```typescript
import { LitePassword, FieldDto } from 'ngx-lite-form';

passwordField = new FieldDto('Password', new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]));
```

### LiteSelect
Single-selection dropdown with search/filtering functionality.

```typescript
import { LiteSelect, SelectFieldDto } from 'ngx-lite-form';

statusField = new SelectFieldDto(
  'Status',
  new FormControl(''),
  ['Active', 'Inactive', 'Pending'],
  (option) => option
);
```

### LiteMultiSelect
Multi-selection dropdown with inline selected items display and dynamic height adjustment.

```typescript
import { LiteMultiSelect, MultiSelectFieldDto } from 'ngx-lite-form';

skillsField = new MultiSelectFieldDto(
  'Skills',
  new FormControl<string[]>([]),
  ['JavaScript', 'TypeScript', 'Angular'],
  (option) => option
);
```

### LiteRadio
Radio button group component for single selection from multiple options.

```typescript
import { LiteRadio, RadioFieldDto } from 'ngx-lite-form';

priorityField = new RadioFieldDto(
  'Priority',
  new FormControl('', [Validators.required]),
  ['Low', 'Medium', 'High'],
  (option) => option
);
```

### LiteCheckbox
Checkbox component for boolean input with validation support.

```typescript
import { LiteCheckbox, FieldDto } from 'ngx-lite-form';

agreeField = new FieldDto('I agree to terms', new FormControl<boolean>(false, {
  nonNullable: true,
  validators: [Validators.requiredTrue]
}));
```

### LiteDate
Advanced date picker component with single date and date range selection, custom formatting, and intelligent calendar positioning.

```typescript
import { LiteDate, FieldDto } from 'ngx-lite-form';

birthDateField = new FieldDto('Birth Date', new FormControl(''));
```

### LiteDateTime
Date & time picker component for selecting both date and time, with custom formatting and time granularity.

```typescript
import { LiteDateTime, FieldDto } from 'ngx-lite-form';

eventDateTimeField = new FieldDto('Event Date & Time', new FormControl(''));
```

### LiteFile
File upload component with drag & drop, badge, file management panel, and camera capture support.

```typescript
import { LiteFile, FileFieldDto } from 'ngx-lite-form';

fileField = new FileFieldDto(
  'Upload Files',
  new FormControl([]),
  true, // multiple
  'image/*,application/pdf', // accept
  5 * 1024 * 1024, // maxFileSize (5MB)
  5, // maxFiles
  true // showPreview
);
```

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

### RadioFieldDto<T>
```typescript
class RadioFieldDto<T> {
  label: string;
  formControl: FormControl<T>;
  options: T[];
  displayWith: (option: T) => string;
}
```

### FileFieldDto
```typescript
class FileFieldDto {
  label: string;
  formControl: FormControl;
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  maxFiles?: number;
  showPreview?: boolean;
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
ng test ui-sandbox
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
