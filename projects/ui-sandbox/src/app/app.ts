import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FieldDto, LiteFormModule, SelectFieldDto } from 'lite-form';

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
  constructor(private http: HttpClient) {
    this.getPotterBooks();
  }
  getPotterBooks() {
    this.http.get<any[]>(`${this.potterApi}/books`).subscribe(books => {
      console.log(books);
      this.selectDemo.options = books;
      this.selectDemo.displayWith = (option: any) => option?.title;
    });
  }
}
