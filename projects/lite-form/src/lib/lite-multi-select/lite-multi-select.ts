import { Component, effect, input, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { MultiSelectFieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormUtils } from '../form-utils';

@Component({
  selector: 'lite-multi-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-multi-select.html`,
  styleUrls: [`../lite-styles.scss`],
  animations: [
    trigger('toggleView', [
      state('collapse', style({ height: 0, opacity: 0 })),
      state('expand', style({ height: '*', opacity: 1 })),
      transition('collapse <=> expand', animate('300ms ease-in-out'))
    ])
  ]
})
export class LiteMultiSelect implements AfterViewInit {
  inEdit = input<boolean>(true);
  control = input<MultiSelectFieldDto>({ 
    label: '', 
    formControl: new FormControl<any[]>([], { nonNullable: true }), 
    options: [], 
    displayWith: (option) => option 
  });
  showOptions = 'collapse';
  
  // Separate input text for filtering from FormControl values
  inputText = '';
  isFocused = false;
  
  // Separate text for filtering options (different from display text)
  private filterText = '';
  
  // Container height variable
  containerHeight = '36px';
  
  @ViewChild('selectedItemsRef', { static: false }) selectedItemsRef?: ElementRef;
  
  readonly FormUtils = FormUtils;
  
  constructor(private elementRef: ElementRef) {
    effect(() => {
      // Effect to react to FormControl value changes
      // Selected items are now displayed inline, so no need to update inputText
      const values = this.control().formControl.value || [];
      // Component will re-render automatically when values change
    });
    
    // Subscribe to value changes to update container height
    effect(() => {
      const formControl = this.control().formControl;
      if (formControl) {
        formControl.valueChanges.subscribe(() => {
          this.updateContainerHeight();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    // ViewChild will be available after view init
    // Set initial container height
    this.updateContainerHeight();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showOptions === 'expand') {
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.showOptions = 'collapse';
        this.filterText = ''; // Clear filter when closing
        // No need to update display text since selected items are shown inline
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

  optionToggled(option: any): void {
    // Set flag to prevent dropdown from closing
    const currentValues = this.control().formControl.value || [];
    const isSelected = this.isOptionSelected(option);
    let newValues: any[];
    if (isSelected) {
      // Remove option
      newValues = currentValues.filter(value => 
        JSON.stringify(value) !== JSON.stringify(option)
      );
    } else {
      // Add option
      newValues = [...currentValues, option];
    }
    this.control().formControl.setValue(newValues);
    // Height will be updated by valueChanges subscription
  }

  isOptionSelected(option: any): boolean {
    const currentValues = this.control().formControl.value || [];
    return currentValues.some(value => 
      JSON.stringify(value) === JSON.stringify(option)
    );
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputText = target.value;
    this.filterText = target.value;
    // Input is used for filtering only - display is handled by selected items
  }

  onInputFocus(): void {
    this.showOptions = 'expand';
    this.isFocused = true;
    this.inputText = '';
    this.filterText = '';
  }

  onInputBlur(): void {
    this.isFocused = false;
  }

  getDisplayValue(): string {
    // Always return filter text for the input - selected items are shown separately
    return this.filterText;
  }

  updateDisplayText(): void {
    // No longer needed to update inputText since selected items are shown inline
    // This method can be kept for compatibility but doesn't need to do anything
  }

  hasTypedValue(): boolean {
    // Check if user is typing (for filtering)
    if (!this.filterText.trim()) return false;
    const values = this.control().formControl.value || [];
    if (values.length === 0) return true;
    if (values.length === 1) {
      return this.filterText !== this.control().displayWith(values[0]);
    }
    return this.filterText !== `${values.length} items selected`;
  }

  getFilteredOptions(): any[] {
    if (!this.filterText.trim()) {
      return this.control().options;
    }
    return this.control().options.filter(option =>
      this.control().displayWith(option).toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  getSelectedCount(): number {
    const values = this.control().formControl.value || [];
    return values.length;
  }

  hasSelection(): boolean {
    return this.getSelectedCount() > 0;
  }

  getSelectedItems(): any[] {
    return this.control().formControl.value || [];
  }

  removeSelectedItem(item: any): void {
    const currentValues = this.control().formControl.value || [];
    const newValues = currentValues.filter(value => 
      JSON.stringify(value) !== JSON.stringify(item)
    );
    this.control().formControl.setValue(newValues);
    // Height will be updated by valueChanges subscription
  }

  private updateContainerHeight(): void {
    // Schedule height calculation for next tick to ensure DOM is updated
    setTimeout(() => {
      if (this.selectedItemsRef?.nativeElement) {
        const naturalHeight = this.selectedItemsRef.nativeElement.getBoundingClientRect().height;
        const baseHeight = 36;
        const padding = 4;
        this.containerHeight = `${Math.max(baseHeight, naturalHeight + padding)}px`;
        console.log('Updated container height', this.containerHeight, naturalHeight);
      } else if (!this.hasSelection()) {
        this.containerHeight = '36px';
      }
    }, 0);
  }
  shouldFloat() {
    return this.showOptions === 'expand' || this.hasSelection() || this.hasTypedValue();
  }

  shouldShowPlaceholder(): boolean {
    // Show placeholder when filtering or when no items are selected
    return (this.isFiltering() || !this.hasSelection()) && this.shouldFloat();
  }

  isFiltering(): boolean {
    return !!this.filterText.trim();
  }
}
