import { Form, FormControl } from "@angular/forms";

export class FieldDto {
  label: string;
  formControl: FormControl;
  rows?: number;
  type?: 'text' | 'number';

  constructor(label: string, formControl: FormControl, rows: number = 2, type: 'text' | 'number' = 'text') {
    this.label = label;
    this.formControl = formControl;
    this.rows = rows;
    this.type = type;
  }
}

export abstract class BaseSelectFieldDto<T = any> {
  label: string;
  options: T[];
  displayWith: (option: T) => string;
  
  constructor(
    label: string,
    options: T[],
    displayWith: (option: T) => string
  ) {
    this.label = label;
    this.options = options;
    this.displayWith = displayWith;
  }
}

export class SelectFieldDto<T = any> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T>;
  
  constructor(
    label: string,
    formControl: FormControl<T>,
    options: T[],
    displayWith: (option: T) => string
  ) {
    super(label, options, displayWith);
    this.formControl = formControl;
  }
}

export class MultiSelectFieldDto<T = any> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T[]>;
  
  constructor(
    label: string,
    formControl: FormControl<T[]>,
    options: T[],
    displayWith: (option: T) => string
  ) {
    super(label, options, displayWith);
    this.formControl = formControl;
  }
}

export class RadioFieldDto<T = any> extends BaseSelectFieldDto<T> {
  formControl: FormControl<T>;
  
  constructor(
    label: string,
    formControl: FormControl<T>,
    options: T[],
    displayWith: (option: T) => string
  ) {
    super(label, options, displayWith);
    this.formControl = formControl;
  }
}