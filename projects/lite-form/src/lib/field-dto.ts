import { Form, FormControl } from "@angular/forms";

export class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;
  constructor(label: string, formControl: FormControl, rows: number = 2) {
    this.label = label;
    this.formControl = formControl;
    this.rows = rows;
  }
}
export class SelectFieldDto<T = any> {
  label: string;
  formControl: FormControl<T>;
  options: T[];
  displayWith: (option: T) => string;
  constructor(
    label: string,
    formControl: FormControl<T>,
    options: T[],
    displayWith: (option: T) => string
  ) {
    this.label = label;
    this.formControl = formControl;
    this.options = options;
    this.displayWith = displayWith;
  }
}