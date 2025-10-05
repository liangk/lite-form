# LiteFile

## Description
Advanced file upload component with drag & drop support, file management panel, camera capture, and badge display. Supports multiple file types and size validation.

## Features
- Drag & drop file upload
- Click to browse files
- Camera capture support (mobile)
- File preview with badges
- File management panel
- Multiple file upload
- File type restrictions
- File size validation
- Progress indicators
- Remove uploaded files

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `control` | `FileFieldDto` | required | Field configuration |

### FileFieldDto Class

```typescript
class FileFieldDto {
  label: string;
  formControl: FormControl;
  multiple?: boolean;      // Allow multiple file selection (default: true)
  accept?: string;         // Accepted file types (default: '*/*')
  maxFileSize?: number;    // Maximum file size in bytes (default: 10MB)
  maxFiles?: number;       // Maximum number of files allowed (default: 10)
  showPreview?: boolean;   // Show image previews (default: true)
}
```

## Examples

### Basic File Upload

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFile, FileFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteFile],
  template: `<lite-file [control]="documentField"></lite-file>`
})
export class ExampleComponent {
  documentField = new FileFieldDto(
    'Upload Document',
    new FormControl(null, [Validators.required])
  );
}
```

### Image Upload with Preview

```typescript
photoField = new FileFieldDto(
  'Profile Photo',
  new FormControl(null),
  false,        // single file only
  'image/*',    // images only
  5 * 1024 * 1024,  // 5MB max
  1,            // max 1 file
  true          // show preview
);
```

### Multiple Files

```typescript
attachmentsField = new FileFieldDto(
  'Attachments',
  new FormControl([]),
  true,                     // multiple files
  '.pdf,.doc,.docx',       // accepted types
  5 * 1024 * 1024,         // 5MB per file
  10,                      // max 10 files
  false                    // no preview
);
```

### With Camera Capture

```typescript
captureField = new FileFieldDto(
  'Take Photo',
  new FormControl(null),
  false,        // single file
  'image/*',    // images only
  10 * 1024 * 1024,  // 10MB max
  1,            // max 1 file
  true          // show preview
);
```

Note: Camera capture is enabled automatically on devices with cameras when `accept="image/*"` is set.

## Handling Uploaded Files

```typescript
onFilesUploaded() {
  const files = this.documentField.formControl.value;
  if (files && files.length > 0) {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('files', file);
    });
    
    // Upload to server
    this.http.post('/api/upload', formData).subscribe(response => {
      console.log('Files uploaded:', response);
    });
  }
}
```

