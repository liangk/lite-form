# LiteForm Examples

This document provides comprehensive examples of using LiteForm components in various scenarios.

## Basic Usage Examples

### Simple Form

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteFormModule, FieldDto, SelectFieldDto, RadioFieldDto } from 'lite-form';

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

  isFormValid(): boolean {
    return this.nameField.formControl.valid &&
           this.emailField.formControl.valid &&
           this.messageField.formControl.valid &&
           this.priorityField.formControl.valid &&
           this.urgencyField.formControl.valid &&
           this.agreeField.formControl.valid;
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
      <lite-input [control]="passwordField"></lite-input>
      <lite-input [control]="confirmPasswordField"></lite-input>
      
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
