# LitePanel

## Description
A modal-style panel component for displaying overlays with customizable content. Supports string content, Angular templates, or dynamically loaded components with input binding. Perfect for dialogs, forms, and confirmation screens.

## Features
- Multiple content types: string, template, or component
- Dynamic component loading with input signal support
- Configurable action buttons with variants (primary, secondary, danger)
- **Smart action disabling**: Submit buttons automatically disable when embedded form is invalid
- Automatic form validation detection via `isValid()` method or `FormGroup` scanning
- Customizable dimensions (width, height, maxWidth, maxHeight)
- Backdrop click to close (configurable)
- Data extraction from dynamic components via `getData()` method
- Smooth open/close animations
- Automatic positioning and overflow handling
- Support for both `@Input()` decorators and modern `input()` signals

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | required | Panel header title |
| `content` | `string \| TemplateRef \| Type<any>` | required | Content to display (text, template, or component) |
| `contentInputs` | `Record<string, any> \| null` | `null` | Inputs to pass to dynamically loaded component |
| `formGroup` | `FormGroup \| null` | `null` | Optional FormGroup for template-based form validation |
| `actions` | `LitePanelAction[]` | `[]` | Array of action buttons |
| `width` | `string \| number` | `'600px'` | Panel width (auto-adds 'px' for numbers) |
| `height` | `string \| number` | `'auto'` | Panel height |
| `maxWidth` | `string \| number` | `'90vw'` | Maximum width |
| `maxHeight` | `string \| number` | `'90vh'` | Maximum height |
| `closeOnOverlayClick` | `boolean` | `true` | Allow closing by clicking backdrop |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `closed` | `EventEmitter<unknown \| null>` | Emits when panel closes with action value or component data |

### LitePanelAction Interface

```typescript
interface LitePanelAction {
  label: string;
  value: any;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean | (() => boolean);  // Optional: manually control button state
}
```

**Note on Smart Action Disabling**: Submit-style actions (those with `value='submit'` or `variant='primary'` without explicit value) are automatically disabled when the embedded form is invalid. The panel detects validity by:
1. Checking if a `FormGroup` was explicitly provided via the `formGroup` input (for ng-template forms)
2. Checking for an `isValid()` method on dynamic component instances
3. Scanning component properties for any `FormGroup` instance and checking its `valid` property

This automatic behavior can be overridden by explicitly setting the `disabled` property.

## Examples

### Basic String Content

```typescript
import { Component, signal } from '@angular/core';
import { LitePanel } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LitePanel],
  template: `
    @if (panelOpen()) {
      <lite-panel
        [title]="'Welcome'"
        [content]="'This is a simple text panel.'"
        (closed)="onPanelClosed($event)"
      ></lite-panel>
    }
  `
})
export class ExampleComponent {
  panelOpen = signal(true);
  
  onPanelClosed(result: unknown) {
    this.panelOpen.set(false);
    console.log('Panel closed:', result);
  }
}
```

### Template Content with Actions

```typescript
@Component({
  template: `
    @if (confirmOpen()) {
      <lite-panel
        [title]="'Confirm Delete'"
        [content]="confirmTemplate"
        [actions]="confirmActions"
        width="520px"
        (closed)="onConfirmClosed($event)"
      ></lite-panel>
    }
    
    <ng-template #confirmTemplate let-close="close">
      <p>Are you sure you want to delete this item?</p>
      <p>This action cannot be undone.</p>
    </ng-template>
  `
})
export class ExampleComponent {
  confirmOpen = signal(false);
  
  confirmActions = [
    { label: 'Delete', value: 'delete', variant: 'danger' as const },
    { label: 'Cancel', value: null, variant: 'secondary' as const }
  ];
  
  onConfirmClosed(result: unknown) {
    if (result === 'delete') {
      // Perform delete operation
    }
    this.confirmOpen.set(false);
  }
}
```

### Template with Form Validation

```typescript
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LitePanel, LiteInput, LiteSelect, FieldDto, SelectFieldDto } from 'ngx-lite-form';

@Component({
  standalone: true,
  imports: [LitePanel, LiteInput, LiteSelect, ReactiveFormsModule],
  template: `
    @if (invitePanelOpen()) {
      <lite-panel
        [title]="'Invite User'"
        [content]="invitePanel"
        [formGroup]="inviteForm"
        [actions]="inviteActions"
        width="520px"
        (closed)="onInviteClosed($event)"
      ></lite-panel>
    }
    
    <ng-template #invitePanel let-close="close">
      <form class="invite-form" [formGroup]="inviteForm">
        <lite-input [control]="emailField"></lite-input>
        <lite-select [control]="roleField"></lite-select>
      </form>
    </ng-template>
  `
})
export class ExampleComponent {
  invitePanelOpen = signal(false);
  
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });
  
  emailField: FieldDto = {
    label: 'Email Address',
    formControl: this.inviteForm.get('email') as FormControl
  };
  
  roleField: SelectFieldDto = {
    label: 'Role',
    formControl: this.inviteForm.get('role') as FormControl,
    options: ['Admin', 'Editor', 'Viewer'],
    displayWith: (option: string) => option
  };
  
  inviteActions = [
    { label: 'Send Invite', value: 'invite', variant: 'primary' as const },
    { label: 'Cancel', value: null, variant: 'secondary' as const }
  ];
  
  openInvitePanel() {
    this.inviteForm.reset();
    this.invitePanelOpen.set(true);
  }
  
  onInviteClosed(result: unknown) {
    if (result === 'invite') {
      console.log('Invite sent:', this.inviteForm.value);
      // Send invitation with form data
    }
    this.invitePanelOpen.set(false);
  }
}
```

### Dynamic Component with Input Signals

```typescript
// Form Component
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [LiteInput, LiteTextarea],
  template: `
    <lite-input [control]="nameField"></lite-input>
    <lite-input [control]="emailField"></lite-input>
    <lite-textarea [control]="bioField"></lite-textarea>
  `
})
export class UserFormComponent {
  initialData = input<{ name?: string; email?: string } | undefined>();
  mode = input<'create' | 'edit'>('create');
  
  nameField = new FieldDto(
    'Name',
    new FormControl('')
  );
  
  emailField = new FieldDto(
    'Email',
    new FormControl('')
  );
  
  bioField = new FieldDto(
    'Bio',
    new FormControl(''),
    3  // 3 rows for textarea
  );
  
  constructor() {
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.nameField.formControl.setValue(data.name || '');
        this.emailField.formControl.setValue(data.email || '');
      }
    });
  }
  
  getData() {
    return {
      name: this.nameField.formControl.value,
      email: this.emailField.formControl.value,
      bio: this.bioField.formControl.value
    };
  }
  
  // Optional: Provide form validity for smart action disabling
  isValid() {
    return this.nameField.formControl.valid && 
           this.emailField.formControl.valid && 
           this.bioField.formControl.valid;
  }
}

// Parent Component
@Component({
  template: `
    @if (formPanelOpen()) {
      <lite-panel
        [title]="formTitle()"
        [content]="userFormComponent"
        [contentInputs]="formInputs()"
        [actions]="formActions"
        width="600px"
        (closed)="onFormPanelClosed($event)"
      ></lite-panel>
    }
  `
})
export class ParentComponent {
  formPanelOpen = signal(false);
  formTitle = signal('Create User');
  userFormComponent = UserFormComponent;
  
  formInputs = signal<{ initialData?: any; mode?: string }>({
    mode: 'create'
  });
  
  formActions = [
    { label: 'Submit', value: 'submit', variant: 'primary' as const },
    { label: 'Cancel', value: null, variant: 'secondary' as const }
  ];
  
  openCreateForm() {
    this.formTitle.set('Create User');
    this.formInputs.set({ mode: 'create' });
    this.formPanelOpen.set(true);
  }
  
  openEditForm() {
    this.formTitle.set('Edit User');
    this.formInputs.set({
      initialData: { name: 'John Doe', email: 'john@example.com' },
      mode: 'edit'
    });
    this.formPanelOpen.set(true);
  }
  
  onFormPanelClosed(result: unknown) {
    this.formPanelOpen.set(false);
    
    // Handle form submission with data extraction
    if (result && typeof result === 'object' && 'action' in result && 'data' in result) {
      const { action, data } = result as { action: string; data: any };
      if (action === 'submit') {
        console.log('Form submitted:', data);
        // Make API call with data
      }
    }
  }
}
```

### Custom Dimensions

```typescript
<lite-panel
  [title]="'Large Panel'"
  [content]="largeContent"
  width="800px"
  height="600px"
  maxHeight="80vh"
></lite-panel>
```

### Disable Backdrop Close

```typescript
<lite-panel
  [title]="'Important Action'"
  [content]="content"
  [closeOnOverlayClick]="false"
></lite-panel>
```

## Data Extraction from Components

When using dynamic components, LitePanel automatically checks if the component has a `getData()` method. If present, it will call this method and return the data along with the action:

```typescript
// In your dynamic component
getData() {
  return {
    name: this.nameField.formControl.value,
    email: this.emailField.formControl.value
  };
}

// In parent component close handler
onPanelClosed(result: unknown) {
  if (result && typeof result === 'object' && 'action' in result && 'data' in result) {
    const { action, data } = result as { action: any; data: any };
    // action: the button value ('submit', 'cancel', etc.)
    // data: result from getData() method
  }
}
```

## Styling

```scss
.lite-panel-overlay {
  // Backdrop overlay
}

.lite-panel {
  // Panel container
}

.lite-panel__header {
  // Header section
}

.lite-panel__content {
  // Content area
}

.lite-panel__actions {
  // Action buttons container
}
```

## Form Validation Integration

LitePanel automatically disables submit-style action buttons when an embedded form component is invalid. This provides a seamless user experience without requiring manual state management.

### How It Works

1. **Automatic Detection**: The panel checks for form validity in the following priority order
2. **Priority Order**:
   - First checks if a `FormGroup` was explicitly provided via the `formGroup` input (for ng-template forms)
   - Then checks for an `isValid()` method on the component instance
   - Falls back to scanning all component properties for a `FormGroup` instance
   - Uses the `FormGroup.valid` property to determine button state
3. **Submit Actions**: Only affects actions with `value='submit'` or `variant='primary'` (without explicit value)
4. **Real-time Updates**: Button state updates automatically as form validity changes

### Implementation Examples

#### Option 1: ng-template with FormGroup Input (Recommended for Templates)

```typescript
@Component({
  template: `
    <lite-panel
      [title]="'User Form'"
      [content]="formTemplate"
      [formGroup]="userForm"
      [actions]="formActions">
    </lite-panel>
    
    <ng-template #formTemplate>
      <form [formGroup]="userForm">
        <lite-input [control]="nameField"></lite-input>
        <lite-input [control]="emailField"></lite-input>
      </form>
    </ng-template>
  `
})
export class MyComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  formActions = [
    { label: 'Submit', value: 'submit', variant: 'primary' as const }
  ];
}
```

#### Option 2: Dynamic Component with isValid() Method

```typescript
// Your form component
export class MyFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  // Provide isValid() method (recommended for components)
  isValid() {
    return this.userForm.valid;
  }
}
```

#### Option 3: Dynamic Component with FormGroup Property (Automatic Detection)

```typescript
export class MyFormComponent {
  // Just have a FormGroup property - the panel will find it automatically
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
}
```

### Manual Override

You can override automatic validation by explicitly setting the `disabled` property:

```typescript
formActions = [
  { 
    label: 'Submit', 
    value: 'submit', 
    variant: 'primary',
    disabled: () => !this.customValidationLogic()  // Manual control
  }
];
```

## Notes

- Numeric width/height values are automatically suffixed with 'px'
- Components passed via `content` are dynamically created and destroyed
- The `contentInputs` binding properly handles both `@Input()` and `input()` signals
- Templates receive a `close` function for manual closing
- Submit buttons automatically disable when embedded forms are invalid (no manual wiring needed)
