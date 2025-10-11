import { FormControl } from "@angular/forms";

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
  displayWith: (_option: T) => string;
  
  constructor(
    label: string,
    options: T[],
    displayWith: (_option: T) => string
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
    displayWith: (_option: T) => string
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
    displayWith: (_option: T) => string
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
    displayWith: (_option: T) => string
  ) {
    super(label, options, displayWith);
    this.formControl = formControl;
  }
}

export class FileFieldDto {
  label: string;
  formControl: FormControl;
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  maxFiles?: number;
  showPreview?: boolean;

  constructor(
    label: string,
    formControl: FormControl,
    multiple: boolean = true,
    accept: string = '*/*',
    maxFileSize: number = 10 * 1024 * 1024, // 10MB
    maxFiles: number = 10,
    showPreview: boolean = true
  ) {
    this.label = label;
    this.formControl = formControl;
    this.multiple = multiple;
    this.accept = accept;
    this.maxFileSize = maxFileSize;
    this.maxFiles = maxFiles;
    this.showPreview = showPreview;
  }
}

export type SnackbarType = 'done' | 'warn' | 'error';

export class PaginatorFieldDto {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;

  constructor(
    currentPage: number = 1,
    totalItems: number = 0,
    itemsPerPage: number = 10
  ) {
    this.currentPage = currentPage;
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
  }
}

export interface TableColumn {
  key: string;
  label: string;
  flex?: string;
  sortable?: boolean;
  cellTemplate?: (_value: any, _row: any) => string;
  // Optional type for special rendering. Defaults to 'text'.
  type?: 'text' | 'menu';
  // When type is 'menu', provide menu items shown in the row actions dropdown.
  menuItems?: Array<{ label: string; value: string; variant?: 'danger' | 'default' }>;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}

export class TableFieldDto<T = any> {
  columns: TableColumn[];
  data: T[];
  showPaginator?: boolean;
  paginatorConfig: PaginatorFieldDto;
  sortState?: SortState;

  constructor(
    columns: TableColumn[],
    data: T[],
    showPaginator: boolean = false,
    paginatorConfig: PaginatorFieldDto = new PaginatorFieldDto(),
    sortState?: SortState
  ) {
    this.columns = columns;
    this.data = data;
    this.showPaginator = showPaginator;
    this.paginatorConfig = paginatorConfig;
    this.sortState = sortState;
  }
}
