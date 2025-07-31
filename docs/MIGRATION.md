# LiteForm Migration Guide

This guide helps you migrate from other form libraries or Angular Material to LiteForm, and provides upgrade paths for LiteForm versions.

## Migrating from Angular Material

### From Angular Material Form Fields

**Before (Angular Material):**
```typescript
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Name</mat-label>
      <input matInput [formControl]="nameControl">
      <mat-error *ngIf="nameControl.hasError('required')">
        Name is required
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Country</mat-label>
      <mat-select [formControl]="countryControl">
        <mat-option *ngFor="let country of countries" [value]="country">
          {{ country }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class MaterialFormComponent {
  nameControl = new FormControl('', [Validators.required]);
  countryControl = new FormControl('');
  countries = ['USA', 'Canada', 'Mexico'];
}
```

**After (LiteForm):**
```typescript
import { LiteFormModule } from 'lite-form';
import { FieldDto, SelectFieldDto } from 'lite-form';

@Component({
  template: `
    <lite-input [control]="nameField"></lite-input>
    <lite-select [control]="countryField"></lite-select>
  `
})
export class LiteFormComponent {
  nameField = new FieldDto('Name', new FormControl('', [Validators.required]));
  countryField = new SelectFieldDto(
    'Country',
    new FormControl(''),
    ['USA', 'Canada', 'Mexico'],
    (option) => option
  );
}
```

### Key Differences

| Feature | Angular Material | LiteForm |
|---------|------------------|-----------|
| **Bundle Size** | ~500KB+ | ~50KB |
| **Dependencies** | Angular CDK, Material Icons | None |
| **Theming** | Material Design System | Custom SCSS |
| **Form Integration** | FormControl binding | DTO-based approach |
| **Error Handling** | Manual error templates | Automatic error display |
| **Multi-Select** | mat-select with multiple | Dedicated component with chips |

---

## Migrating from React Hook Form

**Before (React Hook Form):**
```jsx
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

function ReactForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <div>
            <input {...field} placeholder="Name" />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
        )}
      />
      
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={skillOptions}
            placeholder="Select skills"
          />
        )}
      />
    </form>
  );
}
```

**After (Angular + LiteForm):**
```typescript
@Component({
  template: `
    <form (ngSubmit)="onSubmit()">
      <lite-input [control]="nameField"></lite-input>
      <lite-multi-select [control]="skillsField"></lite-multi-select>
    </form>
  `
})
export class AngularFormComponent {
  nameField = new FieldDto('Name', new FormControl('', [Validators.required]));
  skillsField = new MultiSelectFieldDto(
    'Skills',
    new FormControl<string[]>([]),
    ['JavaScript', 'TypeScript', 'Angular'],
    (option) => option
  );

  onSubmit() {
    // Handle form submission
  }
}
```

---

## Migrating from Vanilla Angular Reactive Forms

**Before (Vanilla Angular):**
```typescript
@Component({
  template: `
    <form [formGroup]="myForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          id="name" 
          type="text" 
          class="form-control"
          formControlName="name"
          [class.is-invalid]="myForm.get('name')?.invalid && myForm.get('name')?.touched">
        <div class="invalid-feedback" *ngIf="myForm.get('name')?.invalid && myForm.get('name')?.touched">
          <div *ngIf="myForm.get('name')?.hasError('required')">Name is required</div>
          <div *ngIf="myForm.get('name')?.hasError('minlength')">Name must be at least 2 characters</div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          class="form-control" 
          formControlName="description"
          rows="4">
        </textarea>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" class="form-control" formControlName="status">
          <option value="">Select status</option>
          <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
        </select>
      </div>
    </form>
  `
})
export class VanillaFormComponent {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    status: new FormControl('')
  });

  statuses = ['Active', 'Inactive', 'Pending'];
}
```

**After (LiteForm):**
```typescript
@Component({
  template: `
    <form>
      <lite-input [control]="nameField"></lite-input>
      <lite-textarea [control]="descriptionField"></lite-textarea>
      <lite-select [control]="statusField"></lite-select>
    </form>
  `
})
export class LiteFormComponent {
  nameField = new FieldDto('Name', new FormControl('', [Validators.required, Validators.minLength(2)]));
  descriptionField = new FieldDto('Description', new FormControl(''), 4);
  statusField = new SelectFieldDto(
    'Status',
    new FormControl(''),
    ['Active', 'Inactive', 'Pending'],
    (option) => option
  );
}
```

### Migration Benefits

1. **Reduced Boilerplate**: 70% less template code
2. **Automatic Error Handling**: No manual error message templates
3. **Type Safety**: Full TypeScript support with generics
4. **Consistent Styling**: Unified design system
5. **Better UX**: Built-in animations and interactions

---

## Step-by-Step Migration Process

### Step 1: Install LiteForm

```bash
npm install lite-form
```

### Step 2: Create Migration Mapping

Create a mapping of your existing form controls to LiteForm DTOs:

```typescript
// migration-helper.ts
import { FormControl } from '@angular/forms';
import { FieldDto, SelectFieldDto, MultiSelectFieldDto } from 'lite-form';

export class MigrationHelper {
  static createFieldDto(label: string, control: FormControl, rows?: number): FieldDto {
    return new FieldDto(label, control, rows);
  }

  static createSelectFieldDto<T>(
    label: string, 
    control: FormControl<T>, 
    options: T[], 
    displayWith: (option: T) => string
  ): SelectFieldDto<T> {
    return new SelectFieldDto(label, control, options, displayWith);
  }

  static createMultiSelectFieldDto<T>(
    label: string, 
    control: FormControl<T[]>, 
    options: T[], 
    displayWith: (option: T) => string
  ): MultiSelectFieldDto<T> {
    return new MultiSelectFieldDto(label, control, options, displayWith);
  }

  // Convert existing FormGroup to LiteForm DTOs
  static convertFormGroup(formGroup: FormGroup, fieldConfig: any): any {
    const fields: any = {};
    
    Object.keys(fieldConfig).forEach(key => {
      const config = fieldConfig[key];
      const control = formGroup.get(key) as FormControl;
      
      switch (config.type) {
        case 'input':
        case 'textarea':
          fields[key] = new FieldDto(config.label, control, config.rows);
          break;
        case 'select':
          fields[key] = new SelectFieldDto(
            config.label, 
            control, 
            config.options, 
            config.displayWith
          );
          break;
        case 'multi-select':
          fields[key] = new MultiSelectFieldDto(
            config.label, 
            control, 
            config.options, 
            config.displayWith
          );
          break;
      }
    });
    
    return fields;
  }
}
```

### Step 3: Gradual Migration

Migrate forms one component at a time:

```typescript
// Phase 1: Keep existing FormGroup structure
@Component({
  template: `
    <!-- Keep existing fields -->
    <div class="form-group">
      <label>Old Field</label>
      <input [formControl]="myForm.get('oldField')">
    </div>

    <!-- Migrate new fields to LiteForm -->
    <lite-input [control]="newField"></lite-input>
  `
})
export class PartialMigrationComponent {
  myForm = new FormGroup({
    oldField: new FormControl(''),
    newField: new FormControl('')
  });

  // Create LiteForm DTO for new field
  newField = new FieldDto('New Field', this.myForm.get('newField') as FormControl);
}
```

### Step 4: Update Styling

Replace existing form styles with LiteForm styles:

```scss
// Before: Custom form styles
.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    &:focus {
      border-color: #007bff;
      outline: none;
    }
    
    &.is-invalid {
      border-color: #dc3545;
    }
  }
}

// After: LiteForm customization
@import 'lite-form/styles';

// Optional: Override LiteForm styles
.lite-input.in-edit input:focus {
  border-color: #007bff; // Your brand color
}
```

### Step 5: Update Tests

Update component tests to work with LiteForm:

```typescript
// Before: Testing vanilla Angular forms
it('should validate required field', () => {
  const nameControl = component.myForm.get('name');
  nameControl?.setValue('');
  nameControl?.markAsTouched();
  
  expect(nameControl?.hasError('required')).toBe(true);
  expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeTruthy();
});

// After: Testing LiteForm components
it('should validate required field', () => {
  component.nameField.formControl.setValue('');
  component.nameField.formControl.markAsTouched();
  
  expect(component.nameField.formControl.hasError('required')).toBe(true);
  
  fixture.detectChanges();
  
  const liteInput = fixture.debugElement.query(By.css('lite-input'));
  expect(liteInput.componentInstance.hasErrors()).toBe(true);
});
```

---

## Version Upgrade Guide

### Upgrading from v0.x to v1.0

#### Breaking Changes

1. **Module Import Changes:**
```typescript
// v0.x
import { LiteInputModule, LiteTextareaModule } from 'lite-form';

// v1.0
import { LiteFormModule } from 'lite-form';
```

2. **DTO Constructor Changes:**
```typescript
// v0.x
const field = new InputFieldDto('Label', formControl);

// v1.0
const field = new FieldDto('Label', formControl);
```

3. **Component Property Changes:**
```typescript
// v0.x
<lite-input [field]="inputField" [editMode]="true"></lite-input>

// v1.0
<lite-input [control]="inputField"></lite-input>
```

#### Migration Script

Create an automated migration script:

```typescript
// migrate-to-v1.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

class LiteFormMigrator {
  private replacements = [
    { from: /LiteInputModule/g, to: 'LiteFormModule' },
    { from: /LiteTextareaModule/g, to: 'LiteFormModule' },
    { from: /InputFieldDto/g, to: 'FieldDto' },
    { from: /\[field\]=/g, to: '[control]=' },
    { from: /\[editMode\]=/g, to: '[inEdit]=' }
  ];

  migrateFile(filePath: string): void {
    let content = readFileSync(filePath, 'utf8');
    
    this.replacements.forEach(replacement => {
      content = content.replace(replacement.from, replacement.to);
    });
    
    writeFileSync(filePath, content, 'utf8');
    console.log(`Migrated: ${filePath}`);
  }

  migrateDirectory(dirPath: string): void {
    const items = readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.migrateDirectory(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.html')) {
        this.migrateFile(fullPath);
      }
    });
  }
}

// Usage
const migrator = new LiteFormMigrator();
migrator.migrateDirectory('./src');
```

---

## Common Migration Issues

### Issue 1: FormControl Type Mismatches

**Problem:**
```typescript
// This will cause type errors
const selectField = new SelectFieldDto<string>(
  'Status',
  new FormControl<number>(), // Type mismatch!
  ['active', 'inactive'],
  (option) => option
);
```

**Solution:**
```typescript
// Ensure types match
const selectField = new SelectFieldDto<string>(
  'Status',
  new FormControl<string>(),
  ['active', 'inactive'],
  (option) => option
);
```

### Issue 2: Multi-Select Array Types

**Problem:**
```typescript
// Won't work with multi-select
const multiField = new MultiSelectFieldDto(
  'Skills',
  new FormControl<string>(), // Should be string[]
  skills,
  (skill) => skill
);
```

**Solution:**
```typescript
const multiField = new MultiSelectFieldDto(
  'Skills',
  new FormControl<string[]>([]), // Array type with default
  skills,
  (skill) => skill
);
```

### Issue 3: Styling Conflicts

**Problem:** Existing CSS interfering with LiteForm styles.

**Solution:**
```scss
// Use CSS specificity to override
.my-app {
  .lite-input.in-edit input {
    // Your custom styles here
    border-color: #custom-color !important;
  }
}

// Or use CSS modules/scoped styles
:host ::ng-deep .lite-input.in-edit input {
  border-color: #custom-color;
}
```

---

## Performance Considerations

### Bundle Size Comparison

| Library | Bundle Size | Dependencies |
|---------|-------------|--------------|
| Angular Material | ~500KB | CDK, Animations |
| PrimeNG | ~800KB | PrimeIcons |
| **LiteForm** | **~50KB** | **None** |

### Runtime Performance

LiteForm is optimized for performance:

- **OnPush Change Detection**: Components use OnPush strategy
- **Minimal DOM Updates**: Efficient change detection
- **Lazy Loading**: Optional features are tree-shakeable
- **Memory Efficient**: No memory leaks in event handling

---

## Support and Resources

### Getting Help

1. **Documentation**: Check the [API docs](./API.md) and [examples](./EXAMPLES.md)
2. **GitHub Issues**: Report bugs and feature requests
3. **Community**: Join discussions in GitHub Discussions
4. **Stack Overflow**: Tag questions with `lite-form`

### Migration Services

For large-scale migrations, consider:

1. **Automated Tools**: Use the migration scripts provided
2. **Gradual Migration**: Migrate component by component
3. **Testing**: Ensure thorough testing after migration
4. **Training**: Train team members on LiteForm patterns

### Best Practices

1. **Start Small**: Begin with new forms before migrating existing ones
2. **Test Thoroughly**: Unit test all form validations
3. **Style Consistently**: Use LiteForm's styling system
4. **Document Changes**: Keep track of migration progress
5. **Performance Monitor**: Check bundle size and runtime performance
