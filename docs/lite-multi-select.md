# LiteMultiSelect

## Description
Multi-selection dropdown component with inline display of selected items, search functionality, and dynamic height adjustment. Perfect for selecting multiple values from a list.

## Features
- Multiple selection with checkboxes
- Inline display of selected items
- Search and filter options
- Select all / Deselect all
- Remove individual selections
- Dynamic height adjustment
- Validation support
- TypeScript-typed with generics

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `MultiSelectFieldDto<T>` | required | Field configuration with options |

## Examples

### Basic Multi-Select

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteMultiSelect, MultiSelectFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteMultiSelect],
  template: `<lite-multi-select [control]="skillsField"></lite-multi-select>`
})
export class ExampleComponent {
  skillsField = new MultiSelectFieldDto(
    'Skills',
    new FormControl<string[]>([], [Validators.required]),
    ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue'],
    (option) => option
  );
}
```

### With Pre-selected Values

```typescript
categoriesField = new MultiSelectFieldDto(
  'Categories',
  new FormControl<string[]>(['tech', 'news']),
  ['Technology', 'News', 'Sports', 'Entertainment'],
  (option) => option
);
```

