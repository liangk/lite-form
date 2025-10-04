# LiteCheckbox

## Description
Checkbox component for boolean input with validation support. Simple and accessible checkbox implementation with TypeScript typing.

## Features
- Boolean value binding
- Validation support
- Disabled state
- Custom label
- TypeScript-typed
- ARIA-compliant

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` | required | Field configuration |

## Examples

### Basic Checkbox

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteCheckbox, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteCheckbox],
  template: `<lite-checkbox [control]="agreeField"></lite-checkbox>`
})
export class ExampleComponent {
  agreeField = new FieldDto(
    'I agree to the terms and conditions',
    new FormControl(false, [Validators.requiredTrue])
  );
}
```

### Multiple Checkboxes

```typescript
newsletterField = new FieldDto(
  'Subscribe to newsletter',
  new FormControl(true)
);

notificationsField = new FieldDto(
  'Enable notifications',
  new FormControl(false)
);
```

