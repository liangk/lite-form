import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-textarea.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteTextarea {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });
  
  // Make FormUtils available to the template
  readonly FormUtils = FormUtils;
  
  constructor() {
    effect(() => {
      // Initialization logic can go here if needed
    });
  }

  isRequired(): boolean {
    return FormUtils.isRequired(this.control().formControl);
  }

  hasErrors(): boolean {
    return FormUtils.hasErrors(this.control().formControl);
  }

  getErrorMessage(): string[] {
    return FormUtils.getErrorMessages(this.control().formControl, this.control().label);
  }
}
