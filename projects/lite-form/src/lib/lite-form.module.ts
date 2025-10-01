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
import { LiteDateTime } from './lite-datetime/lite-datetime';
import { LitePassword } from './lite-password/lite-password';
import { LiteFile } from './lite-file/lite-file';
import { LitePaginator } from './lite-paginator/lite-paginator';
import { LiteTable } from './lite-table/lite-table';
import { LitePanel } from './lite-panel/lite-panel';
import { LiteLoading } from './lite-loading/lite-loading';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    LiteInput, LiteTextarea, LiteSelect, LiteMultiSelect, LiteRadio, LiteCheckbox, LiteDate, LiteDateTime, LitePassword, LiteFile, LitePaginator, LiteTable, LitePanel, LiteLoading
  ],
  exports: [
    LiteInput, LiteTextarea, LiteSelect, LiteMultiSelect, LiteRadio, LiteCheckbox, LiteDate, LiteDateTime, LitePassword, LiteFile, LitePaginator, LiteTable, LitePanel, LiteLoading
  ]
})
export class LiteFormModule { }