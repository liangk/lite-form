import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-input',
  templateUrl: `./lite-input.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteInput {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });
  
  readonly FormUtils = FormUtils;

  constructor() {
    effect(() => {
      // console.log('LiteInput initialized with control:', this.control());

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

}
