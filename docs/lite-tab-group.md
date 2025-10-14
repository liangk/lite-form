# LiteTabGroup

## Description
A lightweight tab container that supports both simple HTML content and full Angular component projection via a directive, with a smooth sliding track and responsive sizing.

## Features
- Tabs with labels via `tabs: LiteTabItem[]`
- Project Angular components into each tab via `libLiteTabContent` directive
- Active tab control with `activeIndex`
- `tabChange` event when the active tab changes
- Pixel-based sliding for accurate transitions across any number of tabs
- Responsive and resizable: uses ResizeObserver and window resize

## API

### Inputs
- `tabs: LiteTabItem[]` (required)
- `activeIndex?: number` (default: 0)

### Outputs
- `tabChange: EventEmitter<number>`

### Types
```ts
export interface LiteTabItem { label: string; content?: string }
```

### Projection Directive
```ts
@Directive({ selector: '[libLiteTabContent]', standalone: true })
export class LiteTabContent { constructor(public template: TemplateRef<unknown>) {} }
```

## Usage

### Projecting Angular components (recommended)
```ts
import { Component, signal } from '@angular/core';
import { LiteTabGroup, LiteTabItem, LiteTabContent, LiteTable, TableFieldDto, PaginatorFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'demo-tabs',
  standalone: true,
  imports: [LiteTabGroup, LiteTabContent, LiteTable],
  template: `
  <lite-tab-group [tabs]="tabs" [activeIndex]="active()" (tabChange)="onTab($event)">
    <ng-template libLiteTabContent>
      <lite-table [table]="basicTable"></lite-table>
    </ng-template>
    <ng-template libLiteTabContent>
      <lite-table [table]="pagedTable"></lite-table>
    </ng-template>
  </lite-tab-group>
  `
})
export class DemoTabsComponent {
  tabs: LiteTabItem[] = [ { label: 'Basic' }, { label: 'With Paginator' } ];
  active = signal(0);
  onTab(i: number) { this.active.set(i); }

  basicTable = new TableFieldDto([{ label: 'Name', key: 'name' }], [], false);
  pagedTable = new TableFieldDto([{ label: 'Email', key: 'email' }], [], true, new PaginatorFieldDto(1, 0, 10));
}
```

### Simple HTML content via `content`
```html
<lite-tab-group [tabs]="[{ label: 'A', content: '<p>Tab A</p>' }, { label: 'B', content: '<p>Tab B</p>' }]"></lite-tab-group>
```

## Styling
Use the following classes to customize the look:
- `.lite-tab-group` container
- `.tab-header` and `.tab-item` (active: `.tab-item--active`)
- `.tab-content-wrapper`, `.tab-contents`, `.tab-content`

Example overrides:
```scss
.lite-tab-group { .tab-item { padding: 6px 16px; } .tab-content { padding: 12px; } }
```

## Notes
- When projecting Angular components with `libLiteTabContent`, panes are sized in pixels to match the wrapper ensuring precise sliding regardless of content.
- The component re-measures on window resize and when projected content changes.
