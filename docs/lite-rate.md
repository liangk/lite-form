# LiteRate

A modern star rating component for collecting user feedback and displaying ratings. Ideal for product reviews, service ratings, and any rating-based input.

## Features

- Interactive star rating with click-to-select
- Multiple color variants (default, primary, success, danger, info)
- Readonly mode for displaying ratings
- Configurable maximum stars (default: 5)
- Toggle behavior (click same star to clear)
- Support for edit and view modes
- Form validation integration
- Required field indicators
- Helper text (hints)
- Fully styled with customizable appearance

## Basic Usage

```typescript
import { LiteRate, RateFieldDto } from 'ngx-lite-form';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LiteRate],
  template: `
    <lite-rate [control]="ratingField"></lite-rate>
  `
})
export class MyComponent {
  ratingField = new RateFieldDto(
    'Rating',
    new FormControl<number>(0, { nonNullable: true }),
    5,
    false,
    'default',
    'Rate your experience from 1 to 5 stars'
  );
}
```

## Template Usage

```html
<!-- Basic rating -->
<lite-rate [control]="ratingField"></lite-rate>

<!-- Readonly rating display -->
<lite-rate [control]="averageRatingField" [inEdit]="false"></lite-rate>

<!-- Rating with custom variant -->
<lite-rate [control]="qualityRatingField"></lite-rate>
```

## Component Configuration

### RateFieldDto Properties

```typescript
class RateFieldDto {
  label: string;                      // Rating label text
  formControl: FormControl<number>;   // Numeric form control (0 = not rated)
  max?: number;                       // Maximum number of stars (default: 5)
  readonly?: boolean;                 // Readonly mode (default: false)
  variant?: RateVariant;              // Color variant (default: 'default')
  hint?: string;                      // Optional helper text
}

type RateVariant = 'default' | 'primary' | 'success' | 'danger' | 'info';
```

## Examples

### Basic Rating (Default)

```typescript
productRatingField = new RateFieldDto(
  'Product Rating',
  new FormControl<number>(0, { nonNullable: true }),
  5,
  false,
  'default',
  'Rate this product'
);
```

```html
<lite-rate [control]="productRatingField"></lite-rate>
```

### Readonly Rating Display

```typescript
averageRatingField = new RateFieldDto(
  'Average Rating',
  new FormControl<number>(4, { nonNullable: true }),
  5,
  true,
  'info',
  'Customer satisfaction rating'
);
```

```html
<lite-rate [control]="averageRatingField"></lite-rate>
```

### Success Variant Rating

```typescript
qualityRatingField = new RateFieldDto(
  'Quality Rating',
  new FormControl<number>(3, { nonNullable: true }),
  5,
  false,
  'success',
  'How would you rate the quality?'
);
```

```html
<lite-rate [control]="qualityRatingField"></lite-rate>
```

### Danger Variant Rating

```typescript
urgencyRatingField = new RateFieldDto(
  'Urgency Level',
  new FormControl<number>(5, { nonNullable: true }),
  5,
  false,
  'danger',
  'How urgent is this issue?'
);
```

```html
<lite-rate [control]="urgencyRatingField"></lite-rate>
```

### Primary Variant Rating

```typescript
importanceRatingField = new RateFieldDto(
  'Importance',
  new FormControl<number>(4, { nonNullable: true }),
  5,
  false,
  'primary',
  'Rate the importance of this feature'
);
```

```html
<lite-rate [control]="importanceRatingField"></lite-rate>
```

### Custom Maximum Stars

```typescript
tenStarRatingField = new RateFieldDto(
  'Overall Experience',
  new FormControl<number>(0, { nonNullable: true }),
  10,
  false,
  'default',
  'Rate from 1 to 10'
);
```

```html
<lite-rate [control]="tenStarRatingField"></lite-rate>
```

### Required Rating with Validation

```typescript
import { Validators } from '@angular/forms';

requiredRatingField = new RateFieldDto(
  'Required Rating',
  new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)]
  }),
  5,
  false,
  'default',
  'Please provide a rating'
);
```

```html
<lite-rate [control]="requiredRatingField"></lite-rate>
```

### Minimum Rating Validation

```typescript
minimumRatingField = new RateFieldDto(
  'Minimum 3 Stars',
  new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(3)]
  }),
  5,
  false,
  'success',
  'Minimum rating of 3 stars required'
);
```

```html
<lite-rate [control]="minimumRatingField"></lite-rate>
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `RateFieldDto` | Required | Field configuration with label and form control |
| `inEdit` | `boolean` | `true` | Enable/disable edit mode |

### RateFieldDto Structure

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Rating label text |
| `formControl` | `FormControl<number>` | Yes | - | Numeric form control (0 = not rated) |
| `max` | `number` | No | `5` | Maximum number of stars |
| `readonly` | `boolean` | No | `false` | Readonly mode for display only |
| `variant` | `RateVariant` | No | `'default'` | Color variant for stars |
| `hint` | `string` | No | - | Helper text |

### Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `default` | Yellow | Standard ratings (⭐) |
| `primary` | Blue | Feature importance, priority |
| `success` | Green | Quality, satisfaction, positive feedback |
| `danger` | Red | Urgency, critical issues, negative feedback |
| `info` | Cyan | Information, neutral ratings |

## Rating Interactions

### Click Behavior

- Click on a star to set rating (1-5 or 1-max)
- Click on the same star again to clear rating (set to 0)
- Stars highlight on hover for visual feedback
- Disabled in readonly mode

### Value Representation

- `0` = Not rated / No selection
- `1` to `max` = Star rating value

## Styling

The component uses BEM-style classes for customization:

```scss
.lite-rate {
  // Container styles
  
  &.in-edit {
    .rate-container {
      // Rating container
      
      .label {
        // Rating label
      }
      
      .stars {
        // Stars container
        
        .star {
          // Individual star button
          
          &.filled {
            // Filled star
          }
          
          &.variant-default.filled {
            // Default variant (yellow)
          }
          
          &.variant-primary.filled {
            // Primary variant (blue)
          }
          
          &.variant-success.filled {
            // Success variant (green)
          }
          
          &.variant-danger.filled {
            // Danger variant (red)
          }
          
          &.variant-info.filled {
            // Info variant (cyan)
          }
        }
      }
    }
    
    .hint {
      // Helper text
    }
  }
  
  &.readonly {
    // Readonly mode
  }
  
  &.invalid {
    // Invalid/error state
  }
}
```

## Validation

The rating component integrates with Angular's reactive forms validation:

```typescript
import { Validators } from '@angular/forms';

// Required rating (must select at least 1 star)
requiredRating = new RateFieldDto(
  'Required Rating',
  new FormControl<number>(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(1)
    ]
  }),
  5
);

// Minimum rating requirement
minimumThreeStars = new RateFieldDto(
  'Minimum 3 Stars',
  new FormControl<number>(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(3),
      Validators.max(5)
    ]
  }),
  5,
  false,
  'success',
  'Please rate at least 3 stars'
);

// Custom validation
function minimumRatingValidator(minStars: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === 0) {
      return { required: true };
    }
    if (value < minStars) {
      return { minimumRating: { min: minStars, actual: value } };
    }
    return null;
  };
}
```

Error messages are automatically displayed when the rating is invalid and touched.

## Common Use Cases

### Product Review Form

```typescript
@Component({
  template: `
    <form [formGroup]="reviewForm">
      <lite-rate [control]="overallRatingField"></lite-rate>
      <lite-rate [control]="qualityRatingField"></lite-rate>
      <lite-rate [control]="valueRatingField"></lite-rate>
      <lite-rate [control]="deliveryRatingField"></lite-rate>
      <button (click)="submitReview()">Submit Review</button>
    </form>
  `
})
export class ProductReviewComponent {
  reviewForm = new FormGroup({
    overall: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    quality: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    value: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    delivery: new FormControl<number>(0, [Validators.required, Validators.min(1)])
  });
  
  overallRatingField = new RateFieldDto(
    'Overall Rating',
    this.reviewForm.controls.overall,
    5,
    false,
    'default'
  );
  
  qualityRatingField = new RateFieldDto(
    'Quality',
    this.reviewForm.controls.quality,
    5,
    false,
    'success'
  );
  
  valueRatingField = new RateFieldDto(
    'Value for Money',
    this.reviewForm.controls.value,
    5,
    false,
    'primary'
  );
  
  deliveryRatingField = new RateFieldDto(
    'Delivery Speed',
    this.reviewForm.controls.delivery,
    5,
    false,
    'info'
  );
  
  submitReview() {
    if (this.reviewForm.valid) {
      console.log('Review:', this.reviewForm.value);
    }
  }
}
```

### Service Feedback

```typescript
serviceSatisfactionField = new RateFieldDto(
  'Service Satisfaction',
  new FormControl<number>(0),
  5,
  false,
  'success',
  'How satisfied are you with our service?'
);

supportQualityField = new RateFieldDto(
  'Support Quality',
  new FormControl<number>(0),
  5,
  false,
  'primary',
  'Rate the quality of customer support'
);
```

### Content Rating

```typescript
articleHelpfulField = new RateFieldDto(
  'Was this helpful?',
  new FormControl<number>(0),
  5,
  false,
  'default',
  'Rate how helpful this article was'
);
```

### Readonly Rating Display

```typescript
@Component({
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <lite-rate [control]="productRatingField" [inEdit]="false"></lite-rate>
      <p>{{ product.reviewCount }} reviews</p>
    </div>
  `
})
export class ProductCardComponent {
  product = {
    name: 'Sample Product',
    rating: 4.5,
    reviewCount: 128
  };
  
  productRatingField = new RateFieldDto(
    'Customer Rating',
    new FormControl<number>(Math.round(this.product.rating)),
    5,
    true,
    'default'
  );
}
```

### Difficulty Level

```typescript
difficultyField = new RateFieldDto(
  'Difficulty Level',
  new FormControl<number>(3),
  5,
  false,
  'danger',
  'Rate the difficulty (1=Easy, 5=Hard)'
);
```

### Priority Rating

```typescript
priorityField = new RateFieldDto(
  'Priority',
  new FormControl<number>(0),
  5,
  false,
  'danger',
  'Set task priority level'
);
```

## Accessibility

- Keyboard navigation supported
- ARIA attributes for screen readers
- Focus indicators
- Required field indicators
- Clear visual feedback for selection
- Error message announcements
- Disabled state for readonly mode

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips

- Use `default` variant (yellow) for standard ratings
- Use `success` variant (green) for quality or positive metrics
- Use `danger` variant (red) for urgency or critical ratings
- Use `primary` variant (blue) for importance or priority
- Use `info` variant (cyan) for neutral or informational ratings
- Set `readonly` to `true` for displaying existing ratings without allowing changes
- Use validation to require minimum ratings when needed
- The toggle behavior (clicking same star clears rating) allows users to deselect
- Consider using 5 stars as the standard, but customize `max` for specific use cases
- Provide clear hints to explain the rating scale
- For displaying fractional ratings (e.g., 4.5 stars), round to nearest integer for this component

## Form Integration

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="feedbackForm">
      <lite-rate [control]="serviceRatingField"></lite-rate>
      <lite-rate [control]="productRatingField"></lite-rate>
      <lite-rate [control]="recommendationField"></lite-rate>
      <button (click)="submitFeedback()" [disabled]="feedbackForm.invalid">
        Submit Feedback
      </button>
    </form>
  `
})
export class FeedbackComponent {
  feedbackForm = new FormGroup({
    service: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    product: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    recommendation: new FormControl<number>(0, [Validators.required, Validators.min(1)])
  });
  
  serviceRatingField = new RateFieldDto(
    'Service Quality',
    this.feedbackForm.controls.service,
    5,
    false,
    'success',
    'Rate our service quality'
  );
  
  productRatingField = new RateFieldDto(
    'Product Quality',
    this.feedbackForm.controls.product,
    5,
    false,
    'default',
    'Rate the product quality'
  );
  
  recommendationField = new RateFieldDto(
    'Likelihood to Recommend',
    this.feedbackForm.controls.recommendation,
    5,
    false,
    'primary',
    'How likely are you to recommend us?'
  );
  
  submitFeedback() {
    if (this.feedbackForm.valid) {
      console.log('Feedback:', this.feedbackForm.value);
      // Submit to backend
    }
  }
}
```

## Rating Value Mapping

```typescript
// Map numeric rating to text
function getRatingText(rating: number): string {
  const labels = ['Not rated', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  return labels[rating] || 'Not rated';
}

// Use in component
console.log(getRatingText(4)); // "Very Good"
```

## Comparison with LiteSlider

- **LiteRate**: Best for discrete ratings (1-5 stars), visual feedback
- **LiteSlider**: Best for continuous numeric ranges with fine-grained control

Choose LiteRate when:
- You need visual star-based ratings
- Discrete values (1, 2, 3, 4, 5) are preferred
- User feedback and reviews are the primary use case

Choose LiteSlider when:
- You need a continuous range of values
- Precise numeric input is required (e.g., 0-100)
- The context is settings, filters, or measurements
