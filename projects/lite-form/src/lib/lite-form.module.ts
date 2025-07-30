import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiteInput } from './lite-input/lite-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiteTextarea } from './lite-textarea/lite-textarea';
import { LiteSelect } from './lite-select/lite-select';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    LiteInput, LiteTextarea, LiteSelect
  ],
  exports: [
    LiteInput, LiteTextarea, LiteSelect
  ]
})
export class LiteFormModule { }