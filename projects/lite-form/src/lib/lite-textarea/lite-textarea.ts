import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lite-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./lite-textarea.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteTextarea {
  inEdit = input<boolean>(true);
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });
  constructor() {
    effect(() => {
      // Initialization logic can go here if needed
    });
  }
}
