import { Component, input, computed, output, HostListener, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFieldDto, TableColumn, SortDirection, SortState } from '../field-dto';
import { LitePaginator } from '../lite-paginator/lite-paginator';

@Component({
  selector: 'lite-table',
  standalone: true,
  imports: [CommonModule, LitePaginator],
  templateUrl: './lite-table.html',
  styleUrls: ['../lite-styles.scss']
})
export class LiteTable<T = any> {
  table = input.required<TableFieldDto<T>>();
  pageChange = output<number>();
  itemsPerPageChange = output<number>();
  // Emits when a row menu action is selected
  menuAction = output<{ action: string; row: T }>();
  // Emits when sort state changes
  sortChange = output<{ column: string; direction: SortDirection }>();
  // Emits when selection changes with array of selected rows
  selectionChange = output<T[]>();
  // Emits when a row is clicked
  rowClick = output<T>();

  // Internal sort state signal for reliable reactivity
  private internalSortState = signal<SortState | undefined>(undefined);

  // Track selected rows
  private selectedRows = new Set<T>();

  // Track which row's menu is open (by paginated row index)
  openMenuIndex: number | null = null;
  // Track if menu should open upward
  menuOpenUpward = false;

  constructor() {
    // Sync internal sort state with input
    effect(() => {
      const inputSortState = this.table().sortState;
      this.internalSortState.set(inputSortState);
    });
  }

  // Sort helper that sorts the provided rows array based on current sort state
  private sortRows(rows: T[], tableData: TableFieldDto<T>): T[] {
    const sortState = this.internalSortState();
    if (!sortState || !sortState.direction) {
      return rows;
    }
    const column = tableData.columns.find((col: TableColumn) => col.key === sortState.column);
    if (!column) {
      return rows;
    }
    const sorted = [...rows];
    sorted.sort((a, b) => {
      // Prefer raw values for type-aware comparisons
      const aRaw = this.getValue(a, column.key);
      const bRaw = this.getValue(b, column.key);

      // Handle null/undefined values first
      if (aRaw == null && bRaw == null) return 0;
      if (aRaw == null) return 1;
      if (bRaw == null) return -1;

      // Date comparison (Date objects or parseable date strings)
      const aTime = aRaw instanceof Date
        ? aRaw.getTime()
        : (typeof aRaw === 'string' && !isNaN(Date.parse(aRaw)) ? Date.parse(aRaw) : NaN);
      const bTime = bRaw instanceof Date
        ? bRaw.getTime()
        : (typeof bRaw === 'string' && !isNaN(Date.parse(bRaw)) ? Date.parse(bRaw) : NaN);
      if (!isNaN(aTime) && !isNaN(bTime)) {
        const comp = aTime - bTime;
        return sortState.direction === 'asc' ? comp : -comp;
      }

      // Number comparison (numbers or numeric strings)
      const aNum = typeof aRaw === 'number' ? aRaw : Number(aRaw as any);
      const bNum = typeof bRaw === 'number' ? bRaw : Number(bRaw as any);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        const comp = aNum - bNum;
        return sortState.direction === 'asc' ? comp : -comp;
      }

      // Fallback: compare display strings. For objects, use getCellValue()
      const aStr = typeof aRaw === 'object' ? this.getCellValue(a, column) : String(aRaw);
      const bStr = typeof bRaw === 'object' ? this.getCellValue(b, column) : String(bRaw);
      const comp = aStr.localeCompare(bStr);
      return sortState.direction === 'asc' ? comp : -comp;
    });
    return sorted;
  }

  // Computed properties for pagination (sort what is visible on the current page)
  paginatedData = computed(() => {
    const tableData = this.table();
    const all = tableData.data;
    if (!tableData.showPaginator) {
      // No paginator: sort the visible (entire) set
      return this.sortRows(all, tableData);
    }
    const paginator = tableData.paginatorConfig;
    const startIndex = (paginator.currentPage - 1) * paginator.itemsPerPage;
    const endIndex = startIndex + paginator.itemsPerPage;
    const pageSlice = all.slice(startIndex, endIndex);
    return this.sortRows(pageSlice, tableData);
  });

  // Helper method to get cell value
  getCellValue(row: any, column: TableColumn): string {
    if (column.cellTemplate) {
      return column.cellTemplate(this.getValue(row, column.key), row);
    }
    const value = this.getValue(row, column.key);

    // Special handling for name field from Random User API
    if (column.key === 'name' && value && typeof value === 'object') {
      const nameObj = value as any;
      return `${nameObj.first || ''} ${nameObj.last || ''}`.trim();
    }

    return value?.toString() || '';
  }

  // Helper method to extract value from row (supports nested properties)
  private getValue(row: any, key: string): any {
    if (!row || typeof row !== 'object') {
      return row;
    }

    // Support dot notation for nested properties
    const keys = key.split('.');
    let value = row;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return undefined;
      }
    }

    return value;
  }

  // Event handlers for paginator
  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPageChange.emit(itemsPerPage);
  }

  // Selection helpers
  isRowSelected(row: T): boolean {
    return this.selectedRows.has(row);
  }

  toggleRow(row: T, checked: boolean) {
    if (checked) this.selectedRows.add(row); else this.selectedRows.delete(row);
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  areAllVisibleSelected(): boolean {
    const page = this.paginatedData();
    return page.length > 0 && page.every(r => this.selectedRows.has(r));
  }

  isSomeVisibleSelected(): boolean {
    const page = this.paginatedData();
    const any = page.some(r => this.selectedRows.has(r));
    return any && !this.areAllVisibleSelected();
  }

  toggleSelectAllVisible(checked: boolean) {
    const page = this.paginatedData();
    if (checked) {
      page.forEach(r => this.selectedRows.add(r));
    } else {
      page.forEach(r => this.selectedRows.delete(r));
    }
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  // Row click handler
  onRowClick(row: T) {
    this.rowClick.emit(row);
  }

  // Row menu handlers
  toggleMenu(rowIndex: number, event?: MouseEvent) {
    event?.stopPropagation();
    
    if (this.openMenuIndex === rowIndex) {
      this.openMenuIndex = null;
      this.menuOpenUpward = false;
      return;
    }
    
    this.openMenuIndex = rowIndex;
    
    // Check if button is near bottom of viewport
    if (event?.target) {
      const button = event.target as HTMLElement;
      const rect = button.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const menuHeight = 150; // Approximate menu height
      
      // Open upward if not enough space below
      this.menuOpenUpward = spaceBelow < menuHeight && rect.top > menuHeight;
    }
  }

  onMenuItemClick(action: string, row: T, event?: MouseEvent) {
    event?.stopPropagation();
    this.menuAction.emit({ action, row });
    this.openMenuIndex = null;
  }

  // Close any open menu when clicking outside
  @HostListener('document:click')
  onDocumentClick() {
    this.openMenuIndex = null;
  }

  // Sort handler
  onSort(column: TableColumn) {
    if (!column.sortable) {
      return;
    }

    const currentSort = this.internalSortState();
    let newDirection: SortDirection;

    if (!currentSort || currentSort.column !== column.key || !currentSort.direction) {
      // First click on this column, different column, or direction is null - sort ascending
      newDirection = 'asc';
    } else if (currentSort.direction === 'asc') {
      // Second click - sort descending
      newDirection = 'desc';
    } else {
      // Third click (desc) - clear sort
      newDirection = null;
    }

    this.sortChange.emit({ column: column.key, direction: newDirection });
  }

  // Get sort direction for a column
  getSortDirection(columnKey: string): SortDirection {
    const sortState = this.internalSortState();
    if (sortState && sortState.column === columnKey) {
      return sortState.direction;
    }
    return null;
  }
}
