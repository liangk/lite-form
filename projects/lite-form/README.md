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

Lite Form provides 15+ form and UI components. Click on any component below for detailed documentation:

### Form Controls
- **[LiteInput](docs/lite-input.md)** - Text input with floating labels and validation
- **[LitePassword](docs/lite-password.md)** - Password input with visibility toggle and strength analysis
- **[LiteTextarea](docs/lite-textarea.md)** - Multi-line text input with auto-resize
- **[LiteSelect](docs/lite-select.md)** - Single-selection dropdown with search
- **[LiteMultiSelect](docs/lite-multi-select.md)** - Multi-selection dropdown with inline display
- **[LiteRadio](docs/lite-radio.md)** - Radio button group for single selection
- **[LiteCheckbox](docs/lite-checkbox.md)** - Checkbox for boolean input
- **[LiteDate](docs/lite-date.md)** - Date picker with single/range selection
- **[LiteDateTime](docs/lite-datetime.md)** - Combined date and time picker
- **[LiteFile](docs/lite-file.md)** - File upload with drag & drop and camera capture

### Data Display & Navigation
- **[LiteTable](docs/lite-table.md)** - Flexible data table with sorting, pagination, row selection, and row actions
- **[LitePaginator](docs/lite-paginator.md)** - Standalone pagination component

### UI Components
- **[LitePanel](docs/lite-panel.md)** - Modal panel for dialogs and forms
- **[LiteLoading](docs/lite-loading.md)** - Loading spinner and progress bar
- **[LiteTabGroup](docs/lite-tab-group.md)** - Tabs with sliding track and Angular projection
- **[LiteSnackbar](docs/lite-snackbar.md)** - Toast notifications service

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
  nameField: FieldDto = {
    label: 'Full Name',
    formControl: new FormControl(''),
    hint: 'Enter your full legal name'
  } as FieldDto;
  
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
    (option) => option,
    'Select your country of residence'
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
  fileField = new FileFieldDto(
    'Attachments',
    new FormControl([]),
    true, // multiple
    'image/*,application/pdf', // accept
    5 * 1024 * 1024, // maxFileSize
    5, // maxFiles
    true, // showPreview
    'Upload up to 5 files (max 5MB each).' // hint
  );

  // Table with custom columns, sorting, and row selection
  employeeTable = new TableFieldDto(
    [
      { key: '__select__', label: '', flex: '0 0 36px', type: 'select' },
      { key: 'name', label: 'Name', flex: '1', sortable: true },
      { key: 'department', label: 'Department', flex: '0 0 150px', sortable: true },
      { key: 'salary', label: 'Salary', flex: '0 0 120px', sortable: true, cellTemplate: (value) => `$${value?.toLocaleString() || '0'}` }
    ],
    [
      { name: 'John Smith', department: 'Engineering', salary: 75000 },
      { name: 'Sarah Johnson', department: 'Marketing', salary: 65000 }
    ]
  );

  // Paginated table with sorting
  userTable = new TableFieldDto(
    [
      { key: 'name', label: 'Name', flex: '1', sortable: true },
      { key: 'email', label: 'Email', flex: '1', sortable: true },
      { key: 'location.country', label: 'Country', flex: '0 0 120px', sortable: true }
    ],
    [], // Will be populated by API
    true, // Enable pagination
    new PaginatorFieldDto(1, 100, 10) // Page 1, 100 total items, 10 per page
  );
  
  // Handle sort changes
  onTableSort(event: { column: string; direction: 'asc' | 'desc' | null }) {
    this.userTable = { 
      ...this.userTable, 
      sortState: { column: event.column, direction: event.direction }
    };
  }

  // Handle selection changes
  onSelectionChange(selectedRows: any[]) {
    console.log('Selected rows:', selectedRows);
    // Enable bulk actions, update UI, etc.
  }

  // Handle row clicks
  onRowClick(row: any) {
    console.log('Row clicked:', row);
    // Navigate to detail page, open modal, etc.
  }

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

<!-- Data Table with Sorting, Selection, and Row Click -->
<lite-table 
  [table]="employeeTable"
  (sortChange)="onTableSort($event)"
  (selectionChange)="onSelectionChange($event)"
  (rowClick)="onRowClick($event)">
</lite-table>

<!-- Paginated Table with Sorting -->
<lite-table
  [table]="userTable"
  (pageChange)="onPageChange($event)"
  (itemsPerPageChange)="onItemsPerPageChange($event)"
  (sortChange)="onTableSort($event)">
</lite-table>

> Sorting behavior: LiteTable performs client-side, page-level sorting. Only the currently visible page is sorted. Disable pagination to sort the full visible dataset, or sort on the server before passing data to the table if you need whole-dataset sorting across pages.

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

For detailed API documentation, examples, and usage guides for each component, please refer to the individual documentation files in the `/docs` folder:

- [LiteInput Documentation](docs/lite-input.md)
- [LitePassword Documentation](docs/lite-password.md)
- [LiteTextarea Documentation](docs/lite-textarea.md)
- [LiteSelect Documentation](docs/lite-select.md)
- [LiteMultiSelect Documentation](docs/lite-multi-select.md)
- [LiteRadio Documentation](docs/lite-radio.md)
- [LiteCheckbox Documentation](docs/lite-checkbox.md)
- [LiteDate Documentation](docs/lite-date.md)
- [LiteDateTime Documentation](docs/lite-datetime.md)
- [LiteFile Documentation](docs/lite-file.md)
- [LiteTable Documentation](docs/lite-table.md)
- [LitePaginator Documentation](docs/lite-paginator.md)
- [LitePanel Documentation](docs/lite-panel.md)
- [LiteLoading Documentation](docs/lite-loading.md)
- [LiteTabGroup Documentation](docs/lite-tab-group.md)
- [LiteSnackbar Documentation](docs/lite-snackbar.md)

---

## Additional Resources

- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Style Guide](docs/STYLEGUIDE.md)** - SCSS styling conventions
- **[Migration Guide](docs/MIGRATION.md)** - Upgrading between versions
- **[Changelog](docs/CHANGELOG.md)** - Version history and release notes

---

## Data Transfer Objects (DTOs)

### FieldDto
Basic field configuration for input and textarea components.

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number; // For textarea only
  type?: 'text' | 'number';
  hint?: string; // Helper text displayed below the field
}
```

### BaseSelectFieldDto<T>
Abstract base class for select components.

```typescript
abstract class BaseSelectFieldDto<T> {
  label: string;
  options: T[];
  displayWith: (option: T) => string;
  hint?: string; // Helper text displayed below the field
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
  hint?: string; // Helper text displayed below the field
}
```

### TableFieldDto<T>
Table configuration for the LiteTable component.

```typescript
type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string;
  direction: SortDirection;
}

class TableFieldDto<T = any> {
  columns: TableColumn[];
  data: T[];
  showPaginator?: boolean;
  paginatorConfig: PaginatorFieldDto;
  sortState?: SortState;    // Current sort state
}

interface TableColumn {
  key: string;              // Data property key (supports dot notation)
  label: string;            // Column header text
  flex?: string;            // CSS flex property (e.g., '0 0 100px', '1')
  sortable?: boolean;       // Enable sorting for this column
  cellTemplate?: (value: any, row: any) => string; // Custom HTML template
  type?: 'text' | 'menu' | 'select';   // Optional column type (default: 'text')
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
```

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/liangk/lite-form/blob/main/LICENSE) file for details.

---
## Changelog
- See [docs/CHANGELOG.md](https://github.com/liangk/lite-form/blob/main/docs/CHANGELOG.md) for the full historical record, including the latest `v1.4.5` release with LiteTabGroup and tab sliding/size fixes.
