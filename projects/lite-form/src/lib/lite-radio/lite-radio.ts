import { Component, input } from '@angular/core';
import { RadioFieldDto } from '../field-dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lite-radio.html',
  styleUrls: ['../lite-styles.scss']
})
export class LiteRadio {
  inEdit = input<boolean>(true);
  control = input<RadioFieldDto>({ 
    label: '', 
    formControl: new FormControl(''), 
    options: [], 
    displayWith: (option) => option 
  });
  direction = input<'vertical' | 'horizontal'>('vertical');

  readonly FormUtils = FormUtils;

  isRequired(): boolean {
    return FormUtils.isRequired(this.control().formControl);
  }

  hasErrors(): boolean {
    return FormUtils.hasErrors(this.control().formControl);
  }

  getErrorMessage(): string[] {
    return FormUtils.getErrorMessages(this.control().formControl, this.control().label);
  }

  onRadioChange(value: any): void {
    this.control().formControl.setValue(value);
  }

  isSelected(value: any): boolean {
    return this.control().formControl.value === value;
  }
}
