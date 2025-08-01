# LiteForm Examples

This document provides comprehensive examples of using LiteForm components in various scenarios.

## Basic Usage Examples

### Simple Form

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto, SelectFieldDto, RadioFieldDto, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <lite-input [control]="nameField"></lite-input>
      <lite-input [control]="emailField"></lite-input>
      <lite-textarea [control]="messageField"></lite-textarea>
      <lite-select [control]="priorityField"></lite-select>
      <lite-radio [control]="urgencyField"></lite-radio>
      <lite-checkbox [control]="agreeField"></lite-checkbox>
      <lite-file [control]="attachmentField"></lite-file>
      
      <button type="submit" [disabled]="!isFormValid()">Submit</button>
    </form>
  `
})
export class SimpleFormComponent {
  nameField = new FieldDto('Full Name', new FormControl('', [Validators.required]));
  emailField = new FieldDto('Email', new FormControl('', [Validators.required, Validators.email]));
  messageField = new FieldDto('Message', new FormControl('', [Validators.required]), 4);
  
  priorityField = new SelectFieldDto(
    'Priority',
    new FormControl(''),
    ['Low', 'Medium', 'High', 'Urgent'],
    (option) => option
  );
  
  urgencyField = new RadioFieldDto(
    'Response Time',
    new FormControl('', [Validators.required]),
    ['Within 24 hours', 'Within 3 days', 'Within a week', 'No rush'],
    (option) => option
  );
  
  agreeField = new FieldDto(
    'I agree to the terms and conditions', 
    new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  );

  attachmentField = new FileFieldDto(
    'Attachments', 
    new FormControl([]),
    true, // multiple files
    '*/*', // any file type
    5 * 1024 * 1024, // 5MB limit
    3 // max 3 files
  );

  isFormValid(): boolean {
    return this.nameField.formControl.valid &&
           this.emailField.formControl.valid &&
           this.messageField.formControl.valid &&
           this.priorityField.formControl.valid &&
           this.urgencyField.formControl.valid &&
           this.agreeField.formControl.valid &&
           this.attachmentField.formControl.valid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = {
        name: this.nameField.formControl.value,
        email: this.emailField.formControl.value,
        message: this.messageField.formControl.value,
        priority: this.priorityField.formControl.value
      };
      console.log('Form submitted:', formData);
    }
  }
}
```

---

## Multi-Select Examples

### Skills Selection

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, MultiSelectFieldDto } from 'lite-form';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="skills-form">
      <h3>Select Your Skills</h3>
      <lite-multi-select [control]="skillsField"></lite-multi-select>
      
      <div class="selected-summary" *ngIf="getSelectedSkills().length > 0">
        <h4>Selected Skills ({{ getSelectedSkills().length }}):</h4>
        <ul>
          <li *ngFor="let skill of getSelectedSkills()">{{ skill }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .skills-form {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
    }
    .selected-summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class SkillsFormComponent {
  skillsField = new MultiSelectFieldDto(
    'Technical Skills',
    new FormControl<string[]>([]),
    [
      'JavaScript',
      'TypeScript',
      'Angular',
      'React',
      'Vue.js',
      'Node.js',
      'Python',
      'Java',
      'C#',
      'PHP',
      'Go',
      'Rust',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'GCP',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'GraphQL',
      'REST APIs',
      'Git',
      'CI/CD'
    ],
    (skill) => skill
  );

  getSelectedSkills(): string[] {
    return this.skillsField.formControl.value || [];
  }
}
```

### Radio Button Groups

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, RadioFieldDto } from 'lite-form';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="survey-form">
      <h2>Customer Satisfaction Survey</h2>
      
      <lite-radio [control]="satisfactionField"></lite-radio>
      <lite-radio [control]="recommendField" direction="horizontal"></lite-radio>
      <lite-radio [control]="supportField"></lite-radio>
      
      <button (click)="submitSurvey()" [disabled]="!isSurveyValid()">
        Submit Survey
      </button>
      
      <div class="survey-results" *ngIf="showResults">
        <h3>Survey Results:</h3>
        <p><strong>Satisfaction:</strong> {{ getSatisfactionText() }}</p>
        <p><strong>Would Recommend:</strong> {{ getRecommendText() }}</p>
        <p><strong>Support Experience:</strong> {{ getSupportText() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .survey-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .survey-results {
      margin-top: 20px;
      padding: 15px;
      background-color: #e8f5e8;
      border-radius: 4px;
    }
  `]
})
export class SurveyFormComponent {
  showResults = false;
  
  satisfactionField = new RadioFieldDto(
    'How satisfied are you with our service?',
    new FormControl('', [Validators.required]),
    [
      'Very Dissatisfied',
      'Dissatisfied', 
      'Neutral',
      'Satisfied',
      'Very Satisfied'
    ],
    (option) => option
  );
  
  recommendField = new RadioFieldDto(
    'Would you recommend us to a friend?',
    new FormControl('', [Validators.required]),
    ['Yes', 'No', 'Maybe'],
    (option) => option
  );
  
  supportField = new RadioFieldDto(
    'How would you rate our customer support?',
    new FormControl('', [Validators.required]),
    [
      { id: 1, name: 'Poor', description: 'Unhelpful and slow' },
      { id: 2, name: 'Fair', description: 'Adequate but could improve' },
      { id: 3, name: 'Good', description: 'Helpful and responsive' },
      { id: 4, name: 'Excellent', description: 'Outstanding service' }
    ],
    (option) => `${option.name} - ${option.description}`
  );
  
  isSurveyValid(): boolean {
    return this.satisfactionField.formControl.valid &&
           this.recommendField.formControl.valid &&
           this.supportField.formControl.valid;
  }
  
  submitSurvey(): void {
    if (this.isSurveyValid()) {
      this.showResults = true;
    }
  }
  
  getSatisfactionText(): string {
    return this.satisfactionField.formControl.value || 'Not selected';
  }
  
  getRecommendText(): string {
    return this.recommendField.formControl.value || 'Not selected';
  }
  
  getSupportText(): string {
    const value = this.supportField.formControl.value;
    return value ? value.name : 'Not selected';
  }
}
```

### Checkbox Examples

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto } from 'lite-form';

@Component({
  selector: 'app-terms-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="terms-form">
      <h2>Account Registration</h2>
      
      <lite-input [control]="nameField"></lite-input>
      <lite-input [control]="emailField"></lite-input>
      
      <div class="agreements">
        <lite-checkbox [control]="termsField"></lite-checkbox>
        <lite-checkbox [control]="privacyField"></lite-checkbox>
        <lite-checkbox [control]="marketingField"></lite-checkbox>
        <lite-checkbox [control]="newsletterField"></lite-checkbox>
      </div>
      
      <button (click)="register()" [disabled]="!isFormValid()">
        Create Account
      </button>
      
      <div class="consent-summary" *ngIf="showSummary">
        <h3>Consent Summary:</h3>
        <ul>
          <li [class.agreed]="termsField.formControl.value">
            Terms & Conditions: {{ termsField.formControl.value ? 'Accepted' : 'Not Accepted' }}
          </li>
          <li [class.agreed]="privacyField.formControl.value">
            Privacy Policy: {{ privacyField.formControl.value ? 'Accepted' : 'Not Accepted' }}
          </li>
          <li [class.agreed]="marketingField.formControl.value">
            Marketing Communications: {{ marketingField.formControl.value ? 'Opted In' : 'Opted Out' }}
          </li>
          <li [class.agreed]="newsletterField.formControl.value">
            Newsletter: {{ newsletterField.formControl.value ? 'Subscribed' : 'Not Subscribed' }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .terms-form {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
    }
    .agreements {
      margin: 20px 0;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    .consent-summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 4px;
    }
    .consent-summary li.agreed {
      color: #2e7d32;
      font-weight: 500;
    }
  `]
})
export class TermsFormComponent {
  showSummary = false;
  
  nameField = new FieldDto('Full Name', new FormControl('', [Validators.required]));
  emailField = new FieldDto('Email Address', new FormControl('', [Validators.required, Validators.email]));
  
  // Required checkboxes
  termsField = new FieldDto(
    'I agree to the Terms and Conditions',
    new FormControl<boolean>(false, { 
      nonNullable: true, 
      validators: [Validators.requiredTrue] 
    })
  );
  
  privacyField = new FieldDto(
    'I accept the Privacy Policy',
    new FormControl<boolean>(false, { 
      nonNullable: true, 
      validators: [Validators.requiredTrue] 
    })
  );
  
  // Optional checkboxes
  marketingField = new FieldDto(
    'I consent to receive marketing communications',
    new FormControl<boolean>(false, { nonNullable: true })
  );
  
  newsletterField = new FieldDto(
    'Subscribe to our monthly newsletter',
    new FormControl<boolean>(true, { nonNullable: true })
  );
  
  isFormValid(): boolean {
    return this.nameField.formControl.valid &&
           this.emailField.formControl.valid &&
           this.termsField.formControl.valid &&
           this.privacyField.formControl.valid;
  }
  
  register(): void {
    if (this.isFormValid()) {
      this.showSummary = true;
      console.log('Registration successful with consent:', {
        name: this.nameField.formControl.value,
        email: this.emailField.formControl.value,
        terms: this.termsField.formControl.value,
        privacy: this.privacyField.formControl.value,
        marketing: this.marketingField.formControl.value,
        newsletter: this.newsletterField.formControl.value
      });
    }
  }
}
```

### Object-Based Multi-Select

```typescript
interface Department {
  id: number;
  name: string;
  description: string;
  manager: string;
}

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="department-form">
      <lite-multi-select [control]="departmentsField"></lite-multi-select>
      
      <div class="department-details" *ngIf="getSelectedDepartments().length > 0">
        <h4>Selected Departments:</h4>
        <div class="department-card" *ngFor="let dept of getSelectedDepartments()">
          <h5>{{ dept.name }}</h5>
          <p>{{ dept.description }}</p>
          <small>Manager: {{ dept.manager }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .department-card {
      border: 1px solid #ddd;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
    }
  `]
})
export class DepartmentFormComponent {
  departments: Department[] = [
    { id: 1, name: 'Engineering', description: 'Software development and technical operations', manager: 'John Smith' },
    { id: 2, name: 'Marketing', description: 'Brand promotion and customer acquisition', manager: 'Sarah Johnson' },
    { id: 3, name: 'Sales', description: 'Revenue generation and client relationships', manager: 'Mike Wilson' },
    { id: 4, name: 'HR', description: 'Human resources and employee relations', manager: 'Emily Brown' },
    { id: 5, name: 'Finance', description: 'Financial planning and accounting', manager: 'David Lee' }
  ];

  departmentsField = new MultiSelectFieldDto<Department>(
    'Departments',
    new FormControl<Department[]>([]),
    this.departments,
    (dept) => dept.name
  );

  getSelectedDepartments(): Department[] {
    return this.departmentsField.formControl.value || [];
  }
}
```

---

## File Upload Examples

### Basic File Upload

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-basic-file',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <lite-file [control]="filesField"></lite-file>
      <button type="submit" [disabled]="!hasFiles()">Upload Files</button>
    </form>
  `
})
export class BasicFileComponent {
  filesField = new FileFieldDto('Upload Files', new FormControl([]));

  hasFiles(): boolean {
    const files = this.filesField.formControl.value || [];
    return files.length > 0;
  }

  onSubmit(): void {
    const files = this.filesField.formControl.value || [];
    console.log('Uploading files:', files);
  }
}
```

### Image Upload with Preview

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="image-upload-form">
      <h3>Profile Picture Upload</h3>
      
      <lite-file [control]="profilePictureField"></lite-file>
      
      <div class="upload-info">
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Single image only</li>
          <li>Max size: 2MB</li>
          <li>Formats: JPG, PNG, GIF</li>
        </ul>
      </div>
      
      <button (click)="saveProfile()" [disabled]="!isValid()">
        Save Profile Picture
      </button>
    </div>
  `,
  styles: [`
    .image-upload-form {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .upload-info {
      margin: 15px 0;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .upload-info ul {
      margin: 5px 0;
      padding-left: 20px;
    }
  `]
})
export class ImageUploadComponent {
  profilePictureField = new FileFieldDto(
    'Profile Picture',
    new FormControl([], [Validators.required]),
    false, // single file only
    'image/*', // images only
    2 * 1024 * 1024, // 2MB limit
    1, // max 1 file
    true // show preview
  );

  isValid(): boolean {
    return this.profilePictureField.formControl.valid;
  }

  saveProfile(): void {
    if (this.isValid()) {
      const files = this.profilePictureField.formControl.value || [];
      console.log('Saving profile picture:', files[0]);
    }
  }
}
```

### Document Upload with File Type Restrictions

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="document-form">
      <h3>Document Upload</h3>
      
      <lite-file [control]="documentsField"></lite-file>
      
      <div class="file-summary" *ngIf="getFileCount() > 0">
        <h4>Selected Files ({{ getFileCount() }})</h4>
        <div class="file-info" *ngFor="let file of getFiles()">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">({{ formatFileSize(file.size) }})</span>
        </div>
      </div>
      
      <div class="upload-guidelines">
        <h4>Accepted Documents:</h4>
        <ul>
          <li>PDF files (.pdf)</li>
          <li>Word documents (.doc, .docx)</li>
          <li>Excel spreadsheets (.xls, .xlsx)</li>
          <li>PowerPoint presentations (.ppt, .pptx)</li>
          <li>Text files (.txt)</li>
        </ul>
        <p><strong>Max file size:</strong> 10MB per file</p>
        <p><strong>Max files:</strong> 5 files total</p>
      </div>
      
      <button (click)="uploadDocuments()" [disabled]="getFileCount() === 0">
        Upload Documents
      </button>
    </div>
  `,
  styles: [`
    .document-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .file-summary {
      margin: 20px 0;
      padding: 15px;
      background-color: #e8f4fd;
      border-radius: 4px;
    }
    .file-info {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
    }
    .file-info:last-child {
      border-bottom: none;
    }
    .file-size {
      color: #666;
      font-size: 0.9em;
    }
    .upload-guidelines {
      margin: 20px 0;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  `]
})
export class DocumentUploadComponent {
  documentsField = new FileFieldDto(
    'Upload Documents',
    new FormControl([]),
    true, // multiple files
    '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document', // document types
    10 * 1024 * 1024, // 10MB per file
    5, // max 5 files
    false // no preview for documents
  );

  getFiles(): File[] {
    return this.documentsField.formControl.value || [];
  }

  getFileCount(): number {
    return this.getFiles().length;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadDocuments(): void {
    const files = this.getFiles();
    console.log('Uploading documents:', files);
    // Handle file upload logic here
  }
}
```

### Camera Capture Example

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-camera-capture',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="camera-form">
      <h3>Photo Capture</h3>
      
      <lite-file [control]="photoField"></lite-file>
      
      <div class="photo-gallery" *ngIf="hasPhotos()">
        <h4>Captured Photos</h4>
        <div class="photo-grid">
          <div class="photo-item" *ngFor="let photo of getPhotos(); let i = index">
            <img [src]="getPhotoPreview(photo)" [alt]="'Photo ' + (i + 1)">
            <div class="photo-info">
              <span>{{ photo.name }}</span>
              <button (click)="removePhoto(i)" class="remove-btn">×</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="camera-info">
        <h4>Camera Capture Features:</h4>
        <ul>
          <li>✅ Works on mobile devices with camera</li>
          <li>✅ Works on laptops with built-in camera</li>
          <li>✅ Automatically opens camera app on mobile</li>
          <li>✅ Falls back to file selection on unsupported devices</li>
          <li>✅ No special permissions required</li>
        </ul>
      </div>
      
      <button (click)="savePhotos()" [disabled]="!hasPhotos()">
        Save Photos
      </button>
    </div>
  `,
  styles: [`
    .camera-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .photo-gallery {
      margin: 20px 0;
    }
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .photo-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }
    .photo-item img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }
    .photo-info {
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8em;
    }
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .camera-info {
      margin: 20px 0;
      padding: 15px;
      background-color: #e8f5e8;
      border-radius: 4px;
    }
  `]
})
export class CameraCaptureComponent {
  photoField = new FileFieldDto(
    'Take Photos',
    new FormControl([]),
    true, // multiple photos
    'image/*', // images only
    5 * 1024 * 1024, // 5MB per image
    10, // max 10 photos
    true // show preview
  );

  hasPhotos(): boolean {
    return this.getPhotos().length > 0;
  }

  getPhotos(): File[] {
    return this.photoField.formControl.value || [];
  }

  getPhotoPreview(photo: File): string {
    return URL.createObjectURL(photo);
  }

  removePhoto(index: number): void {
    const photos = this.getPhotos();
    photos.splice(index, 1);
    this.photoField.formControl.setValue([...photos]);
  }

  savePhotos(): void {
    const photos = this.getPhotos();
    console.log('Saving photos:', photos);
    // Handle photo saving logic here
  }
}
```

### Advanced File Upload with Progress

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { LiteFormModule, FileFieldDto } from 'lite-form';
import { Observable } from 'rxjs';

interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  response?: any;
}

@Component({
  selector: 'app-advanced-file-upload',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="advanced-upload-form">
      <h3>Advanced File Upload</h3>
      
      <lite-file [control]="filesField"></lite-file>
      
      <div class="upload-queue" *ngIf="uploadQueue.length > 0">
        <h4>Upload Queue</h4>
        <div class="upload-item" *ngFor="let item of uploadQueue">
          <div class="file-info">
            <span class="file-name">{{ item.file.name }}</span>
            <span class="file-size">({{ formatFileSize(item.file.size) }})</span>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" 
                   [style.width.%]="item.progress"
                   [class]="item.status">
              </div>
            </div>
            <span class="progress-text">{{ item.progress }}%</span>
          </div>
          
          <div class="status-indicator" [class]="item.status">
            <span *ngIf="item.status === 'pending'">⏳ Pending</span>
            <span *ngIf="item.status === 'uploading'">📤 Uploading</span>
            <span *ngIf="item.status === 'completed'">✅ Completed</span>
            <span *ngIf="item.status === 'error'">❌ Error</span>
          </div>
        </div>
      </div>
      
      <div class="upload-controls">
        <button (click)="startUpload()" 
                [disabled]="!hasFiles() || isUploading">
          {{ isUploading ? 'Uploading...' : 'Start Upload' }}
        </button>
        
        <button (click)="clearQueue()" 
                [disabled]="isUploading">
          Clear Queue
        </button>
      </div>
      
      <div class="upload-summary" *ngIf="uploadQueue.length > 0">
        <p><strong>Total Files:</strong> {{ uploadQueue.length }}</p>
        <p><strong>Completed:</strong> {{ getCompletedCount() }}</p>
        <p><strong>Failed:</strong> {{ getFailedCount() }}</p>
        <p><strong>Overall Progress:</strong> {{ getOverallProgress() }}%</p>
      </div>
    </div>
  `,
  styles: [`
    .advanced-upload-form {
      max-width: 700px;
      margin: 20px auto;
      padding: 20px;
    }
    .upload-queue {
      margin: 20px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
    }
    .upload-item {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 15px;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .upload-item:last-child {
      border-bottom: none;
    }
    .file-info {
      display: flex;
      flex-direction: column;
    }
    .file-size {
      font-size: 0.8em;
      color: #666;
    }
    .progress-container {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 150px;
    }
    .progress-bar {
      width: 100px;
      height: 6px;
      background-color: #f0f0f0;
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
    .progress-fill.pending { background-color: #6c757d; }
    .progress-fill.uploading { background-color: #007bff; }
    .progress-fill.completed { background-color: #28a745; }
    .progress-fill.error { background-color: #dc3545; }
    .progress-text {
      font-size: 0.8em;
      min-width: 35px;
    }
    .status-indicator {
      font-size: 0.8em;
      padding: 4px 8px;
      border-radius: 4px;
      text-align: center;
      min-width: 80px;
    }
    .status-indicator.pending { background-color: #f8f9fa; }
    .status-indicator.uploading { background-color: #e3f2fd; }
    .status-indicator.completed { background-color: #e8f5e8; }
    .status-indicator.error { background-color: #ffebee; }
    .upload-controls {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    .upload-summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  `]
})
export class AdvancedFileUploadComponent {
  filesField = new FileFieldDto(
    'Select Files to Upload',
    new FormControl([]),
    true, // multiple files
    '*/*', // all file types
    50 * 1024 * 1024, // 50MB per file
    20, // max 20 files
    true // show preview
  );

  uploadQueue: UploadProgress[] = [];
  isUploading = false;

  constructor(private http: HttpClient) {
    // Watch for file changes
    this.filesField.formControl.valueChanges.subscribe(files => {
      this.updateUploadQueue(files || []);
    });
  }

  updateUploadQueue(files: File[]): void {
    this.uploadQueue = files.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));
  }

  hasFiles(): boolean {
    return this.uploadQueue.length > 0;
  }

  startUpload(): void {
    if (this.isUploading) return;
    
    this.isUploading = true;
    
    // Upload files sequentially
    this.uploadSequentially(0);
  }

  private uploadSequentially(index: number): void {
    if (index >= this.uploadQueue.length) {
      this.isUploading = false;
      return;
    }

    const item = this.uploadQueue[index];
    this.uploadSingleFile(item).subscribe({
      next: (progress) => {
        item.progress = progress;
        if (progress === 100) {
          item.status = 'completed';
        }
      },
      error: (error) => {
        item.status = 'error';
        console.error('Upload failed:', error);
      },
      complete: () => {
        // Upload next file
        setTimeout(() => this.uploadSequentially(index + 1), 500);
      }
    });
  }

  private uploadSingleFile(item: UploadProgress): Observable<number> {
    return new Observable(observer => {
      item.status = 'uploading';
      
      const formData = new FormData();
      formData.append('file', item.file);

      // Simulate upload progress (replace with actual HTTP upload)
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          observer.next(progress);
          observer.complete();
        } else {
          observer.next(progress);
        }
      }, 200);

      // Actual HTTP upload example:
      // this.http.post('/api/upload', formData, {
      //   reportProgress: true,
      //   observe: 'events'
      // }).subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     const progress = Math.round(100 * event.loaded / (event.total || 1));
      //     observer.next(progress);
      //   } else if (event.type === HttpEventType.Response) {
      //     observer.complete();
      //   }
      // });
    });
  }

  clearQueue(): void {
    if (this.isUploading) return;
    
    this.uploadQueue = [];
    this.filesField.formControl.setValue([]);
  }

  getCompletedCount(): number {
    return this.uploadQueue.filter(item => item.status === 'completed').length;
  }

  getFailedCount(): number {
    return this.uploadQueue.filter(item => item.status === 'error').length;
  }

  getOverallProgress(): number {
    if (this.uploadQueue.length === 0) return 0;
    
    const totalProgress = this.uploadQueue.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / this.uploadQueue.length);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
```

### File Upload with Validation

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LiteFormModule, FileFieldDto } from 'lite-form';

@Component({
  selector: 'app-file-validation',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="file-validation-form">
      <h3>File Upload with Custom Validation</h3>
      
      <lite-file [control]="validatedFilesField"></lite-file>
      
      <div class="validation-info" *ngIf="hasValidationErrors()">
        <h4>Validation Errors:</h4>
        <ul>
          <li *ngFor="let error of getValidationErrors()">{{ error }}</li>
        </ul>
      </div>
      
      <div class="file-requirements">
        <h4>File Requirements:</h4>
        <ul>
          <li>At least 1 file required</li>
          <li>Maximum 3 files allowed</li>
          <li>Only images (JPG, PNG, GIF) permitted</li>
          <li>Each file must be under 2MB</li>
          <li>Total size must not exceed 5MB</li>
        </ul>
      </div>
      
      <button (click)="submitFiles()" [disabled]="!isValid()">
        Submit Files
      </button>
    </div>
  `,
  styles: [`
    .file-validation-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .validation-info {
      margin: 20px 0;
      padding: 15px;
      background-color: #ffebee;
      border-left: 4px solid #f44336;
      border-radius: 4px;
    }
    .validation-info ul {
      margin: 5px 0;
      color: #d32f2f;
    }
    .file-requirements {
      margin: 20px 0;
      padding: 15px;
      background-color: #e3f2fd;
      border-radius: 4px;
    }
  `]
})
export class FileValidationComponent {
  validatedFilesField = new FileFieldDto(
    'Upload Images',
    new FormControl([], [
      Validators.required,
      this.customFileValidator()
    ]),
    true, // multiple files
    'image/*', // images only
    2 * 1024 * 1024, // 2MB per file
    3, // max 3 files
    true // show preview
  );

  customFileValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value || [];
      const errors: string[] = [];

      // Check if at least one file is selected
      if (files.length === 0) {
        errors.push('At least one file is required');
      }

      // Check maximum number of files
      if (files.length > 3) {
        errors.push('Maximum 3 files allowed');
      }

      // Check file types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      files.forEach((file, index) => {
        if (!allowedTypes.includes(file.type)) {
          errors.push(`File ${index + 1} (${file.name}) is not a valid image type`);
        }
      });

      // Check individual file sizes
      files.forEach((file, index) => {
        if (file.size > 2 * 1024 * 1024) {
          errors.push(`File ${index + 1} (${file.name}) exceeds 2MB limit`);
        }
      });

      // Check total size
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 5 * 1024 * 1024) {
        errors.push(`Total file size (${this.formatFileSize(totalSize)}) exceeds 5MB limit`);
      }

      return errors.length > 0 ? { fileValidation: { errors } } : null;
    };
  }

  hasValidationErrors(): boolean {
    return this.validatedFilesField.formControl.hasError('fileValidation');
  }

  getValidationErrors(): string[] {
    const error = this.validatedFilesField.formControl.getError('fileValidation');
    return error ? error.errors : [];
  }

  isValid(): boolean {
    return this.validatedFilesField.formControl.valid;
  }

  submitFiles(): void {
    if (this.isValid()) {
      const files = this.validatedFilesField.formControl.value || [];
      console.log('Submitting validated files:', files);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
```

---

## Advanced Form Examples

### User Profile Form

```typescript
interface Country {
  code: string;
  name: string;
  flag: string;
}

interface Language {
  code: string;
  name: string;
  native: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [LiteFormModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <div class="form-section">
        <h3>Personal Information</h3>
        <lite-input [control]="firstNameField"></lite-input>
        <lite-input [control]="lastNameField"></lite-input>
        <lite-input [control]="emailField"></lite-input>
        <lite-input [control]="ageField"></lite-input>
        <lite-input [control]="phoneField"></lite-input>
      </div>

      <div class="form-section">
        <h3>Location & Languages</h3>
        <lite-select [control]="countryField"></lite-select>
        <lite-multi-select [control]="languagesField"></lite-multi-select>
      </div>

      <div class="form-section">
        <h3>About</h3>
        <lite-textarea [control]="bioField"></lite-textarea>
      </div>

      <div class="form-actions">
        <button type="submit" [disabled]="profileForm.invalid">Save Profile</button>
        <button type="button" (click)="resetForm()">Reset</button>
      </div>
    </form>
  `,
  styles: [`
    .form-section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: #007bff;
      color: white;
    }
    button[type="button"] {
      background-color: #6c757d;
      color: white;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class UserProfileComponent {
  countries: Country[] = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' }
  ];

  languages: Language[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'zh', name: 'Chinese', native: '中文' }
  ];

  firstNameField = new FieldDto('First Name', new FormControl('', [Validators.required, Validators.minLength(2)]));
  lastNameField = new FieldDto('Last Name', new FormControl('', [Validators.required, Validators.minLength(2)]));
  emailField = new FieldDto('Email', new FormControl('', [Validators.required, Validators.email]));
  ageField = new FieldDto('Age', new FormControl(0, [Validators.required, Validators.min(18)]), 2, 'number');
  phoneField = new FieldDto('Phone', new FormControl('', [Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]));
  
  countryField = new SelectFieldDto<Country>(
    'Country',
    new FormControl<Country>(),
    this.countries,
    (country) => `${country.flag} ${country.name}`
  );

  languagesField = new MultiSelectFieldDto<Language>(
    'Languages',
    new FormControl<Language[]>([]),
    this.languages,
    (language) => `${language.name} (${language.native})`
  );

  bioField = new FieldDto('Biography', new FormControl('', [Validators.maxLength(500)]), 5);

  profileForm = new FormGroup({
    firstName: this.firstNameField.formControl,
    lastName: this.lastNameField.formControl,
    email: this.emailField.formControl,
    age: this.ageField.formControl,
    phone: this.phoneField.formControl,
    country: this.countryField.formControl,
    languages: this.languagesField.formControl,
    bio: this.bioField.formControl
  });

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = {
        firstName: this.firstNameField.formControl.value,
        lastName: this.lastNameField.formControl.value,
        email: this.emailField.formControl.value,
        age: this.ageField.formControl.value,
        phone: this.phoneField.formControl.value,
        country: this.countryField.formControl.value,
        languages: this.languagesField.formControl.value,
        bio: this.bioField.formControl.value
      };
      console.log('Profile saved:', profileData);
    }
  }

  resetForm(): void {
    this.profileForm.reset();
  }
}
```

---

## Validation Examples

### Custom Validators

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom password validator
function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    const minLength = value.length >= 8;

    const passwordValid = hasNumber && hasUpper && hasLower && hasSpecial && minLength;

    return passwordValid ? null : {
      passwordStrength: {
        hasNumber,
        hasUpper,
        hasLower,
        hasSpecial,
        minLength
      }
    };
  };
}

// Username availability validator (async)
function usernameAvailabilityValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return userService.checkUsernameAvailability(control.value).pipe(
      map(isAvailable => isAvailable ? null : { usernameTaken: true }),
      catchError(() => of(null))
    );
  };
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <lite-input [control]="usernameField"></lite-input>
      <lite-password [control]="passwordField"></lite-password>
      <lite-password [control]="confirmPasswordField"></lite-password>
      
      <!-- Custom error display for password strength -->
      <div class="password-requirements" *ngIf="passwordField.formControl.hasError('passwordStrength')">
        <h4>Password Requirements:</h4>
        <ul>
          <li [class.valid]="getPasswordErrors().hasMinLength">At least 8 characters</li>
          <li [class.valid]="getPasswordErrors().hasUpper">At least one uppercase letter</li>
          <li [class.valid]="getPasswordErrors().hasLower">At least one lowercase letter</li>
          <li [class.valid]="getPasswordErrors().hasNumber">At least one number</li>
          <li [class.valid]="getPasswordErrors().hasSpecial">At least one special character</li>
        </ul>
      </div>

      <button type="submit" [disabled]="!isFormValid()">Register</button>
    </form>
  `,
  styles: [`
    .password-requirements {
      margin: 10px 0;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    .password-requirements ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    .password-requirements li {
      color: #dc3545;
    }
    .password-requirements li.valid {
      color: #28a745;
    }
  `]
})
export class RegistrationFormComponent {
  usernameField = new FieldDto(
    'Username',
    new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [usernameAvailabilityValidator(this.userService)]
    })
  );

  passwordField = new FieldDto(
    'Password',
    new FormControl('', [Validators.required, passwordValidator()])
  );

  confirmPasswordField = new FieldDto(
    'Confirm Password',
    new FormControl('', [Validators.required, this.matchPasswordValidator.bind(this)])
  );

  constructor(private userService: UserService) {}

  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.passwordField?.formControl?.value;
    const confirmPassword = control.value;

    if (!password || !confirmPassword) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getPasswordErrors(): any {
    const errors = this.passwordField.formControl.getError('passwordStrength');
    return errors || {};
  }

  isFormValid(): boolean {
    return this.usernameField.formControl.valid &&
           this.passwordField.formControl.valid &&
           this.confirmPasswordField.formControl.valid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Registration submitted');
    }
  }
}
```

---

## Dynamic Forms Example

```typescript
interface DynamicField {
  type: 'input' | 'textarea' | 'select' | 'multi-select';
  key: string;
  label: string;
  required?: boolean;
  options?: any[];
  displayWith?: (option: any) => string;
  rows?: number;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [LiteFormModule, CommonModule],
  template: `
    <div class="dynamic-form">
      <h3>Dynamic Form Builder</h3>
      
      <div class="form-builder">
        <button (click)="addField('input')">Add Input</button>
        <button (click)="addField('textarea')">Add Textarea</button>
        <button (click)="addField('select')">Add Select</button>
        <button (click)="addField('multi-select')">Add Multi-Select</button>
      </div>

      <form (ngSubmit)="onSubmit()">
        <div *ngFor="let field of formFields; trackBy: trackByKey">
          
          <lite-input 
            *ngIf="field.type === 'input'"
            [control]="getFieldDto(field)">
          </lite-input>

          <lite-textarea 
            *ngIf="field.type === 'textarea'"
            [control]="getFieldDto(field)">
          </lite-textarea>

          <lite-select 
            *ngIf="field.type === 'select'"
            [control]="getSelectFieldDto(field)">
          </lite-select>

          <lite-multi-select 
            *ngIf="field.type === 'multi-select'"
            [control]="getMultiSelectFieldDto(field)">
          </lite-multi-select>

          <button type="button" (click)="removeField(field.key)" class="remove-field">
            Remove {{ field.label }}
          </button>
        </div>

        <button type="submit" [disabled]="!isFormValid()">Submit Dynamic Form</button>
      </form>

      <div class="form-data" *ngIf="formData">
        <h4>Form Data:</h4>
        <pre>{{ formData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .form-builder {
      margin-bottom: 20px;
    }
    .form-builder button {
      margin-right: 10px;
      padding: 5px 10px;
    }
    .remove-field {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      margin: 10px 0;
    }
    .form-data {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  `]
})
export class DynamicFormComponent {
  formFields: DynamicField[] = [];
  formControls: { [key: string]: any } = {};
  formData: any = null;

  private fieldCounter = 0;

  sampleOptions = {
    priority: ['Low', 'Medium', 'High'],
    status: ['Draft', 'In Progress', 'Complete'],
    tags: ['Important', 'Urgent', 'Review', 'Follow-up'],
    categories: ['Personal', 'Work', 'Health', 'Finance']
  };

  addField(type: DynamicField['type']): void {
    this.fieldCounter++;
    const key = `field_${this.fieldCounter}`;
    
    const field: DynamicField = {
      type,
      key,
      label: `${this.capitalizeFirst(type)} Field ${this.fieldCounter}`,
      required: Math.random() > 0.5
    };

    if (type === 'textarea') {
      field.rows = 3;
    }

    if (type === 'select' || type === 'multi-select') {
      const optionKeys = Object.keys(this.sampleOptions);
      const randomKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];
      field.options = this.sampleOptions[randomKey as keyof typeof this.sampleOptions];
      field.displayWith = (option: string) => option;
    }

    this.formFields.push(field);
    this.createFormControl(field);
  }

  removeField(key: string): void {
    this.formFields = this.formFields.filter(field => field.key !== key);
    delete this.formControls[key];
  }

  createFormControl(field: DynamicField): void {
    const validators = field.required ? [Validators.required] : [];
    
    if (field.type === 'multi-select') {
      this.formControls[field.key] = new FormControl<any[]>([], validators);
    } else {
      this.formControls[field.key] = new FormControl('', validators);
    }
  }

  getFieldDto(field: DynamicField): FieldDto {
    return new FieldDto(field.label, this.formControls[field.key], field.rows);
  }

  getSelectFieldDto(field: DynamicField): SelectFieldDto<any> {
    return new SelectFieldDto(
      field.label,
      this.formControls[field.key],
      field.options || [],
      field.displayWith || ((option: any) => option)
    );
  }

  getMultiSelectFieldDto(field: DynamicField): MultiSelectFieldDto<any> {
    return new MultiSelectFieldDto(
      field.label,
      this.formControls[field.key],
      field.options || [],
      field.displayWith || ((option: any) => option)
    );
  }

  trackByKey(index: number, field: DynamicField): string {
    return field.key;
  }

  isFormValid(): boolean {
    return Object.values(this.formControls).every(control => control.valid);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.formData = {};
      this.formFields.forEach(field => {
        this.formData[field.key] = this.formControls[field.key].value;
      });
    }
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
```

---

## Date Picker Examples

### Basic Single Date

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-basic',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-date [control]="birthdateField"></lite-date>
      <button type="submit">Submit</button>
    </form>
  `
})
export class DateBasicComponent {
  birthdateField = new FieldDto('Birthdate', new FormControl(''));
}
```

### Date with Custom Format

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-format',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-date 
        [control]="eventDateField"
        format="MM/dd/yyyy">
      </lite-date>
      <lite-date 
        [control]="issueDateField"
        format="yyyy-MM-dd">
      </lite-date>
    </form>
  `
})
export class DateFormatComponent {
  eventDateField = new FieldDto('Event Date', new FormControl(''));
  issueDateField = new FieldDto('Issue Date', new FormControl(''));
}
```

### Date Range Selection

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, DateRangeFieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-date 
        [control]="vacationField"
        [range]="true">
      </lite-date>
      <lite-date 
        [control]="projectField"
        [range]="true"
        format="yyyy-MM-dd">
      </lite-date>
    </form>
  `
})
export class DateRangeComponent {
  vacationField = new DateRangeFieldDto('Vacation Period', new FormControl<string[]>([]));
  projectField = new DateRangeFieldDto('Project Timeline', new FormControl<string[]>([]));
}
```

### Date with Constraints

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-constraints',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-date 
        [control]="appointmentField"
        [min]="minDate"
        [max]="maxDate">
      </lite-date>
      <lite-date 
        [control]="birthdateField"
        [max]="today">
      </lite-date>
    </form>
  `
})
export class DateConstraintsComponent {
  today = new Date().toISOString().split('T')[0];
  minDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Tomorrow
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days from now

  appointmentField = new FieldDto('Appointment Date', new FormControl(''));
  birthdateField = new FieldDto('Date of Birth', new FormControl(''));
}
```

### Complete Date Form with Validation

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto, DateRangeFieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form [formGroup]="dateForm" (ngSubmit)="onSubmit()">
      <h3>Event Planning Form</h3>
      
      <lite-date 
        [control]="startDateField"
        [min]="today"
        format="dd/MM/yyyy">
      </lite-date>
      
      <lite-date 
        [control]="endDateField"
        [min]="getMinEndDate()"
        format="dd/MM/yyyy">
      </lite-date>
      
      <lite-date 
        [control]="deadlineField"
        [range]="true"
        format="yyyy-MM-dd">
      </lite-date>
      
      <div class="form-actions">
        <button type="submit" [disabled]="dateForm.invalid">
          Create Event
        </button>
        <button type="button" (click)="resetForm()">
          Reset
        </button>
      </div>
      
      <div class="form-summary" *ngIf="dateForm.valid">
        <h4>Event Summary</h4>
        <p><strong>Start:</strong> {{ startDateField.control.value || 'Not set' }}</p>
        <p><strong>End:</strong> {{ endDateField.control.value || 'Not set' }}</p>
        <p><strong>Preparation Period:</strong> 
          {{ deadlineField.control.value?.join(' to ') || 'Not set' }}
        </p>
      </div>
    </form>
  `,
  styles: [`
    form { max-width: 500px; margin: 0 auto; padding: 20px; }
    h3 { text-align: center; margin-bottom: 30px; color: #333; }
    .form-actions { 
      display: flex; gap: 10px; margin-top: 20px; 
      button { padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; }
      button[type="submit"] { background: #007bff; color: white; }
      button[type="button"] { background: #6c757d; color: white; }
      button:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .form-summary { 
      margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; 
      h4 { margin-top: 0; color: #495057; }
      p { margin: 5px 0; }
    }
  `]
})
export class DateFormComponent {
  today = new Date().toISOString().split('T')[0];

  startDateField = new FieldDto('Event Start Date', new FormControl('', [Validators.required]));
  endDateField = new FieldDto('Event End Date', new FormControl('', [Validators.required]));
  deadlineField = new DateRangeFieldDto('Preparation Period', new FormControl<string[]>([]));

  dateForm = new FormGroup({
    startDate: this.startDateField.control,
    endDate: this.endDateField.control,
    deadlines: this.deadlineField.control
  });

  getMinEndDate(): string {
    const startDate = this.startDateField.control.value;
    return startDate || this.today;
  }

  onSubmit() {
    if (this.dateForm.valid) {
      console.log('Form submitted:', this.dateForm.value);
      // Handle form submission
    }
  }

  resetForm() {
    this.dateForm.reset();
  }
}
```

### Dynamic Date Fields

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto, DateRangeFieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-dynamic-dates',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <div class="date-type-selector">
        <label>
          <input type="radio" name="dateType" value="single" 
                 [checked]="dateType === 'single'"
                 (change)="changeDateType('single')">
          Single Date
        </label>
        <label>
          <input type="radio" name="dateType" value="range"
                 [checked]="dateType === 'range'"
                 (change)="changeDateType('range')">
          Date Range
        </label>
      </div>

      <lite-date 
        *ngIf="dateType === 'single'"
        [control]="singleDateField"
        format="dd/MM/yyyy">
      </lite-date>

      <lite-date 
        *ngIf="dateType === 'range'"
        [control]="rangeDateField"
        [range]="true"
        format="dd/MM/yyyy">
      </lite-date>

      <div class="selected-value">
        <strong>Selected:</strong> 
        <span *ngIf="dateType === 'single'">{{ singleDateField.control.value || 'None' }}</span>
        <span *ngIf="dateType === 'range'">{{ 
          rangeDateField.control.value?.length ? rangeDateField.control.value.join(' to ') : 'None' 
        }}</span>
      </div>
    </form>
  `,
  styles: [`
    .date-type-selector {
      margin-bottom: 20px;
      display: flex;
      gap: 20px;
      label { display: flex; align-items: center; gap: 5px; cursor: pointer; }
    }
    .selected-value {
      margin-top: 15px;
      padding: 10px;
      background: #e9ecef;
      border-radius: 4px;
    }
  `]
})
export class DynamicDatesComponent {
  dateType: 'single' | 'range' = 'single';

  singleDateField = new FieldDto('Select Date', new FormControl(''));
  rangeDateField = new DateRangeFieldDto('Select Date Range', new FormControl<string[]>([]));

  changeDateType(type: 'single' | 'range') {
    this.dateType = type;
    // Clear previous selections
    this.singleDateField.control.setValue('');
    this.rangeDateField.control.setValue([]);
  }
}
```

### Date with Custom Calendar Positioning

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-date-positioning',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="positioning-demo">
      <h3>Calendar Positioning Demo</h3>
      
      <div class="top-section">
        <lite-date [control]="topDateField" format="dd/MM/yyyy"></lite-date>
        <p>Calendar opens below (normal positioning)</p>
      </div>

      <div class="spacer"></div>

      <div class="bottom-section">
        <lite-date [control]="bottomDateField" format="dd/MM/yyyy"></lite-date>
        <p>Calendar opens above (auto-adjusted when no space below)</p>
      </div>
    </div>
  `,
  styles: [`
    .positioning-demo {
      height: 100vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .top-section {
      margin-top: 50px;
    }
    .spacer {
      flex: 1;
    }
    .bottom-section {
      margin-bottom: 50px;
    }
    h3 {
      text-align: center;
      color: #333;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      font-style: italic;
    }
  `]
})
export class DatePositioningComponent {
  topDateField = new FieldDto('Top Date Field', new FormControl(''));
  bottomDateField = new FieldDto('Bottom Date Field', new FormControl(''));
}
```

## Password Examples

### Basic Password Field

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-basic-password',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-password [control]="passwordField"></lite-password>
      <button type="submit">Submit</button>
    </form>
  `
})
export class BasicPasswordComponent {
  passwordField = new FieldDto('Password', new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]));
}
```

### Password with Strength Indicator

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-password 
        [control]="passwordField" 
        [showStrengthIndicator]="true">
      </lite-password>
      <button type="submit" [disabled]="passwordField.formControl.invalid">
        Create Account
      </button>
    </form>
  `
})
export class PasswordStrengthComponent {
  passwordField = new FieldDto('Create Password', new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ]));
}
```

### Password Confirmation Form

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-password-confirmation',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
      <lite-password 
        [control]="passwordField" 
        [showStrengthIndicator]="true">
      </lite-password>
      
      <lite-password 
        [control]="confirmPasswordField" 
        [showToggle]="false">
      </lite-password>
      
      <button type="submit" [disabled]="passwordForm.invalid">
        Update Password
      </button>
    </form>
  `
})
export class PasswordConfirmationComponent {
  passwordField = new FieldDto('New Password', new FormControl('', [
    Validators.required,
    Validators.minLength(12),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()_+-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^()_+-=\[\]{};':"\\|,.<>\/?]{12,}$/)
  ]));

  confirmPasswordField = new FieldDto('Confirm Password', new FormControl('', [
    Validators.required,
    this.passwordMatchValidator.bind(this)
  ]));

  passwordForm = new FormGroup({
    password: this.passwordField.formControl,
    confirmPassword: this.confirmPasswordField.formControl
  });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.passwordField.formControl.value;
    const confirmPassword = control.value;
    
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password updated successfully');
    }
  }
}
```

### Password Strength Analysis

```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiteFormModule, FieldDto, FormUtils } from '@kohsin/lite-form';

@Component({
  selector: 'app-password-analysis',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="password-demo">
      <lite-password 
        [control]="passwordField" 
        [showStrengthIndicator]="true">
      </lite-password>
      
      <div class="analysis-section" *ngIf="passwordField.formControl.value">
        <h4>Password Analysis</h4>
        <div class="analysis-details">
          <p><strong>Strength:</strong> {{ getPasswordAnalysis().level }}</p>
          <p><strong>Score:</strong> {{ getPasswordAnalysis().score }}/8</p>
          <div *ngIf="getPasswordAnalysis().feedback.length > 0">
            <p><strong>Suggestions:</strong></p>
            <ul>
              <li *ngFor="let tip of getPasswordAnalysis().feedback">{{ tip }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="test-passwords">
        <h4>Test Different Passwords</h4>
        <button *ngFor="let pwd of testPasswords" 
                (click)="setPassword(pwd)"
                class="test-btn">
          {{ pwd || '(empty)' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .password-demo { max-width: 500px; margin: 0 auto; padding: 20px; }
    .analysis-section { 
      margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;
      .analysis-details p { margin: 5px 0; }
      ul { margin-left: 20px; }
    }
    .test-passwords { margin-top: 20px; }
    .test-btn { 
      margin: 5px; padding: 8px 12px; border: 1px solid #007bff; 
      background: #fff; border-radius: 4px; cursor: pointer; font-size: 12px;
      &:hover { background: #f8f9fa; }
    }
  `]
})
export class PasswordAnalysisComponent {
  passwordField = new FieldDto('Test Password', new FormControl(''));

  testPasswords = [
    '',
    'abc',
    'password',
    'Password1',
    'Password123',
    'MyStr0ng@Pass',
    'MyVeryStr0ng@Password123!'
  ];

  getPasswordAnalysis() {
    return FormUtils.analyzePasswordStrength(this.passwordField.formControl.value || '');
  }

  setPassword(password: string) {
    this.passwordField.formControl.setValue(password);
  }
}
```

### Advanced Password Validation

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LiteFormModule, FieldDto } from '@kohsin/lite-form';

@Component({
  selector: 'app-advanced-password',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <form>
      <lite-password 
        [control]="advancedPasswordField" 
        [showStrengthIndicator]="true">
      </lite-password>
      
      <div class="password-info">
        <h4>Password Requirements:</h4>
        <ul class="requirements-list">
          <li [class.valid]="hasMinLength()">✓ At least 12 characters</li>
          <li [class.valid]="hasUppercase()">✓ At least one uppercase letter</li>
          <li [class.valid]="hasLowercase()">✓ At least one lowercase letter</li>
          <li [class.valid]="hasNumber()">✓ At least one number</li>
          <li [class.valid]="hasSpecialChar()">✓ At least one special character</li>
          <li [class.valid]="noRepeatingChars()">✓ No more than 2 repeating characters</li>
        </ul>
      </div>
    </form>
  `,
  styles: [`
    .password-info { margin-top: 15px; }
    .requirements-list { list-style: none; padding: 0; }
    .requirements-list li { 
      padding: 4px 0; color: #dc3545; 
      &.valid { color: #28a745; }
    }
  `]
})
export class AdvancedPasswordComponent {
  advancedPasswordField = new FieldDto('Advanced Password', new FormControl('', [
    Validators.required,
    Validators.minLength(12),
    this.passwordComplexityValidator()
  ]));

  passwordComplexityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(value);
      const minLength = value.length >= 12;
      const noRepeatingChars = !/(.)\1{2,}/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && minLength && noRepeatingChars;
      
      if (!valid) {
        return {
          passwordComplexity: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecial,
            minLength,
            noRepeatingChars
          }
        };
      }
      
      return null;
    };
  }

  private getValue(): string {
    return this.advancedPasswordField.formControl.value || '';
  }

  hasMinLength(): boolean {
    return this.getValue().length >= 12;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.getValue());
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.getValue());
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.getValue());
  }

  hasSpecialChar(): boolean {
    return /[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(this.getValue());
  }

  noRepeatingChars(): boolean {
    return !/(.)\1{2,}/.test(this.getValue());
  }
}
```

## Styling Examples

### Custom Theme

```scss
// custom-theme.scss

// Define theme variables
$primary-color: #6c5ce7;
$secondary-color: #a29bfe;
$success-color: #00b894;
$error-color: #e17055;
$text-color: #2d3436;
$border-color: #ddd;
$background-color: #fff;

// Override LiteForm styles
.lite-input.in-edit,
.lite-textarea.in-edit,
.lite-select.in-edit,
.lite-multi-select.in-edit {
  .label {
    color: lighten($text-color, 30%);
  }

  input, textarea {
    border-color: $border-color;
    color: $text-color;
    
    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }
    
    &.invalid {
      border-color: $error-color;
      background-color: rgba($error-color, 0.05);
    }
  }

  .label.float {
    color: $primary-color;
    background: $background-color;
  }
}

.lite-select.in-edit {
  .options {
    border-color: $primary-color;
    box-shadow: 0 4px 12px rgba($primary-color, 0.15);
    
    .option {
      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
      
      &.selected {
        background-color: rgba($primary-color, 0.2);
        color: $primary-color;
      }
    }
  }
  
  .arrow:hover {
    border-top-color: $primary-color;
  }
}

.lite-multi-select.in-edit {
  .input-container {
    border-color: $border-color;
    
    &:focus-within {
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }
    
    .selected-items-inline {
      .selected-item-inline {
        background: linear-gradient(135deg, $primary-color, $secondary-color);
        color: white;
        border-color: $primary-color;
        
        .remove-item-inline {
          color: rgba(white, 0.8);
          
          &:hover {
            color: white;
            background-color: rgba(white, 0.2);
          }
        }
      }
    }
  }
  
  .multi-option {
    &:hover {
      background-color: rgba($primary-color, 0.1);
    }
    
    &.selected {
      background-color: rgba($primary-color, 0.15);
      
      input[type="checkbox"] {
        accent-color: $primary-color;
      }
    }
  }
}

.error-messages {
  color: $error-color;
}

// Custom animations
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lite-select .options,
.lite-multi-select .options {
  animation: slideInUp 0.2s ease-out;
}
```

### Component Usage with Custom Theme

```typescript
@Component({
  selector: 'app-themed-form',
  standalone: true,
  imports: [LiteFormModule],
  template: `
    <div class="themed-form">
      <h2>Custom Themed Form</h2>
      <lite-input [control]="nameField"></lite-input>
      <lite-select [control]="categoryField"></lite-select>
      <lite-multi-select [control]="tagsField"></lite-multi-select>
    </div>
  `,
  styleUrls: ['./custom-theme.scss'],
  styles: [`
    .themed-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    h2 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-weight: 300;
    }
  `]
})
export class ThemedFormComponent {
  nameField = new FieldDto('Your Name', new FormControl(''));
  
  categoryField = new SelectFieldDto(
    'Category',
    new FormControl(''),
    ['Personal', 'Business', 'Creative', 'Technical'],
    (option) => option
  );

  tagsField = new MultiSelectFieldDto(
    'Tags',
    new FormControl<string[]>([]),
    ['Important', 'Urgent', 'Creative', 'Technical', 'Review', 'Follow-up'],
    (option) => option
  );
}
```

These examples demonstrate the flexibility and power of the LiteForm library, showing how to create simple forms, complex multi-step forms, dynamic forms, and custom-styled forms to meet various application needs.
