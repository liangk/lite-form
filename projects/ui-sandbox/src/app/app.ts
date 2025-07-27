import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldDto, LiteFormModule } from 'lite-form'; // Adjust the import path if needed
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LiteFormModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ui-sandbox');
  // Add a test control for demonstration
  testControl: FieldDto = { label: 'Test Input', formControl: new FormControl('') } as FieldDto;
  constructor() {}
}
