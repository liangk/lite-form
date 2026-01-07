import { Component, effect, input } from '@angular/core';
import { SliderFieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-slider',
  templateUrl: `./lite-slider.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteSlider {
  inEdit = input<boolean>(true);
  control = input<SliderFieldDto>({ 
    label: '', 
    formControl: new FormControl<number>(0, { nonNullable: true }),
    min: 0,
    max: 100,
    step: 1
  });
  
  readonly FormUtils = FormUtils;

  constructor() {
    effect(() => {
      // console.log('LiteSlider initialized with control:', this.control());
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

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.control().formControl.setValue(value);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }

  getProgressPercentage(): number {
    const { min = 0, max = 100 } = this.control();
    const value = this.control().formControl.value || 0;
    return ((value - min) / (max - min)) * 100;
  }

  getDisplayValue(): string {
    const value = this.control().formControl.value;
    const { valueFormatter } = this.control();
    return valueFormatter ? valueFormatter(value) : value.toString();
  }
}
