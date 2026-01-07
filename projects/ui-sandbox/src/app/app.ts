import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal, Type } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import {
  FieldDto,
  SelectFieldDto,
  MultiSelectFieldDto,
  RadioFieldDto,
  DateRangeFieldDto,
  FileFieldDto,
  FormUtils,
  SnackbarType,
  LiteSnackbarService,
  LiteInput,
  LitePassword,
  LiteTextarea,
  LiteSelect,
  LiteMultiSelect,
  LiteRadio,
  LiteCheckbox,
  LiteDate,
  LiteDateTime,
  LiteFile,
  LitePanel,
  LitePaginator,
  LiteTable,
  PaginatorFieldDto,
  TableFieldDto,
  LitePanelAction,
  LiteLoading,
  LiteTabGroup,
  LiteTabItem,
  LiteTabContent,
  LiteBadge,
  BadgeFieldDto
} from 'lite-form';
import { UserFormPanelComponent, UserFormData } from './components/user-form-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LiteInput,
    LitePassword,
    LiteTextarea,
    LiteSelect,
    LiteMultiSelect,
    LiteRadio,
    LiteCheckbox,
    LiteDate,
    LiteDateTime,
    LiteFile,
    LitePanel,
    LitePaginator,
    LiteTable,
    LiteLoading,
    LiteTabGroup,
    LiteTabContent,
    LiteBadge
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('UI Sandbox');
  readonly potterApi = 'https://potterapi-fedeperin.vercel.app/en'
  inputDemo: FieldDto = { 
    label: 'Test Input', 
    formControl: new FormControl('', [Validators.required]),
    hint: 'Enter your username (min 3 chars)'
  } as FieldDto;
  
  // Basic password with detailed validation
  passwordDemo: FieldDto = { 
    label: 'Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    hint: 'Must contain at least 8 characters, one uppercase, one lowercase, one number and one special char.'
  } as FieldDto;
  
  // Confirm password with simpler validation (just required and length)
  confirmPasswordDemo: FieldDto = { 
    label: 'Confirm Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]) 
  } as FieldDto;
  
  textareaDemo: FieldDto = { 
    label: 'Test Textarea', 
    formControl: new FormControl(''),
    hint: 'Describe yourself in a few sentences.'
  } as FieldDto;
  selectDemo: SelectFieldDto = {
    label: 'Test Select',
    formControl: new FormControl(null, [Validators.required]),
    options: [],
    displayWith: (option: any) => option?.label,
    hint: 'Select your favorite Harry Potter book.'
  };
  
  multiSelectDemo: MultiSelectFieldDto = {
    label: 'Test Multi-Select',
    formControl: new FormControl<any[]>([], { nonNullable: true }),
    options: [],
    displayWith: (option: any) => option?.title,
    hint: 'Select one or more characters.'
  };

  radioDemo: RadioFieldDto = {
    label: 'Test Radio',
    formControl: new FormControl('', [Validators.required]),
    options: [
      'Small Business Package',
      'Professional Enterprise Solution',
      'Premium Corporate Plan',
      'Custom Implementation'
    ],
    displayWith: (option: string) => option,
    hint: 'Choose the package that best suits your needs.'
  };
  
  checkboxDemo: FieldDto = {
    label: 'I agree to the terms and conditions',
    formControl: new FormControl<boolean>(false, { nonNullable: true }),
    hint: 'You must agree to proceed.'
  };
  
  requiredCheckboxDemo: FieldDto = {
    label: 'Accept privacy policy (required)',
    formControl: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    hint: 'This is mandatory.'
  };

  dateDemo: FieldDto = {
    label: 'Birth Date',
    formControl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hint: 'Your date of birth as per official ID.'
  };

  dateRangeDemo: DateRangeFieldDto = {
    label: 'Event Date Range',
    formControl: new FormControl<string[]>(['', ''], { nonNullable: true }),
    hint: 'Select the start and end dates.'
  };
  datetimeDemo: FieldDto = {
    label: 'Presentation Time',
    formControl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hint: 'Select the date and time of the presentation.'
  };

  // Advanced password with custom complexity validator
  advancedPasswordDemo: FieldDto = { 
    label: 'Advanced Password', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      this.passwordComplexityValidator()
    ]) 
  } as FieldDto;

  // Password with strength indicator
  strengthPasswordDemo: FieldDto = { 
    label: 'Password with Strength Indicator', 
    formControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]) 
  } as FieldDto;

  // File upload demos
  fileDemo: FileFieldDto = new FileFieldDto(
    'File Upload',
    new FormControl([]),
    true, // multiple
    '*/*', // accept all files
    5 * 1024 * 1024, // 5MB max
    5, // max 5 files
    true, // show preview
    'Upload up to 5 files (max 5MB each).'
  );

  imageFileDemo: FileFieldDto = new FileFieldDto(
    'Image Upload',
    new FormControl([]),
    false, // single file
    'image/*', // images only
    2 * 1024 * 1024, // 2MB max
    1, // max 1 file
    true, // show preview
    'Upload a profile picture (max 2MB).'
  );

  documentFileDemo: FileFieldDto = new FileFieldDto(
    'Document Upload',
    new FormControl([], [Validators.required]),
    true, // multiple
    '.pdf,.doc,.docx,.txt', // specific file types
    10 * 1024 * 1024, // 10MB max
    3, // max 3 files
    false, // no preview for docs
    'Upload relevant documents (PDF, Word, etc.).'
  );

  // Paginator demo
  paginatorDemo: PaginatorFieldDto = new PaginatorFieldDto(
    1, // currentPage
    150, // totalItems
    10, // itemsPerPage
  );

  // Table demo data
  tableDemo: TableFieldDto = new TableFieldDto(
    [
      { key: '__select__', label: '', flex: '0 0 44px', type: 'select' },
      { key: 'name', label: 'Name', flex: '1', sortable: true },
      { key: 'location.country', label: 'Country', flex: '0 0 120px', sortable: true },
      { key: 'picture.medium', label: 'Picture', flex: '0 0 80px', cellTemplate: (value) => `<img src="${value}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />` },
      { key: 'dob.date', label: 'Date of Birth', flex: '0 0 120px', sortable: true, cellTemplate: (value) => new Date(value).toLocaleDateString('en-AU') },
      { key: 'registered.date', label: 'Registered', flex: '0 0 160px', cellTemplate: (value) => new Date(value).toLocaleString('en-AU') },
      { key: 'actions', label: '', flex: '0 0 72px', type: 'menu', menuItems: [
        { label: 'Delete', value: 'delete' }
      ] }
    ],
    [], // Will be populated by API call
    false // No paginator for basic demo
  );

  // Table demo with paginator
  tableWithPaginatorDemo: TableFieldDto = new TableFieldDto(
    [
      { key: 'name', label: 'Name', flex: '1', sortable: true },
      { key: 'email', label: 'Email', flex: '1', sortable: true },
      { key: 'gender', label: 'Gender', flex: '0 0 100px', sortable: true },
      { key: 'location.country', label: 'Country', flex: '0 0 120px', sortable: true },
      { key: 'phone', label: 'Phone', flex: '0 0 140px' },
      { key: 'actions', label: '', flex: '0 0 44px', type: 'menu', menuItems: [
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete', variant: 'danger' }
      ] }
    ],
    [], // Will be populated by API call
    true, // Enable paginator
    new PaginatorFieldDto(1, 20, 10) // Start with page 1, 20 items total, 20 per page
  );

  // Tab group demo - wrapping table demos
  tableTabs: LiteTabItem[] = [
    { label: 'Basic Table', content: '' }, // Content will be in template
    { label: 'Table with Paginator', content: '' }
  ];
  activeTabIndex = signal(0);

  // Tab group demo - wrapping date demos (3 tabs)
  dateTabs: LiteTabItem[] = [
    { label: 'Single Date', content: '' },
    { label: 'Date Range', content: '' },
    { label: 'Date & Time', content: '' }
  ];
  activeDateTabIndex = signal(0);

  // Lite panel demos
  basicPanelOpen = signal(false);
  confirmationPanelOpen = signal(false);
  componentPanelOpen = signal(false);
  templateFormPanelOpen = signal(false);
  panelResult = signal<unknown | null>(null);
  userFormComponent: Type<any> = UserFormPanelComponent;
  userFormInputs = signal<{ initialData?: UserFormData; mode?: 'create' | 'edit' } | null>(null);
  componentPanelTitle = signal<string>('User Form');
  
  // Template form panel demo
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });
  
  inviteEmailField: FieldDto = {
    label: 'Email Address',
    formControl: this.inviteForm.get('email') as FormControl
  };
  
  inviteRoleField: SelectFieldDto = {
    label: 'Role',
    formControl: this.inviteForm.get('role') as FormControl,
    options: ['Admin', 'Editor', 'Viewer'],
    displayWith: (option: string) => option
  };

  // Lite loading demos
  showSpinner = signal(true);
  showProgressDefined = signal(true);
  showProgressIndeterminate = signal(true);
  progressValue = signal(0);
  progressInterval: any = null;

  // Badge demos
  statusBadge = new BadgeFieldDto('Active', 'success', 'medium');
  warningBadge = new BadgeFieldDto('Pending', 'warning', 'medium');
  errorBadge = new BadgeFieldDto('Failed', 'danger', 'medium');
  infoBadge = new BadgeFieldDto('New', 'info', 'small');
  primaryBadge = new BadgeFieldDto('Featured', 'primary', 'large');
  defaultBadge = new BadgeFieldDto('Default', 'default', 'medium');
  
  removableChips = signal<BadgeFieldDto[]>([
    new BadgeFieldDto('Angular', 'primary', 'medium', true),
    new BadgeFieldDto('TypeScript', 'info', 'medium', true),
    new BadgeFieldDto('RxJS', 'success', 'medium', true),
    new BadgeFieldDto('SCSS', 'warning', 'medium', true)
  ]);
  
  iconBadge = new BadgeFieldDto(
    'Star',
    'warning',
    'medium',
    false,
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
  );
  
  iconRemovableBadge = new BadgeFieldDto(
    'Verified',
    'success',
    'medium',
    true,
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  );

  confirmationPanelActions: LitePanelAction[] = [
    { label: 'Delete', value: 'delete', variant: 'danger' },
    { label: 'Cancel', value: null, variant: 'secondary' }
  ];

  componentPanelActions: LitePanelAction[] = [
    { label: 'Submit', value: 'submit', variant: 'primary' },
    { label: 'Cancel', value: null, variant: 'secondary' }
  ];
  
  templateFormPanelActions: LitePanelAction[] = [
    { label: 'Send Invite', value: 'submit', variant: 'primary' },
    { label: 'Cancel', value: null, variant: 'secondary' }
  ];

  constructor(private _http: HttpClient, public _snackbar: LiteSnackbarService) {
    this.getPotterBooks();
    this.getPotterCharacters();
    this.getTableDemoData();
    this.getTableWithPaginatorDemoData();
    this.startProgressSimulation();
    this.dateDemo.formControl.setValue('2025-10-01');
    this.dateDemo.formControl.valueChanges.subscribe((value: any) => {
      console.log('Date changed:', value);
    });
    
    // Set initial range values
    // this.dateRangeDemo.formControl.setValue(['2025-07-01', '2025-07-15']);
    this.dateRangeDemo.formControl.valueChanges.subscribe((value: any) => {
      console.log('Date range changed:', value);
    });

    // Demonstrate password strength analysis
    this.strengthPasswordDemo.formControl.valueChanges.subscribe((password: any) => {
      if (password) {
        const _analysis = FormUtils.analyzePasswordStrength(password);
        console.log('Password Analysis:', _analysis);
        console.log(`Strength: ${_analysis.level} (${_analysis.score}/8)`);
        if (_analysis.feedback.length > 0) {
          console.log('Suggestions:', _analysis.feedback);
        }
      }
    });

    // File upload demos
    this.fileDemo.formControl.valueChanges.subscribe((files: any[]) => {
      console.log('Files changed:', files);
    });

    this.imageFileDemo.formControl.valueChanges.subscribe((files: any[]) => {
      console.log('Image files changed:', files);
    });

    this.documentFileDemo.formControl.valueChanges.subscribe((files: any[]) => {
      console.log('Document files changed:', files);
    });
  }

  openBasicPanel() {
    this.panelResult.set(null);
    this.basicPanelOpen.set(true);
  }

  onBasicPanelClosed(result: unknown | null) {
    this.panelResult.set(result ?? null);
    this.basicPanelOpen.set(false);
  }

  openConfirmationPanel() {
    this.panelResult.set(null);
    this.confirmationPanelOpen.set(true);
  }

  onConfirmationPanelClosed(result: unknown | null) {
    this.panelResult.set(result ?? null);
    this.confirmationPanelOpen.set(false);

    if (result === 'delete') {
      this.showSnackbar('Item deleted successfully.', 'done');
    } else if (result === null) {
      this.showSnackbar('Action cancelled.', 'warn');
    }
  }

  openComponentPanel(mode: 'create' | 'edit' = 'create') {
    this.panelResult.set(null);

    if (mode === 'edit') {
      // Edit mode: Pass initial data to pre-populate the form
      this.componentPanelTitle.set('Edit User');
      this.userFormInputs.set({
        initialData: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          bio: 'Software developer with 5 years of experience.'
        },
        mode: 'edit'
      });
    } else {
      // Create mode: No initial data
      this.componentPanelTitle.set('Create New User');
      this.userFormInputs.set({
        mode: 'create'
      });
    }

    this.componentPanelOpen.set(true);
  }

  onComponentPanelClosed(result: unknown | null) {
    this.panelResult.set(result ?? null);
    this.componentPanelOpen.set(false);
    // Handle component panel with data
    if (result && typeof result === 'object' && 'action' in result && 'data' in result) {
      const { action, data } = result as { action: unknown; data: any };
      
      if (action === 'submit') {
        console.log('Form data submitted:', data);
        this.showSnackbar('Form submitted successfully!', 'done');
      } else if (action === null) {
        this.showSnackbar('Form cancelled.', 'warn');
      }
    } else if (result === null) {
      this.showSnackbar('Form cancelled.', 'warn');
    }
  }
  
  openTemplateFormPanel() {
    this.panelResult.set(null);
    this.inviteForm.reset();
    this.templateFormPanelOpen.set(true);
  }
  
  onTemplateFormPanelClosed(result: unknown | null) {
    this.panelResult.set(result ?? null);
    this.templateFormPanelOpen.set(false);
    
    if (result === 'submit') {
      console.log('Invite sent:', this.inviteForm.value);
      this.showSnackbar('Invitation sent successfully!', 'done');
    } else if (result === null) {
      this.showSnackbar('Invitation cancelled.', 'warn');
    }
  }

  /**
   * Example method showing how to use analyzePasswordStrength programmatically
   */
  analyzePassword(password: string) {
    const analysis = FormUtils.analyzePasswordStrength(password);
    
    console.log('=== Password Strength Analysis ===');
    console.log(`Password: "${password}"`);
    console.log(`Score: ${analysis.score}/8`);
    console.log(`Level: ${analysis.level}`);
    console.log('Feedback:', analysis.feedback);
    
    return analysis;
  }

  /**
   * Demo method to test different password strengths
   */
  testPasswordStrengths() {
    const testPasswords = [
      '',                           // Very Weak
      'abc',                        // Very Weak  
      'password',                   // Weak
      'Password1',                  // Fair
      'Password123',                // Good
      'MyStr0ng@Pass',             // Good
      'MyVeryStr0ng@Password123!'   // Strong
    ];

    console.log('=== Password Strength Test Results ===');
    testPasswords.forEach(pwd => {
      const _analysis = this.analyzePassword(pwd);
      console.log('---');
    });
  }

  /**
   * Custom password complexity validator
   */
  passwordComplexityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[@$!%*?&^()_+\-=[]{}|;':"\\|,.<>?`#~]/.test(value);
      const minLength = value.length >= 12;
      const noRepeatingChars = !/(.)\1{2,}/.test(value);
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && minLength && noRepeatingChars;
      
      if (!valid) {
        return {
          passwordComplexity: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecial,
            minLength,
            noRepeatingChars
          }
        };
      }
      
      return null;
    };
  }
  showSnackbar(message: string, type: SnackbarType, time: number = 3000) {
    this._snackbar.show(message, type, time);
  }
  getPotterBooks() {
    this._http.get<any[]>(`${this.potterApi}/books`).subscribe((books: any[]) => {
      console.log(books);
      this.selectDemo.options = books;
      this.selectDemo.displayWith = (option: any) => option?.title;
    });
  }
  getPotterCharacters() {
    this._http.get<any[]>(`${this.potterApi}/characters`).subscribe((characters: any[]) => {
      console.log(characters);
      this.multiSelectDemo.options = characters;
      this.multiSelectDemo.displayWith = (option: any) => option?.fullName;
    });
  }

  getTableDemoData() {
    // Fetch 10 users from page 1
    this._http.get<any>('https://randomuser.me/api/?page=1&results=10').subscribe((response: any) => {
      console.log('Table demo data:', response.results);
      this.tableDemo.data = response.results;
      // Force change detection by reassigning the object
      this.tableDemo = { ...this.tableDemo };
    });
  }

  getTableWithPaginatorDemoData() {
    // Fetch all 20 users for client-side pagination
    this._http.get<any>('https://randomuser.me/api/?page=1&results=20').subscribe((response: any) => {
      console.log('Table with paginator demo data:', response.results);
      this.tableWithPaginatorDemo.data = response.results;
      // Update paginator config with actual total
      this.tableWithPaginatorDemo.paginatorConfig.totalItems = response.results.length;
      // Force change detection by reassigning the object
      this.tableWithPaginatorDemo = { ...this.tableWithPaginatorDemo };
    });
  }

  // Paginator event handlers
  onPageChange(page: number) {
    // Create a new object to trigger change detection in the paginator component
    this.paginatorDemo = {
      ...this.paginatorDemo,
      currentPage: page
    };
    console.log('Page changed to:', page);
    // Here you would typically fetch new data based on the page
    this.showSnackbar(`Switched to page ${page}`, 'done');
  }

  onItemsPerPageChange(itemsPerPage: number) {
    // Create a new object to trigger change detection in the paginator component
    this.paginatorDemo = {
      ...this.paginatorDemo,
      itemsPerPage,
      currentPage: 1 // Reset to first page when changing items per page
    };
    console.log('Items per page changed to:', itemsPerPage);
    this.showSnackbar(`Items per page set to ${itemsPerPage}`, 'done');
  }

  // Table event handlers
  onTablePageChange(page: number) {
    if (this.tableWithPaginatorDemo.paginatorConfig) {
      this.tableWithPaginatorDemo.paginatorConfig.currentPage = page;
      // No need to fetch new data - table handles client-side pagination
      this.tableWithPaginatorDemo = { ...this.tableWithPaginatorDemo };
      this.showSnackbar(`Table page changed to ${page}`, 'done');
    }
  }

  onTableItemsPerPageChange(itemsPerPage: number) {
    if (this.tableWithPaginatorDemo.paginatorConfig) {
      this.tableWithPaginatorDemo.paginatorConfig.itemsPerPage = itemsPerPage;
      this.tableWithPaginatorDemo.paginatorConfig.currentPage = 1; // Reset to first page
      // No need to fetch new data - table handles client-side pagination
      this.tableWithPaginatorDemo = { ...this.tableWithPaginatorDemo };
      this.showSnackbar(`Table items per page set to ${itemsPerPage}`, 'done');
    }
  }

  // Sort handlers
  onTableSort(event: { column: string; direction: any }) {
    this.tableDemo = { ...this.tableDemo, sortState: { column: event.column, direction: event.direction } };
    const directionText = event.direction === 'asc' ? 'ascending' : event.direction === 'desc' ? 'descending' : 'cleared';
    this.showSnackbar(`Sorted by ${event.column} (${directionText})`, 'done');
  }

  // Selection handler
  onTableSelectionChange(selectedRows: any[]) {
    console.log('Selection changed:', selectedRows);
    console.log(`${selectedRows.length} row(s) selected`);
    // You can prepare other data or trigger actions here based on selection
    if (selectedRows.length > 0) {
      this.showSnackbar(`${selectedRows.length} row(s) selected`, 'done');
    }
  }

  // Row click handler
  onTableRowClick(row: any) {
    const fullName = row?.name ? `${row.name.first ?? ''} ${row.name.last ?? ''}`.trim() : 'Unknown';
    console.log('Row clicked:', row);
    this.showSnackbar(`Clicked: ${fullName}`, 'done');
  }

  onTableWithPaginatorSort(event: { column: string; direction: any }) {
    this.tableWithPaginatorDemo = { ...this.tableWithPaginatorDemo, sortState: { column: event.column, direction: event.direction } };
    const directionText = event.direction === 'asc' ? 'ascending' : event.direction === 'desc' ? 'descending' : 'cleared';
    this.showSnackbar(`Sorted by ${event.column} (${directionText})`, 'done');
  }

  // Tab change handler
  onTabChange(index: number) {
    this.activeTabIndex.set(index);
    console.log('Tab changed to:', index);
  }

  // Date tab change handler
  onDateTabChange(index: number) {
    this.activeDateTabIndex.set(index);
    console.log('Date tab changed to:', index);
  }

  // Row menu handler for both tables
  onRowMenuAction(event: { action: string; row: any }) {
    const { action, row } = event;
    const fullName = row?.name ? `${row.name.first ?? ''} ${row.name.last ?? ''}`.trim() : '';

    if (action === 'edit') {
      this.showSnackbar(`Edit clicked${fullName ? ' for ' + fullName : ''}`, 'done');
      console.log('Edit row:', row);
      return;
    }

    if (action === 'delete') {
      const id = row?.login?.uuid ?? row?.email ?? null;
      const removeById = (arr: any[]) => arr.filter(r => (r?.login?.uuid ?? r?.email) !== id);

      // Basic table
      if (Array.isArray(this.tableDemo.data)) {
        this.tableDemo.data = id ? removeById(this.tableDemo.data) : this.tableDemo.data.filter(r => r !== row);
        this.tableDemo = { ...this.tableDemo };
      }

      // Table with paginator
      if (Array.isArray(this.tableWithPaginatorDemo.data)) {
        this.tableWithPaginatorDemo.data = id ? removeById(this.tableWithPaginatorDemo.data) : this.tableWithPaginatorDemo.data.filter(r => r !== row);
        if (this.tableWithPaginatorDemo.paginatorConfig) {
          this.tableWithPaginatorDemo.paginatorConfig.totalItems = this.tableWithPaginatorDemo.data.length;
        }
        this.tableWithPaginatorDemo = { ...this.tableWithPaginatorDemo };
      }

      this.showSnackbar(`Row deleted${fullName ? ': ' + fullName : ''}`, 'done');
      return;
    }

    console.log('Unknown action:', event);
  }

  // Loading demos
  startProgressSimulation() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progressValue.set(0);
    this.progressInterval = setInterval(() => {
      const current = this.progressValue();
      if (current >= 100) {
        this.progressValue.set(0);
      } else {
        this.progressValue.set(current + 1);
      }
    }, 100);
  }

  toggleSpinner() {
    this.showSpinner.update(v => !v);
  }

  toggleProgressDefined() {
    this.showProgressDefined.update(v => !v);
  }

  toggleProgressIndeterminate() {
    this.showProgressIndeterminate.update(v => !v);
  }

  simulateLoading() {
    this.showProgressDefined.set(true);
    this.progressValue.set(0);
    const interval = setInterval(() => {
      const current = this.progressValue();
      if (current >= 100) {
        clearInterval(interval);
        this.showSnackbar('Loading complete!', 'done');
      } else {
        this.progressValue.set(current + 10);
      }
    }, 300);
  }

  // Badge event handlers
  onRemoveChip(index: number) {
    const chips = this.removableChips();
    const removed = chips[index];
    this.removableChips.set(chips.filter((_, i) => i !== index));
    this.showSnackbar(`Removed: ${removed.label}`, 'done');
  }
}
