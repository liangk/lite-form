import { Component, input, computed, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorFieldDto } from '../field-dto';

@Component({
  selector: 'lite-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lite-paginator.html',
  styleUrls: ['../lite-styles.scss']
})
export class LitePaginator {
  paginator = input.required<PaginatorFieldDto>();
  pageChange = output<number>();
  itemsPerPageChange = output<number>();

  // Computed properties that react to input changes
  totalPages = computed(() => Math.ceil(this.paginator().totalItems / this.paginator().itemsPerPage));
  hasPrevious = computed(() => this.paginator().currentPage > 1);
  hasNext = computed(() => this.paginator().currentPage < this.totalPages());

  // Start and end item numbers for display
  startItem = computed(() => {
    const page = this.paginator().currentPage;
    const perPage = this.paginator().itemsPerPage;
    return Math.min((page - 1) * perPage + 1, this.paginator().totalItems);
  });

  endItem = computed(() => {
    const page = this.paginator().currentPage;
    const perPage = this.paginator().itemsPerPage;
    return Math.min(page * perPage, this.paginator().totalItems);
  });

  constructor() {
    // Effect to log changes for debugging
    effect(() => {
      console.log('Paginator updated:', {
        currentPage: this.paginator().currentPage,
        itemsPerPage: this.paginator().itemsPerPage,
        totalItems: this.paginator().totalItems,
        totalPages: this.totalPages()
      });
    });
  }

  // Methods
  goToPrevious() {
    if (this.hasPrevious()) {
      const newPage = this.paginator().currentPage - 1;
      this.pageChange.emit(newPage);
    }
  }

  goToNext() {
    if (this.hasNext()) {
      const newPage = this.paginator().currentPage + 1;
      this.pageChange.emit(newPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  changeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPageChange.emit(itemsPerPage);
  }

  // Helper methods for template
  getPageNumbers(): number[] {
    const currentPage = this.paginator().currentPage;
    const totalPages = this.totalPages();
    const pages: number[] = [];

    // Show max 5 page numbers, centered around current page
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
