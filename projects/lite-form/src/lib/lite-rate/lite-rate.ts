import { Component, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';
import { RateFieldDto } from '../field-dto';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-rate',
  templateUrl: `./lite-rate.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteRate {
  inEdit = input<boolean>(true);
  control = input<RateFieldDto>({ 
    label: '', 
    formControl: new FormControl<number>(0, { nonNullable: true }),
    max: 5,
    readonly: false,
    variant: 'default'
  });
  
  readonly FormUtils = FormUtils;

  constructor() {
    effect(() => {
      // console.log('LiteRate initialized with control:', this.control());
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

  get stars(): number[] {
    return Array.from({ length: this.control().max || 5 }, (_, i) => i + 1);
  }

  get currentValue(): number {
    return this.control().formControl.value || 0;
  }

  getDisplayValue(): string {
    const value = this.control().formControl.value;
    if (!value) return 'Not rated';
    return `${value} / ${this.control().max || 5}`;
  }

  onStarClick(star: number): void {
    if (this.control().readonly) return;
    
    // Toggle off if clicking the same star
    if (this.currentValue === star) {
      this.control().formControl.setValue(0);
    } else {
      this.control().formControl.setValue(star);
    }
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }

  onStarHover(star: number): void {
    // Could implement hover effect here if needed
  }
}
