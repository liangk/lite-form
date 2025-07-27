import { Form, FormControl } from "@angular/forms";

export class FieldDto {
  label: string;
  formControl: FormControl;
  constructor(label: string, formControl: FormControl) {
    this.label = label;
    this.formControl = formControl;
  }
}
