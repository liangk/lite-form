import { Component, effect, input, signal, ElementRef, HostListener, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../form-utils';
import { FieldDto } from '../field-dto';

interface CalendarDay {
  date: Date;
  day: number;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
}

export interface DateRangeFieldDto extends Omit<FieldDto, 'formControl'> {
  formControl: FormControl<string[]>;
}

@Component({
  selector: 'lite-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-date.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteDate {
  inEdit = input<boolean>(true);
  control = input<FieldDto | DateRangeFieldDto>({ 
    label: '', 
    formControl: new FormControl<string>('', { nonNullable: true }),
  });
  format = input<string>('dd/MM/yyyy');
  range = input<boolean>(false);
  
  // Calendar state
  currentMonth = signal<Date>(new Date());
  showCalendar = signal<boolean>(false);
  calendarPosition = signal<'bottom' | 'top'>('bottom');
  
  // Signal to track form control value changes for reactivity
  private formValueChangeSignal = signal<any>(null);
  
  // Second month for range selection
  secondMonth = computed(() => {
    const current = this.currentMonth();
    return new Date(current.getFullYear(), current.getMonth() + 1, 1);
  });
  
  // Computed calendar days - only recalculates when dependencies change
  calendarDays = computed(() => {
    // This makes the computed reactive to form value changes
    this.formValueChangeSignal();
    return this.getMonthDays(this.currentMonth());
  });
  
  // Second month calendar days for range mode
  secondCalendarDays = computed(() => {
    // This makes the computed reactive to form value changes
    this.formValueChangeSignal();
    return this.range() ? this.getMonthDays(this.secondMonth()) : [];
  });

  private getMonthDays(monthDate: Date): CalendarDay[] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: CalendarDay[] = [];
    const today = new Date();
    const selectedValue = this.control().formControl.value;
    
    // Handle both single date and date range
    let selectedDates: Date[] = [];
    let rangeStart: Date | null = null;
    let rangeEnd: Date | null = null;
    
    if (this.range()) {
      // Range mode - value should be string[]
      const rangeValue = selectedValue as string[];
      if (rangeValue && rangeValue.length > 0) {
        if (rangeValue[0]) {
          const startDate = new Date(rangeValue[0]);
          if (!isNaN(startDate.getTime())) {
            selectedDates.push(startDate);
            rangeStart = startDate;
          }
        }
        if (rangeValue[1]) {
          const endDate = new Date(rangeValue[1]);
          if (!isNaN(endDate.getTime())) {
            selectedDates.push(endDate);
            rangeEnd = endDate;
          }
        }
      }
    } else {
      // Single mode - value should be string
      const singleValue = selectedValue as string;
      if (singleValue) {
        const date = new Date(singleValue);
        if (!isNaN(date.getTime())) {
          selectedDates.push(date);
        }
      }
    }
    
    // Only add days from the current month
    const currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      const isToday = this.isSameDay(currentDate, today);
      const isSelected = selectedDates.some(selectedDate => this.isSameDay(currentDate, selectedDate));
      
      // Range styling flags
      const isRangeStart = rangeStart ? this.isSameDay(currentDate, rangeStart) : false;
      const isRangeEnd = rangeEnd ? this.isSameDay(currentDate, rangeEnd) : false;
      const isInRange = !!(rangeStart && rangeEnd && currentDate >= rangeStart && currentDate <= rangeEnd && !isRangeStart && !isRangeEnd);
      
      days.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        isOtherMonth: false,
        isToday,
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  }
  
  readonly FormUtils = FormUtils;

  constructor(private elementRef: ElementRef) {
    effect(() => {
      const control = this.control();
      console.log('LiteDate initialized with control:', control);
      
      // Subscribe to form control value changes to trigger reactivity
      if (control && control.formControl) {
        const subscription = control.formControl.valueChanges.subscribe(value => {
          console.log('Form value changed:', value);
          this.formValueChangeSignal.set(Date.now()); // Use timestamp to ensure change detection
        });
        
        // Initial trigger
        this.formValueChangeSignal.set(Date.now());
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
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
      if (this.range()) {
        const newValue = ['', ''];
        (this.control().formControl as FormControl<string[]>).setValue(newValue);
        this.formValueChangeSignal.set(Date.now());
      } else {
        (this.control().formControl as FormControl<string>).setValue('');
        this.formValueChangeSignal.set(Date.now());
      }
      this.control().formControl.markAsDirty();
      this.control().formControl.markAsTouched();
      return;
    }
    
    if (this.range()) {
      // Range mode - check if input contains " - " separator
      if (inputValue.includes(' - ')) {
        const rangeParts = inputValue.split(' - ');
        if (rangeParts.length === 2) {
          const startDateParsed = this.parseFormattedDate(rangeParts[0].trim(), this.format());
          const endDateParsed = this.parseFormattedDate(rangeParts[1].trim(), this.format());
          
          if (startDateParsed && endDateParsed) {
            // Store as ISO date strings for consistency
            const startIso = this.toLocalISOString(startDateParsed);
            const endIso = this.toLocalISOString(endDateParsed);
            
            // Ensure start date is before end date
            let newValue: string[];
            if (startDateParsed <= endDateParsed) {
              newValue = [startIso, endIso];
            } else {
              newValue = [endIso, startIso];
            }
            (this.control().formControl as FormControl<string[]>).setValue(newValue);
            this.formValueChangeSignal.set(Date.now());
          } else {
            // If parsing fails, store the raw input values
            const newValue = [rangeParts[0].trim(), rangeParts[1].trim()];
            (this.control().formControl as FormControl<string[]>).setValue(newValue);
            this.formValueChangeSignal.set(Date.now());
          }
        } else {
          // Invalid range format, store as single date
          const parsedDate = this.parseFormattedDate(inputValue, this.format());
          let newValue: string[];
          if (parsedDate) {
            const isoString = this.toLocalISOString(parsedDate);
            newValue = [isoString, ''];
          } else {
            newValue = [inputValue, ''];
          }
          (this.control().formControl as FormControl<string[]>).setValue(newValue);
          this.formValueChangeSignal.set(Date.now());
        }
      } else {
        // Single date input in range mode
        const parsedDate = this.parseFormattedDate(inputValue, this.format());
        let newValue: string[];
        if (parsedDate) {
          const isoString = this.toLocalISOString(parsedDate);
          newValue = [isoString, ''];
        } else {
          newValue = [inputValue, ''];
        }
        (this.control().formControl as FormControl<string[]>).setValue(newValue);
        this.formValueChangeSignal.set(Date.now());
      }
    } else {
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
      this.formValueChangeSignal.set(Date.now());
    }
    
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
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

  getFormattedValue(): string {
    const value = this.control().formControl.value;
    if (!value) return '';
    
    if (this.range()) {
      // Range mode - value is string[]
      const rangeValue = value as string[];
      if (rangeValue && rangeValue.length >= 2) {
        const dates = [];
        if (rangeValue[0]) {
          const startDate = new Date(rangeValue[0]);
          if (!isNaN(startDate.getTime())) {
            dates.push(this.formatDate(startDate, this.format()));
          }
        }
        if (rangeValue[1]) {
          const endDate = new Date(rangeValue[1]);
          if (!isNaN(endDate.getTime())) {
            dates.push(this.formatDate(endDate, this.format()));
          }
        }
        if (dates.length === 2) {
          return `${dates[0]} - ${dates[1]}`;
        } else if (dates.length === 1) {
          return dates[0];
        }
      }
      return '';
    } else {
      // Single mode - value is string
      const singleValue = value as string;
      if (singleValue) {
        const date = new Date(singleValue);
        if (!isNaN(date.getTime())) {
          return this.formatDate(date, this.format());
        }
        return singleValue; // Return original value if invalid date
      }
      return '';
    }
  }

  getDisplayValue(): string {
    const value = this.control().formControl.value;
    if (!value) return 'Not selected';
    
    if (this.range()) {
      // Range mode - value is string[]
      const rangeValue = value as string[];
      if (rangeValue && rangeValue.length >= 2) {
        const dates = [];
        if (rangeValue[0]) {
          const startDate = new Date(rangeValue[0]);
          if (!isNaN(startDate.getTime())) {
            dates.push(this.formatDate(startDate, this.format()));
          }
        }
        if (rangeValue[1]) {
          const endDate = new Date(rangeValue[1]);
          if (!isNaN(endDate.getTime())) {
            dates.push(this.formatDate(endDate, this.format()));
          }
        }
        if (dates.length === 2) {
          return `${dates[0]} - ${dates[1]}`;
        } else if (dates.length === 1) {
          return dates[0];
        }
      }
      return 'Not selected';
    } else {
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
  }

  private formatDate(date: Date, format: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year);
  }

  // Calendar methods
  toggleCalendar(): void {
    if (!this.showCalendar()) {
      this.calculateCalendarPosition();
      this.setCalendarToSelectedDate();
    }
    this.showCalendar.set(!this.showCalendar());
  }

  private setCalendarToSelectedDate(): void {
    const selectedValue = this.control().formControl.value;
    if (selectedValue) {
      let selectedDate: Date | null = null;
      
      if (this.range()) {
        // Range mode - use first date if available
        const rangeValue = selectedValue as string[];
        if (rangeValue && rangeValue.length > 0 && rangeValue[0]) {
          selectedDate = new Date(rangeValue[0]);
        }
      } else {
        // Single mode
        const singleValue = selectedValue as string;
        if (singleValue) {
          selectedDate = new Date(singleValue);
        }
      }
      
      if (selectedDate && !isNaN(selectedDate.getTime())) {
        // Set calendar to show the month of the selected date
        const selectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        this.currentMonth.set(selectedMonth);
      }
    }
  }

  private calculateCalendarPosition(): void {
    const element = this.elementRef.nativeElement;
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

  getSecondMonthYearDisplay(): string {
    const date = this.secondMonth();
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

  selectDate(day: CalendarDay): void {
    const dateString = this.toLocalISOString(day.date);
    
    if (this.range()) {
      // Range mode - handle start and end date selection
      const currentValue = this.control().formControl.value as string[];
      const currentRange = currentValue || ['', ''];
      
      if (!currentRange[0] || (currentRange[0] && currentRange[1])) {
        // Set start date if no start date or both dates are set (reset)
        // Clear any existing range formatting by setting only the start date
        const newValue = [dateString, ''];
        (this.control().formControl as FormControl<string[]>).setValue(newValue);
        this.formValueChangeSignal.set(Date.now()); // Trigger immediate update
      } else {
        // Set end date
        const startDate = new Date(currentRange[0]);
        const endDate = new Date(dateString);
        
        // Check if clicking the same date as start date
        if (this.isSameDay(startDate, endDate)) {
          // Reset to just the start date
          const newValue = [dateString, ''];
          (this.control().formControl as FormControl<string[]>).setValue(newValue);
          this.formValueChangeSignal.set(Date.now()); // Trigger immediate update
        } else {
          // Ensure start date is before end date
          let newValue: string[];
          if (startDate <= endDate) {
            newValue = [currentRange[0], dateString];
          } else {
            newValue = [dateString, currentRange[0]];
          }
          (this.control().formControl as FormControl<string[]>).setValue(newValue);
          this.formValueChangeSignal.set(Date.now()); // Trigger immediate update
          
          // Auto-hide calendar after 1 second when second date is selected
          setTimeout(() => {
            this.showCalendar.set(false);
          }, 1000);
        }
      }
    } else {
      // Single mode
      (this.control().formControl as FormControl<string>).setValue(dateString);
      this.formValueChangeSignal.set(Date.now()); // Trigger immediate update
      this.showCalendar.set(false); // Close calendar after selection
    }
    
    this.control().formControl.markAsDirty();
    this.control().formControl.markAsTouched();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  // Helper method to convert Date to ISO date string without timezone conversion
  private toLocalISOString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
