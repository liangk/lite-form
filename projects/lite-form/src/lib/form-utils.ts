import { AbstractControl } from '@angular/forms';

/**
 * Utility class for form-related helper functions
 */
export class FormUtils {
  /**
   * Check if a FormControl has the required validator
   * @param control - The AbstractControl to check
   * @returns true if the control has a required validator, false otherwise
   */
  static isRequired(control: AbstractControl): boolean {
    if (control.validator) {
      const validator = control.validator({} as any);
      return validator && validator['required'];
    }
    return false;
  }

  /**
   * Check if a FormControl has any validation errors
   * @param control - The AbstractControl to check
   * @returns true if the control has errors, false otherwise
   */
  static hasErrors(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  /**
   * Get all error keys for a FormControl
   * @param control - The AbstractControl to check
   * @returns array of error keys or empty array if no errors
   */
  static getErrors(control: AbstractControl): string[] {
    if (control.errors) {
      return Object.keys(control.errors);
    }
    return [];
  }

  /**
   * Get user-friendly error messages for a FormControl
   * @param control - The AbstractControl to check
   * @param fieldLabel - The label of the field for error messages
   * @returns array of user-friendly error messages
   */
  static getErrorMessages(control: AbstractControl, fieldLabel: string): string[] {
    const errorMessages: string[] = [];
    
    if (control.errors) {
      if (control.errors['required']) {
        errorMessages.push(`${fieldLabel} is required`);
      }
      if (control.errors['email']) {
        errorMessages.push(`${fieldLabel} must be a valid email`);
      }
      if (control.errors['minlength']) {
        errorMessages.push(`${fieldLabel} must be at least ${control.errors['minlength'].requiredLength} characters`);
      }
      if (control.errors['maxlength']) {
        errorMessages.push(`${fieldLabel} must be no more than ${control.errors['maxlength'].requiredLength} characters`);
      }
      
      // Handle any other validation errors
      const allErrors = FormUtils.getErrors(control);
      const handledErrors = ['required', 'email', 'minlength', 'maxlength'];
      const unhandledErrors = allErrors.filter(error => !handledErrors.includes(error));
      
      unhandledErrors.forEach(error => {
        errorMessages.push(`${fieldLabel} is invalid: ${error}`);
      });
    }
    
    return errorMessages;
  }

  /**
   * Get the first error message for a FormControl
   * @param control - The AbstractControl to check
   * @returns the first error key or null if no errors
   */
  static getFirstError(control: AbstractControl): string | null {
    if (control.errors) {
      return Object.keys(control.errors)[0];
    }
    return null;
  }
}
