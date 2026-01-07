# LiteSlider

A modern range slider component for numeric input with visual feedback. Ideal for volume controls, price filters, ratings, and any numeric range selection.

## Features

- Smooth sliding interaction with visual progress bar
- Configurable min, max, and step values
- Custom value formatting
- Optional min/max range display
- Support for edit and view modes
- Form validation integration
- Required field indicators
- Helper text (hints)
- Real-time value display
- Fully styled with customizable appearance

## Basic Usage

```typescript
import { LiteSlider, SliderFieldDto } from 'ngx-lite-form';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LiteSlider],
  template: `
    <lite-slider [control]="volumeField"></lite-slider>
  `
})
export class MyComponent {
  volumeField = new SliderFieldDto(
    'Volume',
    new FormControl<number>(50, { nonNullable: true }),
    0,    // min
    100,  // max
    1     // step
  );
}
```

## Template Usage

```html
<!-- Basic slider -->
<lite-slider [control]="volumeField"></lite-slider>

<!-- Slider with custom range -->
<lite-slider [control]="priceField"></lite-slider>

<!-- View mode (read-only) -->
<lite-slider [control]="ratingField" [inEdit]="false"></lite-slider>
```

## Component Configuration

### SliderFieldDto Properties

```typescript
class SliderFieldDto {
  label: string;                           // Slider label text
  formControl: FormControl<number>;        // Numeric form control
  min?: number;                            // Minimum value (default: 0)
  max?: number;                            // Maximum value (default: 100)
  step?: number;                           // Step increment (default: 1)
  showMinMax?: boolean;                    // Show min/max labels (default: true)
  valueFormatter?: (value: number) => string;  // Custom value formatter
  hint?: string;                           // Optional helper text
}
```

## Examples

### Basic Slider (0-100)

```typescript
volumeField = new SliderFieldDto(
  'Volume',
  new FormControl<number>(50, { nonNullable: true }),
  0,
  100,
  1
);
```

```html
<lite-slider [control]="volumeField"></lite-slider>
```

### Price Range Slider with Custom Formatting

```typescript
priceField = new SliderFieldDto(
  'Price Range',
  new FormControl<number>(500, { nonNullable: true }),
  0,
  2000,
  50,
  true,
  (value) => `$${value.toLocaleString()}`
);
```

```html
<lite-slider [control]="priceField"></lite-slider>
```

### Temperature Slider

```typescript
temperatureField = new SliderFieldDto(
  'Temperature',
  new FormControl<number>(22, { nonNullable: true }),
  15,
  30,
  0.5,
  true,
  (value) => `${value}°C`
);
```

```html
<lite-slider [control]="temperatureField"></lite-slider>
```

### Percentage Slider

```typescript
opacityField = new SliderFieldDto(
  'Opacity',
  new FormControl<number>(75, { nonNullable: true }),
  0,
  100,
  5,
  true,
  (value) => `${value}%`
);
```

```html
<lite-slider [control]="opacityField"></lite-slider>
```

### Rating Slider (1-5 stars)

```typescript
ratingField = new SliderFieldDto(
  'Rating',
  new FormControl<number>(3, { nonNullable: true }),
  1,
  5,
  0.5,
  true,
  (value) => `${value} ★`
);
```

```html
<lite-slider [control]="ratingField"></lite-slider>
```

### Slider without Min/Max Display

```typescript
brightnessField = new SliderFieldDto(
  'Brightness',
  new FormControl<number>(70, { nonNullable: true }),
  0,
  100,
  1,
  false  // Hide min/max labels
);
```

```html
<lite-slider [control]="brightnessField"></lite-slider>
```

### Slider with Hint

```typescript
zoomField = new SliderFieldDto(
  'Zoom Level',
  new FormControl<number>(100, { nonNullable: true }),
  50,
  200,
  10,
  true,
  (value) => `${value}%`,
  'Adjust the zoom level for better visibility'
);
```

```html
<lite-slider [control]="zoomField"></lite-slider>
```

### Required Slider with Validation

```typescript
import { Validators } from '@angular/forms';

priorityField = new SliderFieldDto(
  'Priority Level',
  new FormControl<number>(5, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)]
  }),
  1,
  10,
  1
);
```

```html
<lite-slider [control]="priorityField"></lite-slider>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `SliderFieldDto` | Required | Field configuration with label and form control |
| `inEdit` | `boolean` | `true` | Enable/disable edit mode |

### SliderFieldDto Structure

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Slider label text |
| `formControl` | `FormControl<number>` | Yes | - | Numeric form control |
| `min` | `number` | No | `0` | Minimum value |
| `max` | `number` | No | `100` | Maximum value |
| `step` | `number` | No | `1` | Step increment |
| `showMinMax` | `boolean` | No | `true` | Show min/max labels |
| `valueFormatter` | `(value: number) => string` | No | - | Custom value formatter |
| `hint` | `string` | No | - | Helper text |

## Styling

The component uses BEM-style classes for customization:

```scss
.lite-slider {
  // Container styles
  
  &.in-edit {
    .slider-container {
      // Edit mode container
      
      .slider-header {
        // Header with label and value
        
        .slider-label {
          // Label text
        }
        
        .slider-value {
          // Current value display
        }
      }
      
      .slider-track-container {
        // Track container
        
        .slider-input {
          // Range input element
        }
        
        .slider-progress {
          // Progress bar fill
        }
      }
      
      .slider-range {
        // Min/max labels container
        
        .range-min, .range-max {
          // Min and max labels
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

The slider component integrates with Angular's reactive forms validation:

```typescript
import { Validators } from '@angular/forms';

ageField = new SliderFieldDto(
  'Age',
  new FormControl<number>(25, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(18),
      Validators.max(100)
    ]
  }),
  18,
  100,
  1
);
```

Error messages are automatically displayed when the slider is invalid and touched.

## Common Use Cases

### Audio/Video Controls

```typescript
@Component({
  template: `
    <div class="media-controls">
      <lite-slider [control]="volumeField"></lite-slider>
      <lite-slider [control]="balanceField"></lite-slider>
      <lite-slider [control]="bassField"></lite-slider>
    </div>
  `
})
export class MediaControlsComponent {
  volumeField = new SliderFieldDto('Volume', new FormControl(50), 0, 100, 1);
  balanceField = new SliderFieldDto('Balance', new FormControl(0), -100, 100, 1);
  bassField = new SliderFieldDto('Bass', new FormControl(0), -12, 12, 1);
}
```

### Filter Controls

```typescript
priceFilter = new SliderFieldDto(
  'Max Price',
  new FormControl(1000),
  0,
  5000,
  100,
  true,
  (value) => `$${value}`
);

distanceFilter = new SliderFieldDto(
  'Distance',
  new FormControl(10),
  1,
  50,
  1,
  true,
  (value) => `${value} km`
);
```

### Settings and Preferences

```typescript
fontSizeField = new SliderFieldDto(
  'Font Size',
  new FormControl(16),
  12,
  24,
  1,
  true,
  (value) => `${value}px`
);

lineHeightField = new SliderFieldDto(
  'Line Height',
  new FormControl(1.5),
  1.0,
  2.5,
  0.1,
  true,
  (value) => value.toFixed(1)
);
```

### Progress/Completion Tracking

```typescript
completionField = new SliderFieldDto(
  'Project Completion',
  new FormControl(65),
  0,
  100,
  5,
  true,
  (value) => `${value}%`
);
```

## Accessibility

- Keyboard navigation supported (Arrow keys to adjust value)
- ARIA attributes for screen readers
- Focus indicators
- Required field indicators
- Value announcements for screen readers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

- Use appropriate `step` values for smoother or more precise control
- Provide `valueFormatter` for better user experience with formatted values
- Set `showMinMax` to `false` for cleaner UI when range is obvious
- Use validation to enforce valid ranges
- Consider logarithmic scales for large ranges (implement in valueFormatter)
