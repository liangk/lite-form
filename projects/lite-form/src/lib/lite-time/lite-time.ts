import { Component, effect, input, signal, ElementRef, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';
import { TimeFieldDto } from '../field-dto';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-time',
  templateUrl: `./lite-time.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteTime {
  inEdit = input<boolean>(true);
  control = input<TimeFieldDto>({ 
    label: '', 
    formControl: new FormControl<string>('00:00', { nonNullable: true }),
  });
  format = input<string>('HH:mm');
  hourSet = new Array(24).fill(0).map((_, i) => i);
  minSet = new Array(12).fill(0).map((_, i) => i * 5);
  showPicker = signal<boolean>(false);
  pickerPosition = signal<'bottom' | 'top'>('bottom');
  readonly FormUtils = FormUtils;
  get hours(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }
  get minutes(): number[] {
    return Array.from({ length: 60 }, (_, i) => i);
  }
  get currentHours(): number {
    const value = this.control().formControl.value;
    if (!value) return 0;
    const parts = value.split(':');
    return parseInt(parts[0] || '0', 10);
  }
  get currentMinutes(): number {
    const value = this.control().formControl.value;
    if (!value) return 0;
    const parts = value.split(':');
    return parseInt(parts[1] || '0', 10);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target as Node)) {
      this.showPicker.set(false);
    }
  }
  constructor(private _elementRef: ElementRef) {
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
  getDisplayValue(): string {
    const value = this.control().formControl.value;
    if (!value) return 'Not selected';
    return value;
  }
  onTimeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    
    // Auto-format input
    value = this.formatInput(value);
    this.control().formControl.setValue(value);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }
  private formatInput(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    const hours = digits.slice(0, 2);
    const minutes = digits.slice(2, 4);
    return `${hours}:${minutes}`;
  }
  closeCalendar(): void {
    this.showPicker.set(false);
  }
  togglePicker(): void {
    if (!this.showPicker()) {
      this.calculatePickerPosition();
    }
    this.showPicker.set(!this.showPicker());
  }

  private calculatePickerPosition(): void {
    const element = this._elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const pickerHeight = 200;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    if (spaceBelow < pickerHeight && spaceAbove > spaceBelow) {
      this.pickerPosition.set('top');
    } else {
      this.pickerPosition.set('bottom');
    }
  }
  onSelectHour(hour: number): void {
    const currentValue = this.control().formControl.value;
    const parts = currentValue ? currentValue.split(':') : ['00', '00'];
    const minutes = parts[1] || '00';
    const newValue = `${hour.toString().padStart(2, '0')}:${minutes}`;
    this.control().formControl.setValue(newValue);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }

  onSelectMinute(minute: number): void {
    const currentValue = this.control().formControl.value;
    const parts = currentValue ? currentValue.split(':') : ['00', '00'];
    const hours = parts[0] || '00';
    const newValue = `${hours}:${minute.toString().padStart(2, '0')}`;
    this.control().formControl.setValue(newValue);
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }
}
