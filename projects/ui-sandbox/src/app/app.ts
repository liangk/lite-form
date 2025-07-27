import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldDto, LiteFormModule, LiteTextarea } from 'lite-form'; // Adjust the import path if needed
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LiteFormModule, LiteTextarea],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('UI Sandbox');
  inputDemo: FieldDto = { label: 'Test Input', formControl: new FormControl('') } as FieldDto;
  textareaDemo: FieldDto = { label: 'Test Textarea', formControl: new FormControl('') } as FieldDto;
  constructor() {}
}
