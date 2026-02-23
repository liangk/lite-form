import { Component, effect, input, ElementRef, HostListener, computed, signal, DoCheck, DestroyRef, inject } from '@angular/core';
import { SelectFieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormUtils } from '../form-utils';
import { startWith, Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lite-select',
  
  templateUrl: `./lite-select.html`,
  styleUrls: [`../lite-styles.scss`],
  animations: [
    trigger('toggleView', [
      state('collapse', style({ height: 0, opacity: 0 })),
      state('expand', style({ height: '*', opacity: 1 })),
      transition('collapse <=> expand', animate('300ms ease-in-out'))
    ])
  ]
})
export class LiteSelect implements DoCheck {
  inEdit = input<boolean>(true);
  control = input<SelectFieldDto>({ label: '', formControl: new FormControl(null), options: [], displayWith: (option) => option });
  showOptions = 'collapse';
  
  // Separate input text from FormControl value
  inputText = signal('');
  
  // Track previous options array to detect mutations
  private _previousOptionsLength = 0;
  private _previousOptionsReference: any[] = [];
  
  // Internal signal that gets updated when options change
  private _optionsVersion = signal(0);

  private readonly _destroyRef = inject(DestroyRef);
  private _valueSub?: Subscription;
  
  readonly FormUtils = FormUtils;
  
  // Computed signal for filtered options
  filteredOptions = computed(() => {
    const text = this.inputText();
    // Force dependency on options version to trigger recalculation
    this._optionsVersion();
    const options = this.control().options;
    // console.log('Filtered options computed:', options);
    
    if (!text.trim()) {
      return options;
    }
    
    return options.filter(option =>
      this.control().displayWith(option).toLowerCase().includes(text.toLowerCase())
    );
  });
  
  ngDoCheck(): void {
    // Manually check if options array has changed (by reference or length)
    const currentOptions = this.control().options;
    
    if (currentOptions !== this._previousOptionsReference || 
        currentOptions.length !== this._previousOptionsLength) {
      // console.log('Options changed detected in ngDoCheck:', currentOptions);
      this._previousOptionsReference = currentOptions;
      this._previousOptionsLength = currentOptions.length;
      
      // Increment version to trigger computed signal recalculation
      this._optionsVersion.update(v => v + 1);
    }
  }

  constructor(private _elementRef: ElementRef) {
    this._destroyRef.onDestroy(() => this._valueSub?.unsubscribe());

    effect(() => {
      const formControl = this.control().formControl;
      this._valueSub?.unsubscribe();
      this._valueSub = formControl.valueChanges.pipe(startWith(formControl.value)).subscribe(value => {
        if (value === null || value === undefined) { this.inputText.set(''); return; }
        this.inputText.set(this.control().displayWith(value));
      });
    }, { allowSignalWrites: true });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showOptions === 'expand') {
      const target = event.target as HTMLElement;
      if (!this._elementRef.nativeElement.contains(target)) {
        this.showOptions = 'collapse';
        this.handleInputValidation();
      }
    }
  }
  
  private handleInputValidation(): void {
    // If the typed text matches an option exactly, select it
    const matchingOption = this.control().options.find(option => 
      this.control().displayWith(option).toLowerCase() === this.inputText().toLowerCase()
    );
    
    if (matchingOption) {
      this.control().formControl.setValue(matchingOption);
      this.inputText.set(this.control().displayWith(matchingOption));
    } else {
      // If no match and FormControl has a value, reset inputText to show the current selection
      const currentValue = this.control().formControl.value;
      if (currentValue && typeof currentValue === 'object') {
        this.inputText.set(this.control().displayWith(currentValue));
      }
      // If no current selection and no match, leave inputText as typed for user feedback
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
    console.log(option);
    this.control().formControl.setValue(option);
    this.inputText.set(this.control().displayWith(option));
    this.showOptions = 'collapse';
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputText.set(target.value);
    
    // Reset selection to initial state when input is cleared
    if (!target.value.trim()) {
      this.control().formControl.setValue(null);
    }
    // Note: FormControl value is only updated when a valid option is selected
  }

  getDisplayValue(): string {
    return this.inputText();
  }

  hasTypedValue(): boolean {
    // Check if user has typed something that doesn't match any option
    if (!this.inputText().trim()) return false;
    
    // Check if the current inputText matches any valid option's display value
    const matchesValidOption = this.control().options.some(option => 
      this.control().displayWith(option).toLowerCase() === this.inputText().toLowerCase()
    );
    
    return !matchesValidOption;
  }
  toggleOptionPanel(): void {
    console.log(this.filteredOptions());
    this.showOptions = this.showOptions === 'expand' ? 'collapse' : 'expand';
  }

  shouldShowPlaceholder(): boolean {
    // Only show placeholder when label is floating (not overlapping)
    return this.showOptions === 'expand' || !!this.getDisplayValue() || this.hasTypedValue();
  }
}
