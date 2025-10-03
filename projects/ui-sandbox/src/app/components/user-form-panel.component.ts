import { Component, input, effect } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LiteInput, LiteTextarea, FieldDto } from 'lite-form';

export interface UserFormData {
  name?: string;
  email?: string;
  bio?: string;
}

/**
 * Example component that can be used as lite-panel content.
 * This demonstrates a user form with input fields that can be pre-populated.
 */
@Component({
  selector: 'app-user-form-panel',
  standalone: true,
  imports: [LiteInput, LiteTextarea],
  template: `
    <div class="user-form-panel">
      <p class="user-form-panel__description">
        {{ mode() === 'edit' ? 'Update the user information below:' : 'Fill out the form to create a new user:' }}
      </p>
      
      <lite-input [control]="nameField"></lite-input>
      <lite-input [control]="emailField"></lite-input>
      <lite-textarea [control]="bioField"></lite-textarea>
      
      <div class="user-form-panel__info">
        <strong>Mode:</strong> {{ mode() === 'edit' ? 'Edit' : 'Create' }} | 
        <strong>Status:</strong> {{ isValid() ? 'Valid ✓' : 'Invalid ✗' }}
      </div>
    </div>
  `,
  styles: [`
    .user-form-panel { display: flex; flex-direction: column; gap: 1rem; }
    .user-form-panel__description { margin: 0 0 0.5rem 0; color: #666; font-size: 0.95rem; }
    .user-form-panel__info { padding: 0.75rem; background: #f5f5f5; border-radius: 4px;
      font-size: 0.9rem;
    }
  `]
})
export class UserFormPanelComponent {
  initialData = input<UserFormData | undefined>();
  mode = input<'create' | 'edit'>('create');

  nameField: FieldDto = {
    label: 'Full Name',
    formControl: new FormControl('', [Validators.required, Validators.minLength(3)])
  } as FieldDto;

  emailField: FieldDto = {
    label: 'Email Address',
    formControl: new FormControl('', [Validators.required, Validators.email])
  } as FieldDto;

  bioField: FieldDto = {
    label: 'Bio',
    formControl: new FormControl('', [Validators.maxLength(200)])
  } as FieldDto;

  constructor() {
    // Use effect to populate form when initialData changes
    effect(() => {
      const data = this.initialData();
      if (data) {
        if (data.name) {
          this.nameField.formControl.setValue(data.name);
        }
        if (data.email) {
          this.emailField.formControl.setValue(data.email);
        }
        if (data.bio) {
          this.bioField.formControl.setValue(data.bio);
        }
      }
    });
  }

  isValid(): boolean {
    return this.nameField.formControl.valid && 
           this.emailField.formControl.valid && 
           this.bioField.formControl.valid;
  }

  getData() {
    return {
      name: this.nameField.formControl.value,
      email: this.emailField.formControl.value,
      bio: this.bioField.formControl.value
    };
  }
}
