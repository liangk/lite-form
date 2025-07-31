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

  /**
   * Get detailed password error messages for a FormControl
   * @param control - The AbstractControl to check
   * @param fieldLabel - The label of the field for error messages
   * @returns array of detailed password error messages
   */
  static getPasswordErrorMessages(control: AbstractControl, fieldLabel: string): string[] {
    const errorMessages: string[] = [];
    
    if (control.errors) {
      // Required validation
      if (control.errors['required']) {
        errorMessages.push(`${fieldLabel} is required`);
      }
      
      // Length validations
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        const actualLength = control.errors['minlength'].actualLength;
        errorMessages.push(`${fieldLabel} must be at least ${requiredLength} characters (currently ${actualLength})`);
      }
      
      if (control.errors['maxlength']) {
        const requiredLength = control.errors['maxlength'].requiredLength;
        const actualLength = control.errors['maxlength'].actualLength;
        errorMessages.push(`${fieldLabel} must be no more than ${requiredLength} characters (currently ${actualLength})`);
      }
      
      // Pattern validation with detailed feedback
      if (control.errors['pattern']) {
        const value = control.value || '';
        const patternRequiredValue = control.errors['pattern'].requiredPattern;
        
        // Analyze the actual pattern to provide specific feedback
        const missingRequirements: string[] = [];
        
        // Check what the actual pattern requires by analyzing the regex
        if (patternRequiredValue) {
          // Check if the pattern requires lowercase letters
          if (patternRequiredValue.includes('(?=.*[a-z])') && !/[a-z]/.test(value)) {
            missingRequirements.push('at least one lowercase letter (a-z)');
          }
          
          // Check if the pattern requires uppercase letters
          if (patternRequiredValue.includes('(?=.*[A-Z])') && !/[A-Z]/.test(value)) {
            missingRequirements.push('at least one uppercase letter (A-Z)');
          }
          
          // Check if the pattern requires digits
          if ((patternRequiredValue.includes('(?=.*\\d)') || patternRequiredValue.includes('(?=.*[0-9])')) && !/\d/.test(value)) {
            missingRequirements.push('at least one number (0-9)');
          }
          
          // Check if the pattern requires special characters
          if (patternRequiredValue.includes('(?=.*[@$!%*?&]') && !/[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(value)) {
            missingRequirements.push('at least one special character (!@#$%^&*()_+-=[]{}|;\':",./<>?)');
          }
          
          // Check for minimum length in pattern (e.g., {8,} or {8,50})
          const lengthMatch = patternRequiredValue.match(/\{(\d+),?\d*\}/);
          if (lengthMatch) {
            const minLength = parseInt(lengthMatch[1]);
            if (value.length < minLength) {
              missingRequirements.push(`at least ${minLength} characters`);
            }
          }
          
          // Check if spaces are not allowed
          if (patternRequiredValue.includes('[A-Za-z\\d') && !patternRequiredValue.includes('\\s') && /\s/.test(value)) {
            missingRequirements.push('no spaces allowed');
          }
        }
        
        // Fallback to generic checks if pattern analysis didn't find specific requirements
        if (missingRequirements.length === 0) {
          // Check for common password requirements as fallback
          if (!/[a-z]/.test(value)) {
            missingRequirements.push('at least one lowercase letter (a-z)');
          }
          
          if (!/[A-Z]/.test(value)) {
            missingRequirements.push('at least one uppercase letter (A-Z)');
          }
          
          if (!/\d/.test(value)) {
            missingRequirements.push('at least one number (0-9)');
          }
          
          if (!/[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(value)) {
            missingRequirements.push('at least one special character (!@#$%^&*()_+-=[]{}|;\':",./<>?)');
          }
        }
        
        if (missingRequirements.length > 0) {
          errorMessages.push(`${fieldLabel} must contain ${missingRequirements.join(', ')}`);
        } else {
          // Show the actual pattern if we can't determine specific requirements
          errorMessages.push(`${fieldLabel} does not match required pattern: ${patternRequiredValue}`);
        }
      }
      
      // Custom password complexity validator
      if (control.errors['passwordComplexity']) {
        const complexity = control.errors['passwordComplexity'];
        const missing: string[] = [];
        
        if (!complexity.hasUpperCase) missing.push('uppercase letter');
        if (!complexity.hasLowerCase) missing.push('lowercase letter');
        if (!complexity.hasNumeric) missing.push('number');
        if (!complexity.hasSpecial) missing.push('special character');
        if (!complexity.minLength) missing.push('minimum length requirement');
        
        if (missing.length > 0) {
          errorMessages.push(`${fieldLabel} is missing: ${missing.join(', ')}`);
        }
      }
      
      // Password mismatch (for confirm password fields)
      if (control.errors['passwordMismatch']) {
        errorMessages.push(`${fieldLabel} does not match the password`);
      }
      
      // Common password validator
      if (control.errors['commonPassword']) {
        errorMessages.push(`${fieldLabel} is too common. Please choose a more secure password`);
      }
      
      // Password history validator
      if (control.errors['passwordHistory']) {
        errorMessages.push(`${fieldLabel} has been used recently. Please choose a different password`);
      }
      
      // Handle any other validation errors not specifically handled
      const allErrors = FormUtils.getErrors(control);
      const handledErrors = [
        'required', 'minlength', 'maxlength', 'pattern', 
        'passwordComplexity', 'passwordMismatch', 'commonPassword', 'passwordHistory'
      ];
      const unhandledErrors = allErrors.filter(error => !handledErrors.includes(error));
      
      unhandledErrors.forEach(error => {
        errorMessages.push(`${fieldLabel} validation error: ${error}`);
      });
    }
    
    return errorMessages;
  }

  /**
   * Analyze password strength and return feedback
   * @param password - The password string to analyze
   * @returns object with strength score and detailed feedback
   */
  static analyzePasswordStrength(password: string): {
    score: number;
    level: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;
    
    if (!password) {
      return { score: 0, level: 'Very Weak', feedback: ['Password is required'] };
    }
    
    // Length scoring
    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');
    
    if (password.length >= 12) score += 1;
    else if (password.length >= 8) feedback.push('Consider using 12+ characters for better security');
    
    // Character variety scoring
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Add numbers');
    
    if (/[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(password)) score += 1;
    else feedback.push('Add special characters');
    
    // Additional checks
    if (!/(.)\1{2,}/.test(password)) score += 1;
    else feedback.push('Avoid repeating characters');
    
    if (!/^(.{1,2})\1+$/.test(password)) score += 1;
    else feedback.push('Avoid repetitive patterns');
    
    // Determine strength level
    let level: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
    if (score <= 2) level = 'Very Weak';
    else if (score <= 4) level = 'Weak';
    else if (score <= 5) level = 'Fair';
    else if (score <= 6) level = 'Good';
    else level = 'Strong';
    
    return { score, level, feedback };
  }
}
