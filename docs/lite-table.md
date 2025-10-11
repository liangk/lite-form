# LiteTable

## Description
A flexible data table component with custom columns, cell templates, nested property access, and integrated pagination. Features row action menus with smart positioning and customizable styling.

## Features
- Generic type support for type-safe data handling
- Custom column definitions with flexible rendering
- Cell template functions for custom formatting
- Nested property access with dot notation
- Integrated pagination with customizable options
- Row action menus (single-action buttons or dropdown menus)
- Smart dropdown positioning (auto-opens upward near bottom)
- Empty state display
- Sortable columns with page-level sorting (frontend, only current page is sorted)
- Responsive flex-based layout
- SVG-based menu icons

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `table` | `TableFieldDto<T>` | required | Table configuration including columns, data, and pagination |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `pageChange` | `EventEmitter<number>` | Emits when page number changes |
interface MenuItem {
  label: string;
  value: string;
  variant?: 'danger';
}
```

## Examples

### Basic Table

```typescript
import { Component, signal } from '@angular/core';
import { LiteTable, TableFieldDto, PaginatorFieldDto } from 'ngx-lite-form';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LiteTable],
  template: `<lite-table [table]="userTable()"></lite-table>`
})
export class ExampleComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];
  
  userTable = signal(new TableFieldDto<User>(
    [
      { label: 'ID', key: 'id', flex: '0 0 80px' },
      { label: 'Name', key: 'name', flex: '1' },
      { label: 'Email', key: 'email', flex: '1' },
      { label: 'Role', key: 'role', flex: '0 0 120px' }
    ],
    this.users,
    false  // No pagination
  ));
}
```

### Table with Pagination

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' }
  ],
  this.users,
  true,  // Enable pagination
  new PaginatorFieldDto(1, this.users.length, 10)  // page, total, itemsPerPage
));

onPageChange(page: number) {
  console.log('Page changed to:', page);
  // Fetch data for new page
}

onItemsPerPageChange(itemsPerPage: number) {
  console.log('Items per page:', itemsPerPage);
  // Update table configuration
}
```

```html
<lite-table 
  [table]="userTable()"
  (pageChange)="onPageChange($event)"
  (itemsPerPageChange)="onItemsPerPageChange($event)"
></lite-table>
```

## Sorting

LiteTable supports client-side, page-level sorting:

- Sorting is applied to the currently visible page only.
- If pagination is disabled, sorting applies to the full visible dataset.
- Clicking a sortable header cycles: ascending → descending → none.
- Sorting compares the rendered cell value using `getCellValue()`, so custom `cellTemplate` formatting is respected. Numeric strings are compared numerically when both sides parse to numbers; otherwise locale-aware string comparison is used.

### Enable sorting on columns

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Role', key: 'role' }
  ],
  this.users,
  true,
  new PaginatorFieldDto(1, this.users.length, 10)
));
```

### Handle sort changes

Bind to `sortChange` and update `table.sortState` in your component. Reassign the table object to trigger change detection, if needed in your setup.

```html
<lite-table 
  [table]="userTable()"
  (sortChange)="onSort($event)"></lite-table>
```

```ts
onSort(event: { column: string; direction: 'asc' | 'desc' | null }) {
  const current = this.userTable();
  this.userTable.set({
    ...current,
    sortState: { column: event.column, direction: event.direction }
  });
}
```

> Note: Sorting is applied to the current page slice on the frontend. If you need server-side or whole-dataset sorting across pages, perform sorting in your data source before passing rows to `LiteTable`.

### Custom Cell Templates

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { 
      label: 'Name', 
      key: 'name',
      cellTemplate: (value, row) => `<strong>${value}</strong>`
    },
    { 
      label: 'Email', 
      key: 'email',
      cellTemplate: (value) => `<a href="mailto:${value}">${value}</a>`
    },
    {
      label: 'Status',
      key: 'isActive',
      cellTemplate: (value) => value ? '✓ Active' : '✗ Inactive'
    }
  ],
  this.users,
  false
));
```

### Nested Property Access

```typescript
interface User {
  name: {
    first: string;
    last: string;
  };
  address: {
    city: string;
    country: string;
  };
}

userTable = signal(new TableFieldDto<User>(
  [
    { label: 'First Name', key: 'name.first' },
    { label: 'Last Name', key: 'name.last' },
    { label: 'City', key: 'address.city' },
    { label: 'Country', key: 'address.country' }
  ],
  this.users,
  false
));
```

### Single-Action Button

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    {
      label: 'Actions',
      key: 'actions',
      type: 'menu',
      flex: '0 0 120px',
      menuItems: [
        { label: 'Edit', value: 'edit' }
      ]
    }
  ],
  this.users,
  false
));

onMenuAction(event: { action: string; row: User }) {
  console.log(`Action ${event.action} on user:`, event.row);
  if (event.action === 'edit') {
    // Open edit form
  }
}
```

```html
<lite-table 
  [table]="userTable()"
  (menuAction)="onMenuAction($event)"
></lite-table>
```

### Dropdown Menu with Multiple Actions

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    {
      label: 'Actions',
      key: 'actions',
      type: 'menu',
      flex: '0 0 80px',
      menuItems: [
        { label: 'View', value: 'view' },
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete', variant: 'danger' }
      ]
    }
  ],
  this.users,
  false
));

onMenuAction(event: { action: string; row: User }) {
  switch (event.action) {
    case 'view':
      console.log('View user:', event.row);
      break;
    case 'edit':
      console.log('Edit user:', event.row);
      break;
    case 'delete':
      console.log('Delete user:', event.row);
      break;
  }
}
```

### Empty State

```typescript
emptyTable = signal(new TableFieldDto<User>(
  [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' }
  ],
  [],  // Empty data array
  false,
  undefined,
  'No users found. Try adjusting your search criteria.'  // Custom empty message
));
```

### Custom Column Widths

```typescript
userTable = signal(new TableFieldDto<User>(
  [
    { label: 'ID', key: 'id', flex: '0 0 60px' },           // Fixed 60px
    { label: 'Name', key: 'name', flex: '2' },              // 2x flex grow
    { label: 'Email', key: 'email', flex: '3' },            // 3x flex grow
    { label: 'Role', key: 'role', flex: '0 0 100px' },      // Fixed 100px
    { label: 'Actions', key: 'actions', type: 'menu', flex: '0 0 80px' }
  ],
  this.users,
  false
));
```

## Smart Dropdown Positioning

The table automatically detects when a row action menu button is near the bottom of the viewport and opens the dropdown upward instead of downward to prevent it from being cut off.

## Styling

```scss
lite-table {
  // Component-level styling
  flex: 1;
  overflow-y: auto;
}

.table-container {
  // Container styles
}

.table-header {
  // Header row
}

.header-cell {
  // Column headers
}

.table-body {
  // Data rows container
}

.data-row {
  // Individual row
  &:hover {
    background: #f8f9fa;
  }
}

.data-cell {
  // Table cells
  min-height: 40px;
}

.single-action-button {
  // Single action button
  &.danger {
    color: #dc3545;
  }
}

.menu-button {
  // Dropdown trigger button
}

.menu-dropdown {
  // Dropdown menu
  &.menu-dropdown--upward {
    // Upward-opening dropdown
  }
}

.menu-item {
  // Dropdown menu items
  &.danger {
    color: #dc3545;
  }
}
```

## Accessibility

- Proper ARIA labels for action buttons
- `aria-expanded` state for dropdown menus
- Keyboard navigation support
- Screen reader friendly
