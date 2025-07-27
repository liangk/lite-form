import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiteInput } from './lite-input/lite-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiteTextarea } from './lite-textarea/lite-textarea';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, LiteInput, LiteTextarea
  ],
  exports: [
    LiteInput, LiteTextarea
  ]
})
export class LiteFormModule { }