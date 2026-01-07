# LiteToggle

A modern iOS-style toggle switch component for boolean input. Provides a better UX alternative to traditional checkboxes for on/off states, settings, and preferences.

## Features

- Modern iOS-style toggle switch
- Smooth animations and transitions
- Support for edit and view modes
- Form validation integration
- Required field indicators
- Helper text (hints)
- Accessible keyboard navigation
- Fully styled with customizable appearance

## Basic Usage

```typescript
import { LiteToggle, FieldDto } from 'ngx-lite-form';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LiteToggle],
  template: `
    <lite-toggle [control]="notificationsField"></lite-toggle>
  `
})
export class MyComponent {
  notificationsField = new FieldDto(
    'Enable Notifications',
    new FormControl<boolean>(false, { nonNullable: true })
  );
}
```

## Template Usage

```html
<!-- Basic toggle -->
<lite-toggle [control]="notificationsField"></lite-toggle>

<!-- Toggle with hint -->
<lite-toggle [control]="darkModeField"></lite-toggle>

<!-- View mode (read-only) -->
<lite-toggle [control]="termsField" [inEdit]="false"></lite-toggle>
```

## Component Configuration

### FieldDto Properties

```typescript
class FieldDto {
  label: string;              // Toggle label text
  formControl: FormControl<boolean>;  // Boolean form control
  hint?: string;              // Optional helper text
}
```

## Examples

### Basic Toggle

```typescript
enableField = new FieldDto(
  'Enable Feature',
  new FormControl<boolean>(true, { nonNullable: true })
);
```

```html
<lite-toggle [control]="enableField"></lite-toggle>
```

### Toggle with Hint

```typescript
darkModeField = new FieldDto(
  'Dark Mode',
  new FormControl<boolean>(false, { nonNullable: true }),
  2,
  'text',
  'Switch between light and dark theme'
);
```

```html
<lite-toggle [control]="darkModeField"></lite-toggle>
```

### Required Toggle with Validation

```typescript
import { Validators } from '@angular/forms';

termsField = new FieldDto(
  'I agree to the terms',
  new FormControl<boolean>(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue]
  })
);
```

```html
<lite-toggle [control]="termsField"></lite-toggle>
```

### Multiple Settings

```typescript
settings = {
  notifications: new FieldDto(
    'Push Notifications',
    new FormControl<boolean>(true, { nonNullable: true }),
    2, 'text', 'Receive push notifications'
  ),
  emailUpdates: new FieldDto(
    'Email Updates',
    new FormControl<boolean>(false, { nonNullable: true }),
    2, 'text', 'Get updates via email'
  ),
  autoSave: new FieldDto(
    'Auto-save',
    new FormControl<boolean>(true, { nonNullable: true }),
    2, 'text', 'Automatically save your work'
  )
};
```

```html
<div class="settings-group">
  <lite-toggle [control]="settings.notifications"></lite-toggle>
  <lite-toggle [control]="settings.emailUpdates"></lite-toggle>
  <lite-toggle [control]="settings.autoSave"></lite-toggle>
</div>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` | Required | Field configuration with label and form control |
| `inEdit` | `boolean` | `true` | Enable/disable edit mode |

### FieldDto Structure

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Toggle label text |
| `formControl` | `FormControl<boolean>` | Yes | Boolean form control |
| `hint` | `string` | No | Helper text displayed below toggle |

## Styling

The component uses BEM-style classes for customization:

```scss
.lite-toggle {
  // Container styles
  
  &.in-edit {
    .toggle-container {
      // Edit mode container
      
      .toggle-label {
        // Label wrapper with toggle switch
        
        .toggle-text {
          // Label text
        }
        
        .toggle-switch {
          // Toggle switch background
          
          .toggle-slider {
            // Sliding circle
          }
          
          &.checked {
            // Checked state
          }
        }
      }
      
      .hint {
        // Helper text
      }
    }
  }
  
  &.invalid {
    // Invalid/error state
  }
}
```

## Validation

The toggle component integrates with Angular's reactive forms validation:

```typescript
termsField = new FieldDto(
  'Accept Terms and Conditions',
  new FormControl<boolean>(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue]
  })
);
```

Error messages are automatically displayed when the toggle is invalid and touched.

## Common Use Cases

### Settings Panel

```typescript
@Component({
  template: `
    <div class="settings-panel">
      <h3>Notification Settings</h3>
      <lite-toggle [control]="pushNotifications"></lite-toggle>
      <lite-toggle [control]="emailNotifications"></lite-toggle>
      <lite-toggle [control]="smsNotifications"></lite-toggle>
    </div>
  `
})
```

### Feature Flags

```typescript
featureToggles = {
  betaFeatures: new FieldDto('Enable Beta Features', new FormControl(false)),
  analytics: new FieldDto('Enable Analytics', new FormControl(true)),
  experimental: new FieldDto('Experimental Mode', new FormControl(false))
};
```

### Privacy Controls

```typescript
privacySettings = {
  profilePublic: new FieldDto('Public Profile', new FormControl(false)),
  shareLocation: new FieldDto('Share Location', new FormControl(false)),
  showActivity: new FieldDto('Show Activity', new FormControl(true))
};
```

## Accessibility

- Keyboard navigation supported (Space/Enter to toggle)
- ARIA attributes for screen readers
- Focus indicators
- Required field indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
