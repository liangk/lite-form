# LiteBadge

## Description
A versatile badge and chip component for displaying status indicators, tags, and labels. Supports multiple color variants, sizes, removable chips, and icon integration. Perfect for status displays, tag systems, and visual indicators.

## Features
- 6 color variants (default, primary, success, warning, danger, info)
- 3 size options (small, medium, large)
- Removable chips with close button
- Icon support (SVG or HTML)
- Smooth hover and focus animations
- Accessible with ARIA labels
- TypeScript-typed with `BadgeFieldDto`
- Lightweight and performant

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `badge` | `BadgeFieldDto` | required | Badge configuration object containing label, variant, size, and options |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `remove` | `void` | Emitted when the remove button is clicked (only for removable badges) |

### BadgeFieldDto Class

```typescript
class BadgeFieldDto {
  label: string;
  variant?: BadgeVariant;  // 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: BadgeSize;        // 'small' | 'medium' | 'large'
  removable?: boolean;
  icon?: string;           // SVG or HTML string

  constructor(
    label: string,
    variant: BadgeVariant = 'default',
    size: BadgeSize = 'medium',
    removable: boolean = false,
    icon?: string
  )
}
```

## Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { LiteBadge, BadgeFieldDto } from 'lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteBadge],
  template: `<lite-badge [badge]="statusBadge"></lite-badge>`
})
export class ExampleComponent {
  statusBadge = new BadgeFieldDto('Active', 'success');
}
```

### Color Variants

```typescript
// Status indicators
activeBadge = new BadgeFieldDto('Active', 'success');
pendingBadge = new BadgeFieldDto('Pending', 'warning');
errorBadge = new BadgeFieldDto('Error', 'danger');
infoBadge = new BadgeFieldDto('Info', 'info');
primaryBadge = new BadgeFieldDto('Featured', 'primary');
defaultBadge = new BadgeFieldDto('Default', 'default');
```

```html
<lite-badge [badge]="activeBadge"></lite-badge>
<lite-badge [badge]="pendingBadge"></lite-badge>
<lite-badge [badge]="errorBadge"></lite-badge>
<lite-badge [badge]="infoBadge"></lite-badge>
<lite-badge [badge]="primaryBadge"></lite-badge>
<lite-badge [badge]="defaultBadge"></lite-badge>
```

### Different Sizes

```typescript
smallBadge = new BadgeFieldDto('Small', 'info', 'small');
mediumBadge = new BadgeFieldDto('Medium', 'primary', 'medium');
largeBadge = new BadgeFieldDto('Large', 'success', 'large');
```

```html
<lite-badge [badge]="smallBadge"></lite-badge>
<lite-badge [badge]="mediumBadge"></lite-badge>
<lite-badge [badge]="largeBadge"></lite-badge>
```

### Removable Chips (Tags)

```typescript
import { signal } from '@angular/core';

tags = signal<BadgeFieldDto[]>([
  new BadgeFieldDto('Angular', 'primary', 'medium', true),
  new BadgeFieldDto('TypeScript', 'info', 'medium', true),
  new BadgeFieldDto('RxJS', 'success', 'medium', true)
]);

removeTag(index: number) {
  this.tags.update(current => current.filter((_, i) => i !== index));
}
```

```html
@for (tag of tags(); track $index) {
  <lite-badge [badge]="tag" (remove)="removeTag($index)"></lite-badge>
}
```

### With Icons

```typescript
// Star icon badge
starBadge = new BadgeFieldDto(
  'Featured',
  'warning',
  'medium',
  false,
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
);

// Checkmark icon badge (removable)
verifiedBadge = new BadgeFieldDto(
  'Verified',
  'success',
  'medium',
  true,
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
);
```

```html
<lite-badge [badge]="starBadge"></lite-badge>
<lite-badge [badge]="verifiedBadge" (remove)="onRemove()"></lite-badge>
```

### Dynamic Badge List

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiteBadge, BadgeFieldDto } from 'lite-form';

@Component({
  selector: 'app-tag-manager',
  standalone: true,
  imports: [CommonModule, LiteBadge],
  template: `
    <div class="tag-container">
      @for (tag of tags(); track $index) {
        <lite-badge [badge]="tag" (remove)="removeTag($index)"></lite-badge>
      }
    </div>
  `,
  styles: [`
    .tag-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `]
})
export class TagManagerComponent {
  tags = signal<BadgeFieldDto[]>([
    new BadgeFieldDto('JavaScript', 'warning', 'medium', true),
    new BadgeFieldDto('Python', 'info', 'medium', true),
    new BadgeFieldDto('Java', 'danger', 'medium', true),
    new BadgeFieldDto('C++', 'primary', 'medium', true)
  ]);

  removeTag(index: number) {
    this.tags.update(tags => tags.filter((_, i) => i !== index));
    console.log(`Tag removed at index ${index}`);
  }
}
```

## Use Cases

### Status Indicators
Display the current state of items, processes, or users:
```typescript
orderStatus = new BadgeFieldDto('Shipped', 'success');
paymentStatus = new BadgeFieldDto('Pending', 'warning');
accountStatus = new BadgeFieldDto('Suspended', 'danger');
```

### Category Tags
Show categories or classifications:
```typescript
categories = [
  new BadgeFieldDto('Technology', 'primary', 'small'),
  new BadgeFieldDto('Design', 'info', 'small'),
  new BadgeFieldDto('Business', 'success', 'small')
];
```

### User Skills/Tags
Display user skills or interests as removable chips:
```typescript
skills = signal([
  new BadgeFieldDto('Angular', 'primary', 'medium', true),
  new BadgeFieldDto('React', 'info', 'medium', true),
  new BadgeFieldDto('Vue', 'success', 'medium', true)
]);
```

### Notification Counts
Show counts or new items:
```typescript
notificationBadge = new BadgeFieldDto('5 New', 'danger', 'small');
messagesBadge = new BadgeFieldDto('12', 'primary', 'small');
```

## Styling

The component uses the following CSS classes that can be customized:

- `.lite-badge` - Main badge container
- `.badge-{variant}` - Variant-specific styling (default, primary, success, warning, danger, info)
- `.badge-{size}` - Size-specific styling (small, medium, large)
- `.badge-removable` - Applied when badge is removable
- `.badge-icon` - Icon container
- `.badge-label` - Label text
- `.badge-remove` - Remove button

### Custom Styling Example

```scss
// Override badge colors
.badge-primary {
  background: #007bff;
  border-color: #0056b3;
}

// Adjust badge sizes
.badge-large {
  padding: 8px 16px;
  font-size: 1.1em;
}

// Custom hover effects
.lite-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

## Accessibility

- Remove buttons include `aria-label` attributes
- Keyboard navigation support with focus states
- Proper color contrast ratios for all variants
- Screen reader friendly

## Best Practices

1. **Choose appropriate variants** - Use semantic colors (success for positive, danger for negative)
2. **Keep labels concise** - Short, descriptive text works best
3. **Use consistent sizing** - Stick to one size within a context
4. **Provide feedback** - Show snackbar or message when chips are removed
5. **Limit icon complexity** - Simple, recognizable icons work best
6. **Group related badges** - Use flex containers with appropriate gaps

## Browser Support

Works in all modern browsers that support:
- CSS Flexbox
- CSS Transitions
- SVG rendering
