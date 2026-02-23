# LiteTime

A modern time picker component for selecting hours and minutes. Ideal for appointment scheduling, alarm settings, and any time input requirement.

## Features

- Interactive time picker with hour/minute selection
- Quick action buttons: "Now" and "Clear"
- Floating label with smooth transitions
- Format customization (HH:mm)
- Support for edit and view modes
- Form validation integration
- Required field indicators
- Helper text (hints)
- Automatic positioning (top/bottom)
- Fully styled with customizable appearance

## Basic Usage

```typescript
import { LiteTime, TimeFieldDto } from 'ngx-lite-form';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LiteTime],
  template: `
    <lite-time [control]="meetingTimeField"></lite-time>
  `
})
export class MyComponent {
  meetingTimeField = new TimeFieldDto(
    'Meeting Time',
    new FormControl<string>('09:00', { nonNullable: true }),
    'HH:mm',
    'Select the meeting start time'
  );
}
```

## Template Usage

```html
<!-- Basic time picker -->
<lite-time [control]="meetingTimeField"></lite-time>

<!-- Time picker with custom format -->
<lite-time [control]="alarmTimeField"></lite-time>

<!-- View mode (read-only) -->
<lite-time [control]="appointmentField" [inEdit]="false"></lite-time>
```

## Component Configuration

### TimeFieldDto Properties

```typescript
class TimeFieldDto {
  label: string;                      // Time picker label text
  formControl: FormControl<string>;   // String form control (HH:mm format)
  format?: string;                    // Time format (default: 'HH:mm')
  hint?: string;                      // Optional helper text
}
```

## Examples

### Basic Time Picker

```typescript
meetingTimeField = new TimeFieldDto(
  'Meeting Time',
  new FormControl<string>('09:00', { nonNullable: true }),
  'HH:mm',
  'Select the meeting start time'
);
```

```html
<lite-time [control]="meetingTimeField"></lite-time>
```

### Alarm Time

```typescript
alarmTimeField = new TimeFieldDto(
  'Daily Alarm',
  new FormControl<string>('07:30', { nonNullable: true }),
  'HH:mm',
  'Set your daily wake-up alarm'
);
```

```html
<lite-time [control]="alarmTimeField"></lite-time>
```

### Empty Initial Value

```typescript
appointmentField = new TimeFieldDto(
  'Appointment Time',
  new FormControl<string>('', { nonNullable: true }),
  'HH:mm',
  'Choose your preferred appointment time'
);
```

```html
<lite-time [control]="appointmentField"></lite-time>
```

### Required Time with Validation

```typescript
import { Validators } from '@angular/forms';

startTimeField = new TimeFieldDto(
  'Start Time',
  new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  'HH:mm',
  'Required field'
);
```

```html
<lite-time [control]="startTimeField"></lite-time>
```

### Opening Hours

```typescript
openingTimeField = new TimeFieldDto(
  'Opening Time',
  new FormControl<string>('09:00', { nonNullable: true }),
  'HH:mm',
  'Store opening time'
);

closingTimeField = new TimeFieldDto(
  'Closing Time',
  new FormControl<string>('17:00', { nonNullable: true }),
  'HH:mm',
  'Store closing time'
);
```

```html
<div class="business-hours">
  <lite-time [control]="openingTimeField"></lite-time>
  <lite-time [control]="closingTimeField"></lite-time>
</div>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `TimeFieldDto` | Required | Field configuration with label and form control |
| `inEdit` | `boolean` | `true` | Enable/disable edit mode |

### TimeFieldDto Structure

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Time picker label text |
| `formControl` | `FormControl<string>` | Yes | - | String form control (format: HH:mm) |
| `format` | `string` | No | `'HH:mm'` | Time display format |
| `hint` | `string` | No | - | Helper text |

## Time Picker Interactions

### Quick Actions

- **Now Button**: Sets the current time
- **Clear Button**: Clears the selected time

### Hour/Minute Selection

- Click on hours (00-23) to select
- Click on minutes (00, 05, 10, ..., 55) to select in 5-minute increments
- Scrollable lists for easy navigation

### Automatic Positioning

The picker automatically positions itself:
- Below the input if there's space
- Above the input if near bottom of viewport

## Styling

The component uses BEM-style classes for customization:

```scss
.lite-time {
  // Container styles
  
  &.in-edit {
    .label {
      // Floating label
      
      &.float {
        // Floated label state
      }
    }
    
    input {
      // Time input field
      
      &:focus {
        // Focused input
      }
      
      &.invalid {
        // Invalid state
      }
    }
    
    .calendar_icon {
      // Clock icon
    }
    
    .calendar-overlay {
      // Picker overlay
      
      &.position-top {
        // Top-positioned picker
      }
      
      .time-picker {
        // Picker panel
        
        .time-column {
          // Hour/minute column
          
          .time-header {
            // Column header
          }
          
          .time-list {
            // Scrollable list
            
            .time-option {
              // Individual time option
              
              &.selected {
                // Selected option
              }
            }
          }
        }
        
        .time-actions {
          // Action buttons container
          
          .time-action-btn {
            // Now/Clear buttons
          }
        }
      }
    }
    
    .hint {
      // Helper text
    }
  }
  
  &.invalid {
    // Invalid/error state
  }
}
```

## Validation

The time component integrates with Angular's reactive forms validation:

```typescript
import { Validators } from '@angular/forms';

// Required time
requiredTimeField = new TimeFieldDto(
  'Required Time',
  new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  'HH:mm'
);

// Custom time validation
function timeRangeValidator(min: string, max: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    if (value < min || value > max) {
      return { timeRange: { min, max, actual: value } };
    }
    return null;
  };
}

businessHoursField = new TimeFieldDto(
  'Business Hours',
  new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      timeRangeValidator('08:00', '18:00')
    ]
  }),
  'HH:mm',
  'Must be between 08:00 and 18:00'
);
```

Error messages are automatically displayed when the time picker is invalid and touched.

## Common Use Cases

### Appointment Scheduling

```typescript
@Component({
  template: `
    <form [formGroup]="appointmentForm">
      <lite-time [control]="appointmentTimeField"></lite-time>
    </form>
  `
})
export class AppointmentComponent {
  appointmentForm = new FormGroup({
    time: new FormControl<string>('', [Validators.required])
  });
  
  appointmentTimeField = new TimeFieldDto(
    'Appointment Time',
    this.appointmentForm.controls.time,
    'HH:mm',
    'Select your preferred time slot'
  );
}
```

### Event Registration

```typescript
startTimeField = new TimeFieldDto(
  'Event Start',
  new FormControl<string>('10:00'),
  'HH:mm',
  'Event start time'
);

endTimeField = new TimeFieldDto(
  'Event End',
  new FormControl<string>('12:00'),
  'HH:mm',
  'Event end time'
);
```

### Reminder Settings

```typescript
reminderTimeField = new TimeFieldDto(
  'Daily Reminder',
  new FormControl<string>('14:00'),
  'HH:mm',
  'Set a daily reminder time'
);
```

### Work Shift Schedule

```typescript
shiftStartField = new TimeFieldDto(
  'Shift Start',
  new FormControl<string>('09:00'),
  'HH:mm'
);

shiftEndField = new TimeFieldDto(
  'Shift End',
  new FormControl<string>('17:00'),
  'HH:mm'
);

breakTimeField = new TimeFieldDto(
  'Break Time',
  new FormControl<string>('12:00'),
  'HH:mm'
);
```

## Accessibility

- Keyboard navigation supported
- ARIA attributes for screen readers
- Focus indicators
- Required field indicators
- Clear visual feedback for selection
- Error message announcements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

- Use `'HH:mm'` format for standard 24-hour time
- Provide helpful hints for context (e.g., timezone information)
- Use validation to enforce business hours or valid time ranges
- The "Now" button is helpful for quick current time selection
- The "Clear" button allows users to reset their selection
- Minutes are displayed in 5-minute increments for easier selection
- The picker automatically closes when clicking outside
- Consider using custom validators for time range validation

## Form Integration

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="scheduleForm">
      <lite-time [control]="morningAlarmField"></lite-time>
      <lite-time [control]="eveningAlarmField"></lite-time>
      <button (click)="saveSchedule()">Save</button>
    </form>
  `
})
export class ScheduleComponent {
  scheduleForm = new FormGroup({
    morningAlarm: new FormControl<string>('07:00', [Validators.required]),
    eveningAlarm: new FormControl<string>('22:00', [Validators.required])
  });
  
  morningAlarmField = new TimeFieldDto(
    'Morning Alarm',
    this.scheduleForm.controls.morningAlarm,
    'HH:mm'
  );
  
  eveningAlarmField = new TimeFieldDto(
    'Evening Alarm',
    this.scheduleForm.controls.eveningAlarm,
    'HH:mm'
  );
  
  saveSchedule() {
    if (this.scheduleForm.valid) {
      console.log('Schedule:', this.scheduleForm.value);
    }
  }
}
```
