# LitePanel

## Description
A modal-style panel component for displaying overlays with customizable content. Supports string content, Angular templates, or dynamically loaded components with input binding. Perfect for dialogs, forms, and confirmation screens.

## Features
- Multiple content types: string, template, or component
- Dynamic component loading with input signal support
- Configurable action buttons with variants (primary, secondary, danger)
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
}
```

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

## Notes

- Numeric width/height values are automatically suffixed with 'px'
- Components passed via `content` are dynamically created and destroyed
- The `contentInputs` binding properly handles both `@Input()` and `input()` signals
- Templates receive a `close` function for manual closing
