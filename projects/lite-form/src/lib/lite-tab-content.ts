import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[liteTabContent]',
  standalone: true
})
export class LiteTabContent {
  constructor(public template: TemplateRef<any>) {}
}
