import { Component, effect, input } from '@angular/core';
import { FieldDto } from '../field-dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lite-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: `./lite-input.html`,
  styleUrls: [`../lite-styles.scss`]
})
export class LiteInput {
  control = input<FieldDto>({ label: '', formControl: new FormControl('') });
  constructor() {
    effect(() => {
      // Initialization logic can go here if needed
    });
  }
}
