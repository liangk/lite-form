# Lite Form: A Lightweight and Powerful Angular Form Library

**Lite Form is a comprehensive, open-source library of 13+ standalone components for building modern, reactive forms in Angular (v20+). It provides lightweight, customizable, and fully-typed form controls—from basic inputs to advanced data tables and loading indicators—designed to accelerate development and improve user experience.**

This library is built for developers who need a robust, out-of-the-box solution for form-heavy applications without the overhead of heavy-weight dependencies. All components are standalone, tree-shakable, and integrate seamlessly with Angular's Reactive Forms module.

## Why Choose Lite Form?

- **Accelerate Development**: Get a complete suite of form controls ready to use, including complex components like date pickers, file uploads, and data tables. Drastically reduce boilerplate code.
- **Lightweight & Performant**: Built with modern Angular practices. All components are standalone and tree-shakable, ensuring a minimal bundle size.
- **Fully Typed & Integrated**: Enjoy excellent developer experience with fully-typed APIs for all components and Data Transfer Objects (DTOs), ensuring type safety and easier integration.
- **Highly Customizable**: While providing a clean default UI, the library is designed for easy styling. A clear SCSS structure and BEM-style classes allow for deep customization to match your brand.
- **Secure & Accessible**: Components are built with security and accessibility (ARIA) in mind, including advanced password strength analysis and accessible form field structures.

## Live Demo

Experience Lite Form in action with our interactive live demo on StackBlitz. Test out all the components and see how they work in a real Angular application.

[**Launch Live Demo on StackBlitz**](https://stackblitz.com/~/github.com/liangk/lite-form)


## Use Cases

Lite Form is ideal for a wide range of applications, including but not limited to:

- **Enterprise Applications**: Build complex forms for data entry, configuration, and management with robust validation.
- **Dashboards and Admin Panels**: Quickly create settings pages, user management forms, and data tables.
- **Customer-Facing Websites**: Implement user-friendly registration, login, and profile forms.
- **E-commerce**: Develop streamlined checkout processes and product configuration forms.
- **Internal Tools**: Rapidly prototype and build internal tools for data collection and management.

## Features
- **Modern Angular 20+** - Built with standalone components, signals, and latest CLI tooling
- **TypeScript Support** - Fully typed with generic support and DTO helpers
- **Reactive Forms** - Integrated with Angular Reactive Forms
- **Built-in Validation** - Form validation with error messages and utilities
- **Password Security** - Advanced password validation and strength analysis
- **Date Handling** - Single date and date range selection with custom formatting
- **File Upload** - Drag & drop file upload with camera capture and file management
- **Panels & Dialogs** - Modal panels supporting string, template, or component content with configurable action buttons
- **Data Tables** - Flexible table component with custom columns, sorting, and pagination
- **Pagination** - Standalone pagination component with customizable navigation
- **Loading Indicators** - Spinner and progress bar components with defined/indeterminate states
- **Customizable Styling** - Space-saving SCSS style guide for consistent overrides
- **Accessibility** - ARIA-compliant form controls
- **Animations** - Smooth transitions and interactions

## Components

### LiteInput
Basic text input component with floating labels and validation.

### LitePassword
Password input component with toggle visibility, strength indicator, and advanced validation features.

### LiteTextarea  
Multi-line text input with auto-resize capabilities.

### LiteSelect
Single-selection dropdown with search and filtering.

### LiteMultiSelect
Multi-selection dropdown with inline selected items display and dynamic height adjustment.

### LiteRadio
Radio button group component for single selection from multiple options.

### LiteCheckbox
Checkbox component for boolean input with validation support.

### LiteDate
Advanced date picker component with single date and date range selection, custom formatting, and intelligent calendar positioning.

### LiteFile
File upload component with drag & drop, badge, file management panel, and camera capture support.

### LiteDateTime
Date and time picker with timezone-safe handling and consistent formatting utilities.

### LiteTable
Flexible data table component with custom columns, cell templates, nested property access, and integrated pagination.

### LitePaginator
Standalone pagination component with customizable page navigation, items per page selection, and total item display.

### LitePanel
Modal-style panel component that renders string content, Angular templates, or dynamic components. Supports configurable header text and action buttons via `LitePanelAction` definitions. Accepts custom `width`, `height`, `maxWidth`, and `maxHeight` inputs with automatic `px` suffix for numeric values.

### LiteLoading
Loading indicator component with view toggle for spinner (loading wheel) or progress bar modes. Supports defined progress percentage (0-100) or indeterminate animation, optional message display, and configurable spinner sizes (small, medium, large).

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
  LitePanel,
  LiteLoading
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
    LitePaginator,
    LiteLoading
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

<!-- Loading Indicators -->
<!-- Spinner (default) -->
<lite-loading [message]="'Loading data...'"></lite-loading>

<!-- Spinner with size -->
<lite-loading [size]="'large'" [message]="'Processing...'"></lite-loading>

<!-- Progress bar with defined percentage -->
<lite-loading 
  [view]="'progress'" 
  [progress]="75" 
  [message]="'Uploading files...'"></lite-loading>

<!-- Indeterminate progress bar -->
<lite-loading 
  [view]="'progress'" 
  [message]="'Processing your request...'"></lite-loading>

<!-- Controlled visibility -->
<lite-loading [visible]="isLoading" [message]="'Please wait...'"></lite-loading>
```
---

## Component Documentation

### LiteInput Component

**Selector:** `lite-input`

| Input    | Type        | Default | Description                               |
| :------- | :---------- | :------ | :---------------------------------------- |
| `control`| `FieldDto`  | -       | Field configuration and form control.     |
| `inEdit` | `boolean`   | `true`  | Toggles between edit and read-only mode. |

**Example:**
```typescript
// Component
nameField = new FieldDto('Full Name', new FormControl('', [Validators.required]));

// Template
<lite-input [control]="nameField"></lite-input>
```

### LitePassword Component

**Selector:** `lite-password`

| Input                   | Type      | Default | Description                                            |
| :---------------------- | :-------- | :------ | :----------------------------------------------------- |
| `control`               | `FieldDto`| -       | Field configuration and form control.                  |
| `inEdit`                | `boolean` | `true`  | Toggles between edit and read-only mode.               |
| `showToggle`            | `boolean` | `true`  | If `true`, shows the password visibility toggle button.  |
| `showStrengthIndicator` | `boolean` | `false` | If `true`, shows the password strength analysis bar.   |

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

| Input     | Type       | Default | Description                                                   |
| :-------- | :--------- | :------ | :------------------------------------------------------------ |
| `control` | `FieldDto` | -       | Field configuration, including `rows` for initial height.     |
| `inEdit`  | `boolean`  | `true`  | Toggles between edit and read-only mode.                      |

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

| Input     | Type                | Default | Description                                      |
| :-------- | :------------------ | :------ | :----------------------------------------------- |
| `control` | `SelectFieldDto<T>` | -       | Field configuration, including `options`.        |
| `inEdit`  | `boolean`           | `true`  | Toggles between edit and read-only mode.         |

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

| Input     | Type                     | Default | Description                                      |
| :-------- | :----------------------- | :------ | :----------------------------------------------- |
| `control` | `MultiSelectFieldDto<T>` | -       | Field configuration, including `options`.        |
| `inEdit`  | `boolean`                | `true`  | Toggles between edit and read-only mode.         |

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

| Input     | Type                          | Default        | Description                                      |
| :-------- | :---------------------------- | :------------- | :----------------------------------------------- |
| `control` | `FieldDto` or `DateRangeFieldDto` | -              | Field configuration for single or range date.    |
| `inEdit`  | `boolean`                     | `true`         | Toggles between edit and read-only mode.         |
| `format`  | `string`                      | `'dd/MM/yyyy'` | Date display format string.                      |
| `range`   | `boolean`                     | `false`        | If `true`, enables date range selection mode.    |

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

| Input     | Type           | Default | Description                                      |
| :-------- | :------------- | :------ | :----------------------------------------------- |
| `control` | `FileFieldDto` | -       | Field configuration for file uploads.            |
| `inEdit`  | `boolean`      | `true`  | Toggles between edit and read-only mode.         |

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

| Input   | Type                | Default | Description                                      |
| :------ | :------------------ | :------ | :----------------------------------------------- |
| `table` | `TableFieldDto<T>`  | -       | Table configuration including columns and data.  |

| Output               | Type                             | Description                                            |
| :------------------- | :------------------------------- | :----------------------------------------------------- |
| `pageChange`         | `number`                         | Emitted with the new page number on page change.       |
| `itemsPerPageChange` | `number`                         | Emitted with the new items-per-page count.             |
| `menuAction`         | `{ action: string; row: T }`     | Emitted when a row action is selected from a menu.     |

**Features:**
- Flexbox-based responsive layout for modern table design
- Custom column definitions with labels, flex sizing, and cell templates
- Support for nested object property access (dot notation)
- Integrated pagination with lite-paginator component
- Custom cell templates for advanced formatting (images, status indicators, dates)
- Automatic handling of special data formats (name objects, nested properties)
- Empty state display when no data is available
- Sorting indicators (visual styling support)
- Per-row actions menu via a dedicated `menu`-type column (kebab/tri-dot)

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

#### Row Actions Menu

Add a dedicated menu column to show a kebab (tri-dot) button per row. Configure menu items on the column and handle the `(menuAction)` output.

```typescript
import { TableFieldDto, TableColumn } from 'ngx-lite-form';

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', flex: '1' },
  { key: 'email', label: 'Email', flex: '1' },
  // Menu column (last column)
  {
    key: 'actions',
    label: '',
    flex: '0 0 44px',
    type: 'menu',
    menuItems: [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete', variant: 'danger' }
    ]
  }
];

table = new TableFieldDto(columns, userData, false);

// In your component class
onRowMenuAction(event: { action: string; row: any }) {
  if (event.action === 'edit') {
    // handle edit
  } else if (event.action === 'delete') {
    // handle delete
  }
}
```

```html
<lite-table [table]="table" (menuAction)="onRowMenuAction($event)"></lite-table>
```

### LitePanel Component

**Selector:** `lite-panel`

| Input | Type | Default | Description |
| :---- | :--- | :------ | :---------- |
| `title` | `string \| null` | `null` | Panel header title text |
| `content` | `string \| TemplateRef \| Type<any> \| null` | `null` | Content to display: string, template, or component |
| `contentInputs` | `Record<string, any> \| null` | `null` | Inputs to pass to dynamic component content |
| `actions` | `LitePanelAction[] \| null` | `null` | Action buttons (defaults to single OK button) |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking backdrop closes the panel |
| `width` | `string \| number \| null` | `null` | Panel width (numeric values get px suffix) |
| `height` | `string \| number \| null` | `null` | Panel height (numeric values get px suffix) |
| `maxWidth` | `string \| number \| null` | `null` | Maximum panel width |
| `maxHeight` | `string \| number \| null` | `null` | Maximum panel height |

| Output | Type | Description |
| :----- | :--- | :---------- |
| `closed` | `unknown \| null` | Emitted when panel closes with action value or null |

**Features:**
- Three content types: string, Angular template, or dynamic component
- Configurable action buttons with variants (primary, secondary, danger)
- Customizable dimensions with automatic px suffix for numbers
- Backdrop click to close (configurable)
- Close button in header
- Component content with input binding support
- Accessible with ARIA attributes

**String Content Example:**
```typescript
panelOpen = signal(false);

openPanel() {
  this.panelOpen.set(true);
}

onPanelClosed(result: unknown | null) {
  this.panelOpen.set(false);
}
```

```html
@if (panelOpen()) {
  <lite-panel
    [title]="'Information'"
    [content]="'This is simple text content.'"
    (closed)="onPanelClosed($event)">
  </lite-panel>
}
```

**Template Content Example:**
```typescript
panelActions: LitePanelAction[] = [
  { label: 'Confirm', value: 'confirm', variant: 'primary' },
  { label: 'Cancel', value: null, variant: 'secondary' }
];
```

```html
@if (panelOpen()) {
  <lite-panel
    [title]="'Confirmation'"
    [content]="confirmTemplate"
    [actions]="panelActions"
    width="500px"
    (closed)="onPanelClosed($event)">
  </lite-panel>
}

<ng-template #confirmTemplate let-close="close">
  <p>Are you sure you want to proceed?</p>
  <button (click)="close('custom-value')">Custom Action</button>
</ng-template>
```

**Component Content Example:**
```typescript
import { Component, Type } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteInput, FieldDto } from 'ngx-lite-form';

// Create a standalone component for panel content
@Component({
  selector: 'user-form',
  standalone: true,
  imports: [LiteInput],
  template: `
    <div class="form-content">
      <p>Fill out the form below:</p>
      <lite-input [control]="nameField"></lite-input>
      <lite-input [control]="emailField"></lite-input>
    </div>
  `
})
export class UserFormComponent {
  nameField = new FieldDto('Name', new FormControl('', [Validators.required]));
  emailField = new FieldDto('Email', new FormControl('', [Validators.required, Validators.email]));
}

// In your main component
userFormComponent: Type<any> = UserFormComponent;
panelActions: LitePanelAction[] = [
  { label: 'Submit', value: 'submit', variant: 'primary' },
  { label: 'Cancel', value: null, variant: 'secondary' }
];
```

```html
@if (panelOpen()) {
  <lite-panel
    [title]="'User Registration'"
    [content]="userFormComponent"
    [actions]="panelActions"
    width="600px"
    maxHeight="80vh"
    (closed)="onPanelClosed($event)">
  </lite-panel>
}
```

**Passing Inputs to Component Content:**
```typescript
// Component with inputs
@Component({...})
export class DataViewComponent {
  @Input() userId!: number;
  @Input() mode!: string;
}

// Usage
componentInputs = { userId: 123, mode: 'edit' };
```

```html
<lite-panel
  [content]="dataViewComponent"
  [contentInputs]="componentInputs"
  (closed)="onPanelClosed($event)">
</lite-panel>
```

### LiteLoading Component

**Selector:** `lite-loading`

| Input      | Type                            | Default     | Description                                                  |
| :--------- | :------------------------------ | :---------- | :----------------------------------------------------------- |
| `view`     | `'spinner' \| 'progress'`       | `'spinner'` | The view type: spinner for loading wheel, progress for bar. |
| `progress` | `number \| undefined`           | `undefined` | Progress percentage (0-100). Undefined shows indeterminate.  |
| `message`  | `string \| undefined`           | `undefined` | Optional message to display below the indicator.             |
| `size`     | `'small' \| 'medium' \| 'large'`| `'medium'`  | Size of the spinner (only applies to spinner view).          |
| `visible`  | `boolean`                       | `true`      | Whether the loading indicator is visible.                    |

**Features:**
- View toggle between spinner (loading wheel) and progress bar
- Defined progress with percentage display (0-100%)
- Indeterminate progress with animated sliding bar
- Three spinner sizes: small, medium, large
- Optional message display below indicator
- Visibility control for conditional rendering
- Smooth animations and transitions
- Accessible with ARIA attributes

**Example:**
```typescript
// Component
import { signal } from '@angular/core';

isLoading = signal(true);
uploadProgress = signal(0);

// Simulate progress
startUpload() {
  this.uploadProgress.set(0);
  const interval = setInterval(() => {
    const current = this.uploadProgress();
    if (current >= 100) {
      clearInterval(interval);
      this.isLoading.set(false);
    } else {
      this.uploadProgress.set(current + 10);
    }
  }, 300);
}
```

```html
<!-- Basic spinner -->
<lite-loading></lite-loading>

<!-- Spinner with message and size -->
<lite-loading 
  [size]="'large'" 
  [message]="'Loading data...'"></lite-loading>

<!-- Defined progress bar -->
<lite-loading 
  [view]="'progress'" 
  [progress]="uploadProgress()" 
  [message]="'Uploading files...'"></lite-loading>

<!-- Indeterminate progress bar -->
<lite-loading 
  [view]="'progress'" 
  [message]="'Processing your request...'\"></lite-loading>

<!-- Controlled visibility -->
<lite-loading 
  [visible]="isLoading()" 
  [message]="'Please wait...'"></lite-loading>
```

### LitePaginator Component

**Selector:** `lite-paginator`

| Input       | Type                | Default | Description                                      |
| :---------- | :------------------ | :------ | :----------------------------------------------- |
| `paginator` | `PaginatorFieldDto` | -       | Paginator configuration object.                  |

| Output               | Type     | Description                                      |
| :------------------- | :------- | :----------------------------------------------- |
| `pageChange`         | `number` | Emitted with the new page number on page change. |
| `itemsPerPageChange` | `number` | Emitted with the new items-per-page count.     |

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
  type?: 'text' | 'menu';   // Optional column type (default: 'text')
  menuItems?: Array<{ label: string; value: string; variant?: 'danger' | 'default' }>; // For 'menu' type columns
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

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/liangk/lite-form/blob/main/LICENSE) file for details.

---
## Changelog
- See [docs/CHANGELOG.md](https://github.com/liangk/lite-form/blob/main/docs/CHANGELOG.md) for the full historical record, including the latest `v1.3.5` release with LitePanel data extraction from dynamic components and improved table scrolling.
