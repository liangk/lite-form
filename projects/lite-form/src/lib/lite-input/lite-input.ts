import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lite-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-input.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteInput {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });

  constructor() {
    effect(() => {
      // Initialization logic can go here if needed
      console.log('LiteInput initialized with control:', this.control());
    });
  }
}
