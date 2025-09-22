import { Component, effect, input, signal, ElementRef, HostListener, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';
import { FieldDto } from '../field-dto';

interface CalendarDateTime {
  date: Date;
  day: number;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-datetime',
  
  templateUrl: `./lite-datetime.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteDateTime {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ 
    label: '', 
    formControl: new FormControl<string>('', { nonNullable: true }),
  });
  format = input<string>('dd/MM/yyyy HH:mm');
  
  // Calendar state
  currentMonth = signal<Date>(new Date());
  showCalendar = signal<boolean>(false);
  calendarPosition = signal<'bottom' | 'top'>('bottom');
  formattedValue = signal<string>('');
  hourSet = new Array(24).fill(0).map((_, i) => i);
  minSet = new Array(12).fill(0).map((_, i) => i * 5);
  selectedHour = new Date().getHours();
  selectedMinute = 0;
  selectedDateTime: CalendarDateTime | null = null;
  // Signal to track form control value changes for reactivity
  // private formValueChangeSignal = signal<any>(null);
  
  // Computed calendar days - only recalculates when dependencies change
  calendarDays = computed(() => {
    // This makes the computed reactive to form value changes
    // this.formValueChangeSignal();
    return this.getMonthDays(this.currentMonth());
  });

  private getMonthDays(monthDate: Date): CalendarDateTime[] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: CalendarDateTime[] = [];
    const today = new Date();
    const value = this.control().formControl.value;

    // Single mode - value should be string
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        this.selectedDateTime = {
          date,
          day: date.getDate(),
          isOtherMonth: false,
          isToday: this.isSameDay(date, today),
          isSelected: true,
        };
      }
    }
    
    // Only add days from the current month
    const previousMonthDate = new Date(firstDay);
    while (previousMonthDate.getDay() !== 0) {
      previousMonthDate.setDate(previousMonthDate.getDate() - 1);
      days.unshift({
        date: new Date(previousMonthDate),
        day: previousMonthDate.getDate(),
        isOtherMonth: true,
        isToday: this.isSameDay(previousMonthDate, today),
        isSelected: this.isSameDay(previousMonthDate, this.selectedDateTime ? this.selectedDateTime.date : null),
      });
    }
    const currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      const isToday = this.isSameDay(currentDate, today);
      const isSelected = this.isSameDay(currentDate, this.selectedDateTime ? this.selectedDateTime.date : null);
      days.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        isOtherMonth: false,
        isToday,
        isSelected,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const nextMonthDate = new Date(lastDay);
    while (nextMonthDate.getDay() < 6) {
      nextMonthDate.setDate(nextMonthDate.getDate() + 1);
      days.push({
        date: new Date(nextMonthDate),
        day: nextMonthDate.getDate(),
        isOtherMonth: true,
        isToday: this.isSameDay(nextMonthDate, today),
        isSelected: this.isSameDay(nextMonthDate, this.selectedDateTime ? this.selectedDateTime.date : null),
      });
    }
    return days;
  }
  
  readonly FormUtils = FormUtils;

  constructor(private _elementRef: ElementRef) {
    effect(() => {
      const control = this.control();
      // console.log('LiteDateTime with control:', control);
      
      // Subscribe to form control value changes to trigger reactivity
      if (control && control.formControl) {
        control.formControl.valueChanges.subscribe(value => {
          if (value) {
            const date = new Date(value);
            // console.log('Form value changed:', value, date, isNaN(date.getTime()));
            if (!isNaN(date.getTime())) {
              console.log('Formatted Date:', this.formatDate(date, this.format()))
              this.formattedValue.set(this.formatDate(date, this.format()));
            } else {
              this.formattedValue.set(value);
            }
          }
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target as Node)) {
      this.showCalendar.set(false);
    }
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

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    
    if (!inputValue) {
      (this.control().formControl as FormControl<string>).setValue('');
      // this.formValueChangeSignal.set(Date.now());
      this.control().formControl.markAsDirty();
      this.control().formControl.markAsTouched();
      return;
    }
    

    // Single mode - try to parse the formatted date input
    const parsedDate = this.parseFormattedDate(inputValue, this.format());
    let newValue: string;
    if (parsedDate) {
      // Store as ISO date string for consistency
      newValue = this.toLocalISOString(parsedDate);
    } else {
      // If parsing fails, store the raw input value
      newValue = inputValue;
    }
    (this.control().formControl as FormControl<string>).setValue(newValue);
    // this.formValueChangeSignal.set(Date.now());
  
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }
  onSelectHour(hour: number) {
    this.selectedHour = hour;
    this.setDateTimeSelected(this.selectedDateTime ? this.selectedDateTime.date : new Date());
  }
  onSelectMinute(minute: number) {
    this.selectedMinute = minute;
    this.setDateTimeSelected(this.selectedDateTime ? this.selectedDateTime.date : new Date());
  }
  private setDateTimeSelected(date: Date): void {
    this.selectedDateTime = {
      date,
      day: date.getDate(),
      isOtherMonth: false,
      isToday: date.getDate() === new Date().getDate(),
      isSelected: true,
    };
    const dateString = this.toLocalISOString(this.selectedDateTime.date);
    (this.control().formControl as FormControl<string>).setValue(dateString);
    const calDate = this.calendarDays().find(d => this.isSameDay(d.date, date));
    if (calDate) {calDate.isSelected = true;}
  }
  private parseFormattedDate(dateString: string, format: string): Date | null {
    try {
      // Create a regex pattern from the format
      let pattern = format
        .replace('dd', '(\\d{1,2})')
        .replace('MM', '(\\d{1,2})')
        .replace('yyyy', '(\\d{4})');
      
      const regex = new RegExp(`^${pattern}$`);
      const match = dateString.match(regex);
      
      if (!match) return null;
      
      // Extract parts based on format
      let day: number, month: number, year: number;
      
      if (format === 'dd/MM/yyyy') {
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10) - 1; // Month is 0-indexed
        year = parseInt(match[3], 10);
      } else if (format === 'MM/dd/yyyy') {
        month = parseInt(match[1], 10) - 1; // Month is 0-indexed
        day = parseInt(match[2], 10);
        year = parseInt(match[3], 10);
      } else if (format === 'yyyy-MM-dd') {
        year = parseInt(match[1], 10);
        month = parseInt(match[2], 10) - 1; // Month is 0-indexed
        day = parseInt(match[3], 10);
      } else {
        // Default to dd/MM/yyyy
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10) - 1;
        year = parseInt(match[3], 10);
      }
      
      const date = new Date(year, month, day);
      
      // Validate the date
      if (date.getFullYear() === year && 
          date.getMonth() === month && 
          date.getDate() === day) {
        return date;
      }
      
      return null;
    } catch {
      return null;
    }
  }
  getDisplayValue(): string {
    const value = this.control().formControl.value;
    if (!value) return 'Not selected';

    // Single mode - value is string
    const singleValue = value as string;
    if (singleValue) {
      const date = new Date(singleValue);
      if (!isNaN(date.getTime())) {
        return this.formatDate(date, this.format());
      }
      return singleValue;
    }
    return 'Not selected';
  }

  private formatDate(date: Date, format: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year)
      .replace('HH', (this.selectedHour < 10 ? '0' : '') + this.selectedHour)
      .replace('mm', (this.selectedMinute < 10 ? '0' : '') + this.selectedMinute);
  }

  // Calendar methods
  toggleCalendar(): void {
    if (!this.showCalendar()) {
      this.calculateCalendarPosition();
      this.setCalendarToSelectedDate();
    }
    this.showCalendar.set(!this.showCalendar());
  }

  closeCalendar(): void {
    this.showCalendar.set(false);
  }

  private setCalendarToSelectedDate(): void {
    const selectedValue = this.control().formControl.value;
    if (selectedValue) {
      let selectedDate: Date | null = null;

      // Single mode
      const singleValue = selectedValue as string;
      if (singleValue) {
        selectedDate = new Date(singleValue);
      }
      
      if (selectedDate && !isNaN(selectedDate.getTime())) {
        // Set calendar to show the month of the selected date
        const selectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        this.currentMonth.set(selectedMonth);
      }
    }
  }

  private calculateCalendarPosition(): void {
    const element = this._elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const calendarHeight = 300; // Approximate height of calendar panel
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    // If not enough space below and more space above, position on top
    if (spaceBelow < calendarHeight && spaceAbove > spaceBelow) {
      this.calendarPosition.set('top');
    } else {
      this.calendarPosition.set('bottom');
    }
  }

  getMonthYearDisplay(): string {
    const date = this.currentMonth();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  previousMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonth.set(newDate);
  }

  nextMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonth.set(newDate);
  }

  selectDate(day: CalendarDateTime): void {
    if (this.selectedDateTime){
      this.selectedDateTime.isSelected = false;
    }
    // this.selectedDateTime = day;
    // this.selectedDateTime.isSelected = true;
    this.setDateTimeSelected(day.date);
    // const dateString = this.toLocalISOString(day.date);
    // (this.control().formControl as FormControl<string>).setValue(dateString);
    // // this.formValueChangeSignal.set(Date.now()); // Trigger immediate update
    
    // this.control().formControl.markAsDirty();
    // this.control().formControl.markAsTouched();
  }

  private isSameDay(date1: Date, date2: Date | null): boolean {
    if (!date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  // Helper method to convert Date to ISO date string without timezone conversion
  private toLocalISOString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hh = (this.selectedHour < 10 ? '0' : '') + this.selectedHour;
    const mm = (this.selectedMinute < 10 ? '0' : '') + this.selectedMinute;
    return `${year}-${month}-${day}T${hh}:${mm}:00`;
  }

}
