# LiteRadio

## Description
Radio button group component for single selection from multiple options. Clean and accessible radio group implementation.

## Features
- Single selection from multiple options
- Horizontal or vertical layout
- Validation support
- Disabled state
- Custom option values
- TypeScript-typed with generics

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `RadioFieldDto<T>` | required | Field configuration with options |

### RadioFieldDto Class

```typescript
class RadioFieldDto<T = any> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T>;
}

abstract class BaseSelectFieldDto<T = any> {
  label: string;
  options: T[];
  displayWith: (option: T) => string;
}
```

## Examples

### Basic Radio Group

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteRadio, RadioFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteRadio],
  template: `<lite-radio [control]="genderField"></lite-radio>`
})
export class ExampleComponent {
  genderField = new RadioFieldDto(
    'Gender',
    new FormControl('', [Validators.required]),
    [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ],
    (option) => option.label
  );
}
```

### With Pre-selected Value

```typescript
planField = new RadioFieldDto(
  'Subscription Plan',
  new FormControl('monthly'),
  [
    { label: 'Monthly - $9.99/month', value: 'monthly' },
    { label: 'Yearly - $99/year', value: 'yearly' }
  ],
  (option) => option.label
);
```

