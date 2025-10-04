# LiteSelect

## Description
Single-selection dropdown component with search functionality, filtering, and customizable options display. Perfect for choosing one option from a list.

## Features
- Search and filter options
- Keyboard navigation
- Custom option display
- Placeholder support
- Validation with error messages
- Floating label animation
- TypeScript-typed with generics
- Disabled and read-only states

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `SelectFieldDto<T>` | required | Field configuration with options |

### SelectFieldDto Class

```typescript
class SelectFieldDto<T = any> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T>;
}

abstract class BaseSelectFieldDto<T = any> {
  label: string;
  options: T[];
  displayWith: (option: T) => string;
}
```

## Examples

### Basic Select

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteSelect, SelectFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteSelect],
  template: `<lite-select [control]="countryField"></lite-select>`
})
export class ExampleComponent {
  countryField = new SelectFieldDto(
    'Country',
    new FormControl('', [Validators.required]),
    [
      { label: 'United States', value: 'US' },
      { label: 'Canada', value: 'CA' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Australia', value: 'AU' }
    ],
    (option) => option.label
  );
}
```

### With Object Values

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

productField = new SelectFieldDto<Product>(
  'Select Product',
  new FormControl<Product | null>(null, [Validators.required]),
  [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ],
  (product) => `${product.name} - $${product.price}`
);
```

### Simple String Options

```typescript
roleField = new SelectFieldDto(
  'Role',
  new FormControl(''),
  ['Administrator', 'Editor', 'Viewer'],
  (option) => option
);
```

