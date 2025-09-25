# Lite Form - Angular Form Components Library

## Overview
Lite Form is a comprehensive Angular library that provides lightweight, customizable form components with built-in validation, styling, and animations. It includes input, password, textarea, select, multi-select, radio, checkbox, file upload, advanced date picker, datetime-picker, and panel components designed for Angular 20+ with standalone component support.

## Features
- ✅ **Modern Angular 20+** - Built with standalone components, signals, and latest CLI tooling
- ✅ **TypeScript Support** - Fully typed with generic support and DTO helpers
- ✅ **Reactive Forms** - Integrated with Angular Reactive Forms
- ✅ **Built-in Validation** - Form validation with error messages and utilities
- ✅ **Password Security** - Advanced password validation and strength analysis
- ✅ **Date Handling** - Single date and date range selection with custom formatting
- ✅ **File Upload** - Drag & drop file upload with camera capture and file management
- ✅ **Panels & Dialogs** - Template-driven modal panels with configurable action buttons
- ✅ **Data Tables** - Flexible table component with custom columns, sorting, and pagination
- ✅ **Pagination** - Standalone pagination component with customizable navigation
- ✅ **Customizable Styling** - Space-saving SCSS style guide for consistent overrides
- ✅ **Accessibility** - ARIA-compliant form controls
- ✅ **Animations** - Smooth transitions and interactions

## Components

### 🎯 LiteInput
Basic text input component with floating labels and validation.

### 🔐 LitePassword
Password input component with toggle visibility, strength indicator, and advanced validation features.

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

### 📎 LiteFile
File upload component with drag & drop, badge, file management panel, and camera capture support.

### 📅 LiteDateTime
Date and time picker with timezone-safe handling and consistent formatting utilities.

### 📊 LiteTable
Flexible data table component with custom columns, cell templates, nested property access, and integrated pagination.

### 📄 LitePaginator
Standalone pagination component with customizable page navigation, items per page selection, and total item display.

### 🪟 LitePanel
Modal-style panel component that renders custom templates, configurable header text, and action buttons via `LitePanelAction` definitions. Supports custom `width`, `height`, `maxWidth`, and `maxHeight` inputs with automatic `px` suffix for numeric values.

---

## Installation

```bash
npm install ngx-lite-form
```

## Quick Start

### 1. Import Components

```typescript
import {
  LiteInput,
  LitePassword,
  LiteTextarea,
  LiteSelect,
  LiteMultiSelect,
  LiteRadio,
  LiteCheckbox,
  LiteDate,
  LiteDateTime,
  LiteFile,
  LiteTable,
  LitePaginator,
  LitePanel
} from 'ngx-lite-form';
import { FormControl, Validators } from '@angular/forms';

import {
  FieldDto,
  SelectFieldDto,
  MultiSelectFieldDto,
  RadioFieldDto,
  DateRangeFieldDto,
  FileFieldDto,
  TableFieldDto,
  PaginatorFieldDto,
  LitePanelAction
} from 'ngx-lite-form';

@Component({
  standalone: true,
  imports: [
    LiteInput,
    LitePassword,
    LiteTextarea,
    LiteSelect,
    LiteMultiSelect,
    LiteRadio,
    LiteCheckbox,
    LiteDate,
    LiteDateTime,
    LiteFile,
    LiteTable,
    LitePaginator
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Basic input
  nameField = new FieldDto('Full Name', new FormControl(''));
  
  // Number input
  ageField = new FieldDto('Age', new FormControl(0), 2, 'number');
  
  // Password with validation
  passwordField = new FieldDto('Password', new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ]));
  
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
  
  // File upload
  fileField = new FileFieldDto('Attachments', new FormControl([]), {
    multiple: true,
    accept: 'image/*,application/pdf',
    maxFileSize: 5 * 1024 * 1024,
    maxFiles: 5,
    showPreview: true
  });

  // Table with custom columns
  employeeTable = new TableFieldDto(
    [
      { key: 'name', label: 'Name', flex: '1' },
      { key: 'department', label: 'Department', flex: '0 0 150px' },
      { key: 'salary', label: 'Salary', flex: '0 0 120px', cellTemplate: (value) => `$${value?.toLocaleString() || '0'}` }
    ],
    [
      { name: 'John Smith', department: 'Engineering', salary: 75000 },
      { name: 'Sarah Johnson', department: 'Marketing', salary: 65000 }
    ]
  );

  // Paginated table
  userTable = new TableFieldDto(
    [
      { key: 'name', label: 'Name', flex: '1' },
      { key: 'email', label: 'Email', flex: '1' },
      { key: 'location.country', label: 'Country', flex: '0 0 120px' }
    ],
    [], // Will be populated by API
    true, // Enable pagination
    new PaginatorFieldDto(1, 100, 10) // Page 1, 100 total items, 10 per page
  );

  // Standalone paginator
  paginator = new PaginatorFieldDto(1, 500, 25);

  // Panel demo state
  basicPanelOpen = signal(false);
  panelResult = signal<unknown | null>(null);
  confirmationActions: LitePanelAction[] = [
    { label: 'Confirm', value: 'confirm', variant: 'danger' },
    { label: 'Cancel', value: null, variant: 'secondary' }
  ];

  openPanel() {
    this.panelResult.set(null);
    this.basicPanelOpen.set(true);
  }

  onPanelClosed(result: unknown | null) {
    this.panelResult.set(result);
    this.basicPanelOpen.set(false);
  }
}
```

### 3. Use in Templates

```html
<form>
  <lite-input [control]="nameField"></lite-input>
  <lite-password [control]="passwordField" [showStrengthIndicator]="true"></lite-password>
  <lite-textarea [control]="descriptionField"></lite-textarea>
  <lite-checkbox [control]="agreeField"></lite-checkbox>
  <lite-select [control]="countryField"></lite-select>
  <lite-multi-select [control]="skillsField"></lite-multi-select>
  <lite-radio [control]="planField"></lite-radio>
  <lite-date [control]="birthdateField"></lite-date>
  <lite-date [control]="eventDateField" [range]="true" [format]="'dd/MM/yyyy'"></lite-date>
  <lite-file [control]="fileField"></lite-file>
</form>

<!-- Data Table -->
<lite-table [table]="employeeTable"></lite-table>

<!-- Paginated Table -->
<lite-table
  [table]="userTable"
  (pageChange)="onPageChange($event)"
  (itemsPerPageChange)="onItemsPerPageChange($event)">
</lite-table>

<!-- Standalone Paginator -->
<lite-paginator
  [paginator]="paginator"
  (pageChange)="onPaginatorPageChange($event)"
  (itemsPerPageChange)="onPaginatorItemsChange($event)">
</lite-paginator>

<!-- Lite Panel -->
<button type="button" (click)="openPanel()">Open Panel</button>

@if (basicPanelOpen()) {
  <lite-panel
    [title]="'Review details'"
    [content]="panelTemplate"
    [actions]="confirmationActions"
    (closed)="onPanelClosed($event)">
  </lite-panel>
}

<ng-template #panelTemplate let-close="close">
  <p>Panel content can render any Angular template.</p>
  <button type="button" (click)="close('acknowledged')">Acknowledge</button>
</ng-template>
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

### LitePassword Component

**Selector:** `lite-password`

**Inputs:**
- `control: FieldDto` - Field configuration and form control
- `inEdit: boolean` - Whether the field is in edit mode (default: true)
- `showToggle: boolean` - Whether to show the password visibility toggle (default: true)
- `showStrengthIndicator: boolean` - Whether to show password strength indicator (default: false)

**Features:**
- Password visibility toggle with eye/eye-off icons
- Real-time password strength analysis
- Advanced password validation error messages
- Support for complex password patterns
- Accessibility features (ARIA labels)

**Example:**
```typescript
// Basic password
passwordField = new FieldDto('Password', new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]));

// Advanced password with pattern validation
strongPasswordField = new FieldDto('Strong Password', new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
]));

// Template
<lite-password [control]="passwordField"></lite-password>
<lite-password [control]="strongPasswordField" [showStrengthIndicator]="true"></lite-password>
<lite-password [control]="confirmPasswordField" [showToggle]="false"></lite-password>
```

**Password Strength Analysis:**
```typescript
import { FormUtils } from 'ngx-lite-form';

// Analyze password strength programmatically
const analysis = FormUtils.analyzePasswordStrength('MyStr0ng@Pass');
// Returns: { score: 6, level: 'Good', feedback: ['Consider using 12+ characters'] }
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
import { DateRangeFieldDto } from 'ngx-lite-form';

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

### LiteFile Component

**Selector:** `lite-file`

**Inputs:**
- `control: FileFieldDto` - File field configuration including label, FormControl, and file options
- `inEdit: boolean` - Whether the field is in edit mode (default: true)

**Features:**
- File upload via button, drag & drop, or camera capture (on supported devices)
- Always-visible badge shows file count
- Management panel lists files, upload area, and action buttons
- Camera capture on devices with a camera using `<input type="file" accept="image/*" capture="environment">`
- Validation: max files, max file size, file type restrictions
- Image preview with thumbnails for image files
- Progress tracking for file uploads
- Accessibility: keyboard and screen reader friendly

**Example:**
```typescript
// Component
import { FileFieldDto } from 'ngx-lite-form';

// Basic file upload
fileField = new FileFieldDto('Upload Files', new FormControl([]));

// Image upload with restrictions
imageField = new FileFieldDto(
  'Profile Picture',
  new FormControl([]),
  false, // single file only
  'image/*', // images only
  2 * 1024 * 1024, // 2MB limit
  1, // max 1 file
  true // show preview
);

// Template
<lite-file [control]="fileField"></lite-file>
<lite-file [control]="imageField"></lite-file>
```

**Camera Capture:**
- The "Take Picture" button opens the device camera using a hidden file input with `accept="image/*" capture="environment"`
- Works on mobile devices and laptops with a camera
- On desktops without a camera, the button will do nothing or fall back to file selection
- No special permissions required, but the browser may prompt for camera access

**File Management Panel:**
- Click the file icon button to open the management panel
- Drag & drop files or click the upload area to select files
- Use action buttons to upload files, take a picture, or close the panel
- Remove files individually or clear all files

### LiteTable Component

**Selector:** `lite-table`

**Inputs:**
- `table: TableFieldDto<T>` - Table configuration including columns and data

**Outputs:**
- `pageChange: number` - Emitted when user changes page (for paginated tables)
- `itemsPerPageChange: number` - Emitted when user changes items per page

**Features:**
- Flexbox-based responsive layout for modern table design
- Custom column definitions with labels, flex sizing, and cell templates
- Support for nested object property access (dot notation)
- Integrated pagination with lite-paginator component
- Custom cell templates for advanced formatting (images, status indicators, dates)
- Automatic handling of special data formats (name objects, nested properties)
- Empty state display when no data is available
- Sorting indicators (visual styling support)

**Example:**
```typescript
// Component
import { TableFieldDto, TableColumn } from 'ngx-lite-form';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const columns: TableColumn[] = [
  { key: 'id', label: 'ID', flex: '0 0 80px' },
  { key: 'name', label: 'Product Name', flex: '2' },
  { key: 'price', label: 'Price', flex: '0 0 100px', cellTemplate: (value) => `$${value?.toFixed(2)}` },
  { key: 'category', label: 'Category', flex: '1' },
  { key: 'inStock', label: 'Status', flex: '0 0 100px', cellTemplate: (value) => value ? '✓ In Stock' : '✗ Out of Stock' }
];

productTable = new TableFieldDto(columns, productData, false);

// Template
<lite-table [table]="productTable"></lite-table>
```

### LitePaginator Component

**Selector:** `lite-paginator`

**Inputs:**
- `paginator: PaginatorFieldDto` - Pagination configuration including current page, total items, and items per page

**Outputs:**
- `pageChange: number` - Emitted when user changes page
- `itemsPerPageChange: number` - Emitted when user changes items per page

**Features:**
- Previous/Next navigation buttons with disabled states
- Numbered page buttons with active state highlighting
- Items per page dropdown selection
- Total items display with customizable formatting
- Keyboard navigation support (arrow keys)
- Responsive design that adapts to different screen sizes
- Accessibility features with ARIA labels and screen reader support
- Configurable page range display and navigation controls

**Example:**
```typescript
// Component
import { PaginatorFieldDto } from 'ngx-lite-form';

paginator = new PaginatorFieldDto(1, 500, 25); // Page 1, 500 total items, 25 per page

// Template
<lite-paginator
  [paginator]="paginator"
  (pageChange)="onPageChange($event)"
  (itemsPerPageChange)="onItemsPerPageChange($event)">
</lite-paginator>
```

## Snackbar Service

The library provides a simple snackbar notification service for showing messages at the top of the page. No component or template is needed.

### Usage

Inject the service and call `show()` with your message and type:

```typescript
import { LiteSnackbarService } from 'ngx-lite-form';

constructor(private snackbar: LiteSnackbarService) {}

// Show a success message
this.snackbar.show('Operation completed!', 'done');

// Show a warning
this.snackbar.show('Please check your input.', 'warn');

// Show an error (with custom duration)
this.snackbar.show('Something went wrong.', 'error', 5000);
```

- Types: `'done' | 'warn' | 'error'`
- Duration: Optional, in milliseconds (default: 3000)

The snackbar will appear at the top of the page and auto-dismiss.

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

### TableFieldDto<T>
Table configuration for the LiteTable component.

```typescript
class TableFieldDto<T = any> {
  columns: TableColumn[];
  data: T[];
  showPaginator?: boolean;
  paginatorConfig: PaginatorFieldDto;
}

interface TableColumn {
  key: string;              // Data property key (supports dot notation)
  label: string;            // Column header text
  flex?: string;            // CSS flex property (e.g., '0 0 100px', '1')
  sortable?: boolean;       // Show sorting indicator
  cellTemplate?: (value: any, row: any) => string; // Custom HTML template
}
```

### PaginatorFieldDto
Pagination configuration for table and standalone pagination components.

```typescript
class PaginatorFieldDto {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
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
- Follow the compact SCSS conventions described in [docs/STYLEGUIDE.md](https://github.com/liangk/lite-form/blob/main/docs/STYLEGUIDE.md).
- Components expose BEM-style class names for targeted overrides.
- Import `lite-styles.scss` to leverage shared design tokens and mixins.

---

## Development
Project layout at a glance:

```
lite-form/
├── projects/lite-form/       # Library source and public API
├── projects/ui-sandbox/      # Demo application showcasing components
├── docs/                     # Documentation, guides, and changelog
└── scripts/                  # Build and publishing utilities
```

For the full contributor guide and extended structure diagram, see [docs/CONTRIBUTING.md](https://github.com/liangk/lite-form/blob/main/docs/CONTRIBUTING.md).
## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/liangk/lite-form/blob/main/LICENSE) file for details.

---

## Changelog
- See [docs/CHANGELOG.md](https://github.com/liangk/lite-form/blob/main/docs/CHANGELOG.md) for the full historical record, including the latest `v1.3.0` release with `LitePanel` and SCSS style-guide updates.
