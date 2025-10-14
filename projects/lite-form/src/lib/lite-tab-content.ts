import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libLiteTabContent]',
  standalone: true
})
export class LiteTabContent {
  // eslint-disable-next-line no-unused-vars
  constructor(public template: TemplateRef<unknown>) {}
}
