import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiteInput } from './lite-input/lite-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiteTextarea } from './lite-textarea/lite-textarea';
import { LiteSelect } from './lite-select/lite-select';
import { LiteMultiSelect } from './lite-multi-select/lite-multi-select';
import { LiteRadio } from './lite-radio/lite-radio';
import { LiteCheckbox } from './lite-checkbox/lite-checkbox';
import { LiteDate } from './lite-date/lite-date';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    LiteInput, LiteTextarea, LiteSelect, LiteMultiSelect, LiteRadio, LiteCheckbox, LiteDate
  ],
  exports: [
    LiteInput, LiteTextarea, LiteSelect, LiteMultiSelect, LiteRadio, LiteCheckbox, LiteDate
  ]
})
export class LiteFormModule { }