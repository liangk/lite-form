# LiteForm API Documentation

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

## Data Transfer Objects

### FieldDto

**Description:** Basic field configuration for input and textarea components.

#### Properties
| Property | Type | Optional | Description |
|----------|------|----------|-------------|
| `label` | `string` | No | Display label for the field |
| `formControl` | `FormControl` | No | Angular FormControl instance |
| `rows` | `number` | Yes | Number of rows for textarea (default: 2) |

#### Constructor
```typescript
constructor(label: string, formControl: FormControl, rows?: number)
```

#### Example
```typescript
const nameField = new FieldDto('Full Name', new FormControl(''));
const bioField = new FieldDto('Biography', new FormControl(''), 5);
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
