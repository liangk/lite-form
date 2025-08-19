# LiteForm Angular Library

A modern, lightweight Angular form components library with TypeScript support, built-in validation, and responsive design.


## Features

- 🎯 **Input Component** - Text input with floating labels
- 📝 **Textarea Component** - Multi-line text input
- 📋 **Select Component** - Single-selection dropdown with filtering
- ☑️ **Multi-Select Component** - Multi-selection with inline display
- 🔘 **Radio Component** - Radio button groups for single selection
- ✅ **Checkbox Component** - Boolean input with validation support
- 📎 **File Upload Component** - Drag & drop, camera capture, file management
- � **DateTime Picker Component** - Combined date & time selection
- �🔧 **TypeScript Support** - Fully typed with generics
- ✅ **Form Validation** - Integrated Angular Reactive Forms validation
- 🎨 **Customizable Styling** - SCSS-based theming system
- 📱 **Responsive Design** - Mobile-friendly components

## Installation

```bash
npm install ngx-lite-form
```

## Quick Usage

```typescript
import { LiteFormModule } from 'ngx-lite-form';
import { FormControl, Validators } from '@angular/forms';

import { FieldDto, SelectFieldDto, MultiSelectFieldDto, RadioFieldDto, FileFieldDto } from 'ngx-lite-form';

@Component({
  standalone: true,
  imports: [LiteFormModule],
  template: `
  <lite-input [control]="nameField"></lite-input>
  <lite-textarea [control]="descriptionField"></lite-textarea>
  <lite-checkbox [control]="agreeField"></lite-checkbox>
  <lite-select [control]="statusField"></lite-select>
  <lite-multi-select [control]="skillsField"></lite-multi-select>
  <lite-radio [control]="priorityField"></lite-radio>
  <lite-file [control]="fileField"></lite-file>
  <lite-datetime [control]="datetimeField"></lite-datetime>
  `
})
export class MyFormComponent {
  nameField = new FieldDto('Name', new FormControl(''));
  descriptionField = new FieldDto('Description', new FormControl(''), 4);
  agreeField = new FieldDto('I agree to terms', new FormControl<boolean>(false, { nonNullable: true }));
  
  statusField = new SelectFieldDto(
    'Status',
    new FormControl(''),
    ['Active', 'Inactive'],
    (option) => option
  );
  
  priorityField = new RadioFieldDto(
    'Priority',
    new FormControl('', [Validators.required]),
    ['Low', 'Medium', 'High'],
    (option) => option
  );
  
  skillsField = new MultiSelectFieldDto(
    'Skills',
    new FormControl<string[]>([]),
    ['JavaScript', 'TypeScript', 'Angular'],
    (option) => option
  );
  fileField = new FileFieldDto('Attachments', new FormControl([]), {
    multiple: true,
    accept: 'image/*,application/pdf',
    maxFileSize: 5 * 1024 * 1024,
    maxFiles: 5,
    showPreview: true
  });
  datetimeField = new FieldDto('Event Date & Time', new FormControl(''));
### LiteDateTime
Date & time picker component for selecting both date and time, with custom formatting and time granularity.

**Features:**
- Combined date and time selection in a single popup
- Customizable date/time format (e.g., 'yyyy-MM-dd HH:mm')
- Keyboard and mouse navigation
- Time selection with hour and minute granularity
- Validation and error display
- Responsive and accessible

**Example:**
```typescript
import { FieldDto } from 'ngx-lite-form';
datetimeField = new FieldDto('Event Date & Time', new FormControl(''));
```
```html
<lite-datetime [control]="datetimeField" format="yyyy-MM-dd HH:mm"></lite-datetime>
```
}
### LiteFile
File upload component with drag & drop, badge, file management panel, and camera capture support.

**Features:**
- File upload via button, drag & drop, or camera capture (on supported devices)
- Badge shows file count
- File management panel with upload area and action buttons
- Camera capture on devices with a camera
- Validation: max files, max file size, file type restrictions
- Image preview for image files
- Progress tracking for uploads
- Accessibility: keyboard and screen reader friendly

**Example:**
```typescript
import { FileFieldDto } from 'ngx-lite-form';
fileField = new FileFieldDto('Upload Files', new FormControl([]));
```
```html
<lite-file [control]="fileField"></lite-file>
```

### FileFieldDto
File field configuration for the LiteFile component.

```typescript
class FileFieldDto {
  label: string;
  formControl: FormControl;
  multiple?: boolean; // Allow multiple file selection (default: true)
  accept?: string; // Accepted file types (default: '*/*')
  maxFileSize?: number; // Maximum file size in bytes (default: 10MB)
  maxFiles?: number; // Maximum number of files allowed (default: 10)
  showPreview?: boolean; // Show image previews (default: true)
}
```
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
ng build ngx-lite-form
```

### Publishing
```bash
cd dist/lite-form
npm publish
```

### Running Tests
```bash
ng test ngx-lite-form
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
