# LiteTextarea

## Description
Multi-line text input component with auto-resize capabilities, floating labels, and validation support. Perfect for comments, descriptions, and longer text entries.

## Features
- Auto-resize based on content
- Floating label animation
- Character count display
- Validation with error messages
- Read-only and disabled states
- Configurable rows
- Maximum length support
- TypeScript-typed with `FieldDto`

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` | required | Field configuration object |

### FieldDto Class

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;  // Number of visible text lines
  type?: 'text' | 'number';
}
```

## Examples

### Basic Textarea

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteTextarea, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteTextarea],
  template: `<lite-textarea [control]="bioField"></lite-textarea>`
})
export class ExampleComponent {
  bioField = new FieldDto(
    'Biography',
    new FormControl('', [Validators.required])
  );
}
```

### With Character Limit

```typescript
descriptionField = new FieldDto(
  'Description',
  new FormControl('', [Validators.maxLength(500)])
);
```

### Custom Rows

```typescript
commentField = new FieldDto(
  'Comment',
  new FormControl(''),
  5  // Number of visible rows
);
```

### Disabled State

```typescript
displayField = new FieldDto(
  'Note',
  new FormControl({ value: 'This is a read-only note.', disabled: true })
);
```

