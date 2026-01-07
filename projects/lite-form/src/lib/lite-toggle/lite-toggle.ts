import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-toggle',
  templateUrl: `./lite-toggle.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteToggle {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl<boolean>(false, { nonNullable: true }) });
  
  readonly FormUtils = FormUtils;

  constructor() {
    effect(() => {
      // console.log('LiteToggle initialized with control:', this.control());
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

  onToggleChange() {
    const currentValue = this.control().formControl.value;
    this.control().formControl.setValue(!currentValue);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }
}
