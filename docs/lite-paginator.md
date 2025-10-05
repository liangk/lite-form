# LitePaginator

## Description
Standalone pagination component with customizable page navigation, items per page selection, and total item display. Can be used independently or with LiteTable.

## Features
- Page number navigation
- First/Previous/Next/Last buttons
- Items per page selector
- Total items display
- Current page range display
- Configurable page sizes
- Event emission for changes
- Responsive design

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `paginator` | `PaginatorFieldDto` | required | Pagination configuration |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `pageChange` | `EventEmitter<number>` | Emits when page changes |
| `itemsPerPageChange` | `EventEmitter<number>` | Emits when items per page changes |

### PaginatorFieldDto Class

```typescript
class PaginatorFieldDto {
  constructor(
    public currentPage: number,
    public totalItems: number,
    public itemsPerPage: number,
    public pageSizeOptions: number[] = [10, 20, 50, 100]
  ) {}
  
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  
  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
```

## Examples

### Basic Paginator

```typescript
import { Component, signal } from '@angular/core';
import { LitePaginator, PaginatorFieldDto } from 'ngx-lite-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LitePaginator],
  template: `
    <lite-paginator
      [paginator]="paginatorConfig()"
      (pageChange)="onPageChange($event)"
      (itemsPerPageChange)="onItemsPerPageChange($event)"
    ></lite-paginator>
  `
})
export class ExampleComponent {
  totalItems = 250;
  
  paginatorConfig = signal(new PaginatorFieldDto(
    1,           // Current page
    this.totalItems,
    20,          // Items per page
    [10, 20, 50, 100]  // Page size options
  ));
  
  onPageChange(page: number) {
    const config = this.paginatorConfig();
    config.currentPage = page;
    this.paginatorConfig.set(new PaginatorFieldDto(
      page,
      config.totalItems,
      config.itemsPerPage,
      config.pageSizeOptions
    ));
    // Fetch data for new page
  }
  
  onItemsPerPageChange(itemsPerPage: number) {
    const config = this.paginatorConfig();
    this.paginatorConfig.set(new PaginatorFieldDto(
      1,  // Reset to page 1
      config.totalItems,
      itemsPerPage,
      config.pageSizeOptions
    ));
    // Fetch data with new page size
  }
}
```

### Custom Page Sizes

```typescript
paginatorConfig = signal(new PaginatorFieldDto(
  1,
  1000,
  25,
  [25, 50, 100, 200]  // Custom page size options
));
```

### With Data Fetching

```typescript
fetchData(page: number, itemsPerPage: number) {
  this.http.get(`/api/items?page=${page}&limit=${itemsPerPage}`)
    .subscribe((response: any) => {
      this.items = response.data;
      this.paginatorConfig.set(new PaginatorFieldDto(
        page,
        response.total,
        itemsPerPage
      ));
    });
}

onPageChange(page: number) {
  const config = this.paginatorConfig();
  this.fetchData(page, config.itemsPerPage);
}

onItemsPerPageChange(itemsPerPage: number) {
  this.fetchData(1, itemsPerPage);
}
```


## Integration with LiteTable

The LitePaginator is automatically integrated when using LiteTable with pagination enabled:

```typescript
tableConfig = signal(new TableFieldDto(
  columns,
  data,
  true,  // Enable pagination
  new PaginatorFieldDto(1, data.length, 10)
));
```
