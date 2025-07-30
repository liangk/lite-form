import { Component, effect, input, ElementRef, HostListener } from '@angular/core';
import { SelectFieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-select.html`,
  styleUrls: [`../lite-styles.scss`],
  animations: [
    trigger('toggleView', [
      state('collapse', style({ height: 0, borderStyle: 'none' })),
      state('expand', style({ height: '*', borderStyle: 'solid' })),
      transition('collapse <=> expand', animate('300ms ease-in-out'))
    ])
  ]
})
export class LiteSelect {
  inEdit = input<boolean>(true);
  control = input<SelectFieldDto>({ label: '', formControl: new FormControl(null), options: [], displayWith: (option) => option });
  showOptions = 'collapse';
  
  // Separate input text from FormControl value
  inputText = '';
  
  readonly FormUtils = FormUtils;
  
  constructor(private elementRef: ElementRef) {
    effect(() => {
      // Sync inputText with FormControl value when it changes
      const value = this.control().formControl.value;
      if (value && typeof value === 'object') {
        this.inputText = this.control().displayWith(value);
      } else if (!value) {
        this.inputText = '';
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showOptions === 'expand') {
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.showOptions = 'collapse';
      }
    }
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

  optionSelected(option: any): void {
    this.control().formControl.setValue(option);
    this.inputText = this.control().displayWith(option);
    this.showOptions = 'collapse';
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputText = target.value;
    // Note: FormControl value is only updated when a valid option is selected
  }

  onInputBlur(): void {
    this.showOptions = 'collapse';
    // If the typed text matches an option exactly, select it
    const matchingOption = this.control().options.find(option => 
      this.control().displayWith(option).toLowerCase() === this.inputText.toLowerCase()
    );
    
    if (matchingOption) {
      this.control().formControl.setValue(matchingOption);
      this.inputText = this.control().displayWith(matchingOption);
    } else {
      // If no match and FormControl has a value, reset inputText to show the current selection
      const currentValue = this.control().formControl.value;
      if (currentValue && typeof currentValue === 'object') {
        this.inputText = this.control().displayWith(currentValue);
      }
      // If no current selection and no match, leave inputText as typed for user feedback
    }
  }

  getDisplayValue(): string {
    return this.inputText;
  }

  hasTypedValue(): boolean {
    // Check if user has typed something that doesn't match any option
    if (!this.inputText.trim()) return false;
    
    // Check if the current inputText matches any valid option's display value
    const matchesValidOption = this.control().options.some(option => 
      this.control().displayWith(option).toLowerCase() === this.inputText.toLowerCase()
    );
    
    return !matchesValidOption;
  }

  getFilteredOptions(): any[] {
    if (!this.inputText.trim()) {
      return this.control().options;
    }
    
    return this.control().options.filter(option =>
      this.control().displayWith(option).toLowerCase().includes(this.inputText.toLowerCase())
    );
  }
}
