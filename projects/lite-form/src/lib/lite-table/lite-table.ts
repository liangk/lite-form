import { Component, input, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFieldDto, TableColumn } from '../field-dto';
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

  // Computed properties for pagination
  paginatedData = computed(() => {
    const tableData = this.table();
    if (!tableData.showPaginator) {
      return tableData.data;
    }

    const paginator = tableData.paginatorConfig;
    const startIndex = (paginator.currentPage - 1) * paginator.itemsPerPage;
    const endIndex = startIndex + paginator.itemsPerPage;

    return tableData.data.slice(startIndex, endIndex);
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
}
