# LiteInput

## Description
A fully-featured text input component with floating labels, validation support, and customizable styling. Built with Angular's Reactive Forms integration for seamless form management.

## Features
- Floating label animation
- Built-in validation with error message display
- Read-only and disabled states
- Auto-focus support
- Customizable placeholder text
- TypeScript-typed with `FieldDto`
- ARIA-compliant for accessibility
- Smooth animations and transitions

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` | required | Field configuration object containing FormControl, label, and options |

### FieldDto Class

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;
  type?: 'text' | 'number';
}
```

## Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteInput, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteInput],
  template: `<lite-input [control]="nameField"></lite-input>`
})
export class ExampleComponent {
  nameField = new FieldDto(
    'Full Name',
    new FormControl('', [Validators.required, Validators.minLength(3)])
  );
}
```

### With Validation

```typescript
emailField = new FieldDto(
  'Email Address',
  new FormControl('', [Validators.required, Validators.email])
);
```

### Number Input

```typescript
ageField = new FieldDto(
  'Age',
  new FormControl(0, [Validators.required, Validators.min(0)]),
  2,
  'number'
);
```

### Disabled State

```typescript
lockedField = new FieldDto(
  'Username',
  new FormControl({ value: 'john_doe', disabled: true })
);
```
