# LiteLoading

## Description
Loading indicator component with view toggle for spinner (loading wheel) or progress bar modes. Supports defined progress percentage (0-100) or indeterminate animation with optional message display and configurable spinner sizes.

## Features
- Two view modes: spinner and progress bar
- Defined progress (0-100) or indeterminate animation
- Optional loading message
- Configurable spinner sizes (small, medium, large)
- Customizable colors
- Smooth animations
- Overlay mode for full-screen loading

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `view` | `'spinner' \| 'progress'` | `'spinner'` | Display mode |
| `progress` | `number \| null` | `null` | Progress value 0-100 (null for indeterminate) |
| `message` | `string` | `''` | Optional loading message |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner size (spinner mode only) |
| `visible` | `boolean` | `true` | Show/hide loading indicator |

## Examples

### Basic Spinner

```typescript
import { Component, signal } from '@angular/core';
import { LiteLoading } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteLoading],
  template: `
    <lite-loading 
      [visible]="isLoading()"
      [message]="'Loading data...'"
    ></lite-loading>
  `
})
export class ExampleComponent {
  isLoading = signal(true);
  
  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    this.isLoading.set(true);
    this.http.get('/api/data').subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
```

### Progress Bar with Defined Progress

```typescript
@Component({
  template: `
    <lite-loading
      [view]="'progress'"
      [progress]="uploadProgress()"
      [message]="'Uploading file...'"
      [visible]="isUploading()"
    ></lite-loading>
  `
})
export class ExampleComponent {
  uploadProgress = signal(0);
  isUploading = signal(false);
  
  uploadFile(file: File) {
    this.isUploading.set(true);
    const formData = new FormData();
    formData.append('file', file);
    
    this.http.post('/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const progress = Math.round(100 * event.loaded / (event.total || 1));
        this.uploadProgress.set(progress);
      } else if (event.type === HttpEventType.Response) {
        this.isUploading.set(false);
        this.uploadProgress.set(0);
      }
    });
  }
}
```

### Indeterminate Progress Bar

```typescript
<lite-loading
  [view]="'progress'"
  [visible]="showProgress()"
  [message]="'Processing your request...'"
></lite-loading>
```

### Different Spinner Sizes

```typescript
<!-- Small spinner -->
<lite-loading [size]="'small'" [message]="'Loading...'"></lite-loading>

<!-- Medium spinner (default) -->
<lite-loading [size]="'medium'" [message]="'Loading...'"></lite-loading>

<!-- Large spinner -->
<lite-loading [size]="'large'" [message]="'Loading...'"></lite-loading>
```

### Without Message

```typescript
<lite-loading [view]="'spinner'"></lite-loading>
<lite-loading [view]="'progress'" [progress]="75"></lite-loading>
```

### Full-Screen Overlay

```typescript
@Component({
  template: `
    @if (isProcessing()) {
      <div class="loading-overlay">
        <lite-loading
          [view]="'spinner'"
          [size]="'large'"
          [message]="'Processing large dataset...'"
        ></lite-loading>
      </div>
    }
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
  `]
})
export class ExampleComponent {
  isProcessing = signal(false);
}
```

### Toggle Between Views

```typescript
@Component({
  template: `
    <button (click)="toggleView()">Toggle View</button>
    <lite-loading
      [view]="loadingView()"
      [progress]="loadingView() === 'progress' ? 60 : null"
      [message]="'Loading...'"
    ></lite-loading>
  `
})
export class ExampleComponent {
  loadingView = signal<'spinner' | 'progress'>('spinner');
  
  toggleView() {
    this.loadingView.set(
      this.loadingView() === 'spinner' ? 'progress' : 'spinner'
    );
  }
}
```

## Styling

```scss
.lite-loading {
  // Container
}

.lite-loading__spinner {
  // Spinner element
  &--small { width: 20px; height: 20px; }
  &--medium { width: 40px; height: 40px; }
  &--large { width: 60px; height: 60px; }
}

.lite-loading__progress {
  // Progress bar container
}

.lite-loading__progress-bar {
  // Progress bar fill
  &--indeterminate {
    animation: progress-indeterminate 1.5s infinite;
  }
}

.lite-loading__message {
  // Message text
}
```

## Use Cases

- **Spinner**: Quick operations, API calls, page loading
- **Progress Bar (Defined)**: File uploads, downloads, multi-step processes
- **Progress Bar (Indeterminate)**: Operations with unknown duration
- **Overlay**: Full-screen loading states, blocking operations
