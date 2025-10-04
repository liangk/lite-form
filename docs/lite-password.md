# LitePassword

## Description
Advanced password input component with toggle visibility, strength indicator, and comprehensive validation features. Includes built-in password strength analysis and security best practices.

## Features
- Password visibility toggle
- Real-time strength indicator with color coding
- Advanced password strength analysis
- Comprehensive validation rules
- Floating label animation
- Auto-focus support
- Custom validation messages
- TypeScript-typed with `FieldDto`
- ARIA-compliant for accessibility

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
  rows?: number;
  type?: 'text' | 'number';
}
```

Note: Password strength indicator is controlled by component input `[showStrengthIndicator]`.

### Password Strength Analysis

The component includes `FormUtils.analyzePasswordStrength()` which returns:

```typescript
{
  score: number;           // 0-7 based on various criteria
  level: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  feedback: string[];     // Array of improvement suggestions
}
```

## Examples

### Basic Password Input

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LitePassword, FieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LitePassword],
  template: `<lite-password [control]="passwordField"></lite-password>`
})
export class ExampleComponent {
  passwordField = new FieldDto(
    'Password',
    new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  );
}
```

### With Strength Indicator

```typescript
passwordField = new FieldDto(
  'Create Password',
  new FormControl('', [Validators.required])
);
```

```html
<lite-password [control]="passwordField" [showStrengthIndicator]="true"></lite-password>
```

### With Comprehensive Validation

```typescript
import { FormUtils } from 'ngx-lite-form';

passwordField = new FieldDto(
  'Password',
  new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    FormUtils.passwordValidator()  // Built-in password validator
  ])
);
```

```html
<lite-password [control]="passwordField" [showStrengthIndicator]="true"></lite-password>
```

### Programmatic Strength Analysis

```typescript
import { FormUtils } from 'ngx-lite-form';

analyzePassword(password: string) {
  const analysis = FormUtils.analyzePasswordStrength(password);
  
  console.log('Password Score:', analysis.score);        // 0-7
  console.log('Strength Level:', analysis.level);        // 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong'
  console.log('Feedback:', analysis.feedback);           // Array of suggestions
}
```

### Confirm Password Field

```typescript
passwordField = new FieldDto(
  'Password',
  new FormControl('', [Validators.required])
);

confirmPasswordField = new FieldDto(
  'Confirm Password',
  new FormControl('', [
    Validators.required,
    this.matchPasswordValidator()
  ])
);

matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== this.passwordField.formControl.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
```

## Styling

```scss
.lite-password-wrapper {
  // Container styles
}

.lite-password-wrapper__field {
  // Input field
}

.lite-password-wrapper__toggle {
  // Visibility toggle button
}

.lite-password-wrapper__strength {
  // Strength indicator container
}

.lite-password-wrapper__strength-bar {
  // Strength bar
  &--weak { background-color: #dc3545; }
  &--fair { background-color: #ffc107; }
  &--good { background-color: #17a2b8; }
  &--strong { background-color: #28a745; }
}
```

## Password Strength Levels

| Score | Level | Color | Description |
|-------|-------|-------|-------------|
| 0-20 | Weak | Red | Easily guessable |
| 21-40 | Fair | Orange | Somewhat weak |
| 41-60 | Good | Yellow | Adequate |
| 61-80 | Strong | Light Green | Good |
| 81-100 | Very Strong | Green | Excellent |

## Security Best Practices

The component follows these security recommendations:
- Minimum 8 characters
- Mix of uppercase and lowercase
- At least one number
- At least one special character
- No spaces
- Common password checking
