import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-checkbox.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteCheckbox {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl<boolean>(false, { nonNullable: true }) });
  
  readonly FormUtils = FormUtils;

  constructor() {
    effect(() => {
      console.log('LiteCheckbox initialized with control:', this.control());
    });
  }

  isRequired() {
    return this.FormUtils.isRequired(this.control().formControl);
  }

  hasErrors(): boolean {
    return FormUtils.hasErrors(this.control().formControl);
  }

  getErrorMessage(): string[] {
    return FormUtils.getErrorMessages(this.control().formControl, this.control().label);
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.control().formControl.setValue(target.checked);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }
}
