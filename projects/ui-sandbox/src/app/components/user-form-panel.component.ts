import { Component, input, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LiteInput, LiteTextarea, FieldDto } from 'lite-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  validityChange = input<(_isValid: boolean) => void>((_isValid: boolean) => {});
  mode = input<'create' | 'edit'>('create');
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bio: new FormControl('', [Validators.maxLength(200)]),
  });
  nameField: FieldDto = {
    label: 'Full Name',
    formControl: this.userForm.get('name') as FormControl
  } as FieldDto;

  emailField: FieldDto = {
    label: 'Email Address',
    formControl: this.userForm.get('email') as FormControl
  } as FieldDto;

  bioField: FieldDto = {
    label: 'Bio',
    formControl: this.userForm.get('bio') as FormControl
  } as FieldDto;

  constructor() {
    this.userForm.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.emitValidity());

    effect(() => {
      this.validityChange();
      this.emitValidity();
    });

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
      this.emitValidity();
    });
  }

  isValid() {
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

  private emitValidity(): void {
    this.validityChange()(this.userForm.valid);
  }
}
