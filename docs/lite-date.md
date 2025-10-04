# LiteDate

## Description
Advanced date picker component with single date and date range selection, custom formatting, and intelligent calendar positioning. Supports timezone-safe date handling.

## Features
- Single date selection
- Date range selection
- Custom date formatting
- Intelligent calendar positioning
- Min/max date constraints
- Disabled dates
- Keyboard navigation
- Timezone-safe handling
- Month/year navigation

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FieldDto` or `DateRangeFieldDto` | required | Field configuration |

### FieldDto Class

```typescript
class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;
  type?: 'text' | 'number';
}
```

### DateRangeFieldDto Interface

```typescript
interface DateRangeFieldDto extends Omit<FieldDto, 'formControl'> {
  formControl: FormControl<string[]>;
}
```

Note: Date format, min/max dates, and other date-specific options are controlled via component inputs like `[format]`, `[minDate]`, etc.

## Examples

### Basic Date Picker

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteDate, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteDate],
  template: `<lite-date [control]="birthdateField"></lite-date>`
})
export class ExampleComponent {
  birthdateField = new FieldDto(
    'Date of Birth',
    new FormControl(null, [Validators.required])
  );
}
```

### Date Range Picker

```typescript
import { DateRangeFieldDto } from 'ngx-lite-form';

dateRangeField: DateRangeFieldDto = {
  label: 'Select Date Range',
  formControl: new FormControl<string[]>(['', ''])
};
```

```html
<lite-date [control]="dateRangeField" [range]="true"></lite-date>
```

### With Date Constraints

```typescript
appointmentField = new FieldDto(
  'Appointment Date',
  new FormControl(null, [Validators.required])
);

minDate = new Date();  // Cannot select past dates
maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);  // Max 90 days ahead
```

```html
<lite-date [control]="appointmentField" [minDate]="minDate" [maxDate]="maxDate"></lite-date>
```

### Custom Date Format

```typescript
eventDateField = new FieldDto(
  'Event Date',
  new FormControl(null)
);
```

```html
<lite-date [control]="eventDateField" [format]="'dd/MM/yyyy'"></lite-date>
```

