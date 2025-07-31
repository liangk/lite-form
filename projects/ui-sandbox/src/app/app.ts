import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FieldDto, LiteFormModule, SelectFieldDto, MultiSelectFieldDto, RadioFieldDto, DateRangeFieldDto, FormUtils } from 'lite-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LiteFormModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('UI Sandbox');
  readonly potterApi = 'https://potterapi-fedeperin.vercel.app/en'
  inputDemo: FieldDto = { label: 'Test Input', formControl: new FormControl('', [Validators.required]) } as FieldDto;
  
  // Basic password with detailed validation
  passwordDemo: FieldDto = { 
    label: 'Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]) 
  } as FieldDto;
  
  // Confirm password with simpler validation (just required and length)
  confirmPasswordDemo: FieldDto = { 
    label: 'Confirm Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]) 
  } as FieldDto;
  
  textareaDemo: FieldDto = { label: 'Test Textarea', formControl: new FormControl('') } as FieldDto;
  selectDemo: SelectFieldDto = {
    label: 'Test Select',
    formControl: new FormControl(null, [Validators.required]),
    options: [],
    displayWith: (option: any) => option?.label
  };
  
  multiSelectDemo: MultiSelectFieldDto = {
    label: 'Test Multi-Select',
    formControl: new FormControl<any[]>([], { nonNullable: true }),
    options: [],
    displayWith: (option: any) => option?.title
  };

  radioDemo: RadioFieldDto = {
    label: 'Test Radio',
    formControl: new FormControl('', [Validators.required]),
    options: [
      'Small Business Package',
      'Professional Enterprise Solution',
      'Premium Corporate Plan',
      'Custom Implementation'
    ],
    displayWith: (option: string) => option
  };
  
  checkboxDemo: FieldDto = {
    label: 'I agree to the terms and conditions',
    formControl: new FormControl<boolean>(false, { nonNullable: true }),
  };
  
  requiredCheckboxDemo: FieldDto = {
    label: 'Accept privacy policy (required)',
    formControl: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  };

  dateDemo: FieldDto = {
    label: 'Birth Date',
    formControl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  };

  dateRangeDemo: DateRangeFieldDto = {
    label: 'Event Date Range',
    formControl: new FormControl<string[]>(['', ''], { nonNullable: true }),
  };

  // Advanced password with custom complexity validator
  advancedPasswordDemo: FieldDto = { 
    label: 'Advanced Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      this.passwordComplexityValidator()
    ]) 
  } as FieldDto;

  // Password with strength indicator
  strengthPasswordDemo: FieldDto = { 
    label: 'Password with Strength Indicator', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]) 
  } as FieldDto;

  constructor(private http: HttpClient) {
    this.getPotterBooks();
    this.getPotterCharacters();
    this.dateDemo.formControl.setValue('2025-10-01');
    this.dateDemo.formControl.valueChanges.subscribe(value => {
      console.log('Date changed:', value);
    });
    
    // Set initial range values
    // this.dateRangeDemo.formControl.setValue(['2025-07-01', '2025-07-15']);
    this.dateRangeDemo.formControl.valueChanges.subscribe(value => {
      console.log('Date range changed:', value);
    });

    // Demonstrate password strength analysis
    this.strengthPasswordDemo.formControl.valueChanges.subscribe(password => {
      if (password) {
        const analysis = FormUtils.analyzePasswordStrength(password);
        console.log('Password Analysis:', analysis);
        console.log(`Strength: ${analysis.level} (${analysis.score}/8)`);
        if (analysis.feedback.length > 0) {
          console.log('Suggestions:', analysis.feedback);
        }
      }
    });
  }

  /**
   * Example method showing how to use analyzePasswordStrength programmatically
   */
  analyzePassword(password: string) {
    const analysis = FormUtils.analyzePasswordStrength(password);
    
    console.log('=== Password Strength Analysis ===');
    console.log(`Password: "${password}"`);
    console.log(`Score: ${analysis.score}/8`);
    console.log(`Level: ${analysis.level}`);
    console.log('Feedback:', analysis.feedback);
    
    return analysis;
  }

  /**
   * Demo method to test different password strengths
   */
  testPasswordStrengths() {
    const testPasswords = [
      '',                           // Very Weak
      'abc',                        // Very Weak  
      'password',                   // Weak
      'Password1',                  // Fair
      'Password123',                // Good
      'MyStr0ng@Pass',             // Good
      'MyVeryStr0ng@Password123!'   // Strong
    ];

    console.log('=== Password Strength Test Results ===');
    testPasswords.forEach(pwd => {
      const analysis = this.analyzePassword(pwd);
      console.log('---');
    });
  }

  /**
   * Custom password complexity validator
   */
  passwordComplexityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[@$!%*?&^()_+\-=\[\]{};':"\\|,.<>\/?#~`]/.test(value);
      const minLength = value.length >= 12;
      const noRepeatingChars = !/(.)\1{2,}/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && minLength && noRepeatingChars;
      
      if (!valid) {
        return {
          passwordComplexity: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecial,
            minLength,
            noRepeatingChars
          }
        };
      }
      
      return null;
    };
  }

  getPotterBooks() {
    this.http.get<any[]>(`${this.potterApi}/books`).subscribe(books => {
      console.log(books);
      this.selectDemo.options = books;
      this.selectDemo.displayWith = (option: any) => option?.title;
    });
  }
  getPotterCharacters() {
    this.http.get<any[]>(`${this.potterApi}/characters`).subscribe(characters => {
      console.log(characters);
      this.multiSelectDemo.options = characters;
      this.multiSelectDemo.displayWith = (option: any) => option?.fullName;
    });
  }
}
