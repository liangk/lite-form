# LiteSnackbar

## Description
Toast notification service for displaying temporary messages to users. Supports multiple variants (done, warn, error) with automatic dismissal and customizable duration.

## Features
- Three message variants: done, warn, error
- Automatic dismissal with configurable duration
- Manual dismissal option
- Queue management for multiple messages
- Service-based API (injectable)
- Animated slide-in/out transitions
- Customizable positioning
- Icon support

## API

### Service Methods

```typescript
class LiteSnackbarService {
  show(message: string, variant?: 'done' | 'warn' | 'error', duration?: number): void;
  dismiss(): void;
}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | `string` | required | Message to display |
| `variant` | `'done' \| 'warn' \| 'error'` | `'done'` | Message type/color |
| `duration` | `number` | `3000` | Duration in milliseconds (0 = manual dismiss) |

## Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { LiteSnackbarService } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <button (click)="showSuccess()">Show Success</button>
    <button (click)="showWarning()">Show Warning</button>
    <button (click)="showError()">Show Error</button>
  `
})
export class ExampleComponent {
  constructor(private snackbar: LiteSnackbarService) {}
  
  showSuccess() {
    this.snackbar.show('Operation completed successfully!', 'done');
  }
  
  showWarning() {
    this.snackbar.show('Please check your input.', 'warn');
  }
  
  showError() {
    this.snackbar.show('An error occurred. Please try again.', 'error');
  }
}
```

### Custom Duration

```typescript
// Show for 5 seconds
this.snackbar.show('Processing...', 'done', 5000);

// Show until manually dismissed
this.snackbar.show('Important message', 'warn', 0);

// Manually dismiss
this.snackbar.dismiss();
```

### With Form Submission

```typescript
submitForm() {
  if (this.form.invalid) {
    this.snackbar.show('Please fill in all required fields.', 'error');
    return;
  }
  
  this.http.post('/api/save', this.form.value).subscribe({
    next: () => {
      this.snackbar.show('Data saved successfully!', 'done');
    },
    error: () => {
      this.snackbar.show('Failed to save data.', 'error');
    }
  });
}
```

### With File Upload

```typescript
uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  this.snackbar.show('Uploading file...', 'done', 0);
  
  this.http.post('/api/upload', formData).subscribe({
    next: () => {
      this.snackbar.dismiss();
      this.snackbar.show('File uploaded successfully!', 'done');
    },
    error: () => {
      this.snackbar.dismiss();
      this.snackbar.show('Upload failed. Please try again.', 'error');
    }
  });
}
```

### Multiple Messages

```typescript
// Messages are queued automatically
this.snackbar.show('Step 1 complete', 'done');
this.snackbar.show('Step 2 complete', 'done');
this.snackbar.show('Step 3 complete', 'done');
// Each message will display in sequence
```

### Integration with CRUD Operations

```typescript
createUser(userData: any) {
  this.http.post('/api/users', userData).subscribe({
    next: () => this.snackbar.show('User created successfully!', 'done'),
    error: () => this.snackbar.show('Failed to create user.', 'error')
  });
}

updateUser(id: number, userData: any) {
  this.http.put(`/api/users/${id}`, userData).subscribe({
    next: () => this.snackbar.show('User updated successfully!', 'done'),
    error: () => this.snackbar.show('Failed to update user.', 'error')
  });
}

deleteUser(id: number) {
  this.http.delete(`/api/users/${id}`).subscribe({
    next: () => this.snackbar.show('User deleted successfully!', 'done'),
    error: () => this.snackbar.show('Failed to delete user.', 'error')
  });
}
```

## Setup

Add the snackbar service to your app config:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { LiteSnackbarService } from 'ngx-lite-form';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    LiteSnackbarService
  ]
};
```


## Message Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `done` | Green | Success messages, confirmations |
| `warn` | Yellow/Orange | Warnings, cautions |
| `error` | Red | Errors, failures |

## Best Practices

- Keep messages concise and actionable
- Use appropriate variants for context
- Don't show too many snackbars simultaneously
- Use longer durations for important messages
- Use manual dismiss (duration: 0) for critical messages requiring user acknowledgment
