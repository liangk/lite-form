# LiteForm API Documentation

## Components

### LiteFile

**Selector:** `lite-file`

**Description:** File upload component with drag & drop, badge, file management panel, and camera capture support.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FileFieldDto` | - | File field configuration including label, FormControl, and file options |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Features
- **File Upload:** Upload files via button, drag & drop, or camera capture (on supported devices)
- **Badge:** Always-visible badge shows file count
- **Management Panel:** Popup panel lists files, upload area, and action buttons
- **Camera Capture:** On devices with a camera, clicking "Take Picture" opens the camera UI (uses `<input type="file" accept="image/*" capture="environment">`). On unsupported devices, the button is hidden or does nothing.
- **Validation:** Max files, max file size, file type restrictions
- **Image Preview:** Shows thumbnail for image files
- **Progress Tracking:** Shows upload progress for each file
- **Accessibility:** Keyboard and screen reader friendly

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `togglePanel()` | `void` | Toggle visibility of the file management panel |
| `closePanel()` | `void` | Close the file management panel |
| `openFileDialog()` | `void` | Open system file picker dialog |
| `openCameraDialog()` | `void` | Open camera capture interface (on supported devices) |
| `onFileSelect(event)` | `void` | Handle file selection from file input |
| `onCameraCapture(event)` | `void` | Handle image capture from camera |
| `onDragOver(event)` | `void` | Handle file drag over upload area |
| `onDragLeave(event)` | `void` | Handle file drag leave from upload area |
| `onDrop(event)` | `void` | Handle file drop in upload area |
| `removeFile(id)` | `void` | Remove a specific file by ID |
| `clearAllFiles()` | `void` | Remove all uploaded files |
| `formatFileSize(bytes)` | `string` | Format file size in bytes to human-readable string |
| `isImage(type)` | `boolean` | Check if file type is an image |
| `getFileIcon(type)` | `string` | Get appropriate icon for file type |

#### Usage
```typescript
import { FileFieldDto } from 'lite-form';
import { FormControl } from '@angular/forms';

fileField = new FileFieldDto('Attachments', new FormControl([]), {
  multiple: true,
  accept: 'image/*,application/pdf',
  maxFileSize: 5 * 1024 * 1024,
  maxFiles: 5,
  showPreview: true
});
```

```html
<lite-file [control]="fileField"></lite-file>
```

#### Camera Capture
- The "Take Picture" button opens the device camera using a hidden file input with `accept="image/*" capture="environment"`.
- On mobile devices and laptops with a camera, this will prompt the user to take a photo.
- On desktops without a camera, the button will do nothing or fall back to file selection, depending on browser support.
- No special permissions are required, but the browser may prompt for camera access.

#### File Management Panel
- Click the file icon button to open the management panel.
- Drag & drop files or click the upload area to select files.
- Use the action buttons to upload files, take a picture, or close the panel.
- Remove files individually or clear all files.

#### Styling
- `.lite-file` - Root class
- `.file-panel` - Management panel
- `.file-badge` - File count badge
- `.upload-area` - Drag & drop/upload area
- `.action-btn` - Action buttons (upload, camera, close)
- `.file-list` - File list container

#### Browser Support
- Camera capture works on most modern mobile browsers and laptops with a camera.
- On unsupported devices, the feature is gracefully degraded.

---

## Components

### LiteInput

**Selector:** `lite-input`

**Description:** A text input component with floating label animation and validation display.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FieldDto` | - | Field configuration including label and FormControl |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Usage
```typescript
import { FieldDto } from 'lite-form';
import { FormControl, Validators } from '@angular/forms';

// Basic usage
nameField = new FieldDto('Full Name', new FormControl(''));

// With validation
emailField = new FieldDto(
  'Email',
  new FormControl('', [Validators.required, Validators.email])
);
```

```html
<lite-input [control]="nameField"></lite-input>
<lite-input [control]="emailField"></lite-input>
```

---

### LitePassword

**Selector:** `lite-password`

**Description:** A password input component with visibility toggle, strength indicator, and advanced validation error messages.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FieldDto` | - | Field configuration including label and FormControl |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |
| `showToggle` | `boolean` | `true` | Whether to show password visibility toggle button |
| `showStrengthIndicator` | `boolean` | `false` | Whether to show real-time password strength indicator |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `togglePasswordVisibility()` | `void` | Toggle between password and text input type |
| `getInputType()` | `string` | Get current input type ('password' or 'text') |
| `getDisplayValue()` | `string` | Get masked display value for view mode |

#### Features
- **Password Visibility Toggle**: Click eye icon to show/hide password
- **Strength Indicator**: Real-time password strength analysis with visual feedback
- **Advanced Error Messages**: Detailed validation messages using `FormUtils.getPasswordErrorMessages()`
- **Pattern Analysis**: Automatically detects missing requirements from regex patterns
- **Accessibility**: ARIA labels for screen readers

#### Usage
```typescript
// Basic password
passwordField = new FieldDto('Password', new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]));

// Strong password with pattern validation
strongPasswordField = new FieldDto('Strong Password', new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
]));

// Password strength analysis
import { FormUtils } from 'lite-form';
const analysis = FormUtils.analyzePasswordStrength('MyStr0ng@Pass');
// Returns: { score: 6, level: 'Good', feedback: ['Consider using 12+ characters'] }
```

```html
<!-- Basic password -->
<lite-password [control]="passwordField"></lite-password>

<!-- With strength indicator -->
<lite-password [control]="strongPasswordField" [showStrengthIndicator]="true"></lite-password>

<!-- Without toggle button -->
<lite-password [control]="confirmPasswordField" [showToggle]="false"></lite-password>
```

#### Password Strength Levels
- **Very Weak** (0-2): Missing most requirements
- **Weak** (3-4): Basic requirements met
- **Fair** (5): Good character variety
- **Good** (6): Strong with minor improvements
- **Strong** (7-8): Excellent security

---

### LiteTextarea

**Selector:** `lite-textarea`

**Description:** A multi-line text input component with configurable rows and validation.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FieldDto` | - | Field configuration including label, FormControl, and optional rows |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Usage
```typescript
// Basic textarea
descriptionField = new FieldDto('Description', new FormControl(''));

// With custom rows
commentsField = new FieldDto('Comments', new FormControl(''), 5);
```

```html
<lite-textarea [control]="descriptionField"></lite-textarea>
<lite-textarea [control]="commentsField"></lite-textarea>
```

---

### LiteSelect

**Selector:** `lite-select`

**Description:** A single-selection dropdown component with search/filtering capabilities.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `SelectFieldDto<T>` | - | Select field configuration with options and display function |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `hasTypedValue()` | `boolean` | Check if user has typed a filter value |
| `getFilteredOptions()` | `T[]` | Get filtered options based on current input |
| `shouldFloat()` | `boolean` | Check if label should float |

#### Usage
```typescript
// String options
countryField = new SelectFieldDto(
  'Country',
  new FormControl(''),
  ['USA', 'Canada', 'Mexico'],
  (option) => option
);

// Object options
statusField = new SelectFieldDto(
  'Status',
  new FormControl<{id: number, name: string}>(),
  [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
    { id: 3, name: 'Pending' }
  ],
  (option) => option.name
);
```

```html
<lite-select [control]="countryField"></lite-select>
<lite-select [control]="statusField"></lite-select>
```

---

### LiteMultiSelect

**Selector:** `lite-multi-select`

**Description:** A multi-selection dropdown component with inline selected items display and dynamic height.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `MultiSelectFieldDto<T>` | - | Multi-select field configuration |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `hasSelection()` | `boolean` | Check if any items are selected |
| `getSelectedCount()` | `number` | Get number of selected items |
| `getSelectedItems()` | `T[]` | Get array of selected items |
| `removeSelectedItem(item: T)` | `void` | Remove specific selected item |
| `optionToggled(option: T)` | `void` | Toggle selection state of an option |
| `isOptionSelected(option: T)` | `boolean` | Check if option is currently selected |
| `getFilteredOptions()` | `T[]` | Get filtered options based on current filter |

#### Features
- **Inline Display:** Selected items are displayed as chips within the input area
- **Dynamic Height:** Container height adjusts automatically based on selected items
- **Filtering:** Type to filter available options
- **Individual Removal:** Remove selected items individually with × button
- **Keyboard Navigation:** Support for keyboard navigation in dropdown

#### Usage
```typescript
// String array
skillsField = new MultiSelectFieldDto(
  'Skills',
  new FormControl<string[]>([]),
  ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue'],
  (option) => option
);

// Object array
tagsField = new MultiSelectFieldDto(
  'Tags',
  new FormControl<{id: number, name: string}[]>([]),
  [
    { id: 1, name: 'Frontend' },
    { id: 2, name: 'Backend' },
    { id: 3, name: 'DevOps' },
    { id: 4, name: 'Testing' }
  ],
  (option) => option.name
);
```

```html
<lite-multi-select [control]="skillsField"></lite-multi-select>
<lite-multi-select [control]="tagsField"></lite-multi-select>
```

---

### LiteRadio

**Selector:** `lite-radio`

**Description:** A radio button group component for single selection from multiple options.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `RadioFieldDto<T>` | - | Radio field configuration with options and display function |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction for radio options |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `isSelected(option)` | `boolean` | Check if the given option is selected |
| `onRadioChange(option)` | `void` | Handle radio button selection change |

#### Usage
```typescript
// String options
planField = new RadioFieldDto(
  'Choose Plan',
  new FormControl(''),
  ['Basic', 'Premium', 'Enterprise'],
  (option) => option
);

// Object options
priorityField = new RadioFieldDto(
  'Priority Level',
  new FormControl<{id: number, name: string}>(),
  [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' }
  ],
  (option) => option.name
);
```

```html
<lite-radio [control]="planField"></lite-radio>
<lite-radio [control]="priorityField" direction="horizontal"></lite-radio>
```

---

### LiteCheckbox

**Selector:** `lite-checkbox`

**Description:** A checkbox component for boolean input with validation support.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FieldDto` | - | Field configuration for boolean values |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `onCheckboxChange(event)` | `void` | Handle checkbox state change |

#### Usage
```typescript
// Basic checkbox
agreeField = new FieldDto(
  'I agree to the terms and conditions', 
  new FormControl<boolean>(false, { nonNullable: true })
);

// Required checkbox
privacyField = new FieldDto(
  'Accept privacy policy', 
  new FormControl<boolean>(false, { 
    nonNullable: true, 
    validators: [Validators.requiredTrue] 
  })
);
```

```html
<lite-checkbox [control]="agreeField"></lite-checkbox>
<lite-checkbox [control]="privacyField"></lite-checkbox>
```

---

### LiteDate

**Selector:** `lite-date`

**Description:** Advanced date picker component with single date and date range selection capabilities.

#### Inputs
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `control` | `FieldDto \| DateRangeFieldDto` | - | Date field configuration |
| `inEdit` | `boolean` | `true` | Whether the field is in edit mode |
| `format` | `string` | `'dd/MM/yyyy'` | Date display format |
| `range` | `boolean` | `false` | Enable date range selection |

#### Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `toggleCalendar()` | `void` | Open/close the calendar popup |
| `selectDate(day)` | `void` | Select a specific date from calendar |
| `previousMonth()` | `void` | Navigate to previous month |
| `nextMonth()` | `void` | Navigate to next month |
| `getFormattedValue()` | `string` | Get formatted display value for input |
| `getDisplayValue()` | `string` | Get formatted display value for read-only mode |
| `onDateChange(event)` | `void` | Handle manual date input changes |

#### Features
- **Single Date Mode:** Standard date picker for single date selection
- **Range Mode:** Dual calendar view for selecting date ranges
- **Custom Formatting:** Support for multiple date formats (dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd)
- **Intelligent Positioning:** Calendar automatically positions above/below based on screen space
- **Manual Input:** Type dates directly with format validation
- **Visual Range Highlighting:** Different styles for start, end, and in-between dates
- **Today Highlighting:** Distinctive orange styling for current date
- **Timezone Safe:** Proper handling of local dates without timezone shifts
- **Auto-close:** Calendar closes automatically after range selection completion

#### Single Date Usage
```typescript
// Basic date field
birthdateField: FieldDto = {
  label: 'Birth Date',
  formControl: new FormControl<string>('', { nonNullable: true })
};

// With validation and custom format
appointmentField: FieldDto = {
  label: 'Appointment Date',
  formControl: new FormControl<string>('', { 
    nonNullable: true, 
    validators: [Validators.required] 
  })
};
```

```html
<lite-date [control]="birthdateField"></lite-date>
<lite-date [control]="appointmentField" [format]="'MM/dd/yyyy'"></lite-date>
```

#### Date Range Usage
```typescript
import { DateRangeFieldDto } from 'lite-form';

// Date range field
eventDateField: DateRangeFieldDto = {
  label: 'Event Date Range',
  formControl: new FormControl<string[]>(['', ''], { nonNullable: true })
};

// With validation
vacationField: DateRangeFieldDto = {
  label: 'Vacation Dates',
  formControl: new FormControl<string[]>(['', ''], { 
    nonNullable: true,
    validators: [Validators.required]
  })
};
```

```html
<lite-date [control]="eventDateField" [range]="true"></lite-date>
<lite-date [control]="vacationField" [range]="true" [format]="'yyyy-MM-dd'"></lite-date>
```

#### Range Selection Behavior
1. **First Click:** Sets start date, clears any existing range
2. **Second Click:** Sets end date, completes range selection
3. **Same Date Twice:** Resets to single start date selection
4. **Auto-ordering:** Earlier date becomes start, later date becomes end
5. **Auto-close:** Calendar closes 1 second after completing range selection

#### Supported Formats
- `dd/MM/yyyy` - European format (default)
- `MM/dd/yyyy` - US format
- `yyyy-MM-dd` - ISO format

---

## Data Transfer Objects

### FileFieldDto

**Description:** File field configuration for the LiteFile component, with support for multiple file upload, file type filtering, and size limits.

#### Properties
| Property | Type | Optional | Description |
|----------|------|----------|-------------|
| `label` | `string` | No | Display label for the field |
| `formControl` | `FormControl` | No | Angular FormControl instance holding file array |
| `multiple` | `boolean` | Yes | Allow multiple file selection (default: true) |
| `accept` | `string` | Yes | Accepted file types (e.g., 'image/*,application/pdf') (default: '*/*') |
| `maxFileSize` | `number` | Yes | Maximum file size in bytes (default: 10MB) |
| `maxFiles` | `number` | Yes | Maximum number of files allowed (default: 10) |
| `showPreview` | `boolean` | Yes | Show image previews for image files (default: true) |

#### Constructor
```typescript
constructor(
  label: string,
  formControl: FormControl,
  multiple: boolean = true,
  accept: string = '*/*',
  maxFileSize: number = 10 * 1024 * 1024, // 10MB
  maxFiles: number = 10,
  showPreview: boolean = true
)
```

#### Examples
```typescript
// Basic file upload with defaults
const filesField = new FileFieldDto(
  'Upload Files',
  new FormControl([])
);

// Image upload with restrictions
const imageField = new FileFieldDto(
  'Profile Picture',
  new FormControl([]),
  false, // single file only
  'image/*', // images only
  2 * 1024 * 1024, // 2MB limit
  1, // max 1 file
  true // show preview
);

// Document upload with custom limits
const docsField = new FileFieldDto(
  'Documents',
  new FormControl([]),
  true, // multiple files
  '.pdf,.doc,.docx', // document types
  5 * 1024 * 1024, // 5MB per file
  5, // max 5 files
  false // no preview
);
```

---

### FieldDto

**Description:** Basic field configuration for input and textarea components.

#### Properties
| Property | Type | Optional | Description |
|----------|------|----------|-------------|
| `label` | `string` | No | Display label for the field |
| `formControl` | `FormControl` | No | Angular FormControl instance |
| `rows` | `number` | Yes | Number of rows for textarea (default: 2) |
| `type` | `'text' \| 'number'` | Yes | Input type (default: 'text') |

#### Constructor
```typescript
constructor(
  label: string, 
  formControl: FormControl, 
  rows?: number, 
  type?: 'text' | 'number'
)
```

#### Examples
```typescript
// Text input
const nameField = new FieldDto('Full Name', new FormControl(''));

// Number input
const ageField = new FieldDto('Age', new FormControl(0), 2, 'number');

// Textarea
const bioField = new FieldDto('Biography', new FormControl(''), 5);

// Checkbox (using basic FieldDto)
const agreeField = new FieldDto(
  'I agree to terms', 
  new FormControl<boolean>(false, { nonNullable: true })
);
```

---

### BaseSelectFieldDto<T>

**Description:** Abstract base class for select field configurations.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Display label for the field |
| `options` | `T[]` | Array of available options |
| `displayWith` | `(option: T) => string` | Function to convert option to display string |

#### Constructor
```typescript
constructor(label: string, options: T[], displayWith: (option: T) => string)
```

---

### SelectFieldDto<T>

**Description:** Field configuration for single-selection dropdowns.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `formControl` | `FormControl<T>` | FormControl for single value |
| *...extends BaseSelectFieldDto* | - | Inherits label, options, displayWith |

#### Constructor
```typescript
constructor(
  label: string,
  formControl: FormControl<T>,
  options: T[],
  displayWith: (option: T) => string
)
```

---

### MultiSelectFieldDto<T>

**Description:** Field configuration for multi-selection dropdowns.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `formControl` | `FormControl<T[]>` | FormControl for array of values |
| *...extends BaseSelectFieldDto* | - | Inherits label, options, displayWith |

#### Constructor
```typescript
constructor(
  label: string,
  formControl: FormControl<T[]>,
  options: T[],
  displayWith: (option: T) => string
)
```

---

### RadioFieldDto<T>

**Description:** Field configuration for radio button groups.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `formControl` | `FormControl<T>` | FormControl for single selected value |
| *...extends BaseSelectFieldDto* | - | Inherits label, options, displayWith |

#### Constructor
```typescript
constructor(
  label: string,
  formControl: FormControl<T>,
  options: T[],
  displayWith: (option: T) => string
)
```

#### Example
```typescript
// String options
const planField = new RadioFieldDto(
  'Choose Plan',
  new FormControl(''),
  ['Basic', 'Premium', 'Enterprise'],
  (option) => option
);

// Object options
const priorityField = new RadioFieldDto(
  'Priority',
  new FormControl<{id: number, name: string}>(),
  [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' }
  ],
  (option) => option.name
);
```

---

### DateRangeFieldDto

**Description:** Field configuration for date range selection components.

#### Properties
| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Display label for the field |
| `formControl` | `FormControl<string[]>` | FormControl for array of two date strings [startDate, endDate] |

#### Interface Definition
```typescript
interface DateRangeFieldDto extends Omit<FieldDto, 'formControl'> {
  formControl: FormControl<string[]>;
}
```

#### Usage
```typescript
// Basic date range
const eventDateField: DateRangeFieldDto = {
  label: 'Event Date Range',
  formControl: new FormControl<string[]>(['', ''], { nonNullable: true })
};

// With validation
const vacationField: DateRangeFieldDto = {
  label: 'Vacation Dates',
  formControl: new FormControl<string[]>(['', ''], { 
    nonNullable: true,
    validators: [Validators.required]
  })
};
```

#### Data Format
- **Array Structure:** `[startDate, endDate]`
- **Date Format:** ISO date strings (YYYY-MM-DD)
- **Partial Selection:** `[startDate, '']` when only start date is selected
- **Empty State:** `['', '']` when no dates are selected

---

## Utility Classes

### FormUtils

**Description:** Static utility class providing helper methods for form validation.

#### Methods

##### `isRequired(control: FormControl): boolean`
Check if a FormControl has the required validator.

##### `hasErrors(control: FormControl): boolean`
Check if a FormControl has any validation errors.

##### `getErrorMessages(control: FormControl, fieldLabel: string): string[]`
Get array of human-readable error messages for a FormControl.

#### Example
```typescript
import { FormUtils } from 'lite-form';

// Check if field is required
if (FormUtils.isRequired(this.nameField.formControl)) {
  console.log('Name field is required');
}

// Check for errors
if (FormUtils.hasErrors(this.emailField.formControl)) {
  const errors = FormUtils.getErrorMessages(this.emailField.formControl, 'Email');
  console.log('Email errors:', errors);
}
```

---

## Validation

All components support Angular Reactive Forms validation. Error messages are automatically generated and displayed.

### Supported Validators
- `Validators.required`
- `Validators.email`
- `Validators.minLength(n)`
- `Validators.maxLength(n)`
- `Validators.min(n)`
- `Validators.max(n)`
- `Validators.pattern(regex)`
- Custom validators

### Error Message Generation
The library automatically generates user-friendly error messages:

- **Required:** "Field Name is required"
- **Email:** "Field Name must be a valid email address"
- **MinLength:** "Field Name must be at least X characters long"
- **MaxLength:** "Field Name cannot be more than X characters long"
- **Min:** "Field Name must be at least X"
- **Max:** "Field Name cannot be more than X"
- **Pattern:** "Field Name format is invalid"

### Custom Error Messages
You can provide custom error messages by adding them to the FormControl:

```typescript
const customControl = new FormControl('', [
  Validators.required,
  (control) => {
    if (control.value && control.value.length < 3) {
      return { customError: 'Value must be at least 3 characters' };
    }
    return null;
  }
]);
```

---

## Styling

### CSS Classes

Each component adds specific CSS classes for styling:

#### LiteInput
- `.lite-input` - Root component class
- `.lite-input.in-edit` - When in edit mode
- `.label` - Label element
- `.label.float` - Floating label state
- `input` - Input element
- `input:focus` - Focused input
- `input.invalid` - Invalid input state

#### LiteTextarea
- `.lite-textarea` - Root component class
- `.lite-textarea.in-edit` - When in edit mode
- `textarea` - Textarea element
- `textarea.invalid` - Invalid textarea state

#### LiteSelect
- `.lite-select` - Root component class
- `.lite-select.in-edit` - When in edit mode
- `.options` - Dropdown container
- `.option` - Individual option
- `.option:hover` - Hovered option
- `.option.selected` - Selected option
- `.arrow_box` - Arrow container
- `.arrow` - Dropdown arrow

#### LiteMultiSelect
- `.lite-multi-select` - Root component class
- `.lite-multi-select.in-edit` - When in edit mode
- `.input-container` - Main input container
- `.selected-items-inline` - Selected items overlay
- `.selected-item-inline` - Individual selected item chip
- `.remove-item-inline` - Remove button for selected items
- `.filter-input` - Filter input field
- `.multi-option` - Multi-select option
- `.multi-option.selected` - Selected multi-option

### SCSS Variables
The library uses SCSS variables that can be overridden:

```scss
// Example overrides
.lite-input.in-edit {
  input:focus {
    border-color: #your-brand-color;
    box-shadow: 0 0 5px rgba(your-brand-color, 0.5);
  }
}

.lite-multi-select.in-edit {
  .selected-item-inline {
    background-color: #your-accent-color;
    border-color: #your-accent-color;
  }
}
```

---

## Browser Support

- **Angular:** 17.0.0+
- **Chrome:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

---

## TypeScript Support

The library is fully typed with TypeScript and supports generic types for select components:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const userSelect = new SelectFieldDto<User>(
  'User',
  new FormControl<User>(),
  users,
  (user) => user.name
);

const usersMultiSelect = new MultiSelectFieldDto<User>(
  'Users',
  new FormControl<User[]>([]),
  users,
  (user) => `${user.name} (${user.email})`
);
```
