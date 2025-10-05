# LiteDateTime

## Description
Date and time picker component with timezone-safe handling and consistent formatting utilities. Perfect for scheduling and timestamp selection.

## Features
- Combined date and time selection
- Timezone-safe handling
- 12-hour and 24-hour formats
- Minute step configuration
- Custom formatting
- Validation support
- TypeScript-typed

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` | required | Field configuration |

### FieldDto Class

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;
  type?: 'text' | 'number';
}
```

Note: Time format and minute step options are controlled via component inputs like `[use24Hour]`, `[minuteStep]`, etc.

## Examples

### Basic DateTime Picker

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteDateTime, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteDateTime],
  template: `<lite-datetime [control]="meetingField"></lite-datetime>`
})
export class ExampleComponent {
  meetingField = new FieldDto(
    'Meeting Time',
    new FormControl(null, [Validators.required])
  );
}
```

### 24-Hour Format

```typescript
scheduleField = new FieldDto(
  'Schedule',
  new FormControl(null)
);
```

```html
<lite-datetime [control]="scheduleField" [use24Hour]="true"></lite-datetime>
```

### Custom Minute Steps

```typescript
appointmentField = new FieldDto(
  'Appointment',
  new FormControl(null)
);
```

```html
<lite-datetime [control]="appointmentField" [minuteStep]="15"></lite-datetime>
```

