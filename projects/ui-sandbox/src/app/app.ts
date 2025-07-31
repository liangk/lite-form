import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FieldDto, LiteFormModule, SelectFieldDto, MultiSelectFieldDto, RadioFieldDto } from 'lite-form';

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
  constructor(private http: HttpClient) {
    this.getPotterBooks();
    this.getPotterCharacters();
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
