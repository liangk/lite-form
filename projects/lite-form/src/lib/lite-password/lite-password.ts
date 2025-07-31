import { Component, effect, input, signal, computed } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-password.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LitePassword {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });
  showToggle = input<boolean>(true);
  showStrengthIndicator = input<boolean>(false);
  
  readonly FormUtils = FormUtils;
  showPassword = signal<boolean>(false);

  // Computed password strength analysis
  passwordStrength = computed(() => {
    const password = this.control().formControl.value || '';
    return FormUtils.analyzePasswordStrength(password);
  });

  constructor() {
    effect(() => {
      console.log('LitePassword initialized with control:', this.control());
    });
  }

  isRequired() {
    return this.FormUtils.isRequired(this.control().formControl);
  }

  hasErrors(): boolean {
    return FormUtils.hasErrors(this.control().formControl);
  }

  getErrorMessage(): string[] {
    return FormUtils.getPasswordErrorMessages(this.control().formControl, this.control().label);
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  getInputType(): string {
    return this.showPassword() ? 'text' : 'password';
  }

  getDisplayValue(): string {
    const value = this.control().formControl.value;
    return value ? '••••••••' : '';
  }
}
